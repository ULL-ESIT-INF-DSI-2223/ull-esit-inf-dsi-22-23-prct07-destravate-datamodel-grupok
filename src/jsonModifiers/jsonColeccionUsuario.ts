import { ColeccionUsuario } from '../colecciones/coleccionUsuario';
import lowdb, { LowdbSync } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Usuario } from '../modelos/usuario';

interface DatabaseSchema {
  usuarios: Usuario[];
}

export class JsonColeccionUsuario extends ColeccionUsuario {
  private usuariosDatabase: LowdbSync<DatabaseSchema>;

  constructor() {
    super();
    const adapter = new FileSync<DatabaseSchema>('./dataBase/usuarios.json');
    this.usuariosDatabase = lowdb(adapter);
    this.usuariosDatabase.defaults({ usuarios: [] }).write();
  }
  
  /** 
   * Método que permite registrar un usuario en la base de datos que comprueba 
   * si el usuario ya existe de antemano
   */
  public registrarUsuario(usuario: Usuario): void {
    // super.registrarUsuario(usuario);
    // const usuarios: Usuario[] = this.usuariosDatabase.get('usuarios').value();
    // usuarios.push(usuario);
    // this.usuariosDatabase.set('usuarios', usuarios).write();
    if (this.usuariosDatabase.get('usuarios').find({ id: usuario.getID() }).value()) {
      console.log('El usuario ya existe json');
      /// Muesta la información del usuario que se quiere meter
      console.log(usuario);
      return;
    }
    else {
      this.usuariosDatabase.get('usuarios').push(usuario).write();
    }
  }
  
  public cargarUsuarios(): Usuario[] {
    const usuarios: Usuario[] = this.usuariosDatabase.get('usuarios').value();
    return usuarios;
  }
}
