import { Grupo } from "../modelos/grupo";
import { ColeccionGrupo } from "../colecciones/coleccionGrupo";
import lowdb, { LowdbSync } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

interface DatabaseSchema{
  grupos: Grupo[];
}

export class JsonColeccionGrupo extends ColeccionGrupo {
  private gruposDatabase: LowdbSync<DatabaseSchema>;

  constructor() {
    super();
    const adapter = new FileSync<DatabaseSchema>('./dataBase/grupos.json');
    this.gruposDatabase = lowdb(adapter);
    this.gruposDatabase.defaults({ grupos: [] }).write();
  }

  public insertarGrupo(grupo: Grupo): void {
    this.gruposDatabase.get('grupos').push(grupo).write();
  }

  public cargarGrupos(): Grupo[] {
    const grupos_no_instancia: Grupo[] = this.gruposDatabase.get('grupos').value();
    const grupos: Grupo[] = [];
    for (const grupo of grupos_no_instancia) {
      let grupoAux = new Grupo(grupo.nombre, grupo.creador);
      grupoAux.setID(grupo.id);
      grupoAux.setCreador(grupo.creador);
      grupoAux.setEstadisticasEntrenamiento(grupo.estadisticasEntrenamiento);
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

  public eliminarGrupo(grupo: Grupo): void {
    this.gruposDatabase.get('grupos').remove({ nombre: grupo.getNombre() }).write();
  }

  public modificarNombre(grupo: Grupo, nombre: string): void {
    this.gruposDatabase.get('grupos').find({ nombre: grupo.getNombre() }).assign({ nombre: nombre }).write();
  }

  public modificarCreador(grupo: Grupo, creador: number): void {
    this.gruposDatabase.get('grupos').find({ nombre: grupo.getNombre() }).assign({ creador: creador }).write();
  }

  public addRuta(grupo: Grupo, ruta: number): void {
    this.gruposDatabase.get('grupos').find({ nombre: grupo.getNombre() }).get('rutasFavoritas').push(ruta).write();
  }

  public eraseRuta(grupo: Grupo, ruta: number): void {
    this.gruposDatabase.get('grupos').find({ nombre: grupo.getNombre() }).get('rutasFavoritas').remove(ruta).write();
  }

  public addParticipante(grupo: Grupo, participante: number): void {
    this.gruposDatabase.get('grupos').find({ nombre: grupo.getNombre() }).get('participantes').push(participante).write();
  }

  public eraseParticipante(grupo: Grupo, participante: number): void {
    this.gruposDatabase.get('grupos').find({ nombre: grupo.getNombre() }).get('participantes').remove(participante).write();
  }

}



