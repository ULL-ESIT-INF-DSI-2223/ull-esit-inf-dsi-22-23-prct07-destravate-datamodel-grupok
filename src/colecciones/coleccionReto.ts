import { Coleccion } from "../interfaces/coleccion";
import { Reto } from "../modelos/reto";

/**
 * Clase que implemente Colección y la especifica para retos
 */
export class ColeccionReto implements Coleccion<Reto> {
  private retos: Map<number, Reto>;

  /**
   * Constructor de la clase
   */
  constructor() {
    this.retos = new Map();
  }

  /**
   * Hace posible que la clase ColeccionReto sea iterable
   */
  [Symbol.iterator]() {
    return this.retos.values();
  }

  /**
   * Setter de los retos (entrada en formato map)
   * @param retos Retos en formato map
   */
  public setRetos(retos: Map<number, Reto>): void {
    this.retos = retos;
  }

  /**
   * Setter de los retos (entrada en formato array)
   * @param retos Retos en formato array
   */
  public setRetosFromArray(retos: Reto[]): void {
    for (const reto of retos) {
      if (reto instanceof Reto && !this.retos.has(reto.getID())) {
        this.retos.set(reto.getID(), reto);
      }
    }
  }

  /**
   * Getter de los retos
   * @returns Map con los retos
   */
  public getRetos(): Map<number, Reto> {
    return this.retos;
  }

  /**
   * Método que permite lista los retos
   */
  public listar(): void {
    console.clear();
    console.log('Listando retos...');
    for (const reto of this.retos.values()) {
      console.log(reto);
    }
  }

  /**
   * Método que permite insertar un reto
   * @param reto Reto a añadir
   */
  public insertar(reto: Reto): void {
    if (this.retos.has(reto.getID())) {
      console.log('El reto ya existe');
      return;
    }
    this.retos.set(reto.getID(), reto);
  }

  /**
   * Método que permite insertar un reto
   * @param reto Reto a eliminar
   */
  public eliminar(reto: Reto) {
    if (this.retos.has(reto.getID())) {
      this.retos.delete(reto.getID());
    }
    else {
      console.log("El reto que deseas eliminar no existe.");
    }
  }


}


  