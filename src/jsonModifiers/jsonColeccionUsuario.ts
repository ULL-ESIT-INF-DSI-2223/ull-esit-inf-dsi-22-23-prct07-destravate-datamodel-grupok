import { ColeccionUsuario } from '../colecciones/coleccionUsuario';
import lowdb, { LowdbSync } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { Usuario } from '../modelos/usuario';
import { Actividad } from '../enums/actividadEnum';

/**
 * Interfaz de la base de datos
 * 
 * @export
 * @interface DatabaseSchema
 * 
 */
export interface DatabaseSchema {
  usuarios: Usuario[];
}

/**
 * Clase encargada de gestionar la colección de usuarios
 * 
 * @export
 * @class JsonColeccionUsuario
 * @extends {ColeccionUsuario}
 * 
 */
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
  
  /**
   * Método que permite cargar los usuarios de la base de datos
   * 
   * @returns {Usuario[]}
   * @memberof JsonColeccionUsuario
   * 
   */
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

  /**
   * Método que permite eliminar un usuario de la base de datos
   * 
   * @param {Usuario} usuario
   * @memberof JsonColeccionUsuario
   * 
   */
  public eliminarUsuario(usuario: Usuario): void {
    this.usuariosDatabase.get('usuarios').remove({ nombre: usuario.getNombre() }).write();
  }

  /**
   * Método que permite modificar el nombre de un usuario
   * @param usuario 
   * @param nombre
   * @memberof JsonColeccionUsuario
   */
  public modificarNombre(usuario: Usuario, nombre: string): void {
    // comprobar que el nombre de usuario nuevo no existe
    if (this.usuariosDatabase.get('usuarios').find({ nombre: nombre }).value() != undefined) {
      throw new Error('El nombre de usuario ya existe json');
    }
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).assign({ nombre: nombre }).write();
  }

  /**
   * Método que permite modificar la contraseña de un usuario
   * @param usuario 
   * @param contraseña 
   */
  public modificarContraseña(usuario: Usuario, contraseña: string): void {
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).assign({ contraseña: contraseña }).write();
  }

  /**
   * Método que permite modificar la actividad de un usuario
   * @param usuario
   * @param actividad
   */
  public modificarActividad(usuario: Usuario, actividad: Actividad): void {
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).assign({ actividades: actividad }).write();
  }

  /***
   * Método que permite añadir un amigo frecuente a un usuario
   * @param usuario
   * @param amigo
   */
  public addAmigo(usuario: Usuario): void {
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).get('amigosApp').write();
  }

  /**
   * Método que permite eliminar un amigo frecuente de un usuario
   * @param usuario 
   * @param ID 
   */
  public eraseAmigo(usuario: Usuario, ID: number): void {
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).get('amigosApp').pull(ID).write();
  }

  /**
   * Método que permite añadir un amigo frecuente a un usuario
   * @param usuario 
   * @param ruta 
   */
  public addRutaFavorita(usuario: Usuario, ruta: number): void {
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).get('rutasFavoritas').write();
  }

  /**
   * Método que permite eliminar una ruta favorita de un usuario
   * @param usuario
   * @param ruta
   */
  public eraseRutaFavorita(usuario: Usuario, ruta: number): void {
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).get('rutasFavoritas').pull(ruta).write();
  }

  /**
   * Método que permite añadir una ruta realizada a un usuario
   * @param usuario 
   * @param ruta 
   */
  public addRutaRealizada(usuario: Usuario, ruta:{ ruta: number; fecha: string; }): void {
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).get('historicoRutas').write();
  }

  /**
   * Método que permite añadir un reto activo a un usuario
   * @param usuario 
   * @param reto 
   */
  public addRetosActivos(usuario: Usuario, reto: number): void {
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).get('retosActivos').write();
  }

  /**
   * Método que permite eliminar un reto activo de un usuario
   * @param usuario 
   * @param reto 
   */
  public eraseRetosActivos(usuario: Usuario, reto: number): void {
    this.usuariosDatabase.get('usuarios').find({ nombre: usuario.getNombre() }).get('retosActivos').pull(reto).write();
  }

}
