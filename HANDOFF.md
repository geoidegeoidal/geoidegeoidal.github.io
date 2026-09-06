# Handoff

## 2026-09-05 — Experiencia cartográfica animada

**Objetivo:** elevar el impacto visual con animaciones, conservando secciones y completar commit, push y deploy ya autorizados.

**Completado:** nueva portada tipográfica con globo Canvas de geografía real, Chile destacado, arrastre, botones de orientación y SVG alternativo; cartografía original en una sección editorial propia; entradas por scroll, títulos animados, relieve con puntero, progreso de lectura, transiciones y microinteracciones en todas las páginas. Pausa persistente y respeto del movimiento reducido. Sin dependencias de producción nuevas.

**Decisiones:** Natural Earth local y documentado; DPR 1.5 y 30/20 FPS; suspender dibujo fuera de pantalla y en segundo plano. Se corrigió la recuperación de animaciones al volver a la pestaña y se preservó la orientación al pausar. Esta petición reemplaza la anterior decisión de retirar todas las animaciones continuas.

**Validación:** build Jekyll real y comprobación de 6 páginas; 24 combinaciones de página/ancho, axe A/AA sin hallazgos automáticos; prueba específica de animación, pausa, persistencia, teclado, arrastre, reinicio, suspensión y fallbacks aprobada. Revisión independiente completada y hallazgo corregido. Capturas en ../outputs.

**Bloqueos:** ninguno. No se enviaron formularios reales. **Próximos pasos:** publicar esta revisión y verificar Pages; las mejoras editoriales de casos de estudio y repositorios siguen pendientes de contenido del propietario.

**Commits relevantes:** base 6157318; consultar git log para el commit de esta ampliación.


## 2026-09-05 — Publicación autorizada y verificada

**Objetivo:** completar commit, push y deploy, solicitados explícitamente por el propietario al final del rediseño.

**Completado:** commit de implementación 7d64e18871e93599b69e47b3c6c9100f82698a1e, push a origin/main y despliegue GitHub Pages exitoso (run 34006594706). El build remoto reportó built, sin errores. Se verificaron en producción Bio, Mapas, Código, Blog, artículo y 404: contenido nuevo, fondo correcto, imágenes disponibles y sin errores JavaScript. URL pública: https://geoidegeoidal.github.io/.

**Decisiones y entorno:** se conservó Pages legacy desde main, carpeta raíz. El push autenticado requirió una excepción safe.directory para esta ruta, limitada al comando por la diferencia de propietario entre sandbox y usuario; no se modificó la configuración global. El presente cierre documental se registra en un commit posterior, sin cambios en el sitio servido.

**Bloqueos:** ninguno. Formspree solo se probó con respuestas simuladas; no se enviaron mensajes reales.

**Próximos pasos:** desarrollar casos de estudio con evidencia, publicar y enlazar los dos repositorios pendientes, validar vigencia del perfil y añadir CV proporcionado por el propietario. Propuestas y capturas en ../outputs/mejoras-portafolio.md.

**Commits relevantes:** 767a422 (base), 7d64e18 (rediseño publicado); consultar git log para el commit de este cierre documental.


## 2026-09-05 — Rediseño Mapbox del portafolio

**Objetivo:** rediseñar el sitio según la segunda referencia del usuario (Mapbox), conservar las secciones y proponer mejoras profesionales. La referencia Dala anterior fue reemplazada.

**Completado:** Bio, Mapas, Código, Blog y layout de artículos rediseñados; tipografía DM Sans local con licencia; tokens oscuros y CTA azul; navegación adaptable con página activa; contacto accesible desde todas las páginas; galería con dialog nativo, Escape, retorno de foco, fichas y enlaces a originales; formulario progresivo con estados de éxito/error y conservación de datos; repositorios de relleno convertidos en estados explícitos de publicación pendiente; fuentes e imágenes optimizadas; metadatos, favicon, RSS, sitemap, robots y 404; documentación y pruebas reproducibles. Se conservó la información profesional y se restauraron los roles específicos de fundador/responsable/líder. Retirados efectos neón, animaciones continuas y juego oculto.

**Decisiones:** conservar Jekyll y GitHub Pages, sin framework ni dependencias JS de producción; código de test opcional en tests/. Originales PNG intactos, vistas WebP (~87% menos bytes). CTA 19 px/700 para contraste AA. No añadir cifras, capturas de otros sitios, enlaces de repositorios inventados ni CV inexistente. Mapas a tamaño completo en galería; recorte solo en hero.

**Validación:** Jekyll 3.10 y jekyll-feed 0.17 compilaron raíz y baseurl /portfolio. Verificador Python pasó en ambas variantes (6 páginas). Auditoría Playwright/axe: 24 combinaciones página/ancho (320, 390, 768, 1440), sin errores JS, respuestas locales fallidas ni violaciones automáticas WCAG A/AA en 390 y 1440. Probados menú, Escape, visor, retorno del foco, fichas, contacto entre páginas, validación y envíos simulados de Formspree, modo sin JS y movimiento reducido. Revisión independiente detectó contraste móvil y pérdida de autoría; ambos corregidos.

**Entorno:** el equipo se apagó durante la sesión; todos los cambios se recuperaron. Ruby y herramientas temporales viven fuera del repo, en ../work. Faltaba DevKit para instalar extensiones de servidor de Jekyll; se verificó el generador real mediante su API Ruby con dependencias de compilación estática. El sandbox Windows devolvía globs absolutos vacíos: ../work/build-jekyll.rb usa un adaptador de rutas equivalente, exclusivo de las pruebas, sin modificar Jekyll ni el sitio. El flujo estándar bundle install requiere Ruby + DevKit en Windows. No se necesita ese adaptador en GitHub Pages.

**Vista previa:** servidor local del build real en http://127.0.0.1:4174, directorio ../work/jekyll-site. Si se detiene: python -m http.server 4174 --bind 127.0.0.1 --directory ../work/jekyll-site (desde el repo). Capturas y propuestas están en ../outputs.

**Bloqueos:** ninguno para el rediseño local. Recepción real de Formspree no verificada (no se enviaron mensajes). Los repositorios de Análisis de incendios y Spatial SQL Scripts necesitan URLs del propietario. Revisar vigencia de cifras/cargo antes de publicar.

**Próximos pasos propuestos:** aprobación visual por el propietario; desarrollar casos de estudio de EcoMaps e IDE-MMA, enlazar repositorios reproducibles, respaldar el resultado del 50% de SERVEL y añadir CV validado. Ver ../outputs/mejoras-portafolio.md.

**Commits:** base 767a422 (Update maps.html), rama main. Sin commits nuevos, push ni despliegue; cambios locales sin confirmar.
