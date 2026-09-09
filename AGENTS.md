# Instrucciones del proyecto

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
