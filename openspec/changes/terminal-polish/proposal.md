## Why
La consola funciona, pero su bienvenida deja demasiado vacío, las pistas dependen solo de la carpeta y el autocompletado superpone texto. El usuario pide una terminal cuidada que cualquiera pueda usar sin perderse.
## What Changes
- Sesión más compacta, prompt legible y jerarquía de archivos/resultados coherente.
- Pistas por contenido leído, con propósito en lenguaje cotidiano y comando visible; ocultables para usuarios expertos.
- Autocompletado seleccionable sin superposición, errores con recuperación y ayuda ejecutable desde cualquier carpeta.
- cd -, atajos de edición y foco que no abre el teclado móvil al explorar con botones.
- Sin cambiar catálogo, portada ni acceso antiguo; sin shell real, dependencias o persistencia nueva.
## Capabilities
### New Capabilities
- `terminal-guidance`: orientación contextual y sesión accesible.
## Impact
terminal.html, terminal.css/js, pruebas de consola y documentación de diseño. Mantener compatibilidad de comandos, archivos y consultas.
