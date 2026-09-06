(() => {
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const toggle = document.querySelector(".motion-toggle");
  let paused = false;
  try {
    paused = localStorage.getItem("portfolio-motion") === "off";
  } catch {}
  const motionAllowed = () => !paused && !reduced.matches;
  function syncMotion() {
    root.dataset.motion = motionAllowed() ? "on" : "off";
    toggle.hidden = false;
    toggle.disabled = reduced.matches;
    toggle.setAttribute("aria-pressed", String(!motionAllowed()));
    toggle.querySelector(".motion-label").textContent = reduced.matches
      ? "Movimiento reducido"
      : paused
        ? "Activar movimiento"
        : "Pausar movimiento";
    toggle.querySelector(".motion-symbol").textContent = motionAllowed()
      ? "Ⅱ"
      : "▷";
    document.dispatchEvent(new Event("portfolio:motion"));
  }
  toggle.addEventListener("click", () => {
    paused = !paused;
    try {
      localStorage.setItem("portfolio-motion", paused ? "off" : "on");
    } catch {}
    syncMotion();
  });
  reduced.addEventListener("change", syncMotion);

  // Keep the heading's actual text/markup intact, and mask only each visual line.
  document.querySelectorAll("h1").forEach((heading) => {
    const lines = heading.innerHTML.split(/<br\s*\/?\s*>/i);
    heading.replaceChildren(
      ...lines.map((markup, index) => {
        const line = document.createElement("span");
        line.className = "title-line";
        line.style.setProperty("--line", index);
        const text = document.createElement("span");
        text.innerHTML = markup;
        line.append(text);
        return line;
      }),
    );
  });

  const candidates = document.querySelectorAll(
    ".section-heading, .about>div, .map-story-heading, .terrain-scene, .project-card, .experience-heading, .timeline li, .skill-group, .contact>div, .contact form, .map-card, .code-card, .post-card, .note-panel",
  );
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px 24px 0px" },
    );
    candidates.forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${(index % 2) * 90}ms`);
      observer.observe(element);
    });
  }

  let scrollFrame = 0;
  const header = document.querySelector(".site-header");
  function updateScroll() {
    scrollFrame = 0;
    const total = document.documentElement.scrollHeight - innerHeight;
    root.style.setProperty(
      "--read-progress",
      total > 0 ? Math.min(1, scrollY / total) : 0,
    );
    header.classList.toggle("is-scrolled", scrollY > 20);
  }
  addEventListener(
    "scroll",
    () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
    },
    { passive: true },
  );
  addEventListener("resize", updateScroll, { passive: true });
  updateScroll();

  const mapLink = document.querySelector(".terrain-scene");
  if (mapLink) {
    document.querySelector(".map-switch").hidden = false;
    const original = mapLink.querySelector("img").src;
    document.querySelectorAll("[data-map]").forEach((button) => {
      button.addEventListener("click", () => {
        const relief = button.dataset.map === "relieve";
        document
          .querySelectorAll("[data-map]")
          .forEach((item) =>
            item.setAttribute("aria-pressed", String(item === button)),
          );
        mapLink.querySelector("img").src = relief
          ? original
          : original.replace("conmapas.webp", "impacto_dictadura.webp");
        mapLink.querySelector("img").alt = relief
          ? "Curvas de nivel del cerro San Cristóbal"
          : "Cartografía del impacto de la dictadura en Santiago";
        mapLink.querySelector("h3").textContent = relief
          ? "Cerro San Cristóbal"
          : "Memoria en Santiago";
        mapLink.querySelector(".map-caption p").textContent = relief
          ? "Curvas de nivel · ALOS PALSAR"
          : "Territorio y memoria · ConMapas";
        mapLink.querySelector(".map-label").textContent = relief
          ? "CONMAPAS / ESTUDIO DEL RELIEVE"
          : "CONMAPAS / TERRITORIO Y MEMORIA";
        mapLink.href =
          mapLink.href.split("#")[0] +
          (relief ? "#san-cristobal" : "#memoria-territorial");
        mapLink.setAttribute(
          "aria-label",
          relief
            ? "Explorar la cartografía del cerro San Cristóbal"
            : "Explorar la cartografía de memoria en Santiago",
        );
      });
    });
  }

  root.classList.toggle("tab-hidden", document.hidden);
  document.addEventListener("visibilitychange", () => {
    root.classList.toggle("tab-hidden", document.hidden);
    document.dispatchEvent(new Event("portfolio:motion"));
  });

  const scene = document.querySelector("[data-atlas]");
  if (scene)
    initAtlas(scene).catch(() => {
      // The pre-rendered, geographic SVG remains visible when data/Canvas fail.
      scene.classList.remove("is-ready");
      scene.querySelector("canvas").hidden = true;
      scene.querySelector(".atlas-controls").hidden = true;
    });

  async function initAtlas(scene) {
    const canvas = scene.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const response = await fetch(scene.dataset.source);
    if (!response.ok) throw new Error("Atlas unavailable");
    const atlas = await response.json();
    const rad = Math.PI / 180;
    const vector = ([lon, lat]) => [
      Math.cos(lat * rad) * Math.sin(lon * rad),
      Math.sin(lat * rad),
      Math.cos(lat * rad) * Math.cos(lon * rad),
    ];
    const rings = atlas.rings.map((ring) => ring.map(vector));
    const land = atlas.dots.map(vector);
    const chile = atlas.chile.map((ring) => ring.map(vector));
    const grids = [];
    for (let lat = -60; lat <= 60; lat += 30)
      grids.push(
        Array.from({ length: 181 }, (_, i) => vector([i * 2 - 180, lat])),
      );
    for (let lon = -180; lon < 180; lon += 30)
      grids.push(
        Array.from({ length: 91 }, (_, i) => vector([lon, i * 2 - 90])),
      );
    const origin = -68 * rad;
    let longitude = origin,
      target = origin,
      visible = true;
    let frame = 0,
      last = 0,
      tick = 0,
      size = 700,
      radius = 300;
    let dragging = false,
      previousX = 0;
    const latitude = -18 * rad;
    const cp = Math.cos(latitude),
      sp = Math.sin(latitude);
    const location = scene.querySelector(".atlas-location");
    function resize() {
      size = scene.querySelector(".atlas-stage").clientWidth;
      radius = size * 0.405;
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render();
    }
    function render() {
      ctx.clearRect(0, 0, size, size);
      const center = size / 2;
      const angle = longitude;
      const ca = Math.cos(angle),
        sa = Math.sin(angle);
      const project = ([x, y, z]) => {
        const depth = x * sa + z * ca;
        return [
          center + radius * (x * ca - z * sa),
          center - radius * (y * cp - depth * sp),
          y * sp + depth * cp,
        ];
      };
      const gradient = ctx.createRadialGradient(
        center - radius * 0.4,
        center - radius * 0.4,
        0,
        center,
        center,
        radius * 1.15,
      );
      gradient.addColorStop(0, "#426a60");
      gradient.addColorStop(0.55, "#163c34");
      gradient.addColorStop(1, "#0d211c");
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = "rgba(160,170,186,.38)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
      function drawPaths(paths, color, width) {
        ctx.beginPath();
        for (const path of paths) {
          let pen = false;
          for (const point of path) {
            const [x, y, z] = project(point);
            if (z <= 0) {
              pen = false;
              continue;
            }
            if (pen) ctx.lineTo(x, y);
            else ctx.moveTo(x, y);
            pen = true;
          }
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
      }
      drawPaths(grids, "rgba(198,221,191,.23)", 0.65);
      drawPaths(rings, "rgba(223,235,201,.68)", 0.65);
      const bins = Array.from({ length: 5 }, () => []);
      for (const point of land) {
        const p = project(point);
        if (p[2] > 0) bins[Math.min(4, Math.floor(p[2] * 5))].push(p);
      }
      bins.forEach((points, index) => {
        ctx.beginPath();
        for (const [x, y] of points) {
          ctx.moveTo(x + 1.1, y);
          ctx.arc(x, y, (size / 700) * 0.95, 0, Math.PI * 2);
        }
        ctx.fillStyle = `rgba(221,237,190,${0.16 + index * 0.12})`;
        ctx.fill();
      });
      drawPaths(chile, "rgba(255,146,88,1)", 1.3);
      const [px, py, pz] = project(vector([-70.65, -33.45]));
      if (pz > 0) {
        const pulse = 1 + (Math.sin(tick * 0.0015) + 1) * 0.5;
        ctx.beginPath();
        ctx.arc(px, py, 8 + pulse * 3, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,146,88,.65)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(px, py, 3.3, 0, Math.PI * 2);
        ctx.fillStyle = "#ff9258";
        ctx.fill();
      }
      scene.dataset.longitude = (
        ((((longitude / rad + 180) % 360) + 360) % 360) -
        180
      ).toFixed(1);
    }
    function animate(now) {
      frame = 0;
      if (!motionAllowed() || !visible || document.hidden) return;
      if (now - last >= (size < 500 ? 50 : 33)) {
        const elapsed = Math.min(now - last, 100);
        last = now;
        tick += elapsed;
        if (!dragging) target += elapsed * 0.000075; // One full rotation in about 84 seconds.
        longitude += (target - longitude) * 0.12;
        render();
      }
      frame = requestAnimationFrame(animate);
    }
    function schedule() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (motionAllowed() && visible && !document.hidden)
        frame = requestAnimationFrame(animate);
      else {
        render();
      }
    }
    function orient(delta, reset = false) {
      target = reset
        ? longitude +
          Math.atan2(Math.sin(origin - longitude), Math.cos(origin - longitude))
        : target + delta * rad;
      if (reset) tick = 0;
      location.textContent = reset
        ? "Chile · América del Sur"
        : "Exploración global";
      if (!motionAllowed()) {
        longitude = target;
        render();
      } else schedule();
    }
    scene
      .querySelectorAll("[data-turn]")
      .forEach((button) =>
        button.addEventListener("click", () =>
          orient(Number(button.dataset.turn)),
        ),
      );
    scene
      .querySelector("[data-reset]")
      .addEventListener("click", () => orient(0, true));
    canvas.addEventListener("pointerdown", (event) => {
      if (!event.isPrimary || event.button !== 0) return;
      dragging = true;
      previousX = event.clientX;
      canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      orient((previousX - event.clientX) * 0.25);
      previousX = event.clientX;
    });
    function endDrag() {
      dragging = false;
    }
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    document.addEventListener("portfolio:motion", schedule);
    if ("IntersectionObserver" in window)
      new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          schedule();
        },
        { threshold: 0 },
      ).observe(scene);
    if ("ResizeObserver" in window)
      new ResizeObserver(resize).observe(scene.querySelector(".atlas-stage"));
    else addEventListener("resize", resize, { passive: true });
    canvas.hidden = false;
    scene.querySelector(".atlas-controls").hidden = false;
    scene.classList.add("is-ready");
    resize();
    schedule();
  }
  syncMotion();
})();
