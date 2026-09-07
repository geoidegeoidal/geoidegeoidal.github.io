# Portafolio de Jorge Ulloa Roa

Sitio estático en español con Jekyll, compatible con GitHub Pages. Bio (presentación, trayectoria, proyectos, herramientas y contacto), Mapas, Código y Blog conservan sus rutas.

## Desarrollo local

Requiere Ruby, Bundler y las herramientas de compilación de Ruby para tu sistema (RubyInstaller + DevKit en Windows).

```sh
bundle install
bundle exec jekyll serve
```

Abrir http://localhost:4000. La publicación continúa a través de la configuración existente de GitHub Pages; no se incorpora otro servicio de hosting.

## Verificación

```sh
bundle exec jekyll build
python tests/check_site.py _site
node --check assets/js/site.js
node --check assets/js/motion.js
```

El verificador usa solo Python estándar y comprueba rutas locales, imágenes, anclas, metadatos, un H1 por página, textos alternativos y XML. Para comprobar instalación en un subdirectorio:

```sh
bundle exec jekyll build --baseurl /portfolio
python tests/check_site.py _site --baseurl /portfolio
```

Prueba manual: menú móvil y Escape, visor con Enter y Escape y retorno del foco, fichas técnicas, contacto desde las cuatro páginas, validación del formulario, conexión fallida, vista sin JavaScript y movimiento reducido. No enviar mensajes reales durante las pruebas: simular las respuestas del endpoint de Formspree.

## Edición

- `index.html`: biografía, proyectos, experiencia, herramientas y formulario.
- `maps.html`: galería y metodología. El enlace a PNG es el original; WebP es la vista optimizada.
- `_data/projects.json`: catálogo curado, enlaces verificados y selección de portada mediante `featured`.
- `code.html`: catálogo de nueve proyectos y tres experimentos con su alcance y documentación.
- `_posts/`: artículos Markdown con título, fecha, categorías y `layout: post`.
- `_config.yml`: nombre, descripción, correo, redes y URL pública.
- `_layouts/`: navegación, pie, metadatos y presentación de artículos.
- `assets/css/style.css`: tokens y estilos compartidos, incluida adaptación móvil.
- `assets/js/site.js`: mejoras progresivas de menú, visor nativo y formulario.

## Diseño y recursos

Dirección actual: atlas editorial. Papel cálido, tinta verde, portada mineral, acentos lima y contacto terracota. Títulos en Georgia y texto en DM Sans local (licencia OFL en `assets/fonts/OFL.txt`). Esta revisión reemplaza la aplicación estricta de la referencia inicial Mapbox, por petición del propietario.

Las secciones alternan composición y color; las cartografías originales conservan sus colores. El selector de la portada alterna Relieve y Memoria y enlaza cada obra a su ficha. Sin JavaScript, conserva el mapa y el enlace a la colección.

No hay dependencias JavaScript en producción ni peticiones de fuentes a terceros. El formulario conserva el endpoint Formspree existente y funciona con POST nativo si no hay JavaScript. La disponibilidad y recepción final del correo dependen de esa cuenta de Formspree.

Se conservan las afirmaciones profesionales del portafolio original. Antes de publicar, revisar vigencia de fechas y cifras, enlazar los repositorios pendientes y añadir evidencia a los resultados de proyectos.

Para ejecutar también la auditoría de navegador y accesibilidad (dependencias exclusivas de desarrollo), con Jekyll servido en el puerto 4000:

```sh
cd tests
npm install
npx playwright install chromium
npm test
npm run test:motion
```

Se puede cambiar el servidor con `TEST_SITE_URL` y elegir un navegador instalado con `BROWSER_CHANNEL` (por ejemplo, `msedge`). Las solicitudes de Formspree se interceptan durante estas pruebas y no salen al servicio real.

## Movimiento cartográfico

La portada incluye un globo ortográfico Canvas con costas reales de Natural Earth, Chile destacado, rotación automática continua (~84 segundos por vuelta), arrastre horizontal con ratón o tacto y controles de teclado. `assets/data/README.md` documenta la fuente; `atlas.svg` mantiene la escena sin JavaScript o si falla la carga.

`assets/css/motion.css` y `assets/js/motion.js` añaden entradas de títulos y secciones y lectura progresiva. El botón global permite pausar y conserva la preferencia entre páginas. Se respeta el movimiento reducido del sistema. El globo limita resolución y frecuencia y deja de dibujar fuera de pantalla o en segundo plano.

La prueba de movimiento verifica animación, pausa, persistencia, teclado, arrastre, reinicio, suspensión fuera de pantalla, recuperación de pestañas y alternativas sin JS o datos.

## Curaduría de proyectos

Revisión del perfil público realizada el 6–7 de septiembre de 2026: 27 repositorios considerados. La portada prioriza LUZ·RM, Azimut, AutoAtlas Pro y HuellaRETC por su complementariedad. Código amplía la selección con herramientas, datos abiertos y experimentos; no presenta repositorios sin demo como aplicaciones publicadas. ConMapas, IEMA e IDE-MMA mantienen su espacio profesional. Las notas de cada proyecto delimitan lo que demuestra el código revisado; no equivalen a una auditoría de cada aplicación.
