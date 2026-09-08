const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
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
    });
    const page = await context.newPage();
    const errors = [];
    const badResponses = [];
    const accessibility = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (r) => {
      if (r.url().startsWith(base) && r.status() >= 400)
        badResponses.push(r.url());
    });
    const routes = [
      "/",
      "/maps.html",
      "/code.html",
      "/blog.html",
      "/python/gis/2025/01/02/mi-primer-analisis.html",
      "/404.html",
    ];
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of routes) {
        await page.goto(base + route, { waitUntil: "networkidle" });
        assert.equal(await page.locator("h1").count(), 1, route + " h1");
        assert(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          route + " overflows at " + width,
        );
        assert.equal(
          await page
            .locator("img")
            .evaluateAll(
              (imgs) =>
                imgs.filter(
                  (i) => i.hasAttribute("src") && i.complete && !i.naturalWidth,
                ).length,
            ),
          0,
          route + " broken image",
        );
        if (route === "/" && width >= 768) {
          const atlasCredit = await page.locator(".atlas-credit").boundingBox();
          const heroFooter = await page.locator(".hero-bottom").boundingBox();
          assert(
            atlasCredit.y + atlasCredit.height + 16 <= heroFooter.y,
            "atlas caption clears hero footer at " + width,
          );
        }
        if (route === "/code.html") {
          assert.equal(
            await page.getByText("Work in Progress", { exact: true }).count(),
            3,
            "all three experiments disclose their status",
          );
        }
        if (width === 390 || width === 1440) {
          const result = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze();
          accessibility.push({
            width,
            route,
            violations: result.violations.map((v) => ({
              id: v.id,
              impact: v.impact,
              nodes: v.nodes.map((n) => ({
                html: n.html,
                summary: n.failureSummary,
              })),
            })),
          });
        }
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base + "/maps.html");
    const menu = page.getByRole("button", { name: "Menú" });
    await menu.click();
    assert.equal(await menu.getAttribute("aria-expanded"), "true");
    await page.keyboard.press("Escape");
    assert.equal(await menu.getAttribute("aria-expanded"), "false");
    const map = page.getByRole("link", {
      name: "Ampliar mapa del cerro San Cristóbal",
    });
    await map.focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator("dialog").evaluate((d) => d.open), true);
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("dialog").evaluate((d) => d.open), false);
    assert(
      await map.evaluate((el) => document.activeElement === el),
      "modal focus returns",
    );
    await page
      .getByRole("link", {
        name: "Ampliar mapa de la expresión territorial de la dictadura",
        exact: true,
      })
      .click();
    await page.getByRole("button", { name: "Cerrar visor" }).click();
    assert.equal(await page.locator("dialog").evaluate((d) => d.open), false);
    await page.locator("summary").first().click();
    assert.equal(
      await page.locator("details").first().getAttribute("open"),
      "",
    );
    await menu.click();
    await page.getByRole("link", { name: "Conversemos" }).click();
    await page.waitForURL("**/#contacto");
    assert(await page.locator("#contacto").isVisible());
    let submits = 0;
    await page.route("https://formspree.io/**", async (route) => {
      submits++;
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: "{}",
      });
    });
    await page.getByRole("button", { name: "Enviar mensaje" }).click();
    assert.equal(submits, 0, "native validation blocks empty form");
    await page.getByLabel("Nombre", { exact: true }).fill("Prueba local");
    await page.getByLabel("Correo electrónico").fill("prueba@example.com");
    await page
      .getByLabel("Cuéntame sobre tu proyecto")
      .fill("Mensaje de prueba que no se envía.");
    await page.getByRole("button", { name: "Enviar mensaje" }).click();
    await page.waitForFunction(() =>
      document.querySelector("#form-status").textContent.includes("No pudimos"),
    );
    assert.equal(await page.locator("#name").inputValue(), "Prueba local");
    await page.unroute("https://formspree.io/**");
    await page.route("https://formspree.io/**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: '{"ok":true}',
      }),
    );
    await page.getByRole("button", { name: "Enviar mensaje" }).click();
    await page.waitForFunction(() =>
      document.querySelector("#form-status").textContent.includes("Gracias"),
    );
    assert.equal(await page.locator("#name").inputValue(), "");
    const nojs = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const plain = await nojs.newPage();
    await plain.goto(base + "/maps.html");
    assert(await plain.getByRole("link", { name: "Conversemos" }).isVisible());
    assert(
      (
        await plain.locator(".map-preview").first().getAttribute("href")
      ).endsWith(".png"),
    );
    await nojs.close();
    await page.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
      "auto",
    );
    console.log(
      JSON.stringify(
        {
          errors,
          badResponses,
          accessibility: accessibility.filter((a) => a.violations.length),
        },
        null,
        2,
      ),
    );
    assert.equal(errors.length, 0);
    assert.equal(badResponses.length, 0);
    assert.equal(
      accessibility.filter((a) => a.violations.length).length,
      0,
      "accessibility violations",
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
