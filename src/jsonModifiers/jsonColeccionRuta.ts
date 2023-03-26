import lowdb, { LowdbSync } from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import { Ruta } from "../modelos/ruta";
import { ColeccionRuta } from "../colecciones/coleccionRuta";
import { Dificultad } from "../enums/dificultadEnum";
import { Actividad } from "../enums/actividadEnum";
import { Coordenadas } from "../interfaces/coordenadasInterface";

/**
 * Interfaz de la base de datos
 *
 * @export
 * @interface DatabaseSchema
 */
export interface DatabaseSchema {
  rutas: Ruta[];
}

/**
 * Clase encargada de gestionar la colección de rutas
 *
 * @export
 * @class JsonColeccionRuta
 * @extends {ColeccionRuta}
 */
export class JsonColeccionRuta extends ColeccionRuta {
  private rutasDatabase: LowdbSync<DatabaseSchema>;

  constructor() {
    super();
    const adapter = new FileSync<DatabaseSchema>("./dataBase/rutas.json");
    this.rutasDatabase = lowdb(adapter);
    this.rutasDatabase.defaults({ rutas: [] }).write();
  }

  /**
   * Método que permite insertar una ruta en la base de datos que comprueba
   */
  public insertarRuta(ruta: Ruta): void {
    const nuevoNombre = ruta.getNombre();
    if (
      this.rutasDatabase.get("rutas").find({ nombre: nuevoNombre }).value() !=
      undefined
    ) {
      throw new Error("El nombre de la ruta ya existe");
    }
    this.rutasDatabase.get("rutas").push(ruta).write();
  }

  /**
   * Métodos que permite cargar las rutas de la base de datos
   * @returns {Ruta[]}
   * @memberof JsonColeccionRuta
   */
  public cargarRutas(): Ruta[] {
    const rutas_no_instancia: Ruta[] = this.rutasDatabase.get("rutas").value();
    const rutas: Ruta[] = [];
    for (const ruta of rutas_no_instancia) {
      let rutaAux = new Ruta(
        ruta.nombre,
        ruta.coordenadasInicio,
        ruta.coordenadasFin,
        ruta.longitud,
        ruta.desnivel,
        ruta.tipoActividad,
        ruta.dificultad
      );
      rutaAux.setID(ruta.id);
      rutaAux.setNombre(ruta.nombre);
      rutaAux.setCoordenadasInicio(ruta.coordenadasInicio);
      rutaAux.setCoordenadasFin(ruta.coordenadasFin);
      rutaAux.setLongitud(ruta.longitud);
      rutaAux.setDesnivel(ruta.desnivel);
      rutaAux.setUsuariosVisitantes(ruta.usuariosVisitantes);
      rutaAux.setTipoActividad(ruta.tipoActividad);
      rutaAux.setDificultad(ruta.dificultad);
      rutaAux.setCalificacion(ruta.calificacion);
      rutas.push(rutaAux);
    }
    // Compruebamos si alguno de las rutas es una instancia de ruta
    for (const ruta of rutas) {
      if (!(ruta instanceof Ruta)) {
        throw new Error("Ruta NO es instancia de Ruta");
      }
    }

    return rutas;
  }

  /**
   * Método que permite eliminar una ruta de la base de datos
   *
   * @param ruta
   * @memberof JsonColeccionRuta
   * @returns {void}
   * @throws {Error} Si la ruta no existe
   * @throws {Error} Si la ruta no es instancia de Ruta
   */
  public eliminarRuta(ruta: Ruta): void {
    this.rutasDatabase
      .get("rutas")
      .remove({ nombre: ruta.getNombre() })
      .write();
  }

  /**
   * Método que permite modificar el nombre de una ruta
   *
   * @param ruta
   * @param nuevoNombre
   * @memberof JsonColeccionRuta
   * @returns {void}
   * @throws {Error} Si el nombre de la ruta ya existe
   */
  public modificarNombreRuta(ruta: Ruta, nuevoNombre: string): void {
    // comprobar que el nombre no existe
    if (
      this.rutasDatabase.get("rutas").find({ nombre: nuevoNombre }).value() !=
      undefined
    ) {
      throw new Error("El nombre de la ruta ya existe");
    }
    this.rutasDatabase
      .get("rutas")
      .find({ nombre: ruta.getNombre() })
      .assign({ nombre: nuevoNombre })
      .write();
  }

  /**
   * Método que permite modificar las coordenadas de una ruta
   *
   * @param ruta
   * @param coordenadasInicio
   * @param coordenadasFin
   * @memberof JsonColeccionRuta
   * @returns {void}
   */
  public modificarCoordenadasRuta(
    ruta: Ruta,
    coordenadasInicio: Coordenadas,
    coordenadasFin: Coordenadas
  ): void {
    this.rutasDatabase
      .get("rutas")
      .find({ nombre: ruta.getNombre() })
      .assign({
        coordenadasInicio: coordenadasInicio,
        coordenadasFin: coordenadasFin,
      })
      .write();
  }

  /**
   * Método que permite modificar la longitud de una ruta
   * @param ruta
   * @param nuevaLongitud
   * @memberof JsonColeccionRuta
   * @returns {void}
   */
  public modificarLongitudRuta(ruta: Ruta, nuevaLongitud: number): void {
    this.rutasDatabase
      .get("rutas")
      .find({ nombre: ruta.getNombre() })
      .assign({ longitud: nuevaLongitud })
      .write();
  }

  /**
   * Método que permite modificar el desnivel de una ruta
   *
   * @param ruta
   * @param nuevoDesnivel
   * @memberof JsonColeccionRuta
   * @returns {void}
   */
  public modificarDesnivelRuta(ruta: Ruta, nuevoDesnivel: number): void {
    this.rutasDatabase
      .get("rutas")
      .find({ nombre: ruta.getNombre() })
      .assign({ desnivel: nuevoDesnivel })
      .write();
  }

  /**
   * Método que permite modificar el tipo de actividad de una ruta
   *
   * @param ruta
   * @param nuevoTipoActividad
   * @memberof JsonColeccionRuta
   * @returns {void}
   */
  public modificarTipoActividadRuta(
    ruta: Ruta,
    nuevoTipoActividad: Actividad
  ): void {
    this.rutasDatabase
      .get("rutas")
      .find({ nombre: ruta.getNombre() })
      .assign({ tipoActividad: nuevoTipoActividad })
      .write();
  }

  /**
   * Método que permite modificar la dificultad de una ruta
   *
   * @param ruta
   * @param nuevaDificultad
   * @memberof JsonColeccionRuta
   * @returns {void}
   *
   */
  public modificarDificultadRuta(
    ruta: Ruta,
    nuevaDificultad: Dificultad
  ): void {
    this.rutasDatabase
      .get("rutas")
      .find({ nombre: ruta.getNombre() })
      .assign({ dificultad: nuevaDificultad })
      .write();
  }

  /**
   * Método que permite modificar la calificación de una ruta
   * @param ruta
   * @param id
   * @param nuevaCalificacion
   * @memberof JsonColeccionRuta
   * @returns {void}
   */
  public addUsuarioVisitante(ruta: Ruta, id: Number): void {
    this.rutasDatabase
      .get("rutas")
      .find({ nombre: ruta.getNombre() })
      .get("usuariosVisitantes")
      .write();
  }
}
