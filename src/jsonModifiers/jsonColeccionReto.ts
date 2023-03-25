import { Reto } from '../modelos/reto';
import { ColeccionReto } from '../colecciones/coleccionReto';
import lowdb, { LowdbSync } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

interface DatabaseSchema {
  retos: Reto[];
}

export class JsonColeccionReto extends ColeccionReto {
  private retosDatabase: LowdbSync<DatabaseSchema>;

  constructor() {
    super();
    const adapter = new FileSync<DatabaseSchema>('./dataBase/reto.json');
    this.retosDatabase = lowdb(adapter);
    this.retosDatabase.defaults({ retos: [] }).write();
  }
  
  /** 
   * Método que permite registrar un reto en la base de datos que comprueba 
   * si el reto ya existe de antemano
   */
  public registrarReto(reto: Reto): void {
    this.retosDatabase.get('retos').push(reto).write();
  }
  
  public cargarRetos(): Reto[] {
    const retos_no_instancia: Reto[] = this.retosDatabase.get('retos').value();
    const retos: Reto[] = [];
    for (const reto of retos_no_instancia) {
      let retoAux = new Reto(reto.id, reto.nombre, reto.rutas, reto.tipoActividad, reto.kmTotales);
      retoAux.setUsuarios(reto.usuarios);
      retos.push(retoAux);
    }
    // Compruebamos si alguno de los retos es una instancia de reto
    for (const reto of retos) {
      if (!(reto instanceof Reto)) {
        throw new Error('reto NO es instancia de reto');
      }
    }
    return retos;
  }

  public eliminarReto(reto: Reto): void {
    this.retosDatabase.get('retos').remove({ nombre: reto.getNombre() }).write();
  }
}
