---
layout: post
title: "LUZ·RM: leer los cortes de energía desde el territorio"
date: 2026-10-13 19:30:00 -0300
permalink: /bitacora/luz-rm-cortes-energia-territorio/
description: "Cómo construí LUZ·RM: datos públicos de cortes de energía, análisis espacial en el navegador, reportes PDF y avisos georreferenciados al canal oficial de Enel."
image: /assets/images/projects/luz-rm.webp
categories: [Geografía, Desarrollo]
---

Cuando se corta la luz, la pregunta es concreta: ¿qué está pasando cerca de mi casa? Para responderla hace falta relacionar una ubicación con los cortes publicados, su alcance y las horas estimadas de reposición. Un listado ayuda; un mapa conectado con sus indicadores permite leer el problema desde el barrio y la comuna.

Construí **LUZ·RM** para explorar los cortes de energía en la zona de concesión de Enel Distribución dentro de la Región Metropolitana. Reúne datos públicos, operaciones espaciales y reportes en una aplicación web que se puede abrir y usar sin instalar software.

**Es un proyecto independiente, sin afiliación con Enel.** Facilita la consulta y la preparación de avisos; la atención de emergencias, el registro de una falla y su confirmación corresponden a los canales oficiales de la distribuidora.

[Abrir LUZ·RM](https://geoidegeoidal.github.io/luz-rm/) · [Consultar el código y la documentación](https://github.com/geoidegeoidal/luz-rm)

![Captura de LUZ·RM: mapa de la Región Metropolitana, capas de cortes e indicadores operativos]({{ '/assets/images/projects/luz-rm.webp' | relative_url }})

*Captura del proyecto; los valores ilustran una consulta y no representan el estado actual del suministro.*

## Una consulta que conserva su territorio

La aplicación permite buscar una dirección y contrastarla con las geometrías publicadas, contar avisos y eventos en un radio de 500 metros, encontrar la incidencia más cercana y explorar una comuna o un área dibujada sobre el mapa. Las capas distinguen avisos de clientes, incidencias, descargos y afectación comunal: son registros diferentes y conviene leerlos como tales.

Mi decisión central fue que **mapa, indicadores, gráficos y reporte compartieran el mismo ámbito espacial**. Al seleccionar una comuna o dibujar un área, cambia el conjunto de datos de la consulta. Así, un número puede relacionarse con el territorio que se está mirando.

El reporte operativo conserva ese contexto y genera una vista imprimible de dos páginas que se puede guardar como PDF. Sirve para comunicar una consulta, comparar situaciones dentro del snapshot disponible o documentar lo que mostraba la fuente en ese momento. No constituye una certificación del suministro.

## Depurar antes de contar

Los GeoJSON públicos contienen una dificultad importante: un mismo evento puede aparecer en varias geometrías. Sumar cada registro como si fuera un corte distinto inflaría tanto el número de eventos como los clientes asociados.

El modelo depura las incidencias por identificador. Cuando distintos polígonos repiten el total de clientes de un evento, conserva el máximo en vez de sumarlos. Esa regla se aplica también a las operaciones espaciales y los reportes. La intersección entre comuna y área dibujada se calcula geométricamente, para que la consulta no incluya eventos que tocan cada zona por separado pero quedan fuera de su espacio común.

Los indicadores temporales describen el **snapshot activo**. Las edades se calculan con los eventos todavía presentes y las horas de reposición son estimaciones publicadas por la fuente. No reconstruyen un historial de cortes resueltos. Las fechas se interpretan explícitamente en `America/Santiago`, aunque el navegador se encuentre en otra zona horaria.

## Actualizar con una infraestructura pequeña

La fuente publica archivos GeoJSON, pero su servidor no permite que el navegador los lea directamente mediante CORS. Por eso separé la descarga de la consulta: un proceso de GitHub Actions obtiene los archivos y publica un espejo junto con la aplicación en GitHub Pages.

El proceso compara primero el marcador de actualización de la fuente. Descarga las capas si detecta cambios y escribe el marcador al final, evitando presentar como completo un conjunto todavía en descarga. La publicación recompila la aplicación para incorporar el nuevo snapshot.

El cron de GitHub puede ejecutarse con retraso. Para reducir esa dependencia incorporé **cron-job.org como disparador cada cinco minutos**, conservando el cron de Actions como respaldo. Usa una credencial acotada al repositorio y al permiso necesario para disparar Actions; la credencial no forma parte del sitio ni de su código público. Los artefactos temporales se eliminan después de un despliegue exitoso para evitar su acumulación.

Esta configuración no añade servicios de pago mientras el repositorio siga siendo público y use runners estándar. La frecuencia programada no garantiza datos nuevos cada cinco minutos: también intervienen la publicación de Enel, la descarga y el despliegue. Por eso el visor muestra la fecha y la antigüedad de los datos.

## Del mapa a un aviso con ubicación

La nueva opción **AVISAR FALLA A ENEL** permite usar una dirección buscada, elegir un punto del mapa o ingresar coordenadas. Se completa el tipo de falla y una descripción, y se revisa un mensaje con latitud, longitud y enlace de ubicación.

El borrador permanece en memoria dentro del navegador; LUZ·RM no lo guarda en un servidor ni pide RUT o número de cliente. Antes de abrir WhatsApp se solicita consentimiento para compartir ubicación y descripción con WhatsApp/Meta al abrir el canal y con Enel al enviar el mensaje. Los datos que la distribuidora necesite se completan directamente con ella.

**Abrir WhatsApp no envía ni registra automáticamente el aviso.** La persona revisa el mensaje, lo envía al número oficial y sigue las indicaciones de Enel hasta obtener su confirmación. No incorporé una API de recepción no documentada ni simulé una respuesta de la distribuidora.

## Las tecnologías y su función

| Tecnología | Uso en LUZ·RM |
| --- | --- |
| TypeScript y Vite | Modelo de datos, interacción y compilación del sitio estático. |
| MapLibre GL JS | Mapa, capas GeoJSON, selección y cambio de mapas base. |
| Turf.js | Intersecciones, buffers, consulta por punto y agregación espacial. |
| Apache ECharts | Indicadores y gráficos vinculados al alcance de la consulta. |
| Photon y Nominatim | Búsqueda de direcciones acotada a la RM, con validación de coordenadas. |
| GitHub Actions y GitHub Pages | Descarga del espejo, verificación y publicación. |
| cron-job.org | Disparo externo de la actualización programada. |
| Vitest y pruebas de navegador | Regresiones del modelo y de los flujos de uso. |

Las operaciones de análisis se ejecutan en el navegador. Eso permite mantener una arquitectura sin backend propio, aunque la búsqueda de direcciones, los mapas base y la apertura de WhatsApp utilizan servicios externos. El formulario de aviso no solicita GPS automáticamente.

## Beneficios y límites

Para quien consulta, el beneficio es reunir ubicación, afectación publicada y contexto comunal en una misma herramienta. Para quien necesita comunicar una situación, el PDF conserva el ámbito del análisis y el aviso prepara una descripción con ubicación. Para quienes desarrollan aplicaciones territoriales, el repositorio permite estudiar decisiones concretas sobre calidad de datos, sincronización y análisis espacial en el navegador.

Los límites son parte del diseño: la cobertura depende de la fuente y de la zona de concesión; un registro ausente no demuestra que haya suministro; la hora estimada puede cambiar y los datos pueden llegar con retraso. LUZ·RM tampoco reemplaza los [canales oficiales de emergencias de Enel](https://www.enel.cl/es/clientes/emergencias/mapa-en-linea-cortes.html).

En las actualizaciones del 13 de octubre de 2026 se verificaron 25 pruebas de Vitest, 7 de Node, compilación y recorridos de navegador para búsqueda, filtros, PDF y preparación del aviso. Las pruebas interceptan la salida a WhatsApp: no enviaron fallas ficticias a Enel.

LUZ·RM forma parte de mi trabajo para convertir datos territoriales en herramientas comprensibles y utilizables. Puedes [explorar la aplicación](https://geoidegeoidal.github.io/luz-rm/), [revisar su implementación](https://github.com/geoidegeoidal/luz-rm) o [conocer otros proyectos del portafolio]({{ '/code.html' | relative_url }}).
