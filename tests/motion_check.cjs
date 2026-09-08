const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const base = (process.env.TEST_SITE_URL || "http://127.0.0.1:4000").replace(
  /\/$/,
  "",
);
(async () => {
  const browser = await chromium.launch({
    headless: true,
    channel: process.env.BROWSER_CHANNEL || undefined,
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      permissions: ["geolocation"],
      geolocation: { latitude: -33.45, longitude: -70.66 },
    });
    await context.addInitScript(() => {
      window.atlasPaints = 0;
      const clear = CanvasRenderingContext2D.prototype.clearRect;
      CanvasRenderingContext2D.prototype.clearRect = function (...args) {
        window.atlasPaints++;
        return clear.apply(this, args);
      };
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(base, { waitUntil: "networkidle" });
    await page.waitForSelector(".atlas-scene.is-ready");
    const paints = () => page.evaluate(() => window.atlasPaints);
    let count = await paints();
    const angle = Number(
      await page.locator("[data-atlas]").getAttribute("data-longitude"),
    );
    await page.waitForTimeout(500);
    assert((await paints()) > count, "globe animates");
    assert(
      Number(
        await page.locator("[data-atlas]").getAttribute("data-longitude"),
      ) >
        angle + 1,
      "globe rotates automatically, not just a pulse",
    );
    await page
      .getByRole("button", { name: "Pausar movimiento", exact: true })
      .click();
    count = await paints();
    await page.waitForTimeout(180);
    assert.equal(await paints(), count, "pause stops drawing");
    await page.getByRole("button", { name: "Ubicarme en el globo" }).click();
    await page.locator('[data-atlas][data-visitor-location="shown"]').waitFor();
    assert.equal(
      await page.locator("[data-atlas]").getAttribute("data-visitor-location"),
      "shown",
    );
    assert.equal(
      await page.locator("[data-atlas]").getAttribute("data-longitude"),
      "-70.7",
    );
    assert.match(
      await page.locator("[data-location-status]").textContent(),
      /Ubicación marcada/,
    );
    await page.goto(base + "/blog.html");
    assert.equal(
      await page.locator("html").getAttribute("data-motion"),
      "off",
      "pause persists across pages",
    );
    await page
      .getByRole("button", { name: "Activar movimiento", exact: true })
      .click();
    await page.goto(base);
    await page.waitForSelector(".atlas-scene.is-ready");
    const box = await page.locator("canvas.atlas-canvas").boundingBox();
    await page.mouse.move(box.x + box.width * 0.55, box.y + box.height * 0.4);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.35, box.y + box.height * 0.4, {
      steps: 8,
    });
    await page.mouse.up();
    await page.waitForTimeout(150);
    assert.notEqual(
      await page.locator("[data-atlas]").getAttribute("data-longitude"),
      "-68.0",
      "pointer drag rotates",
    );
    await page
      .getByRole("button", { name: "02 / Memoria", exact: true })
      .click();
    assert(
      (await page.locator(".terrain-scene img").getAttribute("src")).endsWith(
        "impacto_dictadura.webp",
      ),
    );
    assert(
      (await page.locator(".terrain-scene").getAttribute("href")).endsWith(
        "#memoria-territorial",
      ),
    );
    await page
      .getByRole("button", { name: "01 / Relieve", exact: true })
      .click();
    assert(
      (await page.locator(".terrain-scene img").getAttribute("src")).endsWith(
        "conmapas.webp",
      ),
    );
    await page.locator("#contacto").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    count = await paints();
    await page.waitForTimeout(180);
    assert.equal(await paints(), count, "off-screen canvas stops");
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(150);
    count = await paints();
    await page.waitForTimeout(180);
    assert((await paints()) > count, "canvas resumes on return");
    assert.equal(errors.length, 0);
    await context.close();

    const hidden = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    await hidden.addInitScript(() =>
      Object.defineProperty(document, "hidden", {
        configurable: true,
        get: () => true,
      }),
    );
    const background = await hidden.newPage();
    await background.goto(base);
    await background.waitForSelector(".atlas-scene.is-ready");
    assert(
      await background
        .locator("html")
        .evaluate((el) => el.classList.contains("tab-hidden")),
    );
    await background.evaluate(() => {
      delete document.hidden;
      document.dispatchEvent(new Event("visibilitychange"));
    });
    assert.equal(
      await background
        .locator(".atlas-orbit")
        .evaluate((el) => getComputedStyle(el).animationPlayState),
      "running",
      "background-loaded CSS resumes",
    );
    await hidden.close();

    const reduced = await browser.newContext({
      reducedMotion: "reduce",
      viewport: { width: 390, height: 844 },
    });
    const still = await reduced.newPage();
    await still.goto(base);
    await still.waitForSelector(".atlas-scene.is-ready");
    assert.equal(
      await still.locator("html").getAttribute("data-motion"),
      "off",
    );
    assert(
      await still
        .getByRole("button", { name: "Movimiento reducido", exact: true })
        .isDisabled(),
    );
    const pixel = await still.locator("canvas").evaluate((c) => c.toDataURL());
    await still.waitForTimeout(180);
    assert.equal(
      await still.locator("canvas").evaluate((c) => c.toDataURL()),
      pixel,
      "reduced-motion globe remains static",
    );
    assert.equal(
      await still
        .locator("h1")
        .evaluate(
          (h) =>
            getComputedStyle(h.firstElementChild.firstElementChild)
              .animationName,
        ),
      "none",
    );
    await reduced.close();

    const denied = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    await denied.addInitScript(() =>
      Object.defineProperty(navigator, "geolocation", {
        configurable: true,
        value: {
          getCurrentPosition: (_success, failure) =>
            failure({ code: 1, PERMISSION_DENIED: 1 }),
        },
      }),
    );
    const declined = await denied.newPage();
    await declined.goto(base);
    await declined.waitForSelector(".atlas-scene.is-ready");
    await declined
      .getByRole("button", { name: "Ubicarme en el globo" })
      .click();
    await declined
      .locator("[data-location-status]")
      .getByText(/Permiso no concedido/)
      .waitFor();
    assert.equal(
      await declined.locator("[data-atlas]").getAttribute("data-visitor-location"),
      null,
    );
    assert(
      await declined
        .getByRole("button", { name: "Ubicarme en el globo" })
        .isEnabled(),
    );
    await denied.close();

    const fallback = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const plain = await fallback.newPage();
    await plain.goto(base);
    assert(await plain.locator(".atlas-fallback").isVisible());
    assert(await plain.locator("canvas").isHidden());
    assert(await plain.locator(".map-switch").isHidden());
    await fallback.close();
    const failed = await browser.newContext();
    const failure = await failed.newPage();
    await failure.route("**/atlas.json", (route) =>
      route.fulfill({ status: 503, body: "Unavailable" }),
    );
    await failure.goto(base, { waitUntil: "networkidle" });
    assert(await failure.locator(".atlas-fallback").isVisible());
    assert(await failure.locator("[data-locate]").isHidden());
    await failed.close();
    console.log(
      "PASS: live rendering, pause/resume, persistence, local geolocation, drag, offscreen suspension, hidden-tab recovery, reduced motion, no-JS and failed-data fallbacks.",
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
