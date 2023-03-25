import inquirer from 'inquirer';
import { Usuario } from './usuario';
import { ColeccionUsuario } from '../colecciones/coleccionUsuario';
import { JsonColeccionUsuario } from '../jsonModifiers/jsonColeccionUsuario';

/**
 * Clase Gestor
 * Tiene que permitir añadir, borrar y modificar rutas, usuarios, grupos y retos, 
 * así como Visualizar todas las rutas existentes dentro del sistema, Unirse a un 
 * grupo existente, Visualizar, crear y borrar grupos.
 */
export class Gestor {
  private usuarios: ColeccionUsuario;
  jsonColeccionUsuario = new JsonColeccionUsuario();

  constructor() {
    this.usuarios = new ColeccionUsuario();
    this.usuarios.setUsuarios(this.jsonColeccionUsuario.cargarUsuarios());
  }

  public getUsuarios() {
    return this.usuarios;
  }

  /**
   * Método que permite crear usuarios y añadirlos a la colección de usuarios,
   * esto lo hace preguntando el nombre del usuario y la actividad que realiza, 
   * así como asignar el id del usuario como key dentro del map de ColeccionUsuario
   */
  private registrarUsuario(): void {
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
        // let usuario;
        // try {
        //   usuario = new Usuario(respuesta.nombre, respuesta2.actividad);
        // } catch (error) {
        //   console.log('\x1b[31m%s\x1b[0m', 'Error al crear el usuario');
        //   console.log('Introduce un nombre de usuario válido no vacío');
        //   // pulsar enter para volver a introducir un nombre de usuario
        //   inquirer.prompt({
        //     type: 'input',
        //     name: 'volver',
        //     message: 'Pulsa enter para volver a introducir un nombre de usuario',
        //   }).then(() => {
        //     this.registrarUsuario();
        //   });
        //   return;
        // }
        let usuario = new Usuario(respuesta.nombre, respuesta2.actividad);

        // Insertamos el usuario en la colección de usuarios
        this.usuarios.insertarUsuario(usuario);
        // Insertamos el usuario en el json
        this.jsonColeccionUsuario.insertarUsuario(usuario);

        console.log('Usuario registrado con éxito:', usuario);
        this.volverConsola();
      });

    });
  }  

  private listarUsuarios(): void {
    console.clear();
    console.log('Listando usuarios...');
    for (const usuario of this.usuarios) {
      // console.log(usuario.getNombre());
      console.log(usuario);
    }
    this.volverConsola();
  }

  /**
   * Eliminar un usuario de la lista de usuarios con opción a cancelar
   */
  private eliminarUsuario(): void {
    console.clear();
    console.log('Eliminando usuario...');
  
    // Obtener el listado de usuarios
    const usuarios = this.usuarios.getUsuarios();
  
    // Pedir al usuario que seleccione el usuario a eliminar
    inquirer.prompt({
      type: 'list',
      name: 'usuario',
      message: 'Selecciona el usuario que deseas eliminar:',
      choices: Array.from(usuarios.values()).map((usuario) => usuario.getNombre()).concat('Cancelar'),
    }).then((respuesta) => {
      if (respuesta.usuario === 'Cancelar') {
        this.volverConsola();
      } else {
        // Buscar el usuario a eliminar por su nombre y eliminarlo
        const usuarioAEliminar = Array.from(usuarios.values()).find((usuario) => usuario.getNombre() === respuesta.usuario);
        if (usuarioAEliminar) {
          // Lo eliminamos del json
          this.jsonColeccionUsuario.eliminarUsuario(usuarioAEliminar);
          // Lo eliminamos del map de usuarios
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

const gestor = new Gestor();
gestor.consola();