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
  public setUsuarios(usuarios: Map<number, Usuario>): void {
    for (const usuario of usuarios.values()) {
      if (!this.usuarios.has(usuario.getID())) {
        this.usuarios.set(usuario.getID(), usuario);
      }
    }
  }

  public getUsuarios(): Map<number, Usuario> {
    return this.usuarios;
  }

  public registrarUsuario(usuario: Usuario): void {
    this.usuarios.set(usuario.getID(), usuario);
  }

  public listarUsuarios(): void {
    console.clear();
    console.log('Listando usuarios...');
    for (const usuario of this.usuarios.values()) {
      console.log(usuario);
    }
  }

  public insertUsuario(usuario: Usuario): void {
    this.usuarios.set(usuario.getID(), usuario);
  }
}