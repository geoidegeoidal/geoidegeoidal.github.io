## Why
El propietario pide más personalidad de terminal en bienvenida y respuestas, con animación sutil y sin esperas ni barreras para quien no conoce comandos.
## What Changes
- Bienvenida de sesión con monograma ASCII de Jorge y voz personal, manteniendo el contenido legible desde el inicio.
- Respuestas y estado describen la operación real: archivo leído, carpeta y elementos disponibles; errores conservan recuperación guiada.
- Un gesto inicial de 560ms y confirmación de comando de 240ms, sin ocultar contenido ni retrasar ejecución.
## Capabilities
### New Capabilities
- terminal-personality: bienvenida y feedback accesibles sin latencia artificial.
## Impact
terminal.html, assets/css/terminal.css, assets/js/terminal.js, pruebas y documentación. Reutilizar motor, datos, controles de movimiento y pistas; sin dependencias nuevas. Portada clásica intacta.
