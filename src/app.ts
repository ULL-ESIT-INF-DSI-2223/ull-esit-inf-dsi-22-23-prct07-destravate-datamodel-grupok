import inquirer from 'inquirer';
import { Usuario } from './modelos/usuario';
import { Ruta } from './modelos/ruta';
import { Grupo } from './modelos/grupo';
import { Reto } from './modelos/reto';
import { ColeccionUsuario } from './colecciones/coleccionUsuario';
import { ColeccionRuta } from './colecciones/coleccionRuta';
import { ColeccionGrupo } from './colecciones/coleccionGrupo';
// import { ColeccionReto } from './colecciones/coleccionReto';
import { JsonColeccionUsuario } from './jsonModifiers/jsonColeccionUsuario';
// import { JsonColeccionRuta } from './jsonModifiers/jsonColeccionRuta';
// import { JsonColeccionGrupo } from './jsonModifiers/jsonColeccionGrupo';
// import { JsonColeccionReto } from './jsonModifiers/jsonColeccionReto';

/**
 * Clase Gestor
 * Tiene que permitir añadir, borrar y modificar rutas, usuarios, grupos y retos, 
 * así como Visualizar todas las rutas existentes dentro del sistema, Unirse a un 
 * grupo existente, Visualizar, crear y borrar grupos.
 */
export class Gestor {
  private coleccionUsuarios: ColeccionUsuario;
  private coleccionRutas: ColeccionRuta;
  private coleccionGrupos: ColeccionGrupo;
  private jsonColeccionUsuario = new JsonColeccionUsuario();


  constructor() {
    this.coleccionUsuarios = new ColeccionUsuario();
    this.coleccionRutas = new ColeccionRuta();
    this.coleccionGrupos = new ColeccionGrupo();
    this.coleccionUsuarios.setUsuarios(this.jsonColeccionUsuario.cargarUsuarios());
    ////////////////////////////////////////////////////////////////////////////////////////// Falta poner los otros json

  }

  public getUsuarios() {
    return this.coleccionUsuarios;
  }

  public setUsuarios(coleccion: ColeccionUsuario) {
    this.coleccionUsuarios = coleccion;
  }

  private volver(callback: (i: this) => void): void {
    inquirer.prompt({
      type: 'list',
      name: 'volver',
      message: 'Presiona enter para volver a atrás en la consola',
      choices: ['Volver al menú anterior'],
    }).then((respuesta) => {
      callback(this);
    });
  }

  ////////////////////////////////////
  ////////// Menú Principal //////////
  ////////////////////////////////////

  /**
   * Método que inicia el menú principal del programa
   */
  public consola(): void {
    console.clear();
    console.log('Bienvenido a la consola del usuario. ¿Qué desea hacer?');
    inquirer.prompt({
      type: 'list',
      name: 'opcion',
      message: 'Elige una opción: ',
      choices: [
        'Registrarse como usuario',
        'Log in',
        'Gestión de la información',
        'Salir',
      ],
    }).then((respuesta) => {
      switch (respuesta.opcion) {
        case 'Registrarse como usuario':
          this.registrarUsuario();
          break;
        case 'Log in':
          this.listarUsuarios();
          break;
        case 'Gestión de la información':
          this.gestionInfo();
          break;
        case 'Salir':
          console.log('Hasta pronto');
          break;
        default:
          break;
      }
    });
  }

  ////////////////////////////////////////////
  ////////// Gestión de Información //////////
  ////////////////////////////////////////////

  /**
   * Método que inicia el menú que permite gestionar la información
   */
  public gestionInfo(): void {
    console.clear();
    console.log('Bienvenido a la consola de gestión de la base de datos. ¿Qué datos desea gestionar');
    inquirer.prompt({
      type: 'list',
      name: 'opcion',
      message: 'Elige una opción: ',
      choices: [
        'Usuario',
        'Rutas',
        'Grupos',
        'Retos',
        'Volver al menú anterior'
      ],
    }).then((respuesta) => {
      switch (respuesta.opcion) {
        case 'Usuario':
          this.gestionUsuarios();
          break;
        case 'Rutas':
          break;
        case 'Grupos':
          break;
        case 'Retos':
          break;
        case 'Volver al menú anterior':
          this.consola()
          break;
        default:
          break;
      }
    });
  }

  public gestionUsuarios(): void {
    console.clear();
    console.log('Bienvenido a gestión de usuarios. ¿Qué desea hacer?');
    inquirer.prompt({
      type: 'list',
      name: 'opcion',
      message: 'Elige una opción: ',
      choices: [
        'Registrar usuario',
        'Listar usuarios',
        'Modificar usuarios',
        'Eliminar usuario',
        'Volver al menú anterior'
      ],
    }).then((respuesta) => {
      switch (respuesta.opcion) {
        case 'Registrar usuario':
          this.registrarUsuario();
          break;
        case 'Listar usuarios':
          this.listarUsuarios();
          break;
        case 'Modificar usuarios':
          this.modificarUsuario();
          break;
        case 'Eliminar usuario':
          this.eliminarUsuario();
          break;
        case 'Volver al menú anterior':
          this.gestionInfo()
          break;
        default:
          break;
      }
    });
  }

  private modificarUsuario(): void {
    console.clear();
    console.log('Eliminando usuario...');
  
    // Obtener el listado de usuarios
    const usuarios = this.coleccionUsuarios.getUsuarios();
  
    // Pedir al usuario que seleccione el usuario a modificar
    inquirer.prompt({
      type: 'list',
      name: 'usuario',
      message: 'Selecciona el usuario que deseas modificar:',
      choices: Array.from(usuarios.values()).map((usuario) => usuario.getNombre()).concat('Cancelar'),
    }).then((respuesta) => {
      if (respuesta.usuario === 'Cancelar') {
        this.volver(() => this.consola());
      } else {
        // Buscar el usuario a modificar por su nombre y modificarlo
        const usuarioAModificar = Array.from(usuarios.values()).find((usuario) => usuario.getNombre() === respuesta.usuario);
        if (usuarioAModificar) {
          console.clear();
          console.log('¿Qué atributo desea modificar?');
          inquirer.prompt({
            type: 'list',
            name: 'opcion',
            message: 'Elige una opción: ',
            choices: [
              'Nombre de Usuario',
              'Actividad que realiza',
              'Amigos en la aplicación',
              'Grupo de amigos',
              'Rutas Favoritas',
              'Retos activos',
              'Salir',
            ],
          }).then((respuesta) => {
            switch (respuesta.opcion) {
              case 'Nombre de Usuario':
                console.clear();
                inquirer.prompt({
                  type: 'input',
                  name: 'nombre',
                  message: 'Introduce tu nombre de usuario: ',
                }).then((respuesta2) => {
                  this.jsonColeccionUsuario.modificarNombre(usuarioAModificar, respuesta2.nombre)
                  this.coleccionUsuarios.modificarNombre(usuarioAModificar, respuesta2.nombre)
                  this.gestionInfo();
                });
                break;
              case 'Actividad que realiza':
                break;
              case 'Amigos en la aplicación':
                break;
              case 'Grupo de amigos':
                break;
              case 'Rutas Favoritas':
                  break;
              case 'Retos activos':
                break;
              default:
                break;
            }
           
          });
        } else {
          console.log(`No se encontró el usuario ${respuesta.usuario}`);
          this.volver(() => this.gestionUsuarios());
        }
      }
    });
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
        inquirer.prompt({
          type: 'input',
          name: 'contraseña',
          message: 'Introduce tu contraseña: '
        }).then((respuesta3) => {
          try {
            let usuario = new Usuario(respuesta.nombre, respuesta3.contraseña, respuesta2.actividad);
            // Insertamos el usuario en la colección de usuarios
            this.coleccionUsuarios.insertar(usuario);
            // Insertamos el usuario en el json
            this.jsonColeccionUsuario.insertarUsuario(usuario);

            console.log('Usuario registrado con éxito:', usuario);
            this.volver(() => this.consola());
          } catch (error) {
            console.log('\x1b[31m%s\x1b[0m', 'Error al crear el usuario');
            console.log('Introduce un nombre de usuario válido no vacío');
            // pulsar enter para volver a introducir un nombre de usuario
            inquirer.prompt({
              type: 'input',
              name: 'volver',
              message: 'Pulsa enter para volver a introducir un nombre de usuario',
            }).then(() => {
              this.registrarUsuario();
            });
            return;
          }
        });
      });
    });
  }  

  private listarUsuarios(): void {
    console.clear();
    console.log('Listando usuarios...');
    for (const usuario of this.coleccionUsuarios) {
      // console.log(usuario.getNombre());
      console.log(usuario);
    }
    this.volver(() => this.gestionInfo());
  }

  /**
   * Eliminar un usuario de la lista de usuarios con opción a cancelar
   */
  private eliminarUsuario(): void {
    console.clear();
    console.log('Eliminando usuario...');
  
    // Obtener el listado de usuarios
    const usuarios = this.coleccionUsuarios.getUsuarios();
  
    // Pedir al usuario que seleccione el usuario a eliminar
    inquirer.prompt({
      type: 'list',
      name: 'usuario',
      message: 'Selecciona el usuario que deseas eliminar:',
      choices: Array.from(usuarios.values()).map((usuario) => usuario.getNombre()).concat('Cancelar'),
    }).then((respuesta) => {
      if (respuesta.usuario === 'Cancelar') {
        this.volver(() => this.consola());
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
        this.volver(() => this.consola());
      }
    });
  }

  /**
   * Eliminar un elemento de la lista con opción a cancelar
   */
  private eliminar(elemento: Usuario | Ruta | Reto): void {
  // console.clear();
  // console.log(`Eliminando ${typeof elemento === 'object' ? elemento.constructor.name.toLowerCase() : 'elemento'}...`);

  // // Obtener el listado de elementos
  // let elementos: string[];
  // switch (typeof elemento) {
  //   case 'object':
  //     if (elemento instanceof Usuario) {
  //       elementos = this.coleccionUsuarios.listar();
  //     } else if (elemento instanceof Ruta) {
  //       elementos = this.coleccionRutas.listar();
  //     } else if (elemento instanceof Reto) {
  //       elementos = this.coleccionRetos.listar();
  //     }
  //     break;
  //   default:
  //     elementos = new Map();
  //     break;
  // }

  // // Pedir al usuario que seleccione el elemento a eliminar
  // inquirer.prompt({
  //   type: 'list',
  //   name: 'elemento',
  //   message: `Selecciona el ${typeof elemento === 'object' ? elemento.constructor.name.toLowerCase() : 'elemento'} que deseas eliminar:`,
  //   choices: Array.from(elementos.values()).map((elemento) => elemento.getNombre()).concat('Cancelar'),
  // }).then((respuesta) => {
  //   if (respuesta.elemento === 'Cancelar') {
  //     this.volverConsola();
  //   } else {
  //     // Buscar el elemento a eliminar por su nombre y eliminarlo
  //     const elementoAEliminar = Array.from(elementos.values()).find((elemento) => elemento.getNombre() === respuesta.elemento);
  //     if (elementoAEliminar) {
  //       // Lo eliminamos del json
  //       switch (typeof elemento) {
  //         case 'object':
  //           if (elemento instanceof Usuario) {
  //             this.jsonColeccionUsuario.eliminarUsuario(elementoAEliminar);
  //           } else if (elemento instanceof Ruta) {
  //             this.jsonColeccionRuta.eliminarRuta(elementoAEliminar);
  //           } else if (elemento instanceof Reto) {
  //             this.jsonColeccionReto.eliminarReto(elementoAEliminar);
  //           }
  //           break;
  //       }
  //       // Lo eliminamos del map de elementos
  //       elementos.delete(elementoAEliminar.getID());
  //       console.log(`${typeof elemento === 'object' ? elemento.constructor.name : 'Elemento'} ${elementoAEliminar.getNombre()} eliminado con éxito`);

  //     } else {
  //       console.log(`No se encontró el ${typeof elemento === 'object' ? elemento.constructor.name.toLowerCase() : 'elemento'} ${respuesta.elemento}`);
  //     }
  //     this.volverConsola();
  //   }
  // });
  }


  

}

const gestor = new Gestor();
gestor.consola();