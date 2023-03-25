import { EntidadInterface } from "../interfaces/entidadInterface";
import { EstadisticasEntrenamiento } from "../interfaces/estadisticasEntrenamiento";

let contador_id = 0;
const EMPTY_ESTADISTICAS_ENTRENAMIENTO: EstadisticasEntrenamiento = { semana: { km: 0, desnivel: 0 }, mes: { km: 0, desnivel: 0 }, anio: { km: 0, desnivel: 0 } };

/**
 * Clase que representa a un grupo
 */
export class Grupo implements EntidadInterface {
  id: number;
  nombre: string;
  participantes: number[];
  estadisticasEntrenamiento: EstadisticasEntrenamiento = EMPTY_ESTADISTICAS_ENTRENAMIENTO;
  clasificacion: { id: number; km: number; desnivel: number }[] = [];
  rutasFavoritas: number[] = [];
  historicoRutas: { ruta: number; fecha: Date; }[] = [];

  constructor(nombre: string, participantes: number[]) {
    this.id = contador_id++;
    this.nombre = nombre;
    this.participantes = participantes;
  }

  getID(): number {
    return this.id;
  }

  getNombre(): string {
    return this.nombre;
  }

  getParticipantes(): number[] {
    return this.participantes;
  }

  getEstadisticasEntrenamiento(): {
    semana: { km: number; desnivel: number };
    mes: { km: number; desnivel: number };
    anio: { km: number; desnivel: number };
  } {
    return this.estadisticasEntrenamiento
  }

  getClasificacion(): { id: number; km: number; desnivel: number }[] {
    return this.clasificacion;
  }

  getRutasFavoritas(): number[] {
    return this.rutasFavoritas;
  }

  getHistoricoRutas(): { ruta: number; fecha: Date;}[] {
    return this.historicoRutas;
  }

  setID = (id: number): void => {
    this.id = id;
    if ( id > contador_id ) {
      contador_id = id = 1;
    }
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  setParticipantes(participantes: number[]): void {
    this.participantes = participantes;
  }

  setEstadisticasEntrenamiento( estadisticasEntrenamiento: {
    semana: { km: number; desnivel: number };
    mes: { km: number; desnivel: number };
    anio: { km: number; desnivel: number };
  }): void {
    this.estadisticasEntrenamiento = estadisticasEntrenamiento;
  }

  setClasificacion(clasificacion: { id: number; km: number; desnivel: number }[]): void {
    this.clasificacion = clasificacion;
  }

  setRutasFavoritas(rutasFavoritas: number[]): void {
    this.rutasFavoritas = rutasFavoritas;
  }

  setHistoricoRutas(historicoRutas: {ruta: number; fecha: Date;
  }[]): void {
    this.historicoRutas = historicoRutas;
  }

  addRutaFavorita(idRuta: number): void {
    this.rutasFavoritas.push(idRuta);
  }

  eraseRutaFavorita(idRuta: number): void {
    this.rutasFavoritas = this.rutasFavoritas.filter((id) => id !== idRuta);
  }
  
}
