import { Actividad } from "../enums/actividadEnum";
import { Coleccion } from "../interfaces/coleccion";
import { Reto } from "../modelos/reto";

/**
 * Clase que implemente Colección y la especifica para retos
 */
export class ColeccionReto implements Coleccion<Reto> {
  private retos: Map<number, Reto> = new Map();

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
   * Metodo para obtener un reto por su id
   */
  public getReto(id: number): Reto {
    const reto = this.retos.get(id);
    if (reto == undefined) {
      throw new Error("El reto no existe");
    }
    return reto;
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
      throw new Error("El reto ya existe");
      // console.log('El reto ya existe');
      // return;
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
      throw new Error("El reto que deseas eliminar no existe");
      // console.log("El reto que deseas eliminar no existe.");
    }
  }

  /**
   * Método que permite modificar el nombre de un reto
   * @param reto Reto a modificar
   * @param nombre Nombre nuevo del reto
   * @returns void
  */
  public modificarNombre(reto: Reto, nombre: string): void {
    if (this.retos.has(reto.getID())) {
      // comprobar si el nombre nuevo ya existe
      // const nuevoNombre = reto.getNombre();
      const nuevoNombre = nombre;
      for (const u of this.retos.values()) {
        if (u.getNombre() === nuevoNombre) {
          throw new Error('El reto con nombre ' + nuevoNombre + ' ya existe');
        }
      }
      reto.setNombre(nombre);
    }
    else {
      console.log("El reto que deseas modificar no existe.");
      throw new Error('El reto que deseas modificar no existe');
    }
  }

  /**
   * Método que permite añadir una ruta a un reto
   * @param reto Reto al que añadir la ruta
   * @param ruta Ruta a añadir
   */
  public addRuta(reto: Reto, ruta: number): void {
    if (this.retos.has(reto.getID())) {
      reto.addRuta(ruta);
    }
    else {
      throw new Error('El reto al que deseas añadir la ruta no existe');
      // console.log("El reto al que deseas añadir la ruta no existe.");
    }
  }

  /**
   * Método que permite eliminar una ruta de un reto
   * @param reto Reto del que eliminar la ruta
   * @param ruta Ruta a eliminar
   */
  public eraseRuta(reto: Reto, ruta: number): void {
    if (this.retos.has(reto.getID())) {
      reto.removeRuta(ruta);
    }
    else {
      throw new Error('El reto del que deseas eliminar la ruta no existe');
      // console.log("El reto del que deseas eliminar la ruta no existe.");
    }
  }

  /**
   * Método que permite modificar el tipo de actividad de un reto
   * @param reto Reto a modificar
   * @param tipo Tipo de actividad nuevo del reto
   */
  public modificarActividad(reto: Reto, tipo: Actividad): void {
    if (this.retos.has(reto.getID())) {
      reto.setTipoActividad(tipo);
    }
    else {
      throw new Error('El reto que deseas modificar no existe');
      // console.log("El reto que deseas modificar no existe.");
    }
  }

  public addUsuario(reto: Reto, usuario: number): void {
    if (this.retos.has(reto.getID())) {
      // comprobar que el usuario no está ya en el reto
      const usuarios = reto.getUsuarios();
      for (const u of usuarios) {
        if (u === usuario) {
          throw new Error('El usuario ya está en el reto');
        }
      }
      reto.addUsuario(usuario);
    }
    else {
      throw new Error('El reto al que deseas añadir el usuario no existe');
      // console.log("El reto al que deseas añadir el usuario no existe.");
    }
  }

  public eraseUsuario(reto: Reto, usuario: number): void {
    if (this.retos.has(reto.getID())) {
      // comprobar que el usuario está en el reto
      const usuarios = reto.getUsuarios();
      let encontrado = false;
      for (const u of usuarios) {
        if (u === usuario) {
          encontrado = true;
        }
      }
      if (!encontrado) {
        throw new Error('El usuario no está en el reto');
      }
      else {
        reto.removeUsuario(usuario);
      }
    }
    else {
      throw new Error('El reto del que deseas eliminar el usuario no existe');
      // console.log("El reto del que deseas eliminar el usuario no existe.");
    }
  }
}


  