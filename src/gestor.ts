import inquirer from 'inquirer';
import { Usuario } from './usuario';
/**
 * Clase Gestor
 * Tiene que permitir añadir, borrar y modificar rutas, usuarios, grupos y retos, 
 * así como Visualizar todas las rutas existentes dentro del sistema, Unirse a un 
 * grupo existente, Visualizar, crear y borrar grupos.
 */
export class Gestor {
  public usuarios: string[]; //////////////////////////////////////////////// Cambiar el string de usuarios
  /// por un collection de Usuarios (hay que crear una clase ColeccionUsuario que 
  ///contenga un map con key el id y de resto el objeto usuario)

  constructor(usuarios: string[]) {
    this.usuarios = usuarios;
  }

  public getUsuarios(): string[] {
    return this.usuarios;
  }

  public registrarUsuario(): void {
    console.clear();
    console.log('Registrando usuario...');
    inquirer.prompt({
      type: 'input',
      name: 'nombre',
      message: 'Introduce tu nombre de usuario: ',
    }).then((respuesta) => {
      this.usuarios.push(respuesta.nombre);
      console.log('Usuario registrado con éxito');
      this.volverConsola();
    });
  }

  public listarUsuarios(): void {
    console.clear();
    console.log('Listando usuarios...');
    for (const usuario of this.usuarios) {
      console.log(usuario);
    }
    this.volverConsola();
  }

  /**
   * Elimina un usuario de la lista de usuarios con opción a cancelar
   */
  eliminarUsuario(): void {
    inquirer.prompt({
      type: 'list',
      name: 'usuario',
      message: 'Elige un usuario a eliminar',
      choices: this.usuarios,
    }).then((respuesta) => {
      inquirer.prompt({
        type: 'confirm',
        name: 'confirmacion',
        message: `¿Estás seguro de que quieres eliminar a ${respuesta.usuario}?`,
      }).then((respuesta2) => {
        if (respuesta2.confirmacion) {
          this.usuarios = this.usuarios.filter((usuario) => usuario !== respuesta.usuario);
          console.log('Usuario eliminado con éxito');
        } else {
          console.log('Operación cancelada');
        }
        this.volverConsola();
      });
    });
  }

  private volverConsola(): void {
    inquirer.prompt({
      type: 'list',
      name: 'volver',
      message: 'Presiona enter para volver a atrás en la consola',
      choices: ['Volver a la consola'],
    }).then((respuesta) => {
      this.consola();
    });
  }

  public consola(): void {
    console.clear();
    console.log('Bienvenido a la consola de gestión');
    inquirer.prompt({
      type: 'list',
      name: 'opcion',
      message: 'Elige una opción: ',
      choices: [
        'Registrar usuario',
        'Listar usuarios',
        'Eliminar usuario',
        'Salir',
      ],
    }).then((respuesta) => {
      switch (respuesta.opcion) {
        case 'Registrar usuario':
          this.registrarUsuario();
          break;
        case 'Listar usuarios':
          this.listarUsuarios();
          break;
        case 'Salir':
          console.log('Hasta pronto');
          break;
        case 'Eliminar usuario':
          this.eliminarUsuario();
          break;
        default:
          break;
      }
    });
  }
}

const usuarios: string[] = ['Pepe', 'Juan', 'Luis'];
const gestor = new Gestor(usuarios);
gestor.consola();