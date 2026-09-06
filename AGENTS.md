# Instrucciones del proyecto

- Leer este archivo y HANDOFF.md antes de modificar el sitio. Al cerrar una sesión con cambios, anteponer una entrada a HANDOFF.md con objetivo, trabajo realizado, decisiones, bloqueos, próximos pasos y commits.
- Preferir las herramientas del grafo codebase-memory-mcp para descubrir código si el proyecto está indexado. Si no hay índice disponible, usar lecturas directas y rg.
- Sitio Jekyll en español para GitHub Pages. Conservar las rutas de Bio (/), Mapas (/maps.html), Código (/code.html), Blog (/blog.html) y los artículos. Mantener las anclas experiencia, proyectos, tech y contacto.
- Referencia visual vigente: Mapbox, proporcionada por el usuario. La referencia anterior de Dala quedó reemplazada. Fondo #0e1012, superficies #15171b, azul #007afc para acciones, DM Sans local, tarjetas 24 px y botones 100 px.
- Texto blanco sobre #007afc: mantener CTA en 19 px / 700 también en móvil; 18 px deja de cumplir AA. No recolorear las cartografías originales para ajustarlas a la paleta de interfaz.
- HTML/Liquid, CSS compartido y JavaScript nativo. Las dependencias npm de tests son solo de desarrollo, no agregar un framework ni una fase de build JavaScript sin necesidad.
- Usar relative_url y absolute_url en recursos y enlaces internos. El contacto desde cualquier página apunta a la raíz + #contacto.
- Conservar las imágenes originales PNG y usar WebP optimizado para las vistas. La galería muestra imágenes completas; la portada puede recortar su vista previa.
- Mantener la mejora progresiva: navegación y enlaces originales de mapas disponibles sin JS; formulario con POST nativo a su endpoint existente.
- No inventar datos, métricas, roles, disponibilidad de repositorios o publicaciones. Mantener explícita la contribución personal (fundador, responsable, liderazgo). Los dos repositorios de Código todavía no tienen URL específica verificada.
- No enviar mensajes de prueba reales. Interceptar Formspree al probar éxito y error. Nunca reemplazar el endpoint ni el correo sin información del propietario.
- Verificar con Jekyll, tests/check_site.py y, para interacciones, tests/browser_check.cjs. Revisar escritorio y móvil, Escape y retorno del foco en el visor, movimiento reducido, teclado y enlaces desde páginas secundarias.
- Los bloques pre de los artículos incluyen tabindex=0 para permitir desplazamiento horizontal con teclado.
- Excluir instrucciones, handoffs, tests y herramientas locales de la publicación. No hacer push ni publicar por inferencia de una petición de rediseño local.
- En este entorno Windows, los commits locales pueden pertenecer al usuario del sandbox. Si un comando autenticado marca dubious ownership, usar safe.directory solo para la ruta de este repo y para ese comando; no añadir excepciones globales.

- La ampliación de movimiento fue solicitada expresamente: conservar el globo Canvas de Natural Earth, las entradas por scroll y microinteracciones. Mantener pausa global persistente, prefers-reduced-motion, fallback SVG y controles de teclado.
- motion.js limita DPR a 1.5 y FPS a 30/20; suspende Canvas fuera de pantalla y en pestañas ocultas. El estado CSS --scene-play depende solo de intersección; tab-hidden gestiona visibilidad para evitar animaciones bloqueadas al volver a la pestaña.
- Ejecutar tests/motion_check.cjs al modificar movimiento. No añadir dependencias 3D para esta escena ortográfica.
