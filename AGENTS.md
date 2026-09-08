# Instrucciones del proyecto

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

- La ampliación de movimiento fue solicitada expresamente: conservar el globo Canvas de Natural Earth, las entradas por scroll y microinteracciones. Mantener pausa global persistente, prefers-reduced-motion, fallback SVG y controles de teclado.
- motion.js limita DPR a 1.5 y FPS a 30/20; suspende Canvas fuera de pantalla y en pestañas ocultas. El globo rota continuamente (~84 s/vuelta) salvo pausa, arrastre, fuera de pantalla o pestaña oculta. Reset toma el ángulo equivalente más cercano, sin rebobinar vueltas acumuladas.
- Ejecutar tests/motion_check.cjs al modificar movimiento. No añadir dependencias 3D para esta escena ortográfica.

- Selector Relieve/Memoria oculto sin JS, enlaces originales disponibles. Probar ambos mapas y sus anclas. Evitar simulaciones decorativas de interacción: el selector cambia cartografía real y el globo admite arrastre táctil horizontal conservando scroll vertical.

- Curaduría vigente: _data/projects.json alimenta portada (featured) y Código. Cuatro destacados: LUZ·RM, Azimut, AutoAtlas Pro y HuellaRETC. Nueve proyectos de catálogo y tres experimentos. Mantener ConMapas, IEMA e IDE-MMA como evidencia profesional.
- Distinguir demo comprobada de código disponible. AutoAtlas se declara experimental en metadata. No prometer privacidad totalmente local en Azimut: sus fallbacks consultan servicios externos. HuellaRETC usa datos históricos 2021–2024.
- La captura LUZ·RM procede del README del proyecto y no representa el estado actual de sus datos. Conservar atribuciones y leyenda de captura.

- Recorrido de lectura vigente: presentación, perfil, proyectos (propios e institucionales diferenciados), ConMapas/cartografía, trayectoria, herramientas, contacto. Índice y numeración deben reflejar ese orden. Conservar #conmapas y evitar duplicar su presentación en proyectos institucionales.
- La propuesta de ../outputs/paleta-conmapas.html fue aprobada y aplicada el 2026-09-08. Es una interpretación de ConMapas, no una marca oficial extraída. Usar violeta en títulos sobre papel, amarillo para acciones y turquesa en contacto; adaptar enlaces y foco a cada superficie.
