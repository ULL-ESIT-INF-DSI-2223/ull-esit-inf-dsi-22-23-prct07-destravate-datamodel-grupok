import inquirer from 'inquirer';
import { Usuario } from './usuario';
import { ColeccionUsuario } from '../colecciones/coleccionUsuario';
import { JsonColeccionUsuario } from '../jsonModifiers/jsonColeccionUsuario';

/// crea un tipo
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
                                                                            //////////////////// se debería generar la colección de usuarios aquí con los datos de cada uno pillando del fichero aquello
  }

  public getUsuarios() {
    return this.usuarios;
  }

  /**
   * Método que permite crear usuarios y añadirlos a la colección de usuarios,
   * esto lo hace preguntando el nombre del usuario y la actividad que realiza, 
   * así como asignar el id del usuario como key dentro del map de ColeccionUsuario
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
        // Comprobamos que el usuario no esté creado ya
        if (this.usuarios.getUsuarios().has(usuario.getID())) {
          console.log('El usuario ya existe');
          this.volverConsola();
          return;
        } 
        this.usuarios.registrarUsuario(usuario);
        console.log('Usuario registrado con éxito');
        // Insertamos el usuario dentro de la colección
        this.usuarios.insertUsuario(usuario);
        this.jsonColeccionUsuario.registrarUsuario(usuario);
        this.volverConsola();
      });
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
                                                                                           //////////////////////////// Eliminar también usuario de collection 
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