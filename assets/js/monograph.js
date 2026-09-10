(() => {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) entry.target.classList.toggle('motion-in-view', entry.isIntersecting);
  });
  document.querySelectorAll('.atlas-hero, #cursos').forEach(section => observer.observe(section));
  const control = document.querySelector('.cover-zoom');
  if (!control) return;
  control.hidden = false;
  const input = control.querySelector('input');
  const image = document.querySelector('.cover-map-window img');
  input.addEventListener('input', () => image.style.setProperty('--map-zoom', input.value));
})();
