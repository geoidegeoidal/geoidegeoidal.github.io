(() => {
  const image = document.querySelector('#case-map');
  const controls = document.querySelector('.view-buttons');
  const reset = document.querySelector('#reset-map');
  const observations = {
    norte: {name:'Santiago norte', x:50, y:26, zoom:1.85, text:'En el norte puedes comparar la continuidad de las áreas alrededor de Conchalí con los grupos separados que aparecen hacia Huechuraba. La propia lámina permite seguir esas diferencias.'},
    centro: {name:'Santiago centro', x:48, y:46, zoom:1.9, text:'En el sector central, varias áreas de acceso se encuentran. Sigue los colores entre Santiago, Estación Central y las comunas vecinas: la división comunal no interrumpe una caminata.'},
    sur: {name:'Santiago sur', x:57, y:72, zoom:1.8, text:'La Pintana, Puente Alto y San Bernardo ocupan una gran extensión en la lámina. Mira los bordes de las áreas coloreadas y su relación con la ciudad que queda fuera de ellas.'}
  };
  const original = document.querySelector('#view-observation').textContent;
  controls.hidden = false;
  function select(key) {
    const view = observations[key];
    controls.querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.view===key)));
    image.style.setProperty('--zoom',view?.zoom || 1);
    image.style.setProperty('--x',view ? `${50-view.x}%` : '0%');
    image.style.setProperty('--y',view ? `${50-view.y}%` : '0%');
    document.querySelector('#view-name').textContent = view?.name || 'Santiago completo';
    document.querySelector('#view-observation').textContent = view?.text || original;
    image.alt = view ? `Detalle ampliado de ${view.name.toLowerCase()} en la cartografía de ferias de Jorge Ulloa.` : 'Lámina completa de acceso a ferias de Santiago, por Jorge Ulloa para ConMapas.';
    reset.hidden = !view;
  }
  controls.addEventListener('click',event=>{const button=event.target.closest('button[data-view]');if(button)select(button.dataset.view)});
  reset.addEventListener('click',()=>{select(null);controls.querySelector('button').focus({preventScroll:true})});
})();
