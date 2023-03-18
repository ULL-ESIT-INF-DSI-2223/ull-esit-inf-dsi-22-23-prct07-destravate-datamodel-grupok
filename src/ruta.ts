import { EntidadInterface } from "./interfaces/entidadInterface";

export class Ruta implements EntidadInterface {
  id: number;
  nombre: string;
  coordenadasInicio: string;
  coordenadasFin: string;
  longitud: number;
  desnivel: number;
  usuariosVisitantes: number[];
  tipoActividad: 'ciclismo' | 'running' // hacer un tipo de dato para esto
  dificultad: 'facil' | 'media' | 'dificil' // hacer un tipo de dato para esto
  calificacion: number;
  
  constructor(
    id: number, 
    nombre: string, 
    coordenadasInicio: string, 
    coordenadasFin: string, longitud: number, 
    desnivel: number, 
    usuariosVisitantes: number[], 
    tipoActividad: 'ciclismo' | 'running', 
    dificultad: 'facil' | 'media' | 'dificil', 
    calificacion: number) 
    {
      this.id = id;
      this.nombre = nombre;
      this.coordenadasInicio = coordenadasInicio;
      this.coordenadasFin = coordenadasFin;
      this.longitud = longitud;
      this.desnivel = desnivel;
      this.usuariosVisitantes = usuariosVisitantes;
      this.tipoActividad = tipoActividad;
      this.dificultad = dificultad;
      this.calificacion = calificacion;
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
  getTipoActividad(): 'ciclismo' | 'running' {
    return this.tipoActividad;
  }
  getDificultad(): 'facil' | 'media' | 'dificil' {
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
  setTipoActividad(tipoActividad: 'ciclismo' | 'running'): void {
    this.tipoActividad = tipoActividad;
  }
  setDificultad(dificultad: 'facil' | 'media' | 'dificil'): void {
    this.dificultad = dificultad;
  }
  setCalificacion(calificacion: number): void {
    this.calificacion = calificacion;
  }
}