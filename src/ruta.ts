import { EntidadInterface } from "./entidadInterface";

export class Ruta implements EntidadInterface {
  id: number;
  nombre: string;
  coordenadasInicio: string;
  coordenadasFin: string;
  longitud: number;
  desnivel: number;
  usuariosVisitantes: number;
  tipoActividad: 'ciclismo' | 'running' // hacer un tipo de dato para esto
  dificultad: 'facil' | 'media' | 'dificil' // hacer un tipo de dato para esto
  calificacion: number;
  
  constructor(
    id: number, 
    nombre: string, 
    coordenadasInicio: string, 
    coordenadasFin: string, longitud: number, 
    desnivel: number, 
    usuariosVisitantes: number, 
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
}