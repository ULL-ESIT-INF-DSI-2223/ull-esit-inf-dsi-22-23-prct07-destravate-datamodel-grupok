import inquirer from 'inquirer';
import { Usuario } from './usuario';
import { ColeccionUsuario } from '../colecciones/coleccionUsuario';

/// crea un tipo
/**
 * Clase Gestor
 * Tiene que permitir añadir, borrar y modificar rutas, usuarios, grupos y retos, 
 * así como Visualizar todas las rutas existentes dentro del sistema, Unirse a un 
 * grupo existente, Visualizar, crear y borrar grupos.
 */
export class Gestor {
  private usuarios: ColeccionUsuario;

  constructor() {
    this.usuarios = new ColeccionUsuario();
  }

  public getUsuarios() {
    return this.usuarios;
  }

  /**
   * Método que permite crear usuarios y añadirlos a la colección de usuarios,
   * esto lo hace preguntando el nombre del usuario y la actividad que realiza
   */
  public registrarUsuario(): void {
    console.clear();
    console.log('Registrando usuario...');
    inquirer.prompt({
      type: 'input',
      name: 'nombre',
      message: 'Introduce tu nombre de usuario: ',
    }).then((respuesta) => {
      inquirer.prompt({
        type: 'list',
        name: 'actividad',
        message: 'Elige una actividad: ',
        choices: ['bicicleta', 'corredor'],
      }).then((respuesta2) => {
        const usuario = new Usuario(respuesta.nombre, respuesta2.actividad);
        this.usuarios.registrarUsuario(usuario);
        console.log('Usuario registrado con éxito');
        this.volverConsola();
      });
    });
    // console.clear();
    // console.log('Registrando usuario...');
    // inquirer.prompt({
    //   type: 'input',
    //   name: 'nombre',
    //   message: 'Introduce tu nombre de usuario: ',
    // }).then((respuesta) => {
    //   this.usuarios.push(respuesta.nombre);
    //   console.log('Usuario registrado con éxito');
    //   this.volverConsola();
    // });

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
  public eliminarUsuario(): void {
    console.clear();
    console.log('Eliminando usuario...');
  
    // Obtener el listado de usuarios
    const usuarios = this.usuarios.getUsuarios();
    const opcionesUsuarios = Array.from(usuarios.values()).map((usuario) => usuario.getNombre());
  
    // Pedir al usuario que seleccione el usuario a eliminar
    inquirer.prompt({
      type: 'list',
      name: 'usuario',
      message: 'Selecciona el usuario que deseas eliminar:',
      choices: opcionesUsuarios.concat('Cancelar'),
    }).then((respuesta) => {
      if (respuesta.usuario === 'Cancelar') {
        this.volverConsola();
      } else {
        // Buscar el usuario a eliminar por su nombre y eliminarlo
        const usuarioAEliminar = Array.from(usuarios.values()).find((usuario) => usuario.getNombre() === respuesta.usuario);
        if (usuarioAEliminar) {
          usuarios.delete(usuarioAEliminar.getID());
          console.log(`Usuario ${usuarioAEliminar.getNombre()} eliminado con éxito`);
        } else {
          console.log(`No se encontró el usuario ${respuesta.usuario}`);
        }
        this.volverConsola();
      }
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

/// generamos un par de usuarios con parámetros Nombre y Actividad
const usuario1 = new Usuario('Jaime', 'bicicleta');
const usuario2 = new Usuario('Ramón', 'corredor');

const gestor = new Gestor();
gestor.consola();