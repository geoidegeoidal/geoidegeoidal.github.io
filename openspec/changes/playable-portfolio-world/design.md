## Context
La primera versión se desplegó como PR #1 / 1d66380; el propietario la rechazó al probarla. El nuevo alcance reemplaza la interacción y la estética del mapa, no la terminal ni el contenido factual.

## Goals / Non-Goals
**Goals:** juego top-down libre, colisiones coherentes, cinco edificios con interiores, personajes conversables, portafolio dentro del mundo y entrada directa accesible.
**Non-Goals:** combate, backend, IA de diálogo, progreso obligatorio o métricas profesionales inventadas.

## Decisions
- Canvas 2D para mundo/cámara/sprites; DOM nativo para diálogos y enlaces. No motor de juegos nuevo: el alcance requiere solo una escena exterior y una plantilla de interior parametrizada.
- Modelo geométrico compartido por colisión, rutas y pruebas; movimiento por tiempo real con delta limitado. Flechas/WASD/pad y rutas con búsqueda en cuadrícula.
- Arte original separado en sprites con transparencia; terreno cacheado. Cámara sigue al jugador. Render solo mientras esté visible y activo; DPR limitado.
- Dirección: pueblo costero soleado, césped salvia, arena, mar celeste, tejados rojos, tipografía Pixelify y diálogos marfil. Sin panel oscuro persistente ni héroe editorial gigante.
- Conversaciones de NPC ficticios contextualizan evidencia real de Jorge; catálogos y trayectoria se reutilizan sin reformular logros.
- Pausa al perder foco o abrir diálogo; Escape retorna al mundo con foco. Movimiento reducido elimina efectos ambientales, conservando desplazamiento bajo control explícito.

## Risks / Trade-offs
- [Spritemaps generados con tamaños variables] → dimensiones tomadas del recurso y recortes regulares; verificar transparencia y capturas.
- [Un mundo que parece caminable pero bloquea rutas] → probar rutas entre todos los accesos con el mismo modelo de colisión.
- [Canvas inaccesible para lectura] → diario/índice DOM con toda la evidencia, teclado y links clásicos.
- [Diseño vuelve a lo anterior] → primer viewport es el juego; no sidebar ni selector sobre una ilustración.

## Migration Plan
Nueva rama, especificación y commits. Validar mecánica con pruebas y recorridos en navegador; revisar visualmente escritorio/móvil. Publicar con autorización persistente y registrar despliegue. Rollback por revert sin force-push.
