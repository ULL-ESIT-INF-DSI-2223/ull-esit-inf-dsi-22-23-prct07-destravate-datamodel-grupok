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
  public insertarUsuario(usuario: Usuario): void {
    // comprobar que el nombre de usuario no existe
    if (this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).value() != undefined) {
      throw new Error('El nombre de usuario ya existe');
    }
    this.usuariosDatabase.get('usuarios').push(usuario).write();
  }
  
  public cargarUsuarios(): Usuario[] {
    const usuarios_no_instancia: Usuario[] = this.usuariosDatabase.get('usuarios').value();
    const usuarios: Usuario[] = [];
    for (const usuario of usuarios_no_instancia) {
      let usuarioAux = new Usuario(usuario.nombre, usuario.contraseña, usuario.actividades);
      usuarioAux.setAmigosApp(usuario.amigosApp);
      usuarioAux.setAmigosFrecuentes(usuario.amigosFrecuentes);
      usuarioAux.setEstadisticas(usuario.estadisticas);
      usuarioAux.setRutasFavoritas(usuario.rutasFavoritas);
      usuarioAux.setRetosActivos(usuario.retosActivos);
      usuarioAux.setHistoricoRutas(usuario.historicoRutas);
      usuarioAux.setID(usuario.id);
      usuarios.push(usuarioAux);
    }
    // Compruebamos si alguno de los usuarios es una instancia de usuario
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

  public modificarNombre(usuario: Usuario, nombre: string): void {
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).assign({ nombre: nombre }).write();
  }

  public modificarContraseña(usuario: Usuario, contraseña: string): void {
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).assign({ contraseña: contraseña }).write();
  }

  public modificarActividad(usuario: Usuario, actividad: string): void {
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).assign({ actividad: actividad }).write();
  }

  public addAmigo(usuario: Usuario, amigo: number): void {
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).get('amigosApp').push(amigo).write();
  }

  public eraseAmigo(usuario: Usuario, amigo: number): void {
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).get('amigosApp').remove(amigo).write();
  }

  public addRuta(usuario: Usuario, ruta: number): void {
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).get('rutasFavoritas').push(ruta).write();
  }

  public eraseRuta(usuario: Usuario, ruta: number): void {
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).get('rutasFavoritas').remove(ruta).write();
  }

  public addRetosActivos(usuario: Usuario, reto: number): void {
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).get('retosActivos').push(reto).write();
  }

  public eraseRetosActivos(usuario: Usuario, reto: number): void {
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).get('retosActivos').remove(reto).write();
  }
}
