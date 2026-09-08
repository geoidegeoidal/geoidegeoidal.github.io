# Handoff

## 2026-09-08 — Ubicación voluntaria en el globo

**Objetivo:** retirar el panel de orientación del atlas y permitir que cada visitante se ubique en el globo.

**Completado:** eliminadas las flechas y la acción «Centrar en Chile». Se añadió una única acción editorial «Ubicarme en el globo» que solicita permiso al pulsarla, centra longitud y latitud y sustituye el marcador de Santiago por la posición obtenida. Estados de solicitud, éxito, rechazo, error, navegador incompatible y fallback cubiertos; el globo conserva giro automático, arrastre, pausa global y movimiento reducido.

**Decisiones:** usar exclusivamente la Geolocation API del navegador. Las coordenadas viven solo en memoria: no se solicitan al cargar, no se infieren por IP, no se guardan, no se transmiten y no se muestran como números. Mantener la cartografía operativa cuando el visitante no concede permiso.

**Validación:** builds Jekyll raíz y /portfolio; checker de seis páginas en ambas variantes; prueba de movimiento con ubicación simulada y permiso rechazado; 24 combinaciones página/ancho sin errores JavaScript, recursos fallidos ni hallazgos axe A/AA. Revisión visual del estado inicial y ubicado en escritorio, y de la portada móvil.

**Bloqueos:** ninguno. **Próximos pasos:** ninguno; cualquier analítica territorial de visitantes requeriría una decisión de privacidad y una infraestructura separada.

**Publicación:** commit a961646afbeeb0711f5fc2de470337481fac6512 enviado a main. GitHub Pages run 34269029223 terminó con éxito; la prueba completa de movimiento y geolocalización aprobó también contra producción.

**Commits relevantes:** base 939c92f; a961646 (ubicación en el globo publicada). Este cierre documental no modifica el sitio servido.

## 2026-09-08 — Cursos como práctica profesional y archivo ConMapas unificado

**Objetivo:** dar espacio a la oferta de cursos en la landing y corregir la relación entre ConMapas y las cartografías existentes.

**Completado:** nueva sección Cursos entre proyectos y ConMapas, con el Bootcamp Desarrollo Web Territorial con IA, tres módulos, CTA y evidencia de cohortes. Hero, índice, numeración y contacto actualizados para incluir docencia. maps.html se presenta ahora como Archivo ConMapas; San Cristóbal, Memoria y la selección por alcance se describen como series de una misma práctica editorial.

**Decisiones:** usar una superficie amarilla editorial para distinguir la docencia sin repetir tarjetas. Conservar fechas y precios dinámicos en la landing específica del curso. Mantener ConMapas como proyecto común, no como una categoría separada de esos mapas.

**Validación:** builds Jekyll raíz y /portfolio; checker de seis páginas en ambas variantes; 24 combinaciones página/ancho sin errores JS, recursos fallidos ni hallazgos axe A/AA. Prueba completa de movimiento y fallbacks. Revisión visual de Cursos y Archivo ConMapas en escritorio y móvil.

**Bloqueos:** ninguno. **Próximos pasos:** incorporar futuros cursos en esta misma práctica formativa y actualizar sus métricas solo con evidencia publicada.

**Publicación:** commit 01ebeb1ea008f199352c8962dbf617fced7423c3 enviado a main. GitHub Pages run 34266443248 terminó con éxito; producción mostró Cursos, sus métricas y el Archivo ConMapas unificado.

**Commits relevantes:** base 7f2e3e1; 01ebeb1 (cursos y archivo publicados). Este cierre documental no modifica el sitio servido.

## 2026-09-08 — Perfil profesional y cartografías de ConMapas

**Objetivo:** revisar LinkedIn y recuperar mapas de Instagram para enriquecer el portafolio.

**Completado:** bio con formación y enfoque público; consultoría MINCAP; precisión del logro colectivo de Servel; publicación científica enlazada en trayectoria y Blog; comunidad ConMapas actualizada a cifra aproximada y fechada. Inventario y ranking de las 353 publicaciones propias del perfil. Tres líderes con firma visible de Jorge recuperadas en alta resolución y presentadas con likes, contexto, créditos y enlaces. Informe en ../outputs/revision-linkedin-conmapas.md y ranking completo en ../outputs/conmapas-ranking-publico.csv.

**Decisiones:** acceso a LinkedIn mediante contenido público indexado porque navegador exige registro. Instagram revisado con la sesión iniciada por el propietario. Selección limitada a las tres publicaciones propias con más likes y autoría confirmada; colaboraciones, republicaciones y el mapa de invierno firmado por Eduardo Carvajal quedaron fuera. Mantener MMA y MINCAP vigentes tal como figuran; no inventar cese ni apariciones en medios sin enlaces. Publicación autorizada por la instrucción persistente de commit/push/deploy.

**Validación:** builds Jekyll raíz y /portfolio; checker de seis páginas en ambas variantes; 24 combinaciones página/ancho sin errores JS, recursos fallidos ni hallazgos axe A/AA; prueba completa de movimiento y fallbacks. Revisión visual de la selección a tres columnas en escritorio. Sin cambios de lógica del globo o formulario.

**Bloqueos:** no se dispone de archivos editables ni láminas interiores para construir casos de estudio completos. **Próximos pasos:** añadir metodología y proceso cuando existan esos materiales; verificar enlaces de apariciones en medios y fechas de término de cargos si corresponde.

**Publicación:** commit fc12cce0975b8c6972522fba7ee1018e65a0b273 enviado a main. GitHub Pages run 34264391297 terminó con éxito; la página pública mostró las tres piezas, métricas, imágenes y enlaces esperados.

**Commits relevantes:** base de95ea8; fc12cce (perfil y curaduría publicados). Este cierre documental no modifica el sitio servido.

## 2026-09-08 — Paleta ConMapas aprobada

**Objetivo:** aplicar la propuesta cromática aprobada por el propietario con «hazlo».

**Completado:** colores compartidos, portada, contacto, títulos, controles, globo Canvas, alternativa SVG, favicon y color del navegador actualizados. Conservados el recorrido de lectura y los colores originales de las cartografías.

**Decisiones:** carbón/papel para lectura; turquesa en contacto, amarillo en acciones, violeta editorial y naranja puntual. Enlaces y foco adaptados a superficies oscuras. Se mantiene la autorización previa de commit, push y deploy.

**Validación:** Jekyll y comprobador de seis páginas aprobados; 24 combinaciones de página/ancho sin errores JS, recursos fallidos ni hallazgos axe A/AA. Pruebas de movimiento, teclado, pausa, selector y fallbacks aprobadas. Revisión visual escritorio/móvil.

**Bloqueos:** ninguno. **Próximos pasos:** conservar esta paleta en futuras páginas y desarrollar los casos de estudio propuestos.

**Commits relevantes:** base e56cd5f; consultar el commit de esta entrada para la aplicación cromática.

## 2026-09-07 — Recorrido de lectura y propuesta cromática

**Objetivo:** mejorar lectura y orden lógico; proponer una paleta relacionada con ConMapas.

**Completado:** proyectos antes de cartografía; ConMapas junto a sus obras, separado de IEMA/IDE-MMA; perfil con funciones concretas; introducciones conectadas entre secciones; índice semántico de seis enlaces y numeración coherente. Conservadas todas las anclas previas y añadido #conmapas. Corregida capitalización en metadata de Código.

**Paleta propuesta, no aplicada:** carbón #121B20, papel #F3F0E7, turquesa #06766F, amarillo #D6DE59, violeta #783D9B y naranja #E88D42. Interpretación de las cartografías de relieve/memoria, no marca oficial. Muestra HTML/PNG y usos en ../outputs/paleta-conmapas.*. Contrastes previstos de texto entre 4.81:1 y 15.31:1.

**Validación:** Jekyll y checker de seis páginas; navegador en 24 combinaciones página/ancho sin errores JS, recursos fallidos ni hallazgos axe A/AA. Revisión visual de la nueva sección ConMapas. No cambia la lógica del globo ni formulario.

**Decisiones:** publicar la mejora de lectura con la autorización persistente de commit/push/deploy. Mantener la paleta actual hasta que el propietario decida sobre la propuesta.

**Bloqueos:** ninguno. **Próximos pasos:** decisión del propietario sobre la paleta y casos de estudio ya propuestos.

**Commits relevantes:** base 812f279; consultar git log para el cambio de recorrido.


## 2026-09-07 — Curaduría de los repositorios públicos

**Objetivo:** seleccionar proyectos por impacto entre todos los ámbitos del GitHub del propietario y aplicar la selección al portafolio.

**Completado:** inventario de 27 repositorios, README disponibles, árboles y archivos clave de candidatos; apertura de siete rutas de demos. Cuatro destacados (LUZ·RM, Azimut, AutoAtlas Pro, HuellaRETC); nueve entradas de Código y tres experimentos. Catálogo central en _data/projects.json, captura real LUZ·RM optimizada (99.6 KB), enlaces y notas de alcance. ConMapas, IEMA e IDE-MMA conservados. Retirados dos placeholders sin repo confirmado. Evaluación completa y mejoras por repositorio en ../outputs/curaduria-github.md.

**Decisiones:** no confundir README con validación de producto. AutoAtlas experimental; Azimut puede enviar consultas a servicios externos; HuellaRETC histórico. Marraquetómetro y HoloSynth enlazan al código porque las rutas Pages probadas devolvieron 404. No se modificó ningún repositorio ajeno al portafolio. No se ejecutaron plugins ni pipelines revisados.

**Validación:** Jekyll raíz y checker de 6 páginas aprobados; navegador en 24 combinaciones página/ancho sin errores JS, recursos fallidos ni hallazgos axe A/AA. Revisión visual escritorio/móvil completada. Revisión independiente intentada pero el agente no pudo continuar por límite de uso; revisión final realizada localmente.

**Publicación:** commit 5a11ec64c7152b383aec5dfb859e92289431aff4 enviado a main y desplegado con éxito en run 34084804695. Verificación pública: 4 destacados, 9 proyectos, 3 experimentos y anclas correctas, sin errores JavaScript.

**Bloqueos:** ninguno. **Próximos pasos:** mejoras con mayor retorno: PDF/demo de AutoAtlas, publicación de Marraquetómetro y casos de estudio de LUZ·RM/Azimut.

**Commits relevantes:** base dd06f22; 5a11ec6 (curaduría publicada). Este cierre documental no cambia el sitio servido.


## 2026-09-06 — Atlas editorial y giro real

**Objetivo:** responder al rechazo de la estética repetitiva, variar composición y color, mejorar interacción y hacer que el planeta gire solo. Continúa la autorización de commit, push y deploy.

**Completado:** paleta papel/verde/lima/terracota, títulos serif, perfil como retrato editorial, cartografía completa con selector Relieve/Memoria, proyectos con jerarquías distintas, trayectoria numerada y herramientas en columnas abiertas. Eliminadas tarjetas redondeadas repetidas, brillo de puntero y tilt decorativo. Conservadas rutas, secciones, contenidos profesionales y formulario.

**Decisiones:** giro continuo de unos 84 s/vuelta; reset por arco corto; teclado y arrastre horizontal táctil/ratón. Pausa persistente, movimiento reducido y suspensión fuera de vista siguen activos. Selector oculto sin JS; enlace de colección siempre disponible. La dirección visual actual sustituye Mapbox estricto.

**Validación:** Jekyll real en raíz y /portfolio y comprobador de 6 páginas aprobados. Navegador: 24 combinaciones página/ancho, sin errores JS, recursos fallidos ni hallazgos axe A/AA. Pruebas de giro automático, pausa, arrastre, teclado, suspensión y selector aprobadas. Revisión independiente detectó hover de bajo contraste, reset con vueltas acumuladas y selector inerte sin JS: corregidos. No se envían formularios reales.

**Publicación:** 99ab7081b2a10cd04f7ee3e9dd56809a682f27c6 enviado a main. GitHub Pages run 34067120369 terminó con éxito. Seis páginas públicas, colores nuevos, rotación automática y pausa verificados sin errores JavaScript. Arrastre táctil comprobado con eventos táctiles de Chromium.

**Bloqueos:** ninguno. **Próximos pasos:** continúan pendientes las URLs de repositorios y evidencia editorial de proyectos del propietario.

**Commits relevantes:** base 61c54db; 99ab708 (atlas editorial publicado). Este cierre documental no cambia el sitio servido.


## 2026-09-05 — Experiencia cartográfica animada

**Objetivo:** elevar el impacto visual con animaciones, conservando secciones y completar commit, push y deploy ya autorizados.

**Completado:** nueva portada tipográfica con globo Canvas de geografía real, Chile destacado, arrastre, botones de orientación y SVG alternativo; cartografía original en una sección editorial propia; entradas por scroll, títulos animados, relieve con puntero, progreso de lectura, transiciones y microinteracciones en todas las páginas. Pausa persistente y respeto del movimiento reducido. Sin dependencias de producción nuevas.

**Decisiones:** Natural Earth local y documentado; DPR 1.5 y 30/20 FPS; suspender dibujo fuera de pantalla y en segundo plano. Se corrigió la recuperación de animaciones al volver a la pestaña y se preservó la orientación al pausar. Esta petición reemplaza la anterior decisión de retirar todas las animaciones continuas.

**Validación:** build Jekyll real y comprobación de 6 páginas; 24 combinaciones de página/ancho, axe A/AA sin hallazgos automáticos; prueba específica de animación, pausa, persistencia, teclado, arrastre, reinicio, suspensión y fallbacks aprobada. Revisión independiente completada y hallazgo corregido. Capturas en ../outputs.

**Publicación:** commit 0ea91403bf9d9bd4ae4af5c15fde7d13de781273 enviado a main; GitHub Pages completó build y deploy (run 34007845801). Verificadas seis páginas públicas, carga del atlas, pausa/reanudación y ausencia de errores JavaScript.

**Bloqueos:** ninguno. No se enviaron formularios reales. **Próximos pasos:** las mejoras editoriales de casos de estudio y repositorios siguen pendientes de contenido del propietario.

**Commits relevantes:** base 6157318; 0ea9140 (experiencia animada publicada). Este cierre documental no modifica el sitio servido.


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
