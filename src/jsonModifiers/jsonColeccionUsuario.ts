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
    this.usuariosDatabase.get('usuarios').push(usuario).write();
  }
  
  public cargarUsuarios(): Usuario[] {
    const usuarios_no_instancia: Usuario[] = this.usuariosDatabase.get('usuarios').value();
    const usuarios: Usuario[] = [];
    for (const usuario of usuarios_no_instancia) {
      let usuarioAux = new Usuario(usuario.nombre, usuario.actividades);
      usuarioAux.setAmigosApp(usuario.amigosApp);
      usuarioAux.setAmigosFrecuentes(usuario.amigosFrecuentes);
      usuarioAux.setEstadisticas(usuario.estadisticas);
      usuarioAux.setRutasFavoritas(usuario.rutasFavoritas);
      usuarioAux.setRetosActivos(usuario.retosActivos);
      usuarioAux.setHistoricoRutas(usuario.historicoRutas);
      usuarios.push(usuarioAux);
    }
    
    /// Comprueba si alguno de los usuarios es una instancia de usuario
    for (const usuario of usuarios) {
      if (!(usuario instanceof Usuario)) {
        throw new Error('Usuario NO es instancia de Usuario');
      }
    }

    return usuarios;
  }

  public eliminarUsuario(usuario: Usuario): void {
    this.usuariosDatabase.get('usuarios').remove({ nombre: usuario.getNombre() }).write();
  }
}
