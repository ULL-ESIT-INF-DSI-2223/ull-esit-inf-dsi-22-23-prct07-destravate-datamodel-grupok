import { EntidadInterface } from "../interfaces/entidadInterface";
import { Actividad } from "../enums/actividadEnum";
import { Dificultad } from "../enums/dificultadEnum";

let contador_id = 0;

export class Ruta implements EntidadInterface {
  id: number;
  nombre: string;
  coordenadasInicio: string;
  coordenadasFin: string;
  longitud: number;
  desnivel: number;
  usuariosVisitantes: number[] = [];
  tipoActividad: Actividad;
  dificultad: Dificultad;
  calificacion: number = 0;
  
  constructor(
    nombre: string, 
    coordenadasInicio: string, 
    coordenadasFin: string, 
    longitud: number, 
    desnivel: number, 
    tipoActividad: Actividad,
    dificultad: Dificultad) 
    {
      this.id = contador_id++;
      this.nombre = nombre;
      this.coordenadasInicio = coordenadasInicio;
      this.coordenadasFin = coordenadasFin;
      this.longitud = longitud;
      this.desnivel = desnivel;
      this.tipoActividad = tipoActividad;
      this.dificultad = dificultad;
    }    

  // Métodos
  getID(): number {
    return this.id;
  }
  getNombre(): string {
    return this.nombre;
  }
  getCoordenadasInicio(): string {
    return this.coordenadasInicio;
  }
  getCoordenadasFin(): string {
    return this.coordenadasFin;
  }
  getLongitud(): number {
    return this.longitud;
  }
  getDesnivel(): number {
    return this.desnivel;
  } 
  getUsuariosVisitantes(): number[] {
    return this.usuariosVisitantes;
  }
  getTipoActividad(): Actividad {
    return this.tipoActividad;
  }
  getDificultad(): Dificultad {
    return this.dificultad;
  }
  getCalificacion(): number {
    return this.calificacion;
  }
  setID(id: number): void {
    this.id = id;
  }
  setNombre(nombre: string): void {
    this.nombre = nombre;
  }
  setCoordenadasInicio(coordenadasInicio: string): void {
    this.coordenadasInicio = coordenadasInicio;
  }
  setCoordenadasFin(coordenadasFin: string): void {
    this.coordenadasFin = coordenadasFin;
  }
  setLongitud(longitud: number): void {
    this.longitud = longitud;
  }
  setDesnivel(desnivel: number): void {
    this.desnivel = desnivel;
  }
  setUsuariosVisitantes(usuariosVisitantes: number[]): void {
    this.usuariosVisitantes = usuariosVisitantes;
  }
  setTipoActividad(tipoActividad: Actividad): void {
    this.tipoActividad = tipoActividad;
  }
  setDificultad(dificultad: Dificultad): void {
    this.dificultad = dificultad;
  }
  setCalificacion(calificacion: number): void {
    this.calificacion = calificacion;
  }
}