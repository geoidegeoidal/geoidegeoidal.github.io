(() => {
  const control = document.querySelector('.cover-zoom');
  if (!control) return;
  control.hidden = false;
  const input = control.querySelector('input');
  const image = document.querySelector('.cover-map-window img');
  input.addEventListener('input', () => image.style.setProperty('--map-zoom', input.value));
})();
