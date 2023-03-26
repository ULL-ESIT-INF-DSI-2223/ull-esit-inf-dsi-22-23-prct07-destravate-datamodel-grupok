import { EntidadInterface } from "../interfaces/entidadInterface";
import { Actividad } from "../enums/actividadEnum";

let contador_id = 0;

/**
 * Clase que representa un reto
 */
export class Reto implements EntidadInterface {
  id: number;
  nombre: string;
  rutas: number[] = [];
  tipoActividad: Actividad;
  kmTotales: number = 0;
  usuarios: number[] = [];

  /**
   * Constructor de la clase
   * @param nombre Nombre del reto
   * @param tipoActividad Tipo del reto
   */
  constructor(nombre: string, tipoActividad: Actividad) {
    this.id = contador_id++;
    this.nombre = nombre;
    this.tipoActividad = tipoActividad;
  }

  /**
   * Getter del ID del reto
   * @returns ID del reto
   */
  public getID(): number {
    return this.id;
  }

  /**
   * Getter del nombre
   * @returns nombre del reto
   */
  public getNombre(): string {
    return this.nombre;
  }

  /**
   * Getter de las rutas del reto
   * @returns Array con las ID's de las rutas
   */
  public getRutas(): number[] {
    return this.rutas;
  }

  /**
   * Getter del tipo de actividad
   * @returns tipo de actividad
   */
  public getTipoActividad(): string {
    return this.tipoActividad;
  }

  /**
   * Getter de los kilómetros totales
   * @returns km totales del reto
   */
  public getKmTotales(): number {
    return this.kmTotales;
  }

  /**
   * Getter de usuarios que están realizando el reto
   * @returns ID de usuarios que están realizando el reto
   */
  public getUsuarios(): number[] {
    return this.usuarios;
  }

  /**
   * Propierdad que establece el ID de los retos
   * @param id id desde el que va a empezar a crear retos
   */
  setID = (id: number): void => {
    this.id = id;
    if (id > contador_id) {
      contador_id = id;
    }
  };

  /**
   * Setter del nombre
   * @param nombre nuevo nombre
   */
  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  /**
   * Setter de rutas
   * @param rutas nueva ruta
   */
  public setRutas(rutas: number[]): void {
    this.rutas = rutas;
  }

  /**
   * Setter del tipo de actividad
   * @param tipoActividad nuevo el tipo de actividad
   */
  public setTipoActividad(tipoActividad: Actividad): void {
    this.tipoActividad = tipoActividad;
  }

  /**
   * Setter de los km totales
   * @param kmTotales nueva cantidad de km totales
   */
  public setKmTotales(kmTotales: number): void {
    this.kmTotales = kmTotales;
  }

  /**
   * Setter de los usuarios que están haciendo el reto
   * @param usuarios array de ID's de los nuevos usuarios
   */
  public setUsuarios(usuarios: number[]): void {
    this.usuarios = usuarios;
  }

  /**
   * Método que permite añadir un usuario al reto
   * @param id Id del usuario a añadir
   */
  addUsuario(id: number): void {
    this.usuarios.push(id);
  }

  /**
   * Método que permite eliminar un usuario del reto
   * @param id Id del usuario a eliminar
   */
  removeUsuario(id: number): void {
    this.usuarios = this.usuarios.filter((usuario) => usuario !== id);
  }

  /**
   * Método que permite añadir una ruta al reto
   * @param id Id de la ruta a añadir
   */
  addRuta(id: number): void {
    this.rutas.push(id);
  }

  /**
   * Método que permite eliminar una ruta del reto
   * @param id Id de la ruta a eliminar
   */
  removeRuta(id: number): void {
    this.rutas = this.rutas.filter((ruta) => ruta !== id);
  }
}
