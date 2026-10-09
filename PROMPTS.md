<!-- STREAMING_CHUNK:Escribiendo encabezado y Prompt 1... -->
# Registro de Prompts · Encargo #24: Contagio - Frena el Brote

Este documento contiene los 6 prompts utilizados en el desarrollo iterativo del proyecto, estructurados en base a los requerimientos de la consigna y las etapas de desarrollo.

---

## 1. Inicio y Estructura Base
**Objetivo:** Crear la estructura inicial del proyecto en Vite con TypeScript.

> "Crea la estructura inicial para una aplicación web con Vite y TypeScript llamada 'Contagio: Frena el brote'. Incluye la configuración básica del proyecto, archivo index.html y la arquitectura inicial de archivos."

---

## 2. Reglas de Negocio y Lógica
**Objetivo:** Implementar la lógica pura de la epidemia en `src/logica.ts`.

> "Escribe la lógica del simulador en TypeScript para una cuadrícula de 6x6 (36 personas). Define los estados (sana, contagiada, aislada, recuperada). El paciente cero arranca en (2,2). Permite aislar hasta 5 personas sanas, activar medidas sanitarias por 3 días (baja la probabilidad de contagio del 50% al 20%), y avanzar de día recuperando infectados a los 3 días. Define derrota si se alcanzan 14 o más contagiados acumulados."

---

## 3. Pruebas Unitarias
**Objetivo:** Crear la suite de tests en `test/logica.test.ts`.

> "Escribe 5 pruebas unitarias con Vitest para validar la lógica pura de src/logica.ts: 1) Estado inicial y paciente cero, 2) Resta de aislamientos al aislar una persona sana, 3) Impedir aislar a contagiados, 4) Permitir activar medidas sanitarias solo una vez, y 5) Recorrido simulado completo hasta la resolución."

---

## 4. Interfaz Visual
**Objetivo:** Vincular la lógica con la interfaz HTML/CSS en `index.html` y `main.ts`.

> "Crea la interfaz gráfica para el simulador con un diseño estilo ciberpunk/médico futurista. Muestra el tablero de 6x6, las tarjetas HUD con el día actual, infectados activos, histórico y aislamientos restantes, junto con botones para activar medidas sanitarias, pasar de día y reiniciar."

---

## 5. Experiencia Móvil y Tactilidad
**Objetivo:** Optimizar el control táctil y efectos de sonido.

> "Asegura que todos los elementos interactivos tengan un tamaño táctil mínimo de 44x44px para dispositivos móviles. Agrega soporte para eventos táctiles directos en las celdas del tablero y añade efectos de audio sintetizado con Web Audio API para aislar, activar medidas, avanzar día, ganar y perder."

---

## 6. Documentación y Publicación
**Objetivo:** Generar la documentación final y los datos para la ficha.

> "Genera la documentación completa para el proyecto, incluyendo la plantilla de la ficha del Encargo #24, la guía de los 6 commits obligatorios, el probador de tests integrado y el archivo PROMPTS.md con el historial de desarrollo."