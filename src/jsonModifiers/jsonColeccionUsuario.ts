import { ColeccionUsuario } from '../colecciones/coleccionUsuario';
import lowdb, { LowdbSync } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Usuario } from '../modelos/usuario';

interface DatabaseSchema {
  usuarios: Usuario[];
}

export class JsonColeccionUsuario extends ColeccionUsuario {
  private usuariosDatabase: lowdb.LowdbSync<Usuario[]>;

  constructor() {
    super();
    const adapter = new FileSync<Usuario[]>('usuarios.json');
    this.usuariosDatabase = lowdb(adapter);
    this.usuariosDatabase.defaults({ usuarios: [] }).write();
  }

  public registrarUsuario(usuario: Usuario): void {
    super.registrarUsuario(usuario);
    const usuarios = this.usuariosDatabase.get('usuarios').value();
    if (usuarios && usuarios.length > 0) {
      usuarios.push(usuario);
      this.usuariosDatabase.set('usuarios', usuarios).write();
    }
    else {
      this.usuariosDatabase.defaults({ usuarios: [usuario] }).write();
    }
  }
}
