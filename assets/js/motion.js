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
    const maps = {
      relieve: ["conmapas.webp", "Cerro San Cristóbal", "Curvas de nivel · ALOS PALSAR", "san-cristobal"],
      memoria: ["impacto_dictadura.webp", "Memoria en Santiago", "Territorio y memoria · ConMapas", "memoria-territorial"],
      ferias: ["conmapas-social/ferias-santiago.jpg", "¿La feria queda a quince minutos?", "Accesibilidad peatonal · ConMapas", "conmapas-ferias"],
      micheladas: ["conmapas-social/vida-cotidiana.jpg", "La ciudad a pie", "Caminatas y micheladas · ConMapas", "conmapas-micheladas"],
      ipec: ["conmapas-social/infidelidad-santiago-view.jpg", "Un índice para abrir conversación", "IPEC · Exploración territorial, no conductas individuales", "conmapas-ipec"],
    };
    let selection = 0;
    let transition;
    const status = document.createElement("p");
    status.className = "map-load-status";
    status.setAttribute("role", "status");
    document.querySelector(".map-switch").after(status);
    document.addEventListener("portfolio:motion", () => {
      if (!motionAllowed()) transition?.cancel();
    });
    document.querySelectorAll("[data-map]").forEach((button) => {
      const thumbnail = document.createElement("img");
      thumbnail.src = new URL(maps[button.dataset.map][0], original).href;
      thumbnail.alt = "";
      thumbnail.loading = "lazy";
      thumbnail.width = 120;
      thumbnail.height = 100;
      button.prepend(thumbnail);
      button.addEventListener("click", async () => {
        const request = ++selection;
        const [file, title, caption, anchor] = maps[button.dataset.map];
        status.textContent = "Cargando cartografía…";
        const image = new Image();
        image.src = new URL(file, original).href;
        try {
          await image.decode();
        } catch {
          if (request === selection) status.textContent = "No se pudo cargar. Vuelve a seleccionar el mapa para reintentar.";
          return;
        }
        if (request !== selection) return;
        transition?.cancel();
        mapLink.classList.toggle("is-poster", file.startsWith("conmapas-social/"));
        document.querySelectorAll("[data-map]").forEach((item) =>
          item.setAttribute("aria-pressed", String(item === button)),
        );
        mapLink.querySelector("img").src = new URL(file, original).href;
        mapLink.querySelector("img").alt = title + " · Cartografía de Jorge Ulloa para ConMapas";
        mapLink.querySelector("h3").textContent = title;
        mapLink.querySelector(".map-caption p").textContent = caption;
        mapLink.querySelector(".map-label").textContent = "CONMAPAS / " + button.textContent;
        mapLink.href = mapLink.href.split("#")[0] + "#" + anchor;
        mapLink.setAttribute("aria-label", "Explorar cartografía: " + title);
        status.textContent = title;
        if (motionAllowed()) transition = mapLink.querySelector("img").animate(
          [{ clipPath: "inset(0 100% 0 0)", opacity: .4, transform: "scale(1.035)" }, { clipPath: "inset(0 0% 0 0)", opacity: 1, transform: "scale(1)" }],
          { duration: 620, easing: "cubic-bezier(.22,1,.36,1)" },
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
      scene.querySelector("[data-locate]").hidden = true;
      scene.querySelector("[data-location-status]").hidden = true;
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
    let latitude = -18 * rad,
      targetLatitude = latitude;
    let marker = vector([-70.65, -33.45]);
    const locationLabel = scene.querySelector("[data-atlas-label]");
    const locateButton = scene.querySelector("[data-locate]");
    const locateLabel = scene.querySelector("[data-locate-label]");
    const locationStatus = scene.querySelector("[data-location-status]");
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
      const cp = Math.cos(latitude),
        sp = Math.sin(latitude);
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
      gradient.addColorStop(0, "#285c61");
      gradient.addColorStop(0.55, "#14373d");
      gradient.addColorStop(1, "#121b20");
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
      drawPaths(grids, "rgba(116,191,184,.28)", 0.65);
      drawPaths(rings, "rgba(166,219,205,.72)", 0.65);
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
        ctx.fillStyle = `rgba(166,219,205,${0.16 + index * 0.12})`;
        ctx.fill();
      });
      drawPaths(chile, "rgba(214,222,89,1)", 1.3);
      const [px, py, pz] = project(marker);
      if (pz > 0) {
        const pulse = motionAllowed()
          ? 1 + (Math.sin(tick * 0.0015) + 1) * 0.5
          : 1.5;
        ctx.beginPath();
        ctx.arc(px, py, 8 + pulse * 3, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(232,141,66,.8)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(px, py, 3.3, 0, Math.PI * 2);
        ctx.fillStyle = "#e88d42";
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
        latitude += (targetLatitude - latitude) * 0.12;
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
    function orient(delta) {
      target += delta * rad;
      if (!motionAllowed()) {
        longitude = target;
        render();
      } else schedule();
    }
    function finishLocate(message) {
      locationStatus.textContent = message;
      locateButton.disabled = false;
      locateButton.removeAttribute("aria-busy");
    }
    locationStatus.hidden = false;
    if ("geolocation" in navigator && isSecureContext) {
      locateButton.hidden = false;
      locateButton.addEventListener("click", () => {
        locateButton.disabled = true;
        locateButton.setAttribute("aria-busy", "true");
        locationStatus.textContent = "Solicitando tu ubicación…";
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            const desiredLongitude = coords.longitude * rad;
            const desiredLatitude = Math.max(
              -80 * rad,
              Math.min(80 * rad, coords.latitude * rad),
            );
            marker = vector([coords.longitude, coords.latitude]);
            target =
              longitude +
              Math.atan2(
                Math.sin(desiredLongitude - longitude),
                Math.cos(desiredLongitude - longitude),
              );
            targetLatitude = desiredLatitude;
            tick = 0;
            scene.dataset.visitorLocation = "shown";
            locationLabel.textContent = "Estás aquí · planeta Tierra";
            locateLabel.textContent = "Actualizar mi ubicación";
            canvas.setAttribute(
              "aria-label",
              "Globo ortográfico explorable con tu ubicación marcada",
            );
            if (!motionAllowed()) {
              longitude = target;
              latitude = targetLatitude;
              render();
            } else schedule();
            finishLocate("Ubicación marcada · no se guarda");
          },
          (error) => {
            const message =
              error.code === error.PERMISSION_DENIED
                ? "Permiso no concedido · puedes seguir explorando"
                : "No pudimos obtener tu ubicación · inténtalo otra vez";
            finishLocate(message);
          },
          { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
        );
      });
    } else {
      locationStatus.textContent = "La ubicación no está disponible en este navegador";
    }
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
    scene.classList.add("is-ready");
    resize();
    schedule();
  }
  syncMotion();
})();
