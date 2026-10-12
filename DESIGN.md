---
name: Portafolio clásico y terminal
description: Portada editorial como entrada y consola de archivos como única alternativa.
colors:
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
  terminal-body:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  terminal-result:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "13px"
    lineHeight: 1.8
  terminal-title:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "18px"
    fontWeight: 500
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
---

# Design System: Portafolio clásico y terminal

## Overview
El portafolio clásico es la entrada principal; conserva logo JU, DM Sans, cartografías y composición editorial. La única alternativa es una terminal de lectura en grafito con JetBrains Mono. El RPG fue retirado por decisión expresa del propietario el 2026-10-11; sus materiales históricos no definen la interfaz vigente.

## Colors and typography
La consola conserva fondo #171a1c, texto #e5e2d7, metadatos #acb5b3, menta #a7d8b8 para comandos, azul #9fc8ef para rutas y ámbar #ecc58b para foco. JetBrains Mono local: entrada 16px/1.65, resultados 13px/1.85, títulos 18px/500 y etiquetas 12px. Licencia OFL en assets/fonts/jetbrains-OFL.txt. La portada conserva DM Sans y su sistema previo.

## Layout and navigation
Tras el hero, la invitación conserva superficie, tipografía y foco existentes, con texto a la izquierda y una única acción Abrir la terminal. Envuelve de forma natural en móvil; no hay ilustración del juego ni opción de mapa. Cabecera de consola: retorno al portafolio y título de sesión.

La terminal usa banco máximo de 1180px, padding horizontal 28px y salida con scroll clamp(310px,45svh,540px). A 800px o menos usa 14px laterales, salida 34svh con mínimo 240px (230px bajo 370px). El prompt conserva la entrada nativa de 16px para evitar zoom de foco en móvil. La bienvenida es un README breve: firma ASCII JU junto al saludo y la voz «Territorio, código y curiosidad». Texto y prompt disponibles desde el inicio; no hay procesos ni conexión simulados. La ventana usa borde simple, sin sombra. El índice nativo permite leer sin comandos. Foco visible, teclado, objetivos táctiles y reduced-motion permanecen vigentes.

### Terminal grammar
La interfaz corresponde a un sistema de archivos virtual de solo lectura: `ls` lista, `cd` cambia carpeta, `cat` lee y `pwd`/`tree` orientan. Las rutas admiten `~`, `/home/jorge`, rutas absolutas/relativas, `.` y `..`; las comillas agrupan argumentos. `help` ofrece un recorrido inicial y las sugerencias cambian con el último archivo leído o la carpeta. Muestran primero el propósito y después el comando exacto; Ocultar pistas permite retirarlas sin ocultar el prompt, su ayuda ni las coincidencias. Perfil, trayectoria, formación y abrir proyecto mantienen sus alias locales; ningún comando accede al equipo ni ejecuta un shell.

Tab completa una coincidencia solo al final de la línea; con varias, muestra botones que rellenan sin ejecutar y permite continuar el foco. No superpone texto fantasma. cd - intercambia la carpeta actual y anterior. Ctrl+A/E mueven el cursor; Ctrl+U/K borran antes/después. Flechas recuperan el historial de sesión; Ctrl+C cancela una línea sin selección, Ctrl+L limpia y Escape cierra primero coincidencias y después vacía. Errores ofrecen Ver archivos y Ver ejemplos. Pulsar pistas/archivos con puntero conserva el borrador y no fuerza foco al input; teclado y envío conservan el prompt. El historial conserva hasta 100 comandos y 40 bloques renderizados. La firma decorativa se dibuja en 560ms por clip-path escalonado. El eco del último comando recibe un fondo tenue de 240ms y conserva su código de salida; el cuerpo del resultado es siempre opaco y se inserta síncronamente. No hay timers, loops ni retrasos de escritura. La firma no se repite al reactivar y las animaciones se pausan en pestaña oculta. El scroll alinea el inicio del último resultado con el área de lectura. Las fichas muestran ruta del archivo, título y límites originales, con ancho máximo 72ch. Pausa local y movimiento reducido desactivan estas animaciones y conservan el feedback estático. Estado y listados muestran rutas y conteos reales; la recuperación conserva la ubicación.


### Project reading
Los listados de proyectos son filas de directorio, no tarjetas: nombre azul, archivo en metadatos y propósito legible. projectButton comparte la presentación entre ls/cd y proyectos/filtros. A 800px o menos se apilan los campos; no hay truncado de nombres ni de propósito.

Las fichas mantienen ruta y título, con estado/categoría y dl Problema/Mi aporte. Etiquetas de 12px en menta y texto a 72ch; etiquetas apiladas en móvil. Ver el resultado diferencia demo web de repositorios sin demo. Enlaces de 44px, color menta para el principal, nueva pestaña con aviso y rel seguro. El alcance original queda visible y Ficha técnica y contexto despliega stack/summary/detail completos. No se agregan métricas ni resultados no documentados. shell-output posiciona los textos accesibles absolutos dentro del scroll para evitar altura exterior acumulada.

## Retirement and continuity
explorar.html es solo una ruta de compatibilidad: redirige a terminal.html conservando la consulta, excluida del sitemap y marcada noindex. Sin JavaScript muestra enlaces a consola y portada. No carga motor ni arte RPG. El comando mapa se elimina también de ayuda y autocompletado; los alias y parámetros antiguos que resuelven contenido en la consola siguen funcionando. Nombres de secciones factuales sustituyen los nombres de edificios.

## Rules
- Conservar identidad separada de portada y consola; no recolorear la portada.
- Mantener fuentes, estados y límites reales de cada proyecto.
- No ejecutar comandos del equipo ni interpretar la entrada como HTML.
- No reintroducir juego, Pixelify ni recursos retirados sin una nueva petición.

## Verification scope
Refinamiento de consola verificado con expedition_check.cjs, terminal_polish_check.cjs y terminal_personality_check.cjs: salida inmediata incluso con animación congelada, conteos/rutas, códigos de salida, repetición, pausa y  orientación, teclado, foco táctil/borradores, ayuda, recuperación, 320–1440px, 200%, reduced-motion, no-JS y axe. Capturas de escritorio/móvil y lectura de proyecto contrastadas con fuentes. No probado en dispositivo físico ni con lector de pantalla real.

Proyectos verificados además con terminal_projects_check.cjs: diez fichas, filas compartidas, filtros, notas y acceso, conservación de sesión, altura exterior estable, responsive/axe y zoom. Apps externas: destinos y apertura comprobados, no su funcionamiento interno.
