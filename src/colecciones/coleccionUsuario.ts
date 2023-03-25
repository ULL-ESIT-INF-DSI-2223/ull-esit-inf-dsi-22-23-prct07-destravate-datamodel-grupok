import { Usuario } from '../modelos/usuario';
import { Coleccion } from '../interfaces/coleccion';
import { Actividad } from '../enums/actividadEnum';

/**
 * Clase que implemente Colección y la especifica para usuarios
 */
export class ColeccionUsuario implements Coleccion<Usuario> {
  private usuarios: Map<number, Usuario>;

  /**
   * Constructor de la clase
   */
  constructor() {
    this.usuarios = new Map();
  }

  /**
   * Hacem posible que la clase ColeccionUsuario sea iterable
   */
  [Symbol.iterator]() {
    return this.usuarios.values();
  }

  /**
   * Método setUsuarios, establece el valor de usuarios pero antes revisa si el usuario ya existe mediante 
   * el uso del id
   * @param usuarios 
   */
  public setUsuarios(usuarios: Map<number, Usuario>): void {
    this.usuarios = usuarios;
  }

  /**
   * Setter de los usuarios (entrada en formato array)
   * @param usuarios Users en formato array
   */
  public setUsuariosFromArray(usuarios: Usuario[]): void {
    for (const usuario of usuarios) {
      if (usuario instanceof Usuario && !this.usuarios.has(usuario.getID())) {
        console.log('Usuario insertado');
        this.usuarios.set(usuario.getID(), usuario);
      }
    }
  }    

  /**
   * Getter de la clase usuario
   * @returns Map con los usuarios
   */
  public getUsuarios(): Map<number, Usuario> {
    return this.usuarios;
  }

  /**
   * Método que permite listar los usuarios
   */
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
   * @param usuario Usuario a insertar
   */
  public insertar(usuario: Usuario): void {
    if (this.usuarios.has(usuario.getID())) {
      throw new Error('El usuario con id ' + usuario.getID() + ' ya existe');
    }
  
    // comprobar que el nombre no existe
    const nuevoNombre = usuario.getNombre();
    for (const u of this.usuarios.values()) {
      if (u.getNombre() === nuevoNombre) {
        throw new Error('El usuario con nombre ' + nuevoNombre + ' ya existe');
      }
    }
  
    this.usuarios.set(usuario.getID(), usuario);
  }  

  /**
   * Método que permite eliminar usuarios
   * @param usuario Usuario a eliminar
   */
  public eliminar( usuario: Usuario) {
    if (this.usuarios.has(usuario.getID())) {
      this.usuarios.delete(usuario.getID());
    }
    else {
      console.log("El grupo que deseas eliminar no existe.");
    }
    
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

  public getUsuario(id: number): Usuario {
    return this.usuarios.get(id)!;
  }
}