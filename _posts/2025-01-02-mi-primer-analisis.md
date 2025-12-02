---
layout: post
title: "Tutorial: Código y Mapas en mi Portafolio"
date: 2025-01-02
categories: [Python, GIS]
---

Este es un ejemplo  práctico de cómo se ven los contenidos técnicos en mi nueva bitácora.

## 1. Insertando Código Python
El sistema resalta los bloques de código automáticamente:

```python
import geopandas as gpd
import matplotlib.pyplot as plt
```
## Cargar dataset de incendios
```python 
gdf = gpd.read_file("incendios.shp")
```
## Visualización rápida
```python
gdf.plot(column='area_quemada', cmap='Reds')
print(">> Proceso finalizado")
```