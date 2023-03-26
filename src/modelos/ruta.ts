import { EntidadInterface } from "../interfaces/entidadInterface";
import { Actividad } from "../enums/actividadEnum";
import { Dificultad } from "../enums/dificultadEnum";
import { Coordenadas } from "../interfaces/coordenadasInterface";

let contador_id = 0;

/**
 * Clase que representa una ruta
 */
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

  /**
   * Getter del ID
   * @returns ID del usuario
   */
  getID(): number {
    return this.id;
  }

  /**
   * Getter del nombre
   * @returns Nombre del user 
   */
  getNombre(): string {
    return this.nombre;
  }

  /**
   * Getter de las coordenadas de inicio
   * @returns Coordenadas de inicio de la ruta
   */
  getCoordenadasInicio(): Coordenadas {
    return this.coordenadasInicio;
  }

  /**
   * Getter de las coordenadas del final
   * @returns Coordenadas del ifinal de la ruta
   */
  getCoordenadasFin(): Coordenadas {
    return this.coordenadasFin;
  }

  /**
   * Getter de la longitud de la ruta
   * @returns Longitud del recorrido en km
   */
  getLongitud(): number {
    return this.longitud;
  }

  /**
   * Getter del desnivel
   * @returns Desnivel de la ruta
   */
  getDesnivel(): number {
    return this.desnivel;
  } 

  /**
   * Getter de los usuarios que han hecho la ruta
   * @returns ID de los usuarios que han completado la ruta
   */
  getUsuariosVisitantes(): number[] {
    return this.usuariosVisitantes;
  }

  /**
   * Getter del tipo de actividad de la ruta
   * @returns tipo de actividad
   */
  getTipoActividad(): Actividad {
    return this.tipoActividad;
  }

  /**
   * Getter de la dificultad de la ruta
   * @returns Nivel de dificultad de la ruta
   */
  getDificultad(): Dificultad {
    return this.dificultad;
  }

  /**
   * Getter de la calificación de la ruta
   * @returns calificación de la ruta
   */
  getCalificacion(): number {
    return this.calificacion;
  }

  /**
   * Propierdad que establece el ID de las rutas
   * @param id id desde el que va a empezar a crear rutas
   */
  setID = (id: number): void => {
    this.id = id;
    if ( id > contador_id ) {
      contador_id = id;
    }
  }
  
  /**
   * Setter del nombre
   * @param nombre nuevo nombre
   */
  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  /**
   * Setter de las coordenadas de inicio
   * @param coordenadasInicio nuevas coordenadas de inicio
   */
  setCoordenadasInicio(coordenadasInicio: Coordenadas): void {
    this.coordenadasInicio = coordenadasInicio;
  }

  /**
   * Setter de las coordenadas del final de la ruta
   * @param coordenadasFin nuevas coordenadas de final de ruta
   */
  setCoordenadasFin(coordenadasFin: Coordenadas): void {
    this.coordenadasFin = coordenadasFin;
  }

  /**
   * Setter de la longitud de la ruta
   * @param longitud nueva longitud (en km)
   */
  setLongitud(longitud: number): void {
    this.longitud = longitud;
  }

  /**
   * Setter del desnivel
   * @param desnivel nuevo desnivel medio de la ruta
   */
  setDesnivel(desnivel: number): void {
    this.desnivel = desnivel;
  }

  /**
   * Setter de los usuarios que han realizado la ruta
   * @param usuariosVisitantes ID de los nuevos usuarios que han realizado la ruta
   */
  setUsuariosVisitantes(usuariosVisitantes: number[]): void {
    this.usuariosVisitantes = usuariosVisitantes;
  }

  /**
   * Setter del tipo de actividad
   * @param tipoActividad nuevo tipo de actividad
   */
  setTipoActividad(tipoActividad: Actividad): void {
    this.tipoActividad = tipoActividad;
  }

  /**
   * Setter de la dificultad
   * @param dificultad Nueva dificultad
   */
  setDificultad(dificultad: Dificultad): void {
    this.dificultad = dificultad;
  }

  /**
   * Setter de la calificación
   * @param calificacion Nueva calificación media
   */
  setCalificacion(calificacion: number): void {
    this.calificacion = calificacion;
  }

  /**
   * Método que permite añadir a la ruta un usuario que la ha completado
   * @param idUsuario ID del usuario que completó la ruta
   */
  addUsuarioVisitante(idUsuario: number): void {
    this.usuariosVisitantes.push(idUsuario);
  }

  /**
   * Método que permite eliminar de la ruta a un usuario
   * @param idUsuario ID del user a eliminar
   */
  removeUsuarioVisitante(idUsuario: number): void {
    // Lo borramos de usuariosVisitantes
    this.usuariosVisitantes = this.usuariosVisitantes.filter( id => id !== idUsuario );
  }
  
}