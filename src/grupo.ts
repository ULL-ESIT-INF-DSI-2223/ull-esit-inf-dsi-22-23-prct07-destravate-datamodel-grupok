import { EntidadInterface } from "./interfaces/entidadInterface";

class Grupo implements EntidadInterface {
  id: number;
  nombre: string;
  participantes: number[];
  entrenamiento: {
    semana: { km: number; desnivel: number };
    mes: { km: number; desnivel: number };
    anio: { km: number; desnivel: number };
  };
  clasificacion: { id: number; km: number; desnivel: number }[];
  rutasFavoritas: number[];
  historicoRutas: {
    ruta: number;
    distancia: number;
    desnivel: number;
    fecha: Date;
  }[];

  constructor(id: number, nombre: string, participantes: number[]) {
    this.id = id;
    this.nombre = nombre;
    this.participantes = participantes;
    this.entrenamiento = {
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
  getEntrenamiento(): {
    semana: { km: number; desnivel: number };
    mes: { km: number; desnivel: number };
    anio: { km: number; desnivel: number };
  } {
    return this.entrenamiento;
  }
  getClasificacion(): { id: number; km: number; desnivel: number }[] {
    return this.clasificacion;
  }
  getRutasFavoritas(): string[] {
    return this.rutasFavoritas;
  }
  getHistoricoRutas(): {
    ruta: string;
    distancia: number;
    desnivel: number;
    fecha: Date;
  }[] {
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
  setEntrenamiento( entrenamiento: {
    semana: { km: number; desnivel: number };
    mes: { km: number; desnivel: number };
    anio: { km: number; desnivel: number };
  }): void {
    this.entrenamiento = entrenamiento;
  }
  setClasificacion(clasificacion: { id: number; km: number; desnivel: number }[]): void {
    this.clasificacion = clasificacion;
  }
  setRutasFavoritas(rutasFavoritas: string[]): void {
    this.rutasFavoritas = rutasFavoritas;
  }
  setHistoricoRutas(historicoRutas: {
    ruta: string;
    distancia: number;
    desnivel: number;
    fecha: Date;
  }[]): void {
    this.historicoRutas = historicoRutas;
  }
}
