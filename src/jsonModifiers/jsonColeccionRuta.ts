import lowdb, { LowdbSync } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Ruta } from "../modelos/ruta";
import { ColeccionRuta } from "../colecciones/coleccionRuta";
import { Dificultad } from '../enums/dificultadEnum';
import { Actividad } from '../enums/actividadEnum';
import { Coordenadas } from '../interfaces/coordenadasInterface';

interface DatabaseSchema {
  rutas: Ruta[];
}

export class JsonColeccionRuta extends ColeccionRuta {
  private rutasDatabase: LowdbSync<DatabaseSchema>;

  constructor() {
    super();
    const adapter = new FileSync<DatabaseSchema>('./dataBase/rutas.json');
    this.rutasDatabase = lowdb(adapter);
    this.rutasDatabase.defaults({ rutas: [] }).write();
  }

  /**
   * Método que permite insertar una ruta en la base de datos que comprueba
   */
  public insertarRuta(ruta: Ruta): void {
    this.rutasDatabase.get('rutas').push(ruta).write();
  }

  public cargarRutas(): Ruta[] {
    const rutas_no_instancia: Ruta[] = this.rutasDatabase.get('rutas').value();
    const rutas: Ruta[] = [];
    for (const ruta of rutas_no_instancia) {
      let rutaAux = new Ruta(ruta.nombre, ruta.coordenadasInicio, ruta.coordenadasFin, ruta.longitud, ruta.desnivel, ruta.tipoActividad, ruta.dificultad)
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
        throw new Error('Ruta NO es instancia de Ruta');
      }
    }

    return rutas;
  }

  public eliminarRuta(ruta: Ruta): void {
    this.rutasDatabase.get('rutas').remove({ nombre: ruta.getNombre() }).write();
  }

  public modificarNombreRuta(ruta: Ruta, nuevoNombre: string): void {
    this.rutasDatabase.get('rutas').find({ nombre: ruta.getNombre() }).assign({ nombre: nuevoNombre }).write();
  }

  public modificarCoordenadasRuta(ruta: Ruta, coordenadasInicio: Coordenadas, coordenadasFin: Coordenadas): void {
    this.rutasDatabase.get('rutas').find({ nombre: ruta.getNombre() }).assign({ coordenadasInicio: coordenadasInicio, coordenadasFin: coordenadasFin }).write();
  }

  public modificarLongitudRuta(ruta: Ruta, nuevaLongitud: number): void {
    this.rutasDatabase.get('rutas').find({ nombre: ruta.getNombre() }).assign({ longitud: nuevaLongitud }).write();
  }

  public modificarDesnivelRuta(ruta: Ruta, nuevoDesnivel: number): void {
    this.rutasDatabase.get('rutas').find({ nombre: ruta.getNombre() }).assign({ desnivel: nuevoDesnivel }).write();
  }

  public modificarTipoActividadRuta(ruta: Ruta, nuevoTipoActividad: Actividad): void {
    this.rutasDatabase.get('rutas').find({ nombre: ruta.getNombre() }).assign({ tipoActividad: nuevoTipoActividad }).write();
  }

  public modificarDificultadRuta(ruta: Ruta, nuevaDificultad: Dificultad): void {
    this.rutasDatabase.get('rutas').find({ nombre: ruta.getNombre() }).assign({ dificultad: nuevaDificultad }).write();
  }
}
