import { EntidadInterface } from "../interfaces/entidadInterface";
import { EstadisticasEntrenamiento } from "../interfaces/estadisticasEntrenamiento";

export class Grupo implements EntidadInterface {
  id: number;
  nombre: string;
  participantes: number[];
  estadisticasEntrenamiento: EstadisticasEntrenamiento
  clasificacion: { id: number; km: number; desnivel: number }[];
  rutasFavoritas: number[];
  historicoRutas: { ruta: number; fecha: Date; }[];

  constructor(id: number, nombre: string, participantes: number[]) {
    this.id = id;
    this.nombre = nombre;
    this.participantes = participantes;
    this.estadisticasEntrenamiento = {
      semana: { km: 0, desnivel: 0 },
      mes: { km: 0, desnivel: 0 },
      anio: { km: 0, desnivel: 0 },
    };
    this.clasificacion = [];
    this.rutasFavoritas = [];
    this.historicoRutas = [];
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
  setID(id: number): void {
    this.id = id;
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
}
