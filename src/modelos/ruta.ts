import { EntidadInterface } from "../interfaces/entidadInterface";
import { Actividad } from "../enums/actividadEnum";
import { Dificultad } from "../enums/dificultadEnum";
import { Coordenadas } from "../interfaces/coordenadasInterface";

let contador_id = 0;

export class Ruta implements EntidadInterface {
  id: number;
  nombre: string;
  coordenadasInicio: Coordenadas;
  coordenadasFin: Coordenadas;
  longitud: number;
  desnivel: number;
  usuariosVisitantes: number[] = [];
  tipoActividad: Actividad;
  dificultad: Dificultad;
  calificacion: number = 0;
  
  constructor(
    nombre: string, 
    coordenadasInicio: Coordenadas, 
    coordenadasFin: Coordenadas, 
    longitud: number, 
    desnivel: number, 
    tipoActividad: Actividad,
    dificultad: Dificultad) 
    {
      contador_id++;
      this.id = contador_id;
      this.nombre = nombre;
      this.coordenadasInicio = coordenadasInicio;
      this.coordenadasFin = coordenadasFin;
      this.longitud = longitud;
      this.desnivel = desnivel;
      this.tipoActividad = tipoActividad;
      this.dificultad = dificultad;

      // Ponemos una calificación aleatoria entre 0 y 5
      this.calificacion = Math.floor(Math.random() * 6);
    }    

  // Métodos
  getID(): number {
    return this.id;
  }
  getNombre(): string {
    return this.nombre;
  }
  getCoordenadasInicio(): Coordenadas {
    return this.coordenadasInicio;
  }
  getCoordenadasFin(): Coordenadas {
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

  setID = (id: number): void => {
    this.id = id;
    if ( id > contador_id ) {
      contador_id = id;
    }
  }
  
  setNombre(nombre: string): void {
    this.nombre = nombre;
  }
  setCoordenadasInicio(coordenadasInicio: Coordenadas): void {
    this.coordenadasInicio = coordenadasInicio;
  }
  setCoordenadasFin(coordenadasFin: Coordenadas): void {
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
  addUsuarioVisitante(idUsuario: number): void {
    this.usuariosVisitantes.push(idUsuario);
  }
  
}