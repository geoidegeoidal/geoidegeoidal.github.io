(() => {
  "use strict";
  const root = document.querySelector(".expedition");
  if (!root) return;
  const places = [...document.querySelectorAll('template[id^="place-"]')];
  const projects = [...document.querySelectorAll('template[id^="project-"]')];
  const placeIds = places.map(t => t.id.slice(6));
  const projectIds = projects.map(t => t.id.slice(8));
  const detail = document.querySelector("#place-detail");
  const traveler = document.querySelector(".exp-traveler");
  const board = document.querySelector(".exp-map");
  const output = document.querySelector("#console-output");
  const input = document.querySelector("#console-input");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const status = document.querySelector("#exp-status");
  const history = [];
  let historyIndex = 0;
  let savedDraft = "";
  let currentPlace = "puerto";
  let currentProject = "";
  let travel;
  const commands = ["ayuda", "perfil", "proyectos", "proyectos ambiente", "proyectos codigo", "trayectoria", "habilidades", "formacion", "contacto", "mapa", "terminal", "limpiar", ...projectIds.map(id => `abrir ${id}`), ...placeIds.map(id => `ir ${id}`)];
  const normalize = text => text.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ");
  const clone = id => document.getElementById(id).content.cloneNode(true);
  const placeOf = id => places.find(t => [...t.content.querySelectorAll("[data-project]")].some(b => b.dataset.project === id))?.id.slice(6) || "taller";

  function syncLinks() {
    root.querySelectorAll("[data-view]").forEach(link => {
      const url = new URL(link.href);
      url.searchParams.set("lugar", currentPlace);
      if (currentProject) url.searchParams.set("proyecto", currentProject);
      else url.searchParams.delete("proyecto");
      link.href = url.href;
    });
  }

  function writeLocation() {
    const url = new URL(location.href);
    url.searchParams.set("lugar", currentPlace);
    if (currentProject) url.searchParams.set("proyecto", currentProject);
    else url.searchParams.delete("proyecto");
    if (url.href !== location.href) window.history.pushState(null, "", url);
    syncLinks();
  }

  function moveTraveler(previous, next, animate) {
    if (!traveler) return;
    travel?.cancel();
    const a = places.find(t => t.id === `place-${previous}`).dataset;
    const b = places.find(t => t.id === `place-${next}`).dataset;
    traveler.style.left = `${b.x}%`;
    traveler.style.top = `${Number(b.y) + 3}%`;
    // ponytail: five stops share one junction; add a path graph if the world grows.
    if (animate && previous !== next && !reduced.matches && document.documentElement.dataset.motion !== "off" && !document.hidden) {
      travel = traveler.animate([
        { left: `${a.x}%`, top: `${Number(a.y) + 3}%` },
        { left: "43%", top: "51%", offset: .48 },
        { left: `${b.x}%`, top: `${Number(b.y) + 3}%` }
      ], { duration: 1100, easing: "ease-in-out" });
    }
  }

  function selectPlace(id, { record = true, animate = true } = {}) {
    if (!placeIds.includes(id)) return;
    const previous = currentPlace;
    currentPlace = id;
    currentProject = "";
    detail.replaceChildren(clone(`place-${id}`));
    const template = document.getElementById(`place-${id}`);
    document.querySelector("#place-counter").textContent = `${template.dataset.number} / 05`;
    root.querySelectorAll("[data-place]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.place === id)));
    if (status) status.textContent = `Destino: ${template.content.querySelector(".exp-place-name").textContent}. Contenido en el cuaderno de campo.`;
    moveTraveler(previous, id, animate);
    if (record) writeLocation();
    else syncLinks();
  }

  function showProject(id, { record = true } = {}) {
    if (!projectIds.includes(id)) return;
    selectPlace(placeOf(id), { record: false });
    currentProject = id;
    const back = document.createElement("button");
    back.type = "button";
    back.className = "exp-back";
    back.textContent = "Volver al destino";
    back.dataset.backPlace = currentPlace;
    detail.replaceChildren(back, clone(`project-${id}`));
    if (status) status.textContent = `${document.getElementById(`project-${id}`).dataset.name}, abierto en el cuaderno de campo.`;
    if (record) writeLocation();
    else syncLinks();
  }

  function restoreLocation() {
    const params = new URL(location.href).searchParams;
    const place = params.get("lugar");
    selectPlace(placeIds.includes(place) ? place : "puerto", { record: false, animate: false });
    const project = params.get("proyecto");
    if (projectIds.includes(project)) showProject(project, { record: false });
  }

  function say(parent, text) {
    const p = document.createElement("p");
    p.textContent = text;
    parent.append(p);
  }

  function commandButton(parent, text, command = text) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "exp-inline-command";
    button.dataset.command = command;
    button.textContent = text;
    parent.append(button);
  }

  function run(raw) {
    raw = raw.trim().slice(0, 160);
    if (!raw || !output) return;
    const command = normalize(raw);
    history.push(raw);
    if (history.length > 50) history.shift();
    historyIndex = history.length;
    savedDraft = "";
    if (input) input.value = "";
    if (command === "limpiar") {
      output.replaceChildren();
      say(output, "Consola despejada. Escribe ayuda o elige una sugerencia.");
      return;
    }
    const entry = document.createElement("section");
    entry.className = "exp-entry";
    const prompt = document.createElement("p");
    prompt.className = "exp-entry-command";
    prompt.textContent = `› ${raw}`;
    entry.append(prompt);
    const [verb, ...args] = command.split(" ");
    const argument = args.join(" ");
    if (command === "ayuda") {
      say(entry, "Elige una ruta. Puedes escribir estos comandos o pulsarlos:");
      const list = document.createElement("div");
      list.className = "exp-project-list";
      ["perfil", "proyectos", "proyectos ambiente", "abrir azimut", "trayectoria", "habilidades", "formacion", "contacto", "mapa", "limpiar"].forEach(c => commandButton(list, c));
      entry.append(list);
    } else if (command === "perfil") {
      selectPlace("puerto");
      entry.append(clone("place-puerto"));
    } else if (command === "trayectoria" || command === "cv") {
      selectPlace("puerto");
      entry.append(clone("exp-trajectory"));
    } else if (command === "habilidades") {
      entry.append(clone("exp-skills"));
    } else if (command === "formacion" || command === "cursos") {
      selectPlace("escuela");
      entry.append(clone("place-escuela"));
    } else if (command === "contacto") {
      say(entry, "¿Tienes datos por explorar, un mapa por construir o un equipo por formar?");
      const link = document.querySelector(".exp-contact").cloneNode(true);
      link.className = "";
      link.textContent = "Conversemos: abrir contacto";
      entry.append(link);
    } else if (verb === "proyectos" && (!argument || ["ambiente", "codigo", "--tema ambiente", "--tema codigo"].includes(argument))) {
      const filter = argument.endsWith("ambiente") ? ["retc-map"] : argument.endsWith("codigo") ? ["luz-rm", "azimut", "autoatlas-pro", "geocallejero"] : projectIds;
      say(entry, `${filter.length} proyectos. Pulsa uno para ver qué hace, cómo está construido y sus límites.`);
      const list = document.createElement("div");
      list.className = "exp-project-list";
      filter.forEach(id => commandButton(list, document.getElementById(`project-${id}`).dataset.name, `abrir ${id}`));
      entry.append(list);
    } else if (verb === "abrir") {
      const project = projectIds.find(id => normalize(id) === argument || normalize(document.getElementById(`project-${id}`).dataset.name) === argument);
      if (project) {
        showProject(project);
        entry.append(clone(`project-${project}`));
      } else {
        say(entry, "No encuentro ese proyecto. Usa proyectos para ver los nombres disponibles.");
        commandButton(entry, "proyectos");
      }
    } else if (verb === "ir" && placeIds.includes(argument)) {
      selectPlace(argument);
      entry.append(clone(`place-${argument}`));
    } else if (command === "mapa" || command === "terminal") {
      const link = root.querySelector(`[data-view="${command}"]`);
      if (command === root.dataset.mode) say(entry, "Ya estás aquí. Elige un proyecto o un destino para continuar.");
      else { location.assign(link.href); return; }
    } else {
      say(entry, "Ese comando no está disponible. Prueba ayuda para descubrir las rutas.");
      commandButton(entry, "ayuda");
    }
    // Keep a long visit bounded without persisting the visitor's input.
    while (output.children.length >= 30) output.firstElementChild.remove();
    output.append(entry);
    output.scrollTop = Math.max(0, entry.offsetTop - 20);
  }

  root.addEventListener("click", event => {
    const place = event.target.closest("[data-place]");
    const project = event.target.closest("[data-project]");
    const command = event.target.closest("[data-command]");
    const back = event.target.closest("[data-back-place]");
    if (place) selectPlace(place.dataset.place);
    if (project) {
      const fromNotebook = Boolean(project.closest("#place-detail"));
      if (output) run(`abrir ${project.dataset.project}`);
      else showProject(project.dataset.project);
      // Replacing a notebook button must retain focus in both experiences.
      if (fromNotebook) detail.querySelector(".exp-back").focus({ preventScroll: true });
    }
    if (command) run(command.dataset.command);
    if (back) {
      selectPlace(back.dataset.backPlace);
      const first = detail.querySelector("a, button");
      first?.focus({ preventScroll: true });
    }
  });

  board?.addEventListener("keydown", event => {
    if (event.target !== board) return;
    const direction = { ArrowLeft: [-1, 0], a: [-1, 0], ArrowRight: [1, 0], d: [1, 0], ArrowUp: [0, -1], w: [0, -1], ArrowDown: [0, 1], s: [0, 1] }[event.key];
    if (!direction) return;
    event.preventDefault();
    const origin = document.getElementById(`place-${currentPlace}`).dataset;
    const choices = places.map(t => ({ t, dx: Number(t.dataset.x) - Number(origin.x), dy: Number(t.dataset.y) - Number(origin.y) }))
      .filter(p => p.dx * direction[0] + p.dy * direction[1] > 0)
      .sort((a, b) => (Math.hypot(a.dx, a.dy) + Math.abs(a.dx * direction[1] - a.dy * direction[0])) - (Math.hypot(b.dx, b.dy) + Math.abs(b.dx * direction[1] - b.dy * direction[0])));
    if (choices.length) selectPlace(choices[0].t.id.slice(6));
  });

  if (input) {
    document.querySelector(".exp-welcome-routes").hidden = false;
    document.querySelector("#console-form").hidden = false;
    document.querySelector(".exp-suggestions").hidden = false;
    document.querySelector("#console-form").addEventListener("submit", event => { event.preventDefault(); run(input.value); });
    input.addEventListener("keydown", event => {
      if (event.key === "Escape") { input.value = ""; return; }
      if (event.key === "Tab" && !event.shiftKey && input.value.trim()) {
        const matches = commands.filter(c => c.startsWith(normalize(input.value)));
        if (matches.length === 1 && input.value !== matches[0]) { event.preventDefault(); input.value = matches[0]; }
      }
      if (["ArrowUp", "ArrowDown"].includes(event.key) && history.length) {
        event.preventDefault();
        if (historyIndex === history.length) savedDraft = input.value;
        historyIndex = Math.max(0, Math.min(history.length, historyIndex + (event.key === "ArrowUp" ? -1 : 1)));
        input.value = historyIndex === history.length ? savedDraft : history[historyIndex];
      }
    });
  }

  function stopTravel() { if (document.hidden || reduced.matches || document.documentElement.dataset.motion === "off") travel?.cancel(); }
  document.addEventListener("portfolio:motion", stopTravel);
  document.addEventListener("visibilitychange", stopTravel);
  reduced.addEventListener("change", stopTravel);
  addEventListener("popstate", restoreLocation);
  root.querySelectorAll("[data-place]").forEach(button => { button.hidden = false; });
  if (traveler) traveler.hidden = false;
  restoreLocation();
  if (output && currentProject) {
    const entry = document.createElement("section");
    entry.className = "exp-entry";
    say(entry, "Continúas explorando:");
    entry.append(clone(`project-${currentProject}`));
    output.append(entry);
  }
  const landscape = document.querySelector(".exp-landscape");
  const imageFailed = () => {
    if (status) status.textContent = "No se pudo cargar la ilustración. Los destinos y el cuaderno siguen disponibles.";
  };
  landscape?.addEventListener("error", imageFailed);
  if (landscape?.complete && !landscape.naturalWidth) imageFailed();
})();
