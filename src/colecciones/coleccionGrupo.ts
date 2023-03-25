import {Grupo} from '../modelos/grupo';
import { Coleccion } from '../interfaces/coleccion';

/**
 * Clase que implemente Colección y la especifica para grupos
 */
export class ColeccionGrupo implements Coleccion<Grupo> {
  private grupos: Map<number, Grupo>;

  /**
   * Constructor de la clase
   */
  constructor() {
    this.grupos = new Map();
  }

  /**
   * Hace posible que la clase ColeccionGrupo sea iterable
   */
  [Symbol.iterator]() {
    return this.grupos.values();
  }

  /**
   * Setter de los grupos (entrada en formato map)
   * @param grupos Grupos en formato map
   */
  public setGrupos(grupos: Map<number, Grupo>): void {
    this.grupos = grupos;
  }

  /**
   * Setter de los grupos (entrada en formato array)
   * @param grupos Grupos en formato array
   */
  public setGruposFromArray(grupos: Grupo[]): void {
    for (const grupo of grupos) {
      if (grupo instanceof Grupo && !this.grupos.has(grupo.getID())) {
        this.grupos.set(grupo.getID(), grupo);
      }
    }
  }

  /**
   * Getter de la clase grupo
   * @returns Map con los grupos
   */
  public getGrupos(): Map<number, Grupo> {
    return this.grupos;
  }

  /**
   * Método que permite listar los grupos
   */
  public listar(): void {
    console.clear();
    console.log('Listando grupos...');
    for (const grupo of this.grupos.values()) {
      console.log(grupo);
    }
  }

  /**
   * Método que permite insertar un grupo
   * @param grupo Grupo a añadir
   */
  public insertar(grupo: Grupo): void {
    if (this.grupos.has(grupo.getID())) {
      console.log('El grupo que deseas añadir ya existe o existe un grupo con el mismo ID.');
      return;
    }
    this.grupos.set(grupo.getID(), grupo);
  }

  /**
   * Permite eliminar un grupo
   * @param grupo Grupo a eliminar
   */
  public eliminar( grupo: Grupo ) {
    if (this.grupos.has(grupo.getID())) {
      this.grupos.delete(grupo.getID());
    }
    else {
      console.log("El grupo que deseas eliminar no existe.");
    }
  }
}

