export const CONFIG = {
  FILAS: 6,
  COLUMNAS: 6,
  TOTAL_PERSONAS: 36,
  MAX_AISLAMIENTOS: 5,
  DURACION_MEDIDAS_DIAS: 3,
  USOS_MEDIDAS_MAX: 1,
  PROB_CONTAGIO_BASE: 0.5,
  PROB_CONTAGIO_MEDIDAS: 0.2,
  DIAS_DURACION_INFECCION: 3,
  UMBRAL_CONTAGIO_MAX_PERSONAS: 14,
  POSICION_INICIAL_FILA: 2,
  POSICION_INICIAL_COLUMNA: 2,
  SEMILLA_PREDETERMINADA: 12345,
} as const;

export type EstadoPersona = 'sana' | 'contagiada' | 'aislada' | 'recuperada';
export type EstadoJuego = 'inicio' | 'jugando' | 'exito' | 'fracaso';

export interface Persona {
  id: number;
  fila: number;
  columna: number;
  estado: EstadoPersona;
  diasContagiada: number;
}

export interface EstadoSimulacion {
  grid: Persona[][];
  diaActual: number;
  aislamientosRestantes: number;
  medidasUsadas: boolean;
  diasMedidasRestantes: number;
  totalContagiadasHistorico: number;
  contagiadasActivas: number;
  estadoJuego: EstadoJuego;
  ultimoMensajeError?: string;
}

export function crearGeneradorAzar(semilla: number = CONFIG.SEMILLA_PREDETERMINADA): () => number {
  let s = semilla >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function crearEstadoInicial(): EstadoSimulacion {
  const grid: Persona[][] = [];
  let contadorId = 0;

  for (let f = 0; f < CONFIG.FILAS; f++) {
    const fila: Persona[] = [];
    for (let c = 0; c < CONFIG.COLUMNAS; c++) {
      const esPacienteCero =
        f === CONFIG.POSICION_INICIAL_FILA && c === CONFIG.POSICION_INICIAL_COLUMNA;

      fila.push({
        id: contadorId++,
        fila: f,
        columna: c,
        estado: esPacienteCero ? 'contagiada' : 'sana',
        diasContagiada: esPacienteCero ? 1 : 0,
      });
    }
    grid.push(fila);
  }

  return {
    grid,
    diaActual: 1,
    aislamientosRestantes: CONFIG.MAX_AISLAMIENTOS,
    medidasUsadas: false,
    diasMedidasRestantes: 0,
    totalContagiadasHistorico: 1,
    contagiadasActivas: 1,
    estadoJuego: 'inicio',
  };
}

export function aislarPersona(
  estado: EstadoSimulacion,
  fila: number,
  columna: number
): boolean {
  if (estado.estadoJuego === 'exito' || estado.estadoJuego === 'fracaso') {
    estado.ultimoMensajeError = 'La partida ya finalizó.';
    return false;
  }

  if (fila < 0 || fila >= CONFIG.FILAS || columna < 0 || columna >= CONFIG.COLUMNAS) {
    estado.ultimoMensajeError = 'Posición fuera de rango.';
    return false;
  }

  if (estado.aislamientosRestantes <= 0) {
    estado.ultimoMensajeError = 'No quedan aislamientos disponibles.';
    return false;
  }

  const persona = estado.grid[fila][columna];
  if (persona.estado !== 'sana') {
    estado.ultimoMensajeError = 'Solo se puede aislar a personas sanas.';
    return false;
  }

  persona.estado = 'aislada';
  estado.aislamientosRestantes -= 1;
  if (estado.estadoJuego === 'inicio') estado.estadoJuego = 'jugando';

  return true;
}

export function activarMedidas(estado: EstadoSimulacion): boolean {
  if (estado.estadoJuego === 'exito' || estado.estadoJuego === 'fracaso') return false;
  if (estado.medidasUsadas) return false;

  estado.medidasUsadas = true;
  estado.diasMedidasRestantes = CONFIG.DURACION_MEDIDAS_DIAS;
  if (estado.estadoJuego === 'inicio') estado.estadoJuego = 'jugando';

  return true;
}

function obtenerVecinosOrtogonales(fila: number, columna: number): { f: number; c: number }[] {
  const vecinos: { f: number; c: number }[] = [];
  const dirs = [{ f: -1, c: 0 }, { f: 1, c: 0 }, { f: 0, c: -1 }, { f: 0, c: 1 }];

  for (const d of dirs) {
    const nf = fila + d.f;
    const nc = columna + d.c;
    if (nf >= 0 && nf < CONFIG.FILAS && nc >= 0 && nc < CONFIG.COLUMNAS) {
      vecinos.push({ f: nf, c: nc });
    }
  }
  return vecinos;
}

export function pasarAlSiguienteDia(
  estado: EstadoSimulacion,
  rng: () => number = crearGeneradorAzar()
): boolean {
  if (estado.estadoJuego === 'exito' || estado.estadoJuego === 'fracaso') return false;
  if (estado.estadoJuego === 'inicio') estado.estadoJuego = 'jugando';

  estado.diaActual += 1;
  const prob = estado.diasMedidasRestantes > 0 ? CONFIG.PROB_CONTAGIO_MEDIDAS : CONFIG.PROB_CONTAGIO_BASE;

  const contagiadosAlInicio: Persona[] = [];
  for (let f = 0; f < CONFIG.FILAS; f++) {
    for (let c = 0; c < CONFIG.COLUMNAS; c++) {
      if (estado.grid[f][c].estado === 'contagiada') {
        contagiadosAlInicio.push(estado.grid[f][c]);
      }
    }
  }

  const nuevosContagios: { f: number; c: number }[] = [];
  for (const p of contagiadosAlInicio) {
    const vecinos = obtenerVecinosOrtogonales(p.fila, p.columna);
    for (const v of vecinos) {
      if (estado.grid[v.f][v.c].estado === 'sana') {
        if (rng() < prob) nuevosContagios.push(v);
      }
    }
  }

  for (const coord of nuevosContagios) {
    const p = estado.grid[coord.f][coord.c];
    if (p.estado === 'sana') {
      p.estado = 'contagiada';
      p.diasContagiada = 1;
      estado.totalContagiadasHistorico += 1;
    }
  }

  for (const p of contagiadosAlInicio) {
    p.diasContagiada += 1;
    if (p.diasContagiada > CONFIG.DIAS_DURACION_INFECCION) {
      p.estado = 'recuperada';
    }
  }

  if (estado.diasMedidasRestantes > 0) estado.diasMedidasRestantes -= 1;

  let activas = 0;
  for (let f = 0; f < CONFIG.FILAS; f++) {
    for (let c = 0; c < CONFIG.COLUMNAS; c++) {
      if (estado.grid[f][c].estado === 'contagiada') activas += 1;
    }
  }
  estado.contagiadasActivas = activas;

  if (estado.totalContagiadasHistorico >= CONFIG.UMBRAL_CONTAGIO_MAX_PERSONAS) {
    estado.estadoJuego = 'fracaso';
  } else if (estado.contagiadasActivas === 0) {
    estado.estadoJuego = 'exito';
  }

  return true;
}