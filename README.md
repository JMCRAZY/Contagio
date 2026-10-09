# ☣️ Contagio: Frena el Brote

> **Encargo #24** · Simulador táctico epidemiológico desarrollado con **Vite**, **TypeScript** y **Vitest**.

---

## 📌 Descripción del Proyecto

**Contagio: Frena el brote** es una simulación de propagación de virus en una cuadrícula de $6 \times 6$ (36 habitantes). El objetivo del jugador es actuar como gestor sanitario para contener la epidemia aislando a personas sanas y aplicando medidas profilácticas antes de que el virus infecte al 40% de la población.

---

## 🎮 Reglas y Mecánicas del Juego

- **Población:** 36 personas en una cuadrícula de $6 \times 6$.
- **Paciente Cero:** Comienza contagiado en la posición `(2, 2)`.
- **Aislamientos Tácticos:** Puedes aislar hasta **5 personas sanas** para bloquear la propagación del virus a celdas vecinas.
- **Medidas Sanitarias:** Puedes activar **1 sola vez** una medida global por **3 días**, lo que reduce la probabilidad de contagio del $50\%$ al $20\%$.
- **Evolución de la Infección:** Una persona contagiada se recupera automáticamente tras **3 días** de infección.
- **Condiciones de Victoria/Derrota:**
  - **Victoria:** Lograr $0$ casos contagiados activos manteniendo el total acumulado por debajo de $14$ personas.
  - **Derrota:** Superar o alcanzar el umbral de **14 contagiados acumulados** ($\ge 40\%$ de la población).

---

## 📁 Estructura del Proyecto

```text
contagio/
├── index.html          # Interfaz principal de la aplicación y vista previa
├── package.json        # Configuración de dependencias y scripts
├── tsconfig.json       # Configuración del compilador de TypeScript
├── PROMPTS.md          # Registro documentado de los 6 prompts de desarrollo
├── README.md           # Ficha técnica y documentación del proyecto
├── test/
│   └── logica.test.ts  # Suite de 5 pruebas unitarias con Vitest
└── src/
    ├── logica.ts       # Modelo de dominio y reglas de negocio puras
    ├── main.ts         # Controlador de interfaz, eventos DOM y Web Audio API
    └── style.css       # Estilos visuales con estética futurista/médica
```

---

## 🚀 Instalación y Ejecución

1. **Clonar o descargar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd contagio
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar en modo desarrollo:**
   ```bash
   npm run dev
   ```
   Abre la dirección que indica la consola (generalmente `http://localhost:5173`).

4. **Ejecutar pruebas unitarias (Vitest):**
   ```bash
   npx vitest
   ```

---

## 📌 Historial de Commits Obligatorios

Para cumplir con la consigna del encargo, el historial del repositorio debe contener los siguientes 6 commits exactos:

1. `git commit -m "inicio: proyecto creado"`
2. `git commit -m "reglas: logica desde mi ficha"`
3. `git commit -m "pruebas: reglas comprobadas"`
4. `git commit -m "pantalla: interfaz basica"`
5. `git commit -m "movil: funciona con el dedo"`
6. `git commit -m "docs: readme y publicacion"`