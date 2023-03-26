import { Grupo } from "../modelos/grupo";
import { ColeccionGrupo } from "../colecciones/coleccionGrupo";
import lowdb, { LowdbSync } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

/**
 * Database schema
 * 
 * @interface DatabaseSchema  
 * @property {Grupo[]} grupos
 */
interface DatabaseSchema{
  grupos: Grupo[];
}

/**
 * Clase encargada de gestionar la colección de grupos
 * 
 * @export
 * @class JsonColeccionGrupo
 * @extends {ColeccionGrupo}
 * 
 */
export class JsonColeccionGrupo extends ColeccionGrupo {
  private gruposDatabase: LowdbSync<DatabaseSchema>;

  constructor() {
    super();
    const adapter = new FileSync<DatabaseSchema>('./dataBase/grupos.json');
    this.gruposDatabase = lowdb(adapter);
    this.gruposDatabase.defaults({ grupos: [] }).write();
  }

  /**
   * Inserta un grupo en la base de datos
   * 
   * @param {Grupo} grupo
   * @memberof JsonColeccionGrupo
   */
  public insertarGrupo(grupo: Grupo): void {
    this.gruposDatabase.get('grupos').push(grupo).write();
  }

  /**
   * Carga los grupos de la base de datos
   * 
   * @returns {Grupo[]}
   * @memberof JsonColeccionGrupo
   */
  public cargarGrupos(): Grupo[] {
    const grupos_no_instancia: Grupo[] = this.gruposDatabase.get('grupos').value();
    const grupos: Grupo[] = [];
    for (const grupo of grupos_no_instancia) {
      let grupoAux = new Grupo(grupo.nombre, grupo.creador);
      grupoAux.setID(grupo.id);
      grupoAux.setCreador(grupo.creador);
      grupoAux.setEstadisticasEntrenamiento(grupo.estadisticasEntrenamiento);
      grupoAux.setParticipantes(grupo.participantes);
      grupoAux.setClasificacion(grupo.clasificacion);
      grupoAux.setRutasFavoritas(grupo.rutasFavoritas);
      grupoAux.setHistoricoRutas(grupo.historicoRutas);
      grupos.push(grupoAux);
    }
    // Compruebamos si alguno de los grupos es una instancia de grupo
    for (const grupo of grupos) {
      if (!(grupo instanceof Grupo)) {
        throw new Error('Grupo NO es instancia de Grupo');
      }
    }

    return grupos;
  }

  /**
   * Elimina un grupo de la base de datos
   * 
   * @param {Grupo} grupo
   * @memberof JsonColeccionGrupo
   * 
   */
  public eliminarGrupo(grupo: Grupo): void {
    this.gruposDatabase.get('grupos').remove({ nombre: grupo.getNombre() }).write();
  }

  /**
   * Modifica el nombre de un grupo
   * 
   * @param {Grupo} grupo
   * @param {string} nombre
   * @memberof JsonColeccionGrupo
   */
  public modificarNombre(grupo: Grupo, nombre: string): void {
    this.gruposDatabase.get('grupos').find({ nombre: grupo.getNombre() }).assign({ nombre: nombre }).write();
  }

  /**
   * 
   * Modifica el nombre del creador
   * 
   * @param grupo 
   * @param creador 
   * 
   * @memberof JsonColeccionGrupo
   */
  public modificarCreador(grupo: Grupo, creador: number): void {
    this.gruposDatabase.get('grupos').find({ nombre: grupo.getNombre() }).assign({ creador: creador }).write();
  }

  /**
   * 
   * Modifica la clasificación de un grupo
   * 
   * @param grupo 
   * @param ruta 
   */
  public addRutaRealizada(grupo: Grupo, ruta:{ ruta: number; fecha: string; }): void {
    this.gruposDatabase.get('grupos').find({ nombre: grupo.getNombre() }).get('historicoRutas').write();
  }

  /**
   * 
   * Modifica la clasificación de un grupo
   * 
   * @param grupo 
   * @param ruta 
   */
  public addRutaFavorita(grupo: Grupo, ruta: number): void {
    this.gruposDatabase.get('grupos').find({ nombre: grupo.getNombre() }).get('rutasFavoritas').write();
  }

  /**
   * 
   * Borra una ruta de la lista de rutas favoritas
   * 
   * @param grupo 
   * @param ruta 
   */
  public eraseRutaFavorita(grupo: Grupo, ruta: number): void {
    this.gruposDatabase.get('grupos').find({ nombre: grupo.getNombre() }).get('rutasFavoritas').write();
  }

  /**
   * Añade un participante a un grupo
   * 
   * @param grupo 
   * @param participante 
   */
  public addParticipante(grupo: Grupo, participante: number): void {
    this.gruposDatabase.get('grupos').find({ nombre: grupo.getNombre() }).get('participantes').write();
  }

  /**
   * 
   * Borra un participante de un grupo
   * 
   * @param grupo 
   * @param participante 
   */
  public eraseParticipante(grupo: Grupo, participante: number): void {
    this.gruposDatabase.get('grupos').find({ nombre: grupo.getNombre() }).get('participantes').pull(participante).write();
  }

}



