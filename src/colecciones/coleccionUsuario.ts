import { Usuario } from '../modelos/usuario';
import { Coleccion } from '../interfaces/coleccion';
import { Actividad } from '../enums/actividadEnum';
/**
 * 
 */
export class ColeccionUsuario implements Coleccion<Usuario> {
  private usuarios: Map<number, Usuario>;

  constructor() {
    this.usuarios = new Map();
  }

  /**
   * Hacemos que la clase ColeccionUsuario sea iterable
   */
  [Symbol.iterator]() {
    return this.usuarios.values();
  }

  /**
   * Método setUsuarios, establece el valor de usuarios pero antes revisa si el usuario ya existe mediante 
   * el uso del id
   * @param usuarios 
   */
  public setUsuarios(usuarios: Usuario[]): void {
    for (const usuario of usuarios) {
      if (usuario instanceof Usuario && !this.usuarios.has(usuario.getID())) {
        console.log('Usuario insertado');
        this.usuarios.set(usuario.getID(), usuario);
      }
    }
  }


  public getUsuarios(): Map<number, Usuario> {
    return this.usuarios;
  }

  public listar(): void {
    console.clear();
    console.log('Listando usuarios...');
    for (const usuario of this.usuarios.values()) {
      console.log(usuario);
    }
  }

  /**
   * Método que permite insertar un usuario en la colección de usuarios revisando
   * previamente que el usuario no exista
   * @param usuario 
   */
  public insertar(usuario: Usuario): void {
    if (this.usuarios.has(usuario.getID())) {
      /// Lanzamos un error que debería decir el id del usuario que ya existe
      throw new Error('El usuario con id ' + usuario.getID() + ' ya existe');
      // console.log('El usuario ya existe insertar usuario');
      // return;
    }
    this.usuarios.set(usuario.getID(), usuario);
  }

  public eliminar( usuario: Usuario) {
    this.usuarios.delete(usuario.getID());
  }

  /**
   * Método que permite modificar el nombre de un usuario
   * @param usuario usuario a modificar
   * @param nombre nuevo nombre
   */
  public modificarNombre( usuario: Usuario, nombre: string) {
    this.usuarios.get(usuario.getID())!.setNombre(nombre);
  }

  public modificarContraseña( usuario: Usuario, contraseña: string) {
    this.usuarios.get(usuario.getID())!.setContraseña(contraseña);
  }

  public modificarActividad( usuario: Usuario, actividad: Actividad ) {
    this.usuarios.get(usuario.getID())!.setActividades(actividad);
  }

  public addAmigo( usuario: Usuario, amigo: number) {
    this.usuarios.get(usuario.getID())!.addAmigoApp(amigo);
  }

  public eraseAmigo( usuario: Usuario, amigo: number) {
    this.usuarios.get(usuario.getID())!.eraseAmigoApp(amigo);
  }

  public addRuta( usuario: Usuario, ruta: number) {
    this.usuarios.get(usuario.getID())!.addRutaFavorita(ruta);
  }

  public eraseRuta( usuario: Usuario, ruta: number) {
    this.usuarios.get(usuario.getID())!.eraseRutaFavorita(ruta);
  }

  public addRetosActivos( usuario: Usuario, reto: number) {
    this.usuarios.get(usuario.getID())!.addRetosActivos(reto);
  }

  public eraseRetosActivos( usuario: Usuario, reto: number) {
    this.usuarios.get(usuario.getID())!.eraseRetosActivos(reto);
  }
}