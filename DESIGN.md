---
name: Pueblo costero y terminal
description: Portada editorial conservada, RPG costero con cuaderno de campo y consola de archivos en grafito.
colors:
  rpg-ink: "#26382f"
  rpg-paper: "#fff2cf"
  rpg-orange: "#b8432e"
  rpg-green: "#285b48"
  rpg-wayfinding: "#244a3c"
  rpg-landmark-muted: "#e2e9cc"
  rpg-line: "#9d8155"
  rpg-focus: "#9d2f27"
  rpg-hover: "#f5d68e"
  book-paper: "#f5e7bc"
  book-ink: "#293b32"
  book-edge: "#705137"
  book-inset: "#f9eac5"
  book-header: "#f3e2b9"
  book-button: "#f8edcf"
  book-divider: "#b69a6b"
  terminal-bg: "#171a1c"
  terminal-text: "#e5e2d7"
  terminal-muted: "#acb5b3"
  terminal-green: "#a7d8b8"
  terminal-blue: "#9fc8ef"
  terminal-amber: "#ecc58b"
  terminal-line: "#414c50"
  terminal-titlebar: "#292f32"
  terminal-status: "#28382f"
typography:
  rpg-display:
    fontFamily: "Pixelify, sans-serif"
    fontSize: "28px"
    fontWeight: 500
    lineHeight: 1
  rpg-headline:
    fontFamily: "Pixelify, sans-serif"
    fontSize: "34px"
    fontWeight: 500
    lineHeight: 1.1
  rpg-title:
    fontFamily: "Pixelify, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.2
  rpg-body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  rpg-control:
    fontFamily: "Pixelify, sans-serif"
    fontSize: "19px"
  rpg-location:
    fontFamily: "Pixelify, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.2
  rpg-landmark:
    fontFamily: "Pixelify, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.1
  rpg-landmark-role:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
  terminal-body:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.65
  terminal-result:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "13px"
    lineHeight: 1.8
  terminal-title:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "15px"
    fontWeight: 600
  terminal-label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "12px"
rounded:
  square: "0"
spacing:
  compact: "4px"
  small: "8px"
  control: "12px"
  base: "16px"
  inset-small: "20px"
  inset: "24px"
  workspace: "28px"
  section: "32px"
components:
  execute:
    backgroundColor: "transparent"
    textColor: "{colors.terminal-muted}"
    rounded: "{rounded.square}"
    padding: "8px 14px"
    typography: "{typography.terminal-label}"
  command-input:
    backgroundColor: "transparent"
    textColor: "{colors.terminal-text}"
    typography: "{typography.terminal-body}"
    rounded: "{rounded.square}"
    padding: "10px 0"
  command-suggestion:
    backgroundColor: "transparent"
    textColor: "{colors.terminal-green}"
    padding: "4px 0 10px"
  terminal-window:
    backgroundColor: "{colors.terminal-bg}"
    textColor: "{colors.terminal-text}"
    rounded: "{rounded.square}"
  rpg-button:
    backgroundColor: "{colors.rpg-paper}"
    textColor: "{colors.rpg-ink}"
    rounded: "{rounded.square}"
    padding: "10px 16px"
  rpg-start:
    backgroundColor: "{colors.rpg-green}"
    textColor: "{colors.rpg-paper}"
    rounded: "{rounded.square}"
    padding: "10px 16px"
  rpg-dialog:
    backgroundColor: "{colors.book-paper}"
    textColor: "{colors.book-ink}"
    rounded: "{rounded.square}"
    padding: "0"
  book-tab:
    backgroundColor: "{colors.book-button}"
    textColor: "{colors.book-ink}"
    rounded: "{rounded.square}"
    padding: "8px 12px"
  rpg-location:
    backgroundColor: "#f5e7bce8"
    textColor: "{colors.rpg-ink}"
    typography: "{typography.rpg-location}"
    padding: "6px 9px"
  rpg-landmark:
    backgroundColor: "{colors.rpg-wayfinding}"
    textColor: "{colors.rpg-paper}"
    rounded: "{rounded.square}"
    padding: "6px 11px"
    typography: "{typography.rpg-landmark}"
---

# Design System: Pueblo costero y terminal

## Overview

**Creative North Star: "Pueblo costero, trabajo real"**

La exploración de Jorge habita un pueblo costero luminoso: mar azul, pasto salvia, caminos de arena, edificios de estuco y tejas rojas. El cuerpo, los objetos y los lugares tienen presencia pixelada; la evidencia profesional se lee con calma en un cuaderno de papel cálido. Jorge conserva pelo a hombros, lentes, barba corta, chaqueta verde y el cuerpo más gordito solicitado por el propietario.

Hay tres ámbitos deliberadamente separados. La portada clásica sigue siendo la entrada predeterminada y conserva atlas editorial, logo JU, DM Sans, cartografías originales y superficies arena/lila/salvia. El RPG utiliza `rpg-world.css` y después `rpg-craft.css`; la consola usa exclusivamente `terminal.css`, JetBrains Mono y grafito. Esta actualización autorizada sustituye la terminal histórica de océano/cobre: `expedition.css` y su cuaderno lateral ya no definen ninguna superficie activa. Los templates factuales compartidos no imponen su antigua presentación.

El refinamiento de cámara y orientación se documenta desde el código del mundo existente; no representa una nueva dirección ni una composición visual aprobada. El contrato de esta superficie permanece en `.impeccable/surfaces/explorar-html.md`.

**Key Characteristics:**
- Pueblo luminoso con personajes, cinco interiores ilustrados, cámara abierta regulable y plano ilustrado.
- Pixelify local para identidad del juego y DM Sans local para evidencia.
- Cuaderno de campo amplio y conversaciones compactas junto al escenario.
- Consola de archivos en grafito, tipografía monoespaciada y pistas contextuales.
- Portada clásica predeterminada y acceso al contenido sin progresión obligatoria.

## Colors

La escena conserva su luz costera; el cuaderno aporta papel y madera, y la consola distingue operaciones mediante tinta clara, menta, azul y ámbar.

### Primary
- **Verde de acción** (`rpg-green`): entrada al pueblo, enlaces y selección de texto.
- **Verde de orientación** (`rpg-wayfinding`): rótulos de destinos, numeración del plano y recorrido visible; papel de viaje para nombres y foco, salvia clara (`rpg-landmark-muted`) para el rol secundario.
- **Menta de consola** (`terminal-green`): usuario del prompt, estado de sesión, ejemplos y comandos sugeridos.

### Secondary
- **Azul de rutas** (`terminal-blue`): carpetas, ruta actual, árbol y enlaces.
- **Ámbar operativo** (`terminal-amber`): signo del prompt, encabezados de resultados, límites de proyectos y foco de consola.
- **Arcilla y rojo de foco** (`rpg-orange`, `rpg-focus`): marcador de lugar, hover de enlaces y foco de teclado en el juego.

### Neutral
- **Papel de viaje, tinta vegetal y arena** (`rpg-paper`, `rpg-ink`, `rpg-line`, `rpg-hover`): controles generales e índice del juego.
- **Papel de cuaderno y tinta de lectura** (`book-paper`, `book-ink`): diálogo, evidencia y fichas.
- **Madera, filete claro y divisores** (`book-edge`, `book-inset`, `book-divider`): marco del cuaderno, placas y separación interna.
- **Papel de cabecera y botón** (`book-header`, `book-button`): barra del mundo y acciones del cuaderno.
- **Grafito, texto, metadatos y línea** (`terminal-bg`, `terminal-text`, `terminal-muted`, `terminal-line`): ventana y resultados seleccionables.
- **Barra de sesión y estado** (`terminal-titlebar`, `terminal-status`): dos franjas funcionales de la consola.

Los colores del terreno, las habitaciones y los sprites pertenecen a la ilustración Canvas. Los originales cartográficos mantienen sus colores. Las rampas del sidecar son muestras auxiliares, no nuevos tonos aplicados al producto.

**The Separate Worlds Rule.** Aplicar cada paleta solo en su ruta; la consola en grafito y el cuaderno cálido no recolorean la portada clásica.

## Typography

**Display Font:** Pixelify local para identidad, ubicación y títulos del RPG; la consola emplea JetBrains Mono incluso en sus encabezados.
**Body Font:** DM Sans local para lectura del RPG y portada; JetBrains Mono local para toda la terminal.
**Label/Mono Font:** JetBrains Mono expresa rutas, instrucciones y resultados reales de la consola local.

### Hierarchy
- **RPG display:** cabecera de 28px, 25px bajo 850px y 23px bajo 600px. No heredar el antiguo clamp después de cargar la capa de cuaderno.
- **RPG headline:** cuaderno a 34px/1.1, 27px bajo 600px; conversación a 28px. La bienvenida usa 34px/1.05.
- **RPG title / control:** títulos del cuerpo a 24px/1.2; acciones de lectura a 19px. Las pestañas usan 16px y 15px en móvil; cabecera y conversación tienen sus propias variantes compactas.
- **RPG orientación:** nombres de destinos DOM a 17px/1.1 en Pixelify y rol a 11px/1.4 en DM Sans; ambos mantienen tamaño de pantalla al alejar la cámara. La placa contextual de ubicación baja a 14px/1.2 y a 12px bajo 650px; nombres de NPC contextuales a 14px en Pixelify.
- **RPG body:** 16px/1.65 para evidencia; introducción de lugar a 18px, propósito del proyecto a 21px/1.6 y 18px en móvil. Las definiciones se limitan a 68ch. Categorías y notas permanecen en DM Sans.
- **Terminal body / result / title / label:** entrada a 14px/1.65; párrafos a 13px/1.8; encabezados de resultados a 15px/600; metadatos a 12px. Estado y explicaciones breves de sugerencias usan 10px, sin convertirlos en tamaño de lectura general.
- **Terminal móvil:** ayuda a 11px y comandos sugeridos a 12px; el campo conserva 14px. El wordmark y las líneas de arranque se ocultan para dejar visibles prompt y orientación.

Las tres familias se sirven localmente con `font-display:swap`: `pixelify-sans.ttf` (400–700), `dm-sans-latin.woff2` (100–900) y `jetbrains-mono.ttf` (100–800). Sus licencias SIL Open Font License 1.1 se conservan en `assets/fonts/pixelify-OFL.txt`, `OFL.txt` y `jetbrains-OFL.txt`, respectivamente. JetBrains Mono es una elección intencional de esta consola, no deriva del sistema clásico.

**The Readable Evidence Rule.** Pixelify identifica el pueblo y las acciones del cuaderno; los párrafos, fuentes, estados y límites del RPG se leen en DM Sans.

**The Screen-Space Wayfinding Rule.** La cámara puede alejar el pueblo, pero los nombres conservan su tamaño de lectura y espacio libre alrededor de actores y controles.

## Layout

El juego ocupa el ancho disponible bajo una barra compacta. La cabecera conserva mínimo de 76px y padding de 10px 28px; el escenario mide `calc(100svh - 154px)` con mínimo de 390px. La barra empieza a envolver a 850px. La capa base compacta entra a 650px; a 600px la capa de cuaderno fija cabecera de 116px mínimos, padding de 8px 12px y escenario de `calc(100svh - 204px)` con mínimo de 430px. Pie e índice quedan en flujo normal para pantallas cortas.

La cámara exterior abre el encuadre con escala base de .95 en escritorio, .75 para área de juego de ancho menor a 650px y .65 si su altura es menor a 360px; esta última condición tiene prioridad. El zoom relativo va de .65 a 1.35, en pasos de .15 con límites, y el 100% representa la escala base del dispositivo. No altera la posición de Jorge ni la geometría del pueblo. La zona tranquila ocupa del 38% al 62% en ambos ejes; al salir de ella, el seguimiento usa `1 - exp(-10 × dt)`. Los límites centran el mundo si el viewport lo supera. Resize, cambio de escena y movimiento reducido ajustan sin interpolación; los interiores conservan su encuadre ajustado a la sala, sin zoom exterior.

Zoom y ubicación ocupan la esquina superior izquierda; el minimapa abre el plano desde la derecha. Compañero e interacción permanecen abajo. El pad de puntero grueso usa botones de 48px separados por 4px. No hay columna permanente de lectura. El minimapa mide 156px, o 115px bajo 650px. Para pantallas de altura máxima de 600px y ancho desde 651px, la cabecera se compacta, el escenario final usa `calc(100svh - 156px)` con mínimo de 210px, la ubicación se oculta, el minimapa baja a 108px y el pad a 44px con separación de 2px. Esta regla final sustituye los mínimos de escenario generales en horizontal.

El plano usa dos columnas de proporción 1.5:1, mínimo de 220px para destinos y separación de 24px; bajo 650px se apila, con separación de 14px y mapa de hasta 220px de alto. Las cinco acciones conservan 58px mínimos en escritorio y 52px en móvil.

El cuaderno alcanza 960px, conserva 20px por lado y máximo de 88svh. La doble página tiene columna ilustrada de 230px, texto flexible y separación de 32px; a 850px pasa a 170px/22px. Bajo 600px se apila, conserva 11px por lado y padding interior de 16px. La conversación es un estado distinto: hasta 900px, alineada abajo con margen de 28px, máximo de 75svh; en móvil queda a 12px del borde y hasta 85svh. Leer una ficha no cambia la sala física ni marca un edificio como visitado; la acción de visitar sí cambia la escena.

La terminal tiene un único banco de 1320px máximos, margen vertical de 32px y padding horizontal de 36px. Salida con scroll a `clamp(310px,55vh,660px)` y ancho de lectura de 90ch; prompt, estado y tres sugerencias van después. A 800px o menos, el banco usa 16px laterales y margen superior de 14px; salida de `32svh` con mínimo de 230px y sugerencias en tres columnas de igual ancho, con texto envolvente y alto mínimo de 52px. Esta composición mantiene orientación y campo juntos en el primer recorrido móvil. El índice de enlaces directos está debajo en un `details` nativo.

## Elevation & Depth

La profundidad del pueblo nace de la ilustración, del orden de dibujo y de sombras de contacto suaves. Cada actor apoya sus pies en su posición lógica. Los anillos de interacción se dibujan antes que personajes y muebles, incluidas las salidas interiores. Los rótulos de evidencia se separan del mobiliario para conservar lectura.

Los rótulos de destinos usan una sombra ambiental `0 3px 8px #244a3c26`; su contraste proviene del verde y el papel, no de la sombra.

La bienvenida usa sombra difusa `6px 12px 30px #26382f40`. El cuaderno aplica `8px 16px 50px #1c2e2859` y fondo modal `#172d2ba3`; su filete interior aporta el material de papel. La consola usa `0 16px 50px #0003` alrededor de la ventana, con líneas y cambios de tono dentro. No convertir estas sombras ambientales en sombras duras desplazadas para los controles.

**The Grounded World Rule.** Las señales de suelo permanecen bajo actores y objetos; ninguna etiqueta tapa la evidencia que nombra.

## Shapes

Predominan esquinas rectas. Los controles generales del juego tienen borde de 2px; el cuaderno y la bienvenida llevan 4px de madera y un filete interior claro de 2px. Las viñetas usan 3px; el minimapa interactivo y el plano usan 2px. Los rótulos tienen borde de papel de 1px y foco de papel de 3px separado 3px. El foco RPG es rojo de 3px separado 4px y va hacia dentro en Canvas. La consola usa líneas de 1px y foco ámbar de 2px separado 4px. Su pequeño indicador circular representa la sesión, no botones ficticios de ventana.

## Components

### Buttons
Controles nativos, mínimos de 44px en las acciones principales. Comenzar usa verde con papel y hover verde profundo. El cuaderno usa botones de papel claro con borde madera, Pixelify y alineación izquierda en las listas. Las pestañas conservan el atributo de página actual y selección verde. La consola envía con Enter o un botón de borde discreto; las sugerencias son acciones textuales con una explicación debajo, no tarjetas decorativas.

### Inputs / Fields
La consola tiene campo transparente, cursor menta, placeholder y sugerencia tenue. El prompt separa usuario menta, ruta azul y signo ámbar. El historial es DOM seleccionable con región viva; la entrada nunca se interpreta como HTML ni como código ejecutable. El juego añade únicamente el control nativo de volumen dentro de Sonido.

### Navigation
JU vuelve a la portada clásica; Terminal y RPG conservan lugar/proyecto válidos al cambiar de vista. La barra del juego reúne Cuaderno, Pausar, Sonido y Terminal. La terminal mantiene retorno clásico visible y acceso al RPG. Sus índices nativos permiten abrir perfil, catálogo, formación y contacto sin ejecutar comandos ni completar el juego.

### Dialogue and fieldbook
Un `dialog` nativo distingue conversación compacta inferior y lectura amplia centrada. Mantiene cierre visible, Escape y retorno de foco; cuando un control de origen ya no existe, el foco vuelve a Canvas. Las viñetas reutilizan el atlas de seis celdas (3×2) `rpg-rooms.png`; cinco corresponden a los destinos. Los NPC son guías ficticios. Las fichas muestran propósito, construcción, herramientas, estado y límites, con enlaces reales y originales sin filtros. Visitar un edificio mueve a Jorge; leer otro lugar desde el cuaderno conserva la escena física. Una visita iniciada desde la bienvenida retira esa bienvenida y deja los controles de juego activos.

### Camera, landmarks and overview
Los rótulos DOM son botones de destino con nombre corto y función: Puerto/Trayectoria, Archivo/ConMapas, Observatorio/Ambiente, Taller/Proyectos y Escuela/Formación. Sus dimensiones se miden al redimensionar o completar las fuentes, no en cada cuadro. Se prueban posiciones encima, bajo el edificio y a sus lados; si ninguna cabe sin tocar controles, otros rótulos, Jorge o NPC, el rótulo se omite. También se ocultan durante bienvenida, pausa, diálogo e interiores. El plano conserva siempre la lista completa accesible. Los nombres de NPC exteriores aparecen solo al acercarse a menos de 145 unidades del mundo.

El botón del minimapa y M abren un diálogo nativo con el mismo pueblo ilustrado, preparado una vez y reutilizado, cinco destinos numerados y la posición actual. Elegir destino cierra el plano, calcula el camino existente, camina y entra al edificio; no teletransporta desde el plano. Desde un interior regresa al exterior antes de iniciar el recorrido. La ruta punteada y la marca final se dibujan bajo los actores; el minimapa conserva encuadre, línea de ruta de papel sobre verde, destino en arcilla y posición de Jorge. La banda «Hacia…» nombra el destino y permite cancelar; una dirección manual de teclado o pad cancela también. Abrir un diálogo detiene la ruta previa; su cierre no borra una ruta recién iniciada. El cuaderno conserva su acceso directo de lectura y visita.

### Playable world and sound
Arte original con alpha y procedencia conservados, cinco interiores ilustrados, caminos pavimentados y cámara exterior abierta regulable. Jorge usa `rpg-jorge.png`; los actores se recortan con límites opacos medidos, no gutters supuestos. Teclado, destino al pulsar el suelo y pad táctil usan la misma geometría de colisiones.

El océano deriva de un reloj acumulado del juego: su fase queda congelada al pausar, leer un diálogo u ocultar la pestaña; ninguna lectura del reloj de pared lo hace saltar al redibujar. Movimiento reducido elimina las ondas y fija el fotograma de caminata, conservando el desplazamiento solicitado. La entrada de diálogo dura 220ms en seis pasos y se desactiva con movimiento reducido.

La música original se sintetiza con Web Audio, sin descargar audio. Empieza apagada; el botón Música crea un único AudioContext tras un gesto. Sonido reúne activación/silencio y volumen nativo de 0–100, inicialmente 35. Pausar el juego, ocultar la pestaña o salir de la página suspende el sonido; las reanudaciones antiguas se descartan mediante revisión. El cuaderno detiene movimiento y océano, pero no silencia por sí solo la música activada: la lectura y el estado de pausa explícita son distintos.

### Terminal grammar
La interfaz corresponde a un sistema de archivos virtual de solo lectura: `ls` lista, `cd` cambia carpeta, `cat` lee y `pwd`/`tree` orientan. Las rutas admiten `~`, `/home/jorge`, rutas absolutas/relativas, `.` y `..`; las comillas agrupan argumentos. `help` ofrece un recorrido inicial y las sugerencias cambian con la carpeta. Perfil, trayectoria, formación y abrir proyecto mantienen sus alias locales; ningún comando accede al equipo ni ejecuta un shell.

Tab completa una coincidencia; con varias, muestra opciones y permite continuar el foco. Flechas recuperan el historial de sesión; Ctrl+C cancela una línea sin selección, Ctrl+L limpia y Escape vacía. Errores mantienen ejemplos de recuperación y salida visible. El historial conserva hasta 100 comandos y 40 bloques renderizados. El resultado entra en 220ms con desplazamiento de 4px; la animación de arranque usa 350/650ms. Pausa local y movimiento reducido desactivan estas transiciones.

## Do's and Don'ts

### Do:
- **Do** conservar portada clásica predeterminada y paletas propias para RPG y terminal.
- **Do** mantener las proporciones aprobadas de Jorge y los pies apoyados en el suelo.
- **Do** separar escena física, lugar leído y visita; mantener todo el contenido accesible desde cuaderno e índice.
- **Do** conservar foco visible, pausa, movimiento reducido y controles táctiles.
- **Do** mantener rótulos a tamaño de pantalla, plano completo y rutas caminadas con cancelación visible.
- **Do** mantener fuentes locales con licencia y cartografías originales con autoría y límites.
- **Do** acompañar cada ruta de consola con comandos ejecutables y ejemplos comprensibles.

### Don't:
- **Don't** devolver el pueblo a un selector estático oscuro con sidebar permanente.
- **Don't** reintroducir océano/cobre ni el cuaderno lateral como sistema de la terminal activa.
- **Don't** extender Pixelify a párrafos ni aplicar JetBrains Mono a la portada clásica.
- **Don't** presentar el pueblo o sus guías ficticios como geografía o colaboradores reales.
- **Don't** cubrir evidencia con rótulos, poner anillos sobre sprites o suponer gutters iguales.
- **Don't** bloquear el portafolio detrás de logros, iniciar audio automáticamente ni ejecutar entradas de terminal.
- **Don't** escalar el texto de destinos con el mundo ni teletransportar al elegir un destino desde el plano.

La revisión independiente completa encontró dos ajustes que se corrigieron; el veredicto posterior fue `ship` limitado a esos dos ajustes puntuados, sin regresiones detectadas. No equivale a aprobación estética universal ni a una composición aprobada.

No canonizado: los glifos decorativos heredados de retorno y arranque no definen un sistema de iconos. Las advertencias de paleta ajenas a estas dos superficies no se convierten en reglas nuevas ni se reparan sin alcance. Los tokens históricos de expedición se retiran de esta documentación activa; el CSS clásico permanece fuera de esta actualización. JetBrains Mono sí queda registrado por ser una elección expresa y aplicada, no para silenciar un detector.
