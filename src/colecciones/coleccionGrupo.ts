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
   * Permite listar los grupos
   */
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

  /**
   * Permite eliminar un grupo
   * @param grupo 
   */
  public eliminar( grupo: Grupo ) {
    if (this.grupos.has(grupo.getID())) {
      this.grupos.delete(grupo.getID());
    }
  }
}

