import { Ruta } from '../modelos/ruta';
import { Coleccion } from '../interfaces/coleccion';
import { Coordenadas } from '../interfaces/coordenadasInterface';
import { Actividad } from '../enums/actividadEnum';
import { Dificultad } from '../enums/dificultadEnum';

/**
 * Clase que implemente Colección y la especifica para rutas
 */
export class ColeccionRuta implements Coleccion<Ruta>{
  private rutas: Map<number, Ruta>;

  /**
   * Constructor de la clase
   */
  constructor() {
    this.rutas = new Map();
  }

  /**
   * Hace posible que la clase ColeccionRutas sea iterable
   */
  [Symbol.iterator]() {
    return this.rutas.values();
  }

  /**
   * Setter de las rutas (entrada en formato map)
   * @param rutas Rutas en formato map
   */
  public setRutas( rutas : Map<number, Ruta>): void {
    this.rutas = rutas;
  }

  /**
   * Setter de las rutas (entrada en formato array)
   * @param rutas Rutas en formato array
   */
  public setRutasFromArray(rutas: Ruta[]): void {
    for (const ruta of rutas) {
      if (ruta instanceof Ruta && !this.rutas.has(ruta.getID())) {
        this.rutas.set(ruta.getID(), ruta);
      }
    }
  }

  /**
   * Getter de las rutas
   * @returns Map con las rutas
   */
  public getRutas(): Map<number, Ruta> {
    return this.rutas;
  }

  /**
   * Método que permite lista las rutas
   */
  public listar(): void {
    console.clear();
    console.log('Listando rutas...');
    for (const ruta of this.rutas.values()) {
      console.log(ruta);
    }
  }

 /**
   * Método que permite insertar una ruta
   * @param ruta Ruta a añadir
   */
  public insertar(ruta: Ruta): void {
    if (this.rutas.has(ruta.getID())) {
      console.log('La ruta ya existe insertar ruta');
      return;
    }

    const nuevoNombre = ruta.getNombre();
    for (const u of this.rutas.values()) {
      if (u.getNombre() === nuevoNombre) {
        throw new Error('La ruta con nombre ' + nuevoNombre + ' ya existe');
      }
    }
    this.rutas.set(ruta.getID(), ruta);
  }

  /**
   * Método que permite insertar un reto
   * @param ruta Ruta a eliminar
   */
  public eliminar( ruta: Ruta) {
    if (this.rutas.has(ruta.getID())) {
      this.rutas.delete(ruta.getID());
    }
    else {
      console.log("La ruta que deseas eliminar no existe.");
    }
  }

  public modificarNombreRuta(ruta: Ruta, nombre: string) {
    if (this.rutas.has(ruta.getID())) {
      ruta.setNombre(nombre);
    }
    else {
      throw new Error("La ruta que deseas modificar no existe.");
    }
    // comprobar que el nuevo nombre no existe
    const nuevoNombre = ruta.getNombre();
    for (const u of this.rutas.values()) {
      if (u.getNombre() === nuevoNombre) {
        throw new Error('La ruta con nombre ' + nuevoNombre + ' ya existe');
      }
    }
  }

  public modificarCoordenadasRuta(ruta: Ruta, coordenadasInicio: Coordenadas, coordenadasFin: Coordenadas) {
    if (this.rutas.has(ruta.getID())) {
      ruta.setCoordenadasInicio(coordenadasInicio);
      ruta.setCoordenadasFin(coordenadasFin);
    }
    else {
      throw new Error("La ruta que deseas modificar no existe.");
    }
  }

  public modificarLongitudRuta(ruta: Ruta, longitud: number) {
    if (this.rutas.has(ruta.getID())) {
      ruta.setLongitud(longitud);
    }
    else {
      throw new Error("La ruta que deseas modificar no existe.");
    }
  }

  public modificarDesnivelRuta(ruta: Ruta, desnivel: number) {
    if (this.rutas.has(ruta.getID())) {
      ruta.setDesnivel(desnivel);
    }
    else {
      throw new Error("La ruta que deseas modificar no existe.");
    }
  }

  public modificarTipoActividadRuta(ruta: Ruta, tipoActividad: Actividad) {
    if (this.rutas.has(ruta.getID())) {
      ruta.setTipoActividad(tipoActividad);
    }
    else {
      throw new Error("La ruta que deseas modificar no existe.");
    }
  }

  public addRuta(ruta: Ruta) {
    if (this.rutas.has(ruta.getID())) {
      throw new Error("La ruta que deseas añadir ya existe.");
    }
    this.rutas.set(ruta.getID(), ruta);
  }

  public modificarDificultadRuta(ruta: Ruta, dificultad: Dificultad) {
    if (this.rutas.has(ruta.getID())) {
      ruta.setDificultad(dificultad);
    }
    else {
      throw new Error("La ruta que deseas modificar no existe.");
    }
  }
}
