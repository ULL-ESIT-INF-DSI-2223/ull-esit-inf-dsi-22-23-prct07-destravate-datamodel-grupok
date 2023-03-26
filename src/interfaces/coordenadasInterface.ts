/**
 * Interfaz que define las coordenadas de un puno en formato DD
 * latitud: número que representa la latitud
 * longitud: número que representa la longitud
 * @example "{ latitud: 40.4167754, longitud: -3.7037902 }"
 */
export interface Coordenadas {
  latitud: number;
  longitud: number;
}

/**
 * Función que permite transformas una string con coordenadas a una instancia de al propia clase
 * @param coordenadas Coordenadas en formato string
 * @returns Coordenadas en su formato
 */
export function stringToCoordenadas(coordenadas: string): Coordenadas {
  const [latitud, longitud] = coordenadas.split(' ');
  return { latitud: Number(latitud), longitud: Number(longitud) };
}
/**
 * Función que realiza comprobaciones sobre las coordenadas
 * @param coordenadas Coordenadas a comprobar
 */
export function checkCoordenadas(coordenadas: Coordenadas): void {

  // Comprueba si las coordenadas están dentro de los límites permitidos
  const maxLatitud = 90;
  const minLatitud = -90;
  const maxLongitud = 180;
  const minLongitud = -180;

  if (coordenadas.latitud > maxLatitud || coordenadas.latitud < minLatitud) {
    throw new Error('Las coordenadas no son válidas tienen que ser entre -90 y 90 y se escriben así 40.4167754 -3.7037902');

  }

  if (coordenadas.longitud > maxLongitud || coordenadas.longitud < minLongitud) {
    throw new Error('Las coordenadas no son válidas tienen que ser entre -180 y 180 y se escriben así 40.4167754 -3.7037902');

  }
}