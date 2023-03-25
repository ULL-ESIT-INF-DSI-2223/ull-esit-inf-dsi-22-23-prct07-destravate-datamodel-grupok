import {Grupo} from '../modelos/grupo';
import { Coleccion } from '../interfaces/Coleccion';

export class ColeccionGrupo implements Coleccion<Grupo> {
  private grupos: Map<number, Grupo>;

  constructor() {
    this.grupos = new Map();
  }

  /**
   * Hacemos que la clase ColeccionGrupo sea iterable
   */
  [Symbol.iterator]() {
    return this.grupos.values();
  }

  /**
   * Método add, establece el valor de grupos pero antes revisa si el grupo ya existe mediante
   * el uso del id 
   * @param grupos
   */
  public addGrupos(grupos: Grupo[]): void {
    for (const grupo of grupos) {
      if (grupo instanceof Grupo && !this.grupos.has(grupo.getID())) {
        this.grupos.set(grupo.getID(), grupo);
      }
    }
  }

  public setGrupos(grupos: Map<number, Grupo>): void {
    this.grupos = grupos;
  }

  public getGrupos(): Map<number, Grupo> {
    return this.grupos;
  }

  public listar(): void {
    console.clear();
    console.log('Listando grupos...');
    for (const grupo of this.grupos.values()) {
      console.log(grupo);
    }
  }

  /**
   * Método que permite insertar un grupo en la colección de grupos revisando
   */
  public insertar(grupo: Grupo): void {
    if (this.grupos.has(grupo.getID())) {
      console.log('El grupo ya existe');
      return;
    }
    this.grupos.set(grupo.getID(), grupo);
  }

  public eliminar( grupo: Grupo ) {
    if (this.grupos.has(grupo.getID())) {
      this.grupos.delete(grupo.getID());
    }
  }
}

