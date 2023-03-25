import lowdb, { LowdbSync } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Ruta } from "../modelos/ruta";
import { ColeccionRuta } from "../colecciones/coleccionRuta";

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
      rutaAux.setID(ruta.getID());
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
}
