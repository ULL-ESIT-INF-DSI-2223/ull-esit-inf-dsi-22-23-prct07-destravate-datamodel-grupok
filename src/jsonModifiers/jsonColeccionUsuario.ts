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
    const adapter = new FileSync<DatabaseSchema>('usuarios.json');
    this.usuariosDatabase = lowdb(adapter);
    this.usuariosDatabase.defaults({ usuarios: [] }).write();
  }

  public registrarUsuario(usuario: Usuario): void {
    super.registrarUsuario(usuario);
    const usuarios: Usuario[] = this.usuariosDatabase.get('usuarios').value();
    usuarios.push(usuario);
    this.usuariosDatabase.set('usuarios', usuarios).write();
    // if (usuarios && usuarios.length > 0) {
    //   usuarios.push(usuario);
    //   this.usuariosDatabase.set('usuarios', usuarios).write();
    // }
  //   // Si no hay usuarios en la base de datos se crea un array con el usuario 
  //   else {
  //     this.usuariosDatabase.defaults({ usuarios: [usuario] }).write();
  //   }
  }   
}

const jsonColeccionUsuario = new JsonColeccionUsuario();
const usuario1 = new Usuario('Pepe', 'bicicleta');
// dasd
jsonColeccionUsuario.registrarUsuario(usuario1);
jsonColeccionUsuario.listarUsuarios();
