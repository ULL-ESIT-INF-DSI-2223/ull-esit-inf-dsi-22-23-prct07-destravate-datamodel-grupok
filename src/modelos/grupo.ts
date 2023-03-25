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
  creador: number;
  participantes: number[] = [];
  estadisticasEntrenamiento: EstadisticasEntrenamiento = EMPTY_ESTADISTICAS_ENTRENAMIENTO;
  clasificacion: { id: number; km: number; desnivel: number }[] = [];
  rutasFavoritas: number[] = [];
  historicoRutas: { ruta: number; fecha: Date; }[] = [];

  constructor(nombre: string, creador: number) {
    if (nombre === '') {
      throw new Error('Nombre de grupo vacío');
    }
    contador_id++;
    this.id = contador_id;
    this.nombre = nombre;
    this.creador = creador;
  }

  getID(): number {
    return this.id;
  }

  getNombre(): string {
    return this.nombre;
  }

  getCreador(): number {
    return this.creador;
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
      contador_id = id;
    }
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  setCreador(creador: number): void {
    this.creador = creador;
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

  addParticipante(id: number): void {
    this.participantes.push(id);
  }

  eraseParticipante(idParticipante: number): void {
    this.participantes = this.rutasFavoritas.filter((id) => id !== idParticipante);
  }

}
