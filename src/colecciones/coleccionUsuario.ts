import { Usuario } from '../modelos/usuario';

/**
 * 
 */
export class ColeccionUsuario {
  private usuarios: Map<number, Usuario>;

  constructor() {
    this.usuarios = new Map();
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
}