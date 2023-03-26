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
    if (this.retosDatabase.get('retos').find({ nombre: reto.getNombre() }).value() != null) {
      throw new Error('El reto ya existe');
    }
    this.retosDatabase.get('retos').push(reto).write();
  }
  
  public cargarRetos(): Reto[] {
    const retos_no_instancia: Reto[] = this.retosDatabase.get('retos').value();
    const retos: Reto[] = [];
    for (const reto of retos_no_instancia) {
      let retoAux = new Reto(reto.nombre, reto.tipoActividad);
      retoAux.setID(reto.id);
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

  public modificarNombre(reto: Reto, nombre: string): void {
    this.retosDatabase.get('retos').find({ nombre: reto.getNombre() }).assign({ nombre: nombre }).write();
  }

  public addRuta(reto: Reto, ruta: number): void {
    this.retosDatabase.get('retos').find({ nombre: reto.getNombre() }).assign({ rutas: ruta }).write();
  }

  public eraseRuta(reto: Reto, ruta: number): void {
    this.retosDatabase.get('retos').find({ nombre: reto.getNombre() }).assign({ rutas: ruta }).write();
  }

  public modificarActividad(reto: Reto, actividad: string): void {
    this.retosDatabase.get('retos').find({ nombre: reto.getNombre() }).assign({ tipoActividad: actividad }).write();
  }

  public addUsuario(reto: Reto, id: number): void {
    // Buscamos el reto en función del ID, luego añadimos el usuario a la lista de usuarios
    this.retosDatabase.get('retos').find({ nombre: reto.getNombre() }).get('usuarios').write();
  }

  public eraseUsuario(reto: Reto, usuario: number): void {
    this.retosDatabase.get('retos').find({ nombre: reto.getNombre() }).assign({ usuarios: usuario }).write();
  }
}
