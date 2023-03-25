/**
 * Interfaz que define el formato de las estadísticas de entrenamiento
 */
export interface EstadisticasEntrenamiento {
  semana: { km: number; desnivel: number };
  mes: { km: number; desnivel: number };
  anio: { km: number; desnivel: number };
}
