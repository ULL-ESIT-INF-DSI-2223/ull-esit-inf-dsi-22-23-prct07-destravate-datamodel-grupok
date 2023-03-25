/**
 * Interfaz que define las coordenadas de un puno en formato DD
 * latitud: número que representa la latitud
 * longitud: número que representa la longitud
 * ej: { latitud: 40.4167754, longitud: -3.7037902 }
 */
export interface Coordenadas {
  latitud: number;
  longitud: number;
}

export function stringToCoordenadas(coordenadas: string): Coordenadas {
  const [latitud, longitud] = coordenadas.split(' ');
  return { latitud: Number(latitud), longitud: Number(longitud) };
}
