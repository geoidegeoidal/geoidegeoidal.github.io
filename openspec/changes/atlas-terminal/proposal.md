## Why

El portafolio une cartografía, código y formación. Dos recorridos explorables harán visible esa combinación, permitiendo descubrir evidencia profesional dentro de un mundo RPG y desde una consola cartográfica.

## What Changes

- Añadir `/explorar.html` con cinco destinos, personaje recorrible y acceso directo al contenido.
- Añadir `/terminal.html` con comandos locales, sugerencias pulsables y resultados verificables.
- Compartir selección de destino/proyecto mediante URLs; conservar la vista clásica y sus rutas.
- Incorporar accesos desde la portada, ilustración original y pruebas de teclado, móvil, seguridad y movimiento reducido.

## Capabilities

### New Capabilities
- `portfolio-expedition`: explorar la trayectoria y los proyectos por mapa o terminal.

### Modified Capabilities
Ninguna.

## Impact

Jekyll/Liquid, HTML, CSS y JavaScript nativo. Se reutiliza `_data/projects.json` y se extrae la trayectoria existente para compartirla. Sin servicios nuevos, dependencias de producción ni cambios al formulario. GitHub Pages continúa publicando desde main; desarrollo en `feat/atlas-terminal`.
