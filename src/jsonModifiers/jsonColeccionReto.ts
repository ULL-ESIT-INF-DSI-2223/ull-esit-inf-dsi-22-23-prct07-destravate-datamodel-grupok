import { Reto } from "../modelos/reto";
import { ColeccionReto } from "../colecciones/coleccionReto";
import lowdb, { LowdbSync } from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

/**
 * Interfaz de la base de datos
 *
 * @export
 * @interface DatabaseSchema
 *
 */
export interface DatabaseSchema {
  retos: Reto[];
}

/**
 * Clase encargada de gestionar la colección de retos
 *
 * @export
 * @class JsonColeccionReto
 * @extends {ColeccionReto}
 *
 */
export class JsonColeccionReto extends ColeccionReto {
  private retosDatabase: LowdbSync<DatabaseSchema>;

  constructor() {
    super();
    const adapter = new FileSync<DatabaseSchema>("./dataBase/reto.json");
    this.retosDatabase = lowdb(adapter);
    this.retosDatabase.defaults({ retos: [] }).write();
  }

  /**
   * Método que permite registrar un reto en la base de datos que comprueba
   * si el reto ya existe de antemano
   */
  public registrarReto(reto: Reto): void {
    if (
      this.retosDatabase
        .get("retos")
        .find({ nombre: reto.getNombre() })
        .value() != null
    ) {
      throw new Error("El reto ya existe");
    }
    this.retosDatabase.get("retos").push(reto).write();
  }

  /**
   * Método que permite cargar los retos de la base de datos
   * @returns {Reto[]}
   * @memberof JsonColeccionReto
   *
   */
  public cargarRetos(): Reto[] {
    const retos_no_instancia: Reto[] = this.retosDatabase.get("retos").value();
    const retos: Reto[] = [];
    for (const reto of retos_no_instancia) {
      let retoAux = new Reto(reto.nombre, reto.tipoActividad);
      retoAux.setID(reto.id);
      retoAux.setRutas(reto.rutas);
      retoAux.setUsuarios(reto.usuarios);
      retos.push(retoAux);
    }
    // Compruebamos si alguno de los retos es una instancia de reto
    for (const reto of retos) {
      if (!(reto instanceof Reto)) {
        throw new Error("reto NO es instancia de reto");
      }
    }
    return retos;
  }

  /**
   * Método que permite eliminar un reto de la base de datos
   *
   * @param reto
   * @memberof JsonColeccionReto
   *
   */
  public eliminarReto(reto: Reto): void {
    this.retosDatabase
      .get("retos")
      .remove({ nombre: reto.getNombre() })
      .write();
  }

  /**
   * Método que permite modificar el nombre de un reto
   *
   * @param reto
   * @param nombre
   * @memberof JsonColeccionReto
   */
  public modificarNombre(reto: Reto, nombre: string): void {
    this.retosDatabase
      .get("retos")
      .find({ nombre: reto.getNombre() })
      .assign({ nombre: nombre })
      .write();
  }

  /**
   * Método que permite añadir una ruta a un reto
   *
   * @param reto
   * @param ruta
   * @memberof JsonColeccionReto
   */
  public addRuta(reto: Reto, ruta: number): void {
    this.retosDatabase
      .get("retos")
      .find({ nombre: reto.getNombre() })
      .get("rutas")
      .write();
  }

  /**
   * Método que permite eliminar una ruta de un reto
   *
   * @param reto
   * @param ruta
   * @memberof JsonColeccionReto
   */
  public eraseRuta(reto: Reto, ruta: number): void {
    this.retosDatabase
      .get("retos")
      .find({ nombre: reto.getNombre() })
      .get("rutas")
      .write();
  }

  /**
   * Método que permite modificar la actividad de un reto
   *
   * @param reto
   * @param actividad
   * @memberof JsonColeccionReto
   */
  public modificarActividad(reto: Reto, actividad: string): void {
    this.retosDatabase
      .get("retos")
      .find({ nombre: reto.getNombre() })
      .assign({ tipoActividad: actividad })
      .write();
  }

  /**
   * Método que permite añadir un usuario a un reto
   *
   * @param reto
   * @param id
   */
  public addUsuario(reto: Reto, id: number): void {
    // Buscamos el reto en función del ID, luego añadimos el usuario a la lista de usuarios
    this.retosDatabase
      .get("retos")
      .find({ nombre: reto.getNombre() })
      .get("usuarios")
      .write();
  }

  /**
   * Método que permite eliminar un usuario de un reto
   * @param reto
   * @param usuario
   */
  public eraseUsuario(reto: Reto, usuario: number): void {
    this.retosDatabase
      .get("retos")
      .find({ nombre: reto.getNombre() })
      .get("usuarios")
      .pull(usuario)
      .write();
  }
}
