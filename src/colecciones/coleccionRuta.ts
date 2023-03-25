import { Ruta } from '../modelos/ruta';
import { Coleccion } from '../interfaces/coleccion';

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
}
