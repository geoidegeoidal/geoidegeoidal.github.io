# Instrucciones del proyecto

- Arcade de naves reemplaza minigolf por petición (2026-09-11). Tres etapas Andes/Pacífico/Órbita, 18 enemigos cada una, dives y disparos más difíciles, tres vidas e invulnerabilidad temporal. Assets vectoriales originales. Disparo automático, teclas A/D/flechas y pad táctil; pausa explícita al ocultar pestaña/perder foco. tests/arcade_logic.cjs cubre transición, victoria y derrota.

- Footer compacto: padding24px escritorio/20px móvil; coordenada secreta dentro de footer-links, sin franja adicional debajo. Mantener área táctil44px y wrap de enlaces.

- Minigolf sustituye Snake por petición del usuario (2026-09-11). Tres campos, rumbo/fuerza, rebotes y contador acumulado. Curvas de nivel son decoración, no pendientes físicas. Mantener acceso en coordenada, dialog y retorno de foco. No retomar Snake.

- Easter egg: coordenada al pie solo en portada abre Snake en dialog nativo. Inicia por gesto, pausa al ocultar pestaña, detiene timer al cerrar y retorna foco. Teclado flechas/WASD y pad táctil; sin dependencia ni almacenamiento. Mantener descubierto por teclado y nombre accesible.

- Tecnologías 2026-09-11: _data/technologies.json separa niveles declarados de uso demostrado en proyectos/formación. Perfil público LinkedIn declara Python, PostgreSQL/PostGIS y HTML/CSS avanzados; no extender ese nivel a JavaScript ni inferir niveles desde repositorios. Mantener niveles anteriores para otras herramientas ya publicadas. Lista completa de aptitudes pendiente: LinkedIn pide sesión y Edge no disponible en CUA. No afirmar cobertura total.
- Storytelling-11s es especial de ConMapas: integrar en esa sección y catálogo Código, no como colectivo distinto ni sustituir sus cinco mapas. Repo y demo verificados; 11 entradas, autor Jorge Ulloa; no convertir fecha de publicación del repo en fecha de autoría de mapas.

- Dirección vigente 2026-09-11: el propietario prefiere la versión anterior a las reediciones, tras quitar cursivas y rótulos. Index restaurado desde 39d7d42 (tipografía e4a3876 + miniaturas). Portada «Geografía para leer el mundo», globo principal y orden perfil/proyectos/cursos/ConMapas/trayectoria/tecnologías/contacto. Esta decisión sustituye monografía y propuestas como dirección activa. Mantener fixes compartidos de controles, botones, selector y enlaces; no reactivar edition:monograph. Propuesta queda archivada como comparación, no promoverla sin petición.

- Propuesta completa (2026-09-11) sustituye la propuesta de caso único rechazada: identidad personal, desarrollo, instituciones, formación, ConMapas, perfil, trayectoria e investigación, tecnologías y contacto. Reutiliza site.js/motion.js y datos curados; CSS independiente. Index permanece como versión anterior hasta evaluación. No reducir el portafolio a mapas.
- En CSS de propuesta usar separación vertical fija y porcentajes solo en column-gap. Tests de contención de proyectos deben excluir descendientes de details cerrados; esperar fin de transiciones al auditar contraste y evento de media query al comprobar reduced-motion.

- Propuesta paralela `propuesta.html` (2026-09-10): portada y caso completo de ConMapas, estilos/scripts independientes, no sustituye index. Noindex y sitemap:false; sitemap respeta exclusión. Dirección de color violeta/naranja/lima inspirada en la obra; logo aprobado conservado.
- El visor de la propuesta amplía una imagen existente con vistas norte/centro/sur, no calcula isócronas ni consulta ubicaciones. No presentar como aplicación GIS. Mantener fuente ODEPA, crédito Jorge Ulloa y acceso a lámina íntegra. Validar tests/propuesta_check.cjs.

- Cursos: el propietario rechazó las ondas decorativas animadas. Mantener fondo amarillo plano y espaciado original; no reintroducir círculos/ondas de influencia en esa sección. Movimiento cromático de portada conservado.

- Fondos animados autorizados: color superpuesto al detalle de portada (original intacto) y ondas SVG decorativas en cabecera Cursos. Animación CSS solo cuando sección visible y data-motion=on; pausa global, pestaña oculta y reduced-motion respetados. Texto sobre superficie plana. Cambio de lámina ConMapas 620ms con recorte y escala suave.

- Investigación cierra la lista timeline como último li, no fila grid aparte. Trayectoria usa row-gap en px y column-gap porcentual: gap:8% causaba desborde vertical por dimensionamiento intrínseco. Encabezado sticky solo desde 1000px y altura700, en columna separada. Regresión tests/research_layout_check.cjs.

- Proyectos de portada: un proyecto completo por fila en orden DOM; identidad a izquierda, explicación/enlaces a derecha, apilados en móvil. No volver al mosaico con AutoAtlas ocupando dos filas ni esquema antes del nombre. Fondo violeta uniforme; captura LUZ dentro de su bloque.

- Revisión responsiva: probar contenido interno con tests/responsive_reading_check.cjs (320–1920), no solo scrollWidth del documento: overflow:clip ocultaba recortes de Cursos. CTA multilínea y columnas minmax(0,1fr). Miniaturas en tres columnas hasta 480 px.
- Control de movimiento en flujo normal bajo cabecera, nunca flotando encima de textos; z-index:auto. El fondo oscuro de enlaces sociales se aplica solo a enlaces con imagen (:has(img)), no a enlaces textuales.

- Fondos por tema (2026-09-10): ConMapas y herramientas en salvia #d1e2d6, proyectos violeta claro #e4ddec, AutoAtlas violeta #d2c5df, perfil arena #f0d5bb, cursos amarillo, trayectoria papel y contacto turquesa. Metadatos de AutoAtlas en #35464b para contraste AA.

- Edición monográfica (2026-09-10), autorizada para probar un cambio amplio y reversible: portada con detalle de San Cristóbal ampliable y globo secundario; orden ConMapas, herramientas, perfil, cursos, trayectoria, herramientas técnicas y contacto. Sustituye el orden anterior. Mantener miniaturas + visor único, láminas completas sin rótulos superpuestos.
- La edición se activa mediante `edition: monograph` y carga monograph.css/js solo en portada. Punto de retorno: tag `respaldo-antes-monografia-20260910` (39d7d42). El zoom es una ampliación de imagen, no consulta geográfica ni nueva capa de datos; accesible con teclado.
- En el visor ConMapas fijar width:100%, min-width:0 y aspect-ratio:auto: el antiguo aspect-ratio:1 combinando altura fija desbordaba las columnas de tablet.

- ConMapas: selector con cinco miniaturas dentro de la columna de texto, visor único. Esperar decode antes de sustituir imagen, conservar selección ante error y descartar respuestas antiguas. Transición por recorte respeta pausa y movimiento reducido; validar con tests/map_selector_check.cjs y motion_check.cjs.
- Decoración basada en assets propios: fragmento de conmapas.webp detrás del retrato y marco fino del visor. Proyectos incluyen contexto nativo details; no presentar capturas estáticas como demos animadas.

- Dirección tipográfica vigente (2026-09-09): DM Sans local para títulos y cuerpo, sin cursiva ni palabras coloreadas en titulares. Títulos directos y descriptivos, sin rótulos numerados que repitan la sección. Metadatos útiles legibles en caja normal. Mantener paleta ConMapas, logo, globo y composición del visor. Esta decisión sustituye las indicaciones anteriores de Georgia y violeta en títulos.
- Referencias revisadas: UI UX Pro Max en ../work/skills/ui-ux-pro-max (consultas de sistema y jerarquía), Refero/Osmo para protagonismo tipográfico y superficies planas. Son referencias de criterio; no copiar sus etiquetas minúsculas, estructura SaaS ni tipografías propietarias.

- SEO: `_includes/structured-data.html` define Person, WebSite, ProfilePage en portada y BlogPosting en artículos. Mantener datos respaldados por el contenido visible y validar con tests/seo_check.cjs. El token opcional google_site_verification debe provenir de Search Console del propietario.
- Logo aprobado: propuesta 01 «JU · Meridiano» (../outputs/logo-a.svg), aplicada en cabecera y favicon. Conservar su geometría y punto superior; favicon amarillo sobre carbón para contraste en pestañas claras y oscuras. Analítica open source evaluada (Umami recomendado), no instalada ni activada.

- ConMapas en portada conserva la composición original de texto y visor único. Cinco opciones en el selector: relieve, memoria, ferias, micheladas e IPEC. No añadir una galería debajo: el propietario rechazó esa composición. Reservar espacio para rótulos sin tapar las láminas.

- La nota de investigación de Trayectoria ocupa la columna derecha en escritorio y la única columna en móvil; no extenderla bajo el encabezado sticky, porque se superponen al hacer scroll.

- Leer este archivo y HANDOFF.md antes de modificar el sitio. Al cerrar una sesión con cambios, anteponer una entrada a HANDOFF.md con objetivo, trabajo realizado, decisiones, bloqueos, próximos pasos y commits.
- Preferir las herramientas del grafo codebase-memory-mcp para descubrir código si el proyecto está indexado. Si no hay índice disponible, usar lecturas directas y rg.
- Sitio Jekyll en español para GitHub Pages. Conservar las rutas de Bio (/), Mapas (/maps.html), Código (/code.html), Blog (/blog.html) y los artículos. Mantener las anclas experiencia, proyectos, tech y contacto.
- Dirección vigente (2026-09-08): atlas editorial, autorizada por la crítica del usuario a la repetición de tarjetas y paleta oscura. Paleta ConMapas aprobada: papel #F3F0E7, carbón #121B20, turquesa #06766F, amarillo #D6DE59, violeta #783D9B y naranja #E88D42; Georgia para títulos y DM Sans local para cuerpo. Sustituye la aplicación estricta de Mapbox y los radios de tarjetas/botones.
- Comprobar contraste de texto y estados hover por superficie. Los CTA ahora usan fondos amarillos con tinta oscura; no recolorear las cartografías originales.
- HTML/Liquid, CSS compartido y JavaScript nativo. Las dependencias npm de tests son solo de desarrollo, no agregar un framework ni una fase de build JavaScript sin necesidad.
- Usar relative_url y absolute_url en recursos y enlaces internos. El contacto desde cualquier página apunta a la raíz + #contacto.
- Conservar las imágenes originales PNG y usar WebP optimizado para las vistas. La galería muestra imágenes completas; la portada puede recortar su vista previa.
- Mantener la mejora progresiva: navegación y enlaces originales de mapas disponibles sin JS; formulario con POST nativo a su endpoint existente.
- No inventar datos, métricas, roles, disponibilidad de repositorios o publicaciones. Mantener explícita la contribución personal (fundador, responsable, liderazgo). Los antiguos placeholders de incendios y Spatial SQL se retiraron al curar proyectos verificables; no asociarlos a repositorios por semejanza de nombre.
- No enviar mensajes de prueba reales. Interceptar Formspree al probar éxito y error. Nunca reemplazar el endpoint ni el correo sin información del propietario.
- Verificar con Jekyll, tests/check_site.py y, para interacciones, tests/browser_check.cjs. Revisar escritorio y móvil, Escape y retorno del foco en el visor, movimiento reducido, teclado y enlaces desde páginas secundarias.
- Los bloques pre de los artículos incluyen tabindex=0 para permitir desplazamiento horizontal con teclado.
- Excluir instrucciones, handoffs, tests y herramientas locales de la publicación. No hacer push ni publicar por inferencia de una petición de rediseño local.
- En este entorno Windows, los commits locales pueden pertenecer al usuario del sandbox. Si un comando autenticado marca dubious ownership, usar safe.directory solo para la ruta de este repo y para ese comando; no añadir excepciones globales.

- La ampliación de movimiento fue solicitada expresamente: conservar el globo Canvas de Natural Earth, las entradas por scroll y microinteracciones. Mantener pausa global persistente, prefers-reduced-motion, fallback SVG y arrastre directo.
- motion.js limita DPR a 1.5 y FPS a 30/20; suspende Canvas fuera de pantalla y en pestañas ocultas. El globo rota continuamente (~84 s/vuelta) salvo pausa, arrastre, fuera de pantalla o pestaña oculta.
- La ubicación del visitante se obtiene solo mediante Geolocation API tras pulsar «Ubicarme en el globo». Usarla únicamente en memoria para centrar y marcar el punto: no solicitarla al cargar, no consultar IP, no guardar ni transmitir coordenadas. Mantener rechazo, indisponibilidad y fallo como estados recuperables.
- En escritorio, mantener al menos 16 px entre el crédito del atlas y `.hero-bottom`; `tests/browser_check.cjs` cubre esta separación. En móvil ambos elementos vuelven al flujo normal.
- Ejecutar tests/motion_check.cjs al modificar movimiento. No añadir dependencias 3D para esta escena ortográfica.

- Selector Relieve/Memoria oculto sin JS, enlaces originales disponibles. Probar ambos mapas y sus anclas. Evitar simulaciones decorativas de interacción: el selector cambia cartografía real y el globo admite arrastre táctil horizontal conservando scroll vertical.

- Curaduría vigente: _data/projects.json alimenta portada (featured) y Código. Cuatro destacados: LUZ·RM, Azimut, AutoAtlas Pro y HuellaRETC. Nueve proyectos de catálogo y tres experimentos. Mantener ConMapas, IEMA e IDE-MMA como evidencia profesional.
- Marraquetómetro, HoloSynth y MR_ROBOT son trabajos no terminados. Mantener visible «Work in Progress» en cada entrada de la sección de experimentos.
- Distinguir demo comprobada de código disponible. AutoAtlas se declara experimental en metadata. No prometer privacidad totalmente local en Azimut: sus fallbacks consultan servicios externos. HuellaRETC usa datos históricos 2021–2024.
- La captura LUZ·RM procede del README del proyecto y no representa el estado actual de sus datos. Conservar atribuciones y leyenda de captura.

- Recorrido de lectura vigente: presentación, perfil, proyectos (propios e institucionales diferenciados), cursos/formación, ConMapas/cartografía, trayectoria, herramientas, contacto. Índice y numeración deben reflejar ese orden. Conservar #cursos y #conmapas; evitar duplicar ConMapas en proyectos institucionales.
- La propuesta de ../outputs/paleta-conmapas.html fue aprobada y aplicada el 2026-09-08. Es una interpretación de ConMapas, no una marca oficial extraída. Usar violeta en títulos sobre papel, amarillo para acciones y turquesa en contacto; adaptar enlaces y foco a cada superficie.

- Revisión LinkedIn/Instagram (2026-09-08): MINCAP desde agosto 2026 y MMA figuran ambos vigentes en LinkedIn público indexado. No inferir una salida de MMA. Servel: diferenciar contribución individual y resultados del equipo; porcentajes son distancia lineal.
- Investigación verificada: Peña y Ulloa, Revista de Teledetección 50, 37–48, DOI 10.4995/raet.2017.7931. Publicación 2017-12-26; 2017-12-11 es aceptación.
- ConMapas es colectivo: verificar la firma en cada imagen. La selección vigente usa las tres publicaciones propias con más likes entre 353 URLs de ConMapas inventariadas el 2026-09-08: ferias (19,7 mil), micheladas (18,9 mil) e índice IPEC (13,7 mil), todas con firma visible de Jorge Ulloa. Siete colaboraciones/republicaciones externas quedaron fuera del ranking. El mapa de puntos críticos recuperado en outputs está firmado por Eduardo Carvajal y no es obra individual de Jorge. Servir copias locales optimizadas, nunca el CDN temporal. Cifra aproximada de 19,5 mil seguidores fechada septiembre 2026.
- Citar entre comillas los valores de front matter YAML que contengan dos puntos seguidos por espacio.
- ConMapas es el proyecto editorial que reúne todo el archivo de maps.html. San Cristóbal, Memoria Territorial y la selección por alcance son series de una misma práctica; no presentarlas como proyectos o categorías separadas.
- Oferta formativa verificada en https://geoidegeoidal.github.io/spatial-ia-web/: Bootcamp Desarrollo Web Territorial con IA, desarrollo asistido por IA, MapLibre/Leaflet, Turf.js y GitHub Pages. Evidencia publicada al 2026-09-08: +80 personas, 3 cohortes, 10+ países y 4,9/5. Mantener fechas y precios fuera del portafolio general porque cambian por cohorte.
