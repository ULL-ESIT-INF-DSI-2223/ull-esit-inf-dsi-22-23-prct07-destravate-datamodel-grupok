import { Coleccion } from "../interfaces/coleccion";
import { Reto } from "../modelos/reto";

export class ColeccionReto implements Coleccion<Reto> {
  private retos: Map<number, Reto>;

  constructor() {
    this.retos = new Map();
  }

  /**
   * Hacemos que la clase ColeccionReto sea iterable
   */
  [Symbol.iterator]() {
    return this.retos.values();
  }

  public setRetos(retos: Map<number, Reto>): void {
    this.retos = retos;
  }

  public getRetos(): Map<number, Reto> {
    return this.retos;
  }

  public addRetos(retos: Reto[]): void {
    for (const reto of retos) {
      if (reto instanceof Reto && !this.retos.has(reto.getID())) {
        this.retos.set(reto.getID(), reto);
      }
    }
  }

  public listar(): void {
    console.clear();
    console.log('Listando retos...');
    for (const reto of this.retos.values()) {
      console.log(reto);
    }
  }

  public insertar(reto: Reto): void {
    if (this.retos.has(reto.getID())) {
      console.log('El reto ya existe');
      return;
    }
    this.retos.set(reto.getID(), reto);
  }

  public eliminar(reto: Reto) {
    if (this.retos.has(reto.getID())) {
      this.retos.delete(reto.getID());
    }
  }
}


  