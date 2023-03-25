import { Ruta } from '../modelos/ruta';

export class ColeccionRutas {

  private rutas: Map<number, Ruta>;

  constructor() {
    this.rutas = new Map();
  }

  /**
   * Hacemos que la clase ColeccionUsuario sea iterable
   */
  [Symbol.iterator]() {
    return this.rutas.values();
  }

  /**
   * Método setRutas, establece el valor de Rutas pero antes revisa si el usuario ya existe mediante 
   * el uso del id
   * @param rutas 
   */
  public setRutas(rutas: Ruta[]): void {
    for (const ruta of rutas) {
      if (ruta instanceof Ruta && !this.rutas.has(ruta.getID())) {
        console.log('ruta insertado');
        this.rutas.set(ruta.getID(), ruta);
      }
    }
  }

  public getRutas(): Map<number, Ruta> {
    return this.rutas;
  }

  public listar(): void {
    console.clear();
    console.log('Listando rutas...');
    for (const ruta of this.rutas.values()) {
      console.log(ruta);
    }
  }


  /**
   * Método que permite insertar una ruta en la colección de Rutas revisando
   * previamente que la ruta no exista
   * @param ruta 
   */
  public insertarRuta(ruta: Ruta): void {
    if (this.rutas.has(ruta.getID())) {
      console.log('La ruta ya existe insertar ruta');
      return;
    }
    this.rutas.set(ruta.getID(), ruta);
  }
}
