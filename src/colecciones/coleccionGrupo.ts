import { Grupo } from "../modelos/grupo";
import { Coleccion } from "../interfaces/coleccion";

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
    console.log("Listando grupos...");
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
      throw new Error("Existe un grupo con el mismo ID.");
    }
    // comprobar que el nombre no existe
    const nuevoNombre = grupo.getNombre();
    for (const u of this.grupos.values()) {
      if (u.getNombre() === nuevoNombre) {
        throw new Error("El grupo con nombre " + nuevoNombre + " ya existe");
      }
    }

    this.grupos.set(grupo.getID(), grupo);
  }

  /**
   * Permite eliminar un grupo
   * @param grupo Grupo a eliminar
   */
  public eliminar(grupo: Grupo) {
    if (this.grupos.has(grupo.getID())) {
      this.grupos.delete(grupo.getID());
    } else {
      throw new Error("El grupo que deseas eliminar no existe.");
    }
  }

  /**
   * Método que permite modificar el nombre de un usuario
   * @param grupo usuario a modificar
   * @param nombre nuevo nombre
   */
  public modificarNombre(grupo: Grupo, nombre: string) {
    this.grupos.get(grupo.getID())!.setNombre(nombre);
  }

  public modificarCreador(grupo: Grupo, creador: number) {
    this.grupos.get(grupo.getID())!.setCreador(creador);
  }

  public addRutaFavorita(grupo: Grupo, ruta: number) {
    this.grupos.get(grupo.getID())!.addRutaFavorita(ruta);
  }

  public eraseRutaFavorita(grupo: Grupo, ruta: number) {
    this.grupos.get(grupo.getID())!.eraseRutaFavorita(ruta);
  }

  public addRutaRealizada(grupo: Grupo, ruta: { ruta: number; fecha: string }) {
    this.grupos.get(grupo.getID())!.addRutaRealizada(ruta);
  }

  public addParticipante(grupo: Grupo, participante: number) {
    this.grupos.get(grupo.getID())!.addParticipante(participante);
  }

  public eraseParticipante(grupo: Grupo, participante: number) {
    this.grupos.get(grupo.getID())!.eraseParticipante(participante);
  }
}
