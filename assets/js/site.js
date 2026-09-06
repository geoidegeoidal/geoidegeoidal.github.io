// Progressive enhancement: links, map originals and the form work without JS.
document.documentElement.classList.add("js");
const menu = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
menu.hidden = false;
function closeMenu() {
  menu.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}
menu.addEventListener("click", () => {
  const expanded = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(expanded));
  navigation.classList.toggle("is-open", expanded);
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menu.focus();
  }
});

const dialog = document.querySelector(".image-dialog");
if (dialog && typeof dialog.showModal === "function") {
  const picture = document.querySelector("#dialog-image");
  document.querySelectorAll("[data-map-title]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
        return;
      event.preventDefault();
      document.querySelector("#dialog-title").textContent =
        link.dataset.mapTitle;
      picture.src = link.href;
      picture.alt = link.querySelector("img").alt;
      document.querySelector("#dialog-original").href = link.href;
      dialog.showModal();
    });
  });
  dialog
    .querySelector(".dialog-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom)
    )
      dialog.close();
  });
}

const form = document.querySelector("#contacto form");
if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submit = form.querySelector('[type="submit"]');
    const status = document.querySelector("#form-status");
    submit.disabled = true;
    status.textContent = "Enviando tu mensaje…";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Form submission failed");
      status.textContent = "Gracias. Tu mensaje se envió correctamente.";
      form.reset();
    } catch {
      status.textContent =
        "No pudimos confirmar el envío. Tus datos siguen aquí; puedes reintentar o escribirme por correo.";
    } finally {
      clearTimeout(timeout);
      submit.disabled = false;
    }
  });
}
