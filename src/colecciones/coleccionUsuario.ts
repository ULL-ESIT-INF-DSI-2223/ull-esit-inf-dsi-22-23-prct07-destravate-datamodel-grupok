import { Usuario } from '../modelos/usuario';
/**
 * 
 */
export class ColeccionUsuario {
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

  public listarUsuarios(): void {
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
  public insertarUsuario(usuario: Usuario): void {
    if (this.usuarios.has(usuario.getID())) {
      console.log('El usuario ya existe insertar usuario');
      return;
    }
    this.usuarios.set(usuario.getID(), usuario);
  }
}