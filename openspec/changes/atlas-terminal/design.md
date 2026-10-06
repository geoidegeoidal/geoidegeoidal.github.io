## Context

El sitio existente usa Jekyll y GitHub Pages, DM Sans local y un atlas editorial aprobado. Los catálogos y límites de proyectos ya están curados. Ver proposal.md para motivación.

## Goals / Non-Goals

**Goals:** dos experiencias completas con navegación accesible, lectura de evidencia y selección compartida; conservar el sitio clásico. El arte dirige la composición.

**Non-Goals:** motor de videojuegos, combate, IA conversacional, shell real, credenciales, métricas inventadas o cambiar el dominio.

## Decisions

- HTML generado por Jekyll y plantillas compartidas: reutiliza datos curados sin una segunda aplicación ni fetch de contenido externo.
- Una ilustración original de pixel art y controles HTML: mejor detalle visual y accesibilidad que construir toda la interfaz en Canvas. Personaje y rutas vectoriales son geometría interactiva sobre la ilustración.
- Cinco destinos conectados; recorrido por caminos entre nodos con teclado y clic. La lista permite saltar directamente a cualquier lugar; no hay contenido bloqueado.
- Estado en parámetros `lugar` y `proyecto`, validado contra listas locales. Los enlaces entre vistas conservan selección y funcionan con navegación nativa. El historial permite volver a selecciones anteriores.
- Consola con un conjunto explícito de comandos y resultados DOM; texto introducido nunca se evalúa ni se inyecta como HTML. Sin peticiones de red por comando.
- Movimiento se integra con `portfolio:motion`, `data-motion` y `prefers-reduced-motion`; sin bucle continuo. Los recorridos son animaciones finitas cancelables.

## Risks / Trade-offs

- [Mapa denso en móvil] → imagen íntegra, etiquetas cortas y lista de destinos táctiles de 44px.
- [Arte confundido con datos reales] → leyenda explícita de territorio imaginario, proyectos reales; no representar datos actuales simulados.
- [Deriva editorial] → proyectos y trayectoria compartidos; límites y autoría siempre visibles.
- [Cambio involuntario en portada] → integración acotada y suite de regresión existente.

## Migration Plan

Commits separados de especificación, implementación y validación. Push de rama, revisión y merge a main autorizado por el propietario. Esperar éxito de Pages y verificar ambas rutas públicas. Reversión mediante revert del commit de integración, sin force-push.
