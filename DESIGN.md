---
name: Atlas de expedición
description: Sistema adicional de mapa y terminal del portafolio de Jorge Ulloa; no sustituye la portada clásica.
colors:
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
  destination-selected:
    backgroundColor: "{colors.exp-raised}"
    textColor: "{colors.exp-ink}"
    padding: "10px"
---

# Design System: Atlas de expedición

## Overview

**Creative North Star: "Atlas de expedición"**

Un territorio imaginario de fantasía pixelada organiza evidencia real: puerto, archivo, observatorio, taller y escuela. El mar oscuro une la ilustración, el cuaderno de campo y la terminal; la lectura usa tipografía contemporánea y controles HTML legibles. Clientes y equipos, comunidad geográfica y futuros alumnos tienen el mismo protagonismo.

Este documento actualiza la dirección aprobada con el código terminado de `explorar.html`, `terminal.html`, `_includes/expedition.html`, `assets/css/expedition.css` y `assets/js/expedition.js`. Es una ampliación aprobada, construida desde código; la ilustración es un recurso original, no una composición de interfaz previamente aprobada. Los tokens de esta cabecera pertenecen exclusivamente a la expedición. La portada clásica conserva el atlas editorial, el logo JU, DM Sans, los mapas originales, sus superficies arena/lila/salvia y el movimiento aprobado en AGENTS.md. La franja de entrada conecta ambos sistemas sin sustituir la portada.

**Key Characteristics:**
- Isla pixelada original y cinco destinos reales como controles HTML.
- Cuaderno contextual abierto, con evidencia disponible sin completar un juego.
- Terminal local con comandos acotados y sugerencias accionables.
- Selección compartida entre vistas mediante URL.
- Superficies planas, selección cobre y lectura accesible.

## Colors

El océano oscuro sostiene texto de papel cálido; cobre y salvia distinguen selección y comandos.

### Primary
- **Cobre de ruta** (`exp-copper`): vista activa, destino seleccionado, enlaces de evidencia, cursor y foco. La ruta dibujada usa un matiz ilustrativo propio; no es otro token de controles.

### Secondary
- **Salvia de consola** (`exp-sage`): sugerencias, comandos, tecnologías y señal de sesión local.

### Neutral
- **Océano** (`exp-ocean`): fondo del documento y tinta de controles seleccionados.
- **Cuaderno** (`exp-surface`): cuaderno lateral y fondo de reserva del mapa.
- **Consola profunda** (`exp-console`): superficie de resultados de la terminal.
- **Superficie elevada** (`exp-raised`): hover y selección del índice de destinos.
- **Papel iluminado** (`exp-ink`): títulos y texto principal.
- **Tinta secundaria** (`exp-muted`): explicaciones, metadatos y controles en reposo.
- **Línea de costa** (`exp-line`): bordes y divisores discretos.

**The Selected Route Rule.** El cobre comunica una ruta elegida, una acción o el foco; los metadatos secundarios permanecen en tinta secundaria.

## Typography

**Display Font:** DM Sans local, con sans-serif de reserva.  
**Body Font:** DM Sans local, con sans-serif de reserva.  
**Label/Mono Font:** Consolas, con monospace de reserva, solo para comandos, coordenadas y numeración.

La isla aporta el lenguaje pixel; la lectura no imita una fuente de videojuego. Se conserva la voz tipográfica del portafolio.

### Hierarchy
- **Display:** título de página; pasa a 34px bajo 800px y a 30px bajo 500px.
- **Headline:** nombre del destino en el cuaderno.
- **Title:** nombre del proyecto abierto. La bienvenida de consola usa 26px, con 23px bajo 500px.
- **Body:** descripción del destino y proyecto; la introducción de página y bienvenida usan 15px. La bienvenida limita sus párrafos a 56ch.
- **Command:** campo, eco e historial de comandos. El campo sube a 16px bajo 500px; sugerencias a 13px.
- **Label:** metadatos y ayudas compactas, sin convertirlos en titulares.

**The Shared Voice Rule.** DM Sans conserva la identidad; monospace identifica contenido operativo, no títulos de presentación.

## Layout

El área principal llega a 1536px, con 32px de margen lateral; bajo 800px conserva 16px. La composición de escritorio tiene una columna flexible y cuaderno de 320px, separados por 28px. Bajo 1100px el cuaderno pasa a 280px y el espacio a 20px. Bajo 800px se apilan con 24px de separación. El selector ocupa toda la fila en móvil.

El mapa mantiene proporción 3:2 y muestra la ilustración íntegra. Los cinco controles se sitúan por coordenadas porcentuales; su índice textual permanece debajo. Las etiquetas del mapa se ocultan entre 801 y 1100px y bajo 500px; la numeración y los nombres accesibles permanecen. El índice desplegable pasa de tres columnas a dos bajo 800px y a una bajo 500px.

El cuaderno usa 24px interiores, 20px entre 801 y 1100px y bajo 500px. La consola tiene resultados desplazables: 420px de altura, 300px bajo 500px y 600px desde 1700px. Los espacios observados combinan un ritmo de 4px con separaciones concretas de composición; no se prescribe una escala ficticia para todos los elementos.

## Elevation & Depth

La jerarquía procede de superficies y líneas, sin sombras de tarjetas. El viajero ilustrado lleva una pequeña sombra de contacto (`drop-shadow(1px 3px 1px #061922)`); pertenece al dibujo y no se extiende a los controles. El cuaderno es una superficie tonal, no una ventana modal flotante.

**The Tonal Depth Rule.** Separar consola, cuaderno y controles por tono y líneas; no importar la sombra del viajero a los contenedores.

## Shapes

Formas rectangulares y esquinas rectas. Los divisores y marcos son de 1px; el foco es un contorno cobre de 2px separado 5px. Los pines tienen un pequeño tallo vertical y el viajero conserva bordes pixelados. La geometría ilustrada no exige pixelar el texto ni reducir controles.

## Components

### Buttons
Controles directos y planos. Ejecutar usa cobre sobre océano y cambia a papel iluminado en hover. Sugerencias y Volver son acciones textuales subrayadas. Los controles interactivos tienen al menos 44px de alto; los destinos y filas de proyectos usan 48px. Los pines conservan 44×44px como mínimo. Foco visible compartido en todos los controles.

### Inputs / Fields
Campo transparente dentro de una fila de consola, sin radio ni borde propio; texto monospace, cursor cobre y placeholder de tinta secundaria. El formulario permanece oculto sin JavaScript. Escape limpia el campo; flechas recorren historial; Tab completa únicamente una coincidencia inequívoca y conserva la salida por teclado.

### Navigation
Mapa, Terminal y Clásica forman un selector enmarcado. La vista activa usa cobre e indica página actual. Los enlaces Mapa/Terminal conservan destino y proyecto válidos en la URL; Atrás/Adelante restaura la selección. La navegación global y el contacto permanecen disponibles.

### Map and notebook
Ilustración original completa, cinco pines HTML y un índice equivalente. El mapa enfocado acepta flechas/WASD; la selección actualiza el cuaderno y su contador. Abrir un proyecto reemplaza el contenido e incluye Volver; el foco se conserva al reemplazar un botón del cuaderno. Los resultados muestran contexto, estado, límites y enlaces reales, con filas abiertas en vez de una cuadrícula de tarjetas.

El viajero realiza un trayecto finito de 1100ms con `ease-in-out`, usando un cruce común para cinco destinos. Se cancela con pausa global, pestaña oculta o movimiento reducido; no es una simulación de caminos. Sin imagen, los controles y el cuaderno siguen disponibles. Sin JavaScript, el índice con enlaces directos ofrece el contenido de acceso.

### Terminal
Consola real de comandos locales acotados, sin shell ni IA remota. Resultados semánticos con anuncios corteses y enlaces accionables; sugerencias evitan un inicio vacío. La sesión conserva hasta 50 comandos en memoria y limita la salida a 30 bloques; no persiste entradas. El eco del visitante usa texto, no HTML ejecutable. Mensajes desconocidos ofrecen ayuda.

## Do's and Don'ts

### Do:
- **Do** limitar estos tokens a la expedición y conservar el sistema clásico.
- **Do** mostrar cartografía e ilustración completas, sin cubrir evidencia con decoración.
- **Do** mantener índice, contacto, foco visible, controles táctiles y rutas de lectura sin juego obligatorio.
- **Do** conservar destino y proyecto válidos al cambiar entre mapa y terminal.
- **Do** respetar pausa global, movimiento reducido y estado de la pestaña.

### Don't:
- **Don't** convertir el cuaderno en una sucesión de modales ni ocultar evidencia tras logros.
- **Don't** presentar el territorio imaginario como cartografía geográfica real.
- **Don't** convertir la consola en una simulación decorativa o ejecutar entradas del visitante.
- **Don't** extender esta paleta oscura ni sus patrones a la portada clásica por inferencia.

No canonizado: los indicadores de enlace existentes con glifos de flecha se conservan en el artefacto, pero no se promueven a un sistema de iconos; son deuda de oficio fuera de este cierre documental. Las variantes históricas y tokens heredados del CSS clásico no se normalizan aquí.
