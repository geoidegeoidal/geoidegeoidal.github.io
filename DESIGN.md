---
name: Pueblo costero y terminal
description: Tres mundos separados; RPG costero luminoso, terminal océano/cobre y portada editorial conservada.
colors:
  rpg-ink: "#26382f"
  rpg-paper: "#fff2cf"
  rpg-orange: "#b8432e"
  rpg-green: "#285b48"
  rpg-line: "#9d8155"
  rpg-focus: "#9d2f27"
  rpg-hover: "#f5d68e"
  exp-ocean: "#0c202a"
  exp-surface: "#142d35"
  exp-console: "#0a1a22"
  exp-raised: "#1d3b43"
  exp-ink: "#f3eedc"
  exp-muted: "#b6c9c5"
  exp-copper: "#edbe79"
  exp-sage: "#a7d2bf"
  exp-line: "#38535b"
typography:
  rpg-display:
    fontFamily: "Pixelify, sans-serif"
    fontSize: "clamp(21px, 2.5vw, 32px)"
    fontWeight: 500
    lineHeight: 1
  rpg-headline:
    fontFamily: "Pixelify, sans-serif"
    fontSize: "32px"
    fontWeight: 500
    lineHeight: 1.1
  rpg-title:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.25
  rpg-body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  rpg-control:
    fontFamily: "Pixelify, sans-serif"
    fontSize: "18px"
    fontWeight: 500
  rpg-location:
    fontFamily: "Pixelify, sans-serif"
    fontSize: "21px"
    fontWeight: 500
  display:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "clamp(30px, 3.3vw, 48px)"
    fontWeight: 500
    lineHeight: 1.14
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "29px"
    fontWeight: 500
    lineHeight: 1.13
    letterSpacing: "-0.03em"
  title:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "26px"
    fontWeight: 500
    lineHeight: 1.2
  body:
    fontFamily: "'DM Sans', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.7
  command:
    fontFamily: "Consolas, monospace"
    fontSize: "14px"
  label:
    fontFamily: "'DM Sans', sans-serif"
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
    backgroundColor: "{colors.exp-copper}"
    textColor: "{colors.exp-ocean}"
    rounded: "{rounded.square}"
    padding: "8px 14px"
  execute-hover:
    backgroundColor: "{colors.exp-ink}"
    textColor: "{colors.exp-ocean}"
  command-input:
    backgroundColor: "transparent"
    textColor: "{colors.exp-ink}"
    typography: "{typography.command}"
    rounded: "{rounded.square}"
    padding: "12px 4px"
  view-link:
    textColor: "{colors.exp-muted}"
    padding: "10px 18px"
  view-link-selected:
    backgroundColor: "{colors.exp-copper}"
    textColor: "{colors.exp-ocean}"
  notebook:
    backgroundColor: "{colors.exp-surface}"
    textColor: "{colors.exp-ink}"
    rounded: "{rounded.square}"
    padding: "24px"
  command-suggestion:
    backgroundColor: "transparent"
    textColor: "{colors.exp-sage}"
    padding: "8px 0"
  rpg-button:
    backgroundColor: "{colors.rpg-paper}"
    textColor: "{colors.rpg-ink}"
    rounded: "{rounded.square}"
    padding: "10px 16px"
  rpg-button-hover:
    backgroundColor: "{colors.rpg-hover}"
  rpg-start:
    backgroundColor: "{colors.rpg-green}"
    textColor: "{colors.rpg-paper}"
    rounded: "{rounded.square}"
    padding: "10px 16px"
  rpg-dialog:
    backgroundColor: "{colors.rpg-paper}"
    textColor: "{colors.rpg-ink}"
    rounded: "{rounded.square}"
    padding: "0"
  rpg-location:
    backgroundColor: "{colors.rpg-paper}"
    textColor: "{colors.rpg-ink}"
    typography: "{typography.rpg-location}"
    padding: "10px 16px"
---

# Design System: Pueblo costero y terminal

## Overview

**Creative North Star: "Pueblo costero, trabajo real"**

La exploración de Jorge habita un pueblo costero luminoso: mar azul, pasto salvia, caminos de arena, edificios de estuco y tejas rojas. El cuerpo, los objetos y los lugares tienen presencia pixelada; la evidencia profesional se lee con calma en papel crema. Jorge conserva pelo a hombros, lentes, barba corta, chaqueta verde y el cuerpo más gordito solicitado por el propietario.

Este sistema documenta tres ámbitos separados. Los tokens `rpg-*` describen `explorar.html`, su layout independiente y `rpg-world.css`/`rpg-world.js`; sus cinco variables de interfaz corresponden a `--ink`, `--paper`, `--orange`, `--green` y `--line`. Los tokens `exp-*` y las jerarquías sin prefijo conservan la terminal de `expedition.css`. La portada clásica mantiene el atlas editorial, logo JU, DM Sans, cartografías originales y superficies arena/lila/salvia. El pueblo reemplaza únicamente el mapa estático rechazado; no redefine el resto del portafolio.

**Key Characteristics:**
- Pueblo luminoso con personajes, edificios e interiores pixelados.
- Pixelify local para identidad del juego y DM Sans local para lectura.
- Controles crema discretos y evidencia accesible sin progresión obligatoria.
- Terminal de océano, cobre y comandos locales; portada editorial independiente.
- Profundidad ilustrada con pies y señales anclados al suelo.

## Colors

La interfaz del juego usa papel cálido, tinta vegetal y acentos de arcilla; la terminal conserva su contraste nocturno.

### Primary
- **Verde de acción** (`rpg-green`): comenzar, enlaces y selección de texto en el juego.
- **Cobre de consola** (`exp-copper`): acciones, vista seleccionada y foco de la terminal.

### Secondary
- **Arcilla** (`rpg-orange`): marcador de lugar y hover de enlaces.
- **Rojo de foco** (`rpg-focus`): contorno de teclado en la interfaz luminosa.
- **Salvia de consola** (`exp-sage`): comandos sugeridos y tecnologías de la terminal.

### Neutral
- **Papel de viaje** (`rpg-paper`): cabecera, rótulos, controles y diálogos.
- **Tinta vegetal** (`rpg-ink`): texto principal y marcos del juego.
- **Línea de arena** (`rpg-line`): divisores y borde inferior de los indicadores.
- **Papel al sol** (`rpg-hover`): hover de los botones comunes.
- **Océano, cuaderno y consola profunda** (`exp-ocean`, `exp-surface`, `exp-console`): fondos exclusivos de terminal.
- **Superficie elevada, papel iluminado, tinta secundaria y línea de costa** (`exp-raised`, `exp-ink`, `exp-muted`, `exp-line`): estados y jerarquía de lectura de terminal.

Los colores del terreno y los interiores pertenecen a la ilustración Canvas. No son sustitutos de los colores de lectura ni una nueva paleta global.

**The Separate Worlds Rule.** Aplicar cada paleta solo en su ruta; un cambio en el pueblo no recolorea terminal ni portada clásica.

## Typography

**Display Font:** Pixelify local, con sans-serif de reserva, para el juego; DM Sans local para terminal y portada.
**Body Font:** DM Sans local, con sans-serif de reserva.
**Label/Mono Font:** Pixelify en lugares y personajes del pueblo; Consolas con monospace de reserva para comandos de terminal.

### Hierarchy
- **RPG display:** título de cabecera, con variante móvil de 24px.
- **RPG headline:** encabezado del diálogo; 27px bajo 650px. La bienvenida usa 35px/1.05 y 30px en móvil.
- **RPG title / body:** encabezados de evidencia y lectura del diálogo. El cuerpo hereda el tamaño normal del navegador (16px); no lo pixelar.
- **RPG control / location:** botones de cabecera y ubicación actual. En móvil pasan a 16px y 18px respectivamente.
- **Terminal display / headline / title / body:** título de página, destino en cuaderno, proyecto y descripción, conservados de la experiencia anterior.
- **Terminal command / label:** entrada y eco de comandos, y metadatos. El campo llega a 16px bajo 500px.

**The Readable Evidence Rule.** Pixelify identifica el mundo; los párrafos, los límites y la trayectoria se leen en DM Sans.

## Layout

El juego ocupa el ancho disponible bajo una barra compacta. En escritorio la cabecera tiene altura mínima de 76px y padding de 10px 28px; el escenario mide `calc(100svh - 154px)` con mínimo de 390px. A 650px o menos, la cabecera se envuelve, pasa a 98px mínimos y el escenario a `calc(100svh - 190px)` con mínimo de 440px. El pie y el índice quedan en el flujo del documento, permitiendo scroll en pantallas cortas.

La cámara sigue al personaje; el mundo no tiene que verse completo a la vez. Ubicación arriba, compañero e interacción abajo. El pad aparece para puntero grueso, con botones de 48px y separación de 4px. La bienvenida desaparece al comenzar. El cuaderno se abre a demanda en el mismo diálogo que conversaciones y evidencia, sin una columna de lectura permanente.

El diálogo alcanza 710px de ancho, conserva 16px por lado y máximo de 85svh de alto. Sus interiores usan 20–26px y 16px en móvil. El índice sin juego llega a 900px. La terminal conserva área de 1536px, columna contextual de 320px, variante de 280px bajo 1100px y apilado bajo 800px. Su salida mide 420px de alto, 300px bajo 500px y 600px desde 1700px.

## Elevation & Depth

La profundidad del pueblo nace de la ilustración, del orden de dibujo y de sombras de contacto suaves. Cada actor apoya sus pies en su posición lógica. Los anillos de interacción se dibujan antes que personajes y muebles, incluidas las salidas interiores. Los rótulos de evidencia se separan del mobiliario para conservar lectura.

La bienvenida y el diálogo emplean sombras difusas: `6px 12px 30px #26382f40` y `8px 12px 40px #1b322b45`. El fondo del diálogo oscurece el mundo con `#183d3c99`. Los controles no llevan sombras duras desplazadas. La terminal sigue siendo plana, separada por tonos y líneas.

**The Grounded World Rule.** Las señales de suelo permanecen bajo actores y objetos; ninguna etiqueta tapa la evidencia que nombra.

## Shapes

La interfaz usa rectángulos de esquina recta, bordes de 2px en botones y 3px en cabecera y diálogo. El foco del juego usa contorno rojo de 3px separado 4px; dentro del Canvas se dibuja hacia dentro. El pixelado pertenece al arte y la tipografía de juego, no a recortar el tamaño táctil. La terminal conserva divisores de 1px y foco cobre de 2px separado 5px.

## Components

### Buttons
Botones crema con tinta vegetal y hover de papel al sol, mínimo de 44px de alto. Comenzar usa verde con papel y hover verde más profundo. Las filas del cuaderno y proyectos alinean texto a la izquierda y permiten envolver en móvil. Deshabilitado reduce opacidad a 0.65. Terminal conserva Ejecutar cobre y sugerencias textuales salvia.

### Inputs / Fields
El juego no introduce formularios. La terminal conserva el campo transparente, monospace, cursor cobre, placeholder secundario y acciones de historial/autocompletado acotadas.

### Navigation
La cabecera del juego reúne JU, título, Cuaderno, Pausar y Terminal. JU vuelve al sitio clásico; el enlace Terminal lleva selección válida de lugar/proyecto. La terminal conserva su selector Mapa/Terminal/Clásica. No aplicar el selector oscuro a la barra del juego.

### Dialogue and notebook
Un diálogo HTML nativo contiene conversaciones, proyectos y cuaderno. Mantiene cierre visible, Escape y retorno de foco. Su título Pixelify y cuerpo DM Sans establecen la separación entre ficción y evidencia. Los NPC se declaran ficticios. El cuaderno permite leer cualquier destino o visitarlo directamente; el índice HTML ofrece acceso sin JavaScript.

### Playable world
Arte original de edificios, objetos y actores con alpha y procedencia conservados. Jorge usa `rpg-jorge.png`; el recorte de actores utiliza límites opacos medidos, no celdas supuestas. Caminata con teclado, destino al pulsar el suelo y pad táctil; cámara cercana, colisiones, cinco interiores y rótulos ligados al lugar. La pausa detiene el juego; perder foco u ocultar la pestaña lo pausa. Movimiento reducido fija el fotograma de caminata, conservando el desplazamiento solicitado por la persona. Los diálogos detienen la entrada y el bucle de juego.

### Terminal
Comandos locales reales y acotados, resultados semánticos y sugerencias accionables. Conserva su cuaderno contextual plano y sus límites de salida. Comparte los templates factuales con el juego; la presentación sigue perteneciendo a su mundo visual propio.

## Do's and Don'ts

### Do:
- **Do** limitar tokens y fuentes de juego a explorar.html y conservar terminal y portada.
- **Do** mantener las proporciones aprobadas de Jorge y los pies apoyados en el suelo.
- **Do** mantener cuaderno, índice, contacto y evidencia accesibles sin completar el juego.
- **Do** conservar foco visible, pausa, movimiento reducido y controles táctiles.
- **Do** preservar originales cartográficos, alpha y procedencia del arte generado.

### Don't:
- **Don't** devolver el pueblo a un selector estático oscuro con sidebar permanente.
- **Don't** extender Pixelify a párrafos ni la paleta RPG a la terminal o portada.
- **Don't** presentar el pueblo o sus guías ficticios como geografía o colaboradores reales.
- **Don't** cubrir evidencia con rótulos, poner anillos sobre sprites o suponer gutters iguales.
- **Don't** bloquear el portafolio detrás de logros ni ejecutar entradas de terminal.

No canonizado: los glifos de flecha heredados en enlaces de terminal no se convierten en un sistema de iconos. Los tokens históricos del CSS clásico quedan fuera de esta actualización; el mapa estático y su viaje finito ya no definen la ruta explorar.html.
