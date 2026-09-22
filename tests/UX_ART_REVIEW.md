# Laws of UX review

Scope: dirección artística local, 2026-09-22. Portada, perfil, proyectos, herramientas y contacto; cabeceras compartidas de Mapas/Código/Blog. Objetivo primario: explorar trabajo y acceder a proyectos/contacto. Se reutilizan navegación, selector de mapas, formulario y pausa existentes. Anchos automatizados 320-1920 px; capturas inspeccionadas a 390/1440; teclado y ratón mediante Playwright/Edge.

### Findings

| Severity | Law | Evidence and impact | Location | Smallest correction |
| --- | --- | --- | --- | --- |
| medium, resuelto | Active User Paradox / Doherty Threshold | Al enfocar un enlace de una sección entrante, el bloque conservaba opacidad parcial durante la transición. El foco podía quedar difícil de ver. | motion.css, reveal:focus-within | Mostrar inmediatamente el bloque enfocado, sin transición. Regresión en art_direction_check.cjs. |
| low, resuelto | Law of Proximity | Primera captura: aro cromático demasiado próximo a la leyenda del globo. | .atlas-stage::before | Aumentar inset de 3% a 7%; nueva captura revisada. |

Sin nuevos hallazgos abiertos en este alcance; las pruebas no constituyen una auditoría integral de accesibilidad.

### Matrix

| Law | Status | Evidence or reason not applicable |
| --- | --- | --- |
| Selective Attention | applied | CTA amarillo se distingue del fondo oscuro; aro lento alrededor del globo, fuera de la columna de texto. |
| Cognitive Load | compliant | No se agregaron elecciones, instrucciones ni controles; se reutiliza pausa. |
| Aesthetic-Usability Effect | applied | Tintas de ConMapas repetidas en portada, superficies y retrato; capturas y axe revisados. No se midió percepción con usuarios. |
| Serial Position Effect | compliant | Presentación y contacto mantienen sus posiciones; no se reordenó el contenido. |
| Goal-Gradient Effect | not applicable | No se introdujo una tarea por etapas ni un indicador de progreso nuevo. |
| Von Restorff Effect | applied | Amarillo reservado para acciones destacadas en portada; textos sobre colores estables. |
| Zeigarnik Effect | compliant | Suite browser_check conserva datos ante errores simulados de Formspree. No hay persistencia nueva. |
| Flow | applied | Globo conserva arrastre; animación decorativa se suspende fuera de vista y con pestaña oculta. |
| Chunking | applied | Superficies diferencian perfil, proyectos y herramientas; se conservan grupos semánticos. |
| Working Memory | compliant | Nombres, niveles, selector y estado elegido se mantienen visibles; prueba del selector pasa. |
| Occam's Razor | applied | Dos archivos de implementación, sin dependencias, sin loop de animación adicional. |
| Uniform Connectedness | applied | Tintas repetidas en franja y progreso de lectura; secciones siguen agrupadas por su fondo. |
| Fitts's Law | compliant | Sin cambios al dimensionamiento de controles táctiles; CTA y selector siguen operables. La nueva decoración no intercepta puntero. |
| Hick's Law | compliant | Misma navegación y cinco opciones cartográficas, sin nuevas decisiones. |
| Jakob's Law | compliant | Enlaces, botones, menú y dialog nativos; sin cursor personalizado ni scroll intervenido. |
| Law of Similarity | applied | Botones comparten microinteracción; no se subrayan títulos que no son enlaces. |
| Miller's Law | compliant | Se mantienen las áreas de herramientas; no se agregan elementos a sus listas. |
| Parkinson's Law | not applicable | Cambio decorativo; no hay plazos ni duración de tareas que reducir. |
| Postel's Law | not applicable | No se modifican parsing, validación ni formatos de entrada. |
| Law of Proximity | applied | Aro separado de la leyenda tras inspección; se conserva relación entre nombre, nivel y evidencia. |
| Law of Prägnanz | applied | Aro simple y superficies planas; texto sin deformación, tipografía existente. |
| Law of Common Region | applied | Perfil arena, proyectos lila, herramientas salvia y contacto verde separan contenidos. |
| Tesler's Law | applied | Preferencia de movimiento única gobierna los efectos nuevos; observador existente controla visibilidad. |
| Mental Model | compliant | Obras originales no recoloreadas; decoración del globo no representa datos ni porcentajes. |
| Active User Paradox | applied | Foco revela contenido inmediatamente; controles disponibles sin manual. |
| Pareto Principle | applied | Intervención concentrada en portada y recorrido principal. Prioridad de diseño, no inferencia de analítica. |
| Peak-End Rule | applied | Portada cromática y cierre verde profundo con borde naranja; no se afirma impacto emocional medido. |
| Cognitive Bias | compliant | No se modifican cifras, testimonios ni disponibilidad; sin urgencia añadida. |
| Choice Overload | compliant | Sin temas seleccionables ni panel adicional de personalización. |
| Doherty Threshold | applied | Foco inmediato, hover de 300 ms y selector con feedback existente; no se midió latencia real en dispositivos lentos. |

### Verification

- `bundle exec jekyll build`: passed.
- `python tests/check_site.py _site`: passed, 8 páginas.
- `node tests/seo_check.cjs`: passed.
- `node --check assets/js/motion.js`: passed.
- `node tests/art_direction_check.cjs`: passed (movimiento, pausa, fuera de pantalla, pestaña oculta, foco, reduced-motion, sin JS, reflow con CSS zoom 200%, cuatro anchos).
- `node tests/browser_check.cjs`: passed (TEST_SITE_URL=http://127.0.0.1:4176, BROWSER_CHANNEL=msedge); sin errores JS, recursos fallidos ni infracciones axe en su alcance.
- `node tests/motion_check.cjs`: passed (mismo servidor/canal), incluyendo geolocalización simulada y fallbacks.
- `node tests/responsive_reading_check.cjs`: passed (320/390/768/1024/1440/1920).
- `node tests/map_selector_check.cjs`: passed.
- Manual: inspección visual de capturas reales a 390/1440 de portada, retrato y contenido. Teclado/Escape/retorno de foco y estados de formulario ejercitados por la suite, no con lector de pantalla humano.

Producción: commit d7f9bfa desplegado por Pages (run 35794290581, success). art_direction_check.cjs también pasó con TEST_SITE_URL=http://julloa.space.

Residual gaps: Safari/Firefox, lector de pantalla, tacto físico, zoom nativo del navegador (la prueba usa CSS zoom), Core Web Vitals y evaluación con usuarios no ejecutados. HTTPS pendiente de certificado válido, comprobación de producción hecha por HTTP.
