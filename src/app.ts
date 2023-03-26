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
import { ColeccionReto } from './colecciones/coleccionReto';
import { JsonColeccionReto } from './jsonModifiers/jsonColeccionReto';
import { JsonColeccionRuta } from './jsonModifiers/jsonColeccionRuta';
import { JsonColeccionGrupo } from './jsonModifiers/jsonColeccionGrupo';
// import { JsonColeccionRuta } from './jsonModifiers/jsonColeccionRuta';
// import { JsonColeccionGrupo } from './jsonModifiers/jsonColeccionGrupo';
// import { JsonColeccionReto } from './jsonModifiers/jsonColeccionReto';
import { checkCoordenadas, stringToCoordenadas } from './interfaces/coordenadasInterface';

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
  private coleccionRetos: ColeccionReto;
  private jsonColeccionUsuario = new JsonColeccionUsuario();
  private jsonColeccionRuta = new JsonColeccionRuta();
  private jsonColeccionReto = new JsonColeccionReto();
  private jsonColeccionGrupo = new JsonColeccionGrupo();


  constructor() {
    this.coleccionUsuarios = new ColeccionUsuario();
    this.coleccionRutas = new ColeccionRuta();
    this.coleccionGrupos = new ColeccionGrupo();
    this.coleccionRetos = new ColeccionReto();
    this.coleccionUsuarios.setUsuariosFromArray(this.jsonColeccionUsuario.cargarUsuarios());
    this.coleccionRetos.setRetosFromArray(this.jsonColeccionReto.cargarRetos());
    this.coleccionRutas.setRutasFromArray(this.jsonColeccionRuta.cargarRutas());
    this.coleccionGrupos.setGruposFromArray(this.jsonColeccionGrupo.cargarGrupos());
  }

  public getUsuarios() {
    return this.coleccionUsuarios;
  }

  public getRetos() {
    return this.coleccionRetos;
  }

  public getRutas() {
    return this.coleccionRutas;
  }

  public getGrupos() {
    return this.coleccionGrupos;
  }

  public setUsuarios(coleccion: ColeccionUsuario) {
    this.coleccionUsuarios = coleccion;
  }

  public setRetos(coleccion: ColeccionReto) {
    this.coleccionRetos = coleccion;
  }

  public setRutas(coleccion: ColeccionRuta) {
    this.coleccionRutas = coleccion;
  }

  public setGrupos(coleccion: ColeccionGrupo) {
    this.coleccionGrupos = coleccion;
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

  ////////////////////////////////////////////////////////////////////////////// Poner eliminar, listar y blabla con funciones genéricas


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
    console.log('Bienvenido a la consola de gestión de la base de datos. ¿Qué datos desea gestionar?');
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
          this.gestionRutas();
          break;
        case 'Grupos':
          this.gestionGrupos();
          break;
        case 'Retos':
          this.gestionGrupos();
          break;
        case 'Volver al menú anterior':
          this.consola()
          break;
        default:
          break;
      }
    });
  }

  /////////////////////////////////////////
  ////////// Gestión de Usuarios //////////
  /////////////////////////////////////////

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
        this.gestionUsuarios();
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
              'Modificar nombre de Usuario',
              'Editar Actividad',
              'Añadir Amigo',
              'Borrar Amigo',
              'Añadir Rutas Favoritas',
              'Borrar Rutas Favoritas',
              'Añadir Retos activos',
              'Borrar Retos activos',
              'Salir',
            ],
          }).then((respuesta) => {
            switch (respuesta.opcion) {
              case 'Salir':
                this.gestionInfo()
                break;
              case 'Modificar nombre de Usuario':
                console.clear();
                inquirer.prompt({
                  type: 'input',
                  name: 'nombre',
                  message: 'Introduce tu nombre de usuario: ',
                }).then((respuesta2) => {
                  try {
                    this.jsonColeccionUsuario.modificarNombre(usuarioAModificar, respuesta2.nombre)
                    this.coleccionUsuarios.modificarNombre(usuarioAModificar, respuesta2.nombre)
                    this.gestionInfo();
                  } catch (error: unknown) {
                    if (error instanceof Error) {
                      console.log('\x1b[31m%s\x1b[0m', 'Error al modificar el usuario: ', error.message);
                    }
                    console.log('Introduce un nombre de usuario nuevo');
                    // pulsar enter para volver a introducir un nombre de usuario
                    inquirer.prompt({
                      type: 'input',
                      name: 'volver',
                      message: 'Pulsa enter para volver a introducir un usuario',
                    }).then(() => {
                      this.registrarUsuario();
                    });
                    return;
                  }

                });
              break;
              case 'Editar Actividad':
                console.clear();
                inquirer.prompt({
                  type: 'list',
                  name: 'actividad',
                  message: 'Elige una actividad: ',
                  choices: ['cilismo', 'running'],
                }).then((respuesta2) => {
                  this.gestionInfo();
                  this.jsonColeccionUsuario.modificarActividad(usuarioAModificar, respuesta2.actividad)
                  this.coleccionUsuarios.modificarActividad(usuarioAModificar, respuesta2.actividad)
                });
              break;
              case 'Añadir Amigo':
                console.clear();
                console.log('Añadiendo amigo...');
                console.clear();
                inquirer.prompt({
                  type: 'input',
                  name: 'nombre',
                  message: 'Introduce el nombre del amigo que deseas añadir: ',
                }).then((respuesta2) => {
                  // Obtener el listado de usuarios
                  const usuarios = this.coleccionUsuarios.getUsuarios();
                  // Comprobamos si el usuario está en la lista de usuarios
                  if ( usuarios.has(respuesta2.nombre) ) {
                    console.log('Usuarios registrados:');
                    usuarios.forEach((usuario) => console.log(usuario.getNombre()));

                    console.log(`No se ha encontrado ningún usuario con el nombre ${respuesta2.nombre}.`);
                    return (this.volver(() => this.gestionUsuarios()));
                  }
                  // Buscamos el amigo por su nombre dentro del map
                  const nuevoAmigo = Array.from(usuarios.values()).find((usuario) => usuario.getNombre() === respuesta2.nombre);
                  // Comprobamos que exista el amigo
                  if ( nuevoAmigo == undefined ) {
                    console.log(`No se ha encontrado ningún usuario con el nombre ${respuesta2.nombre}.`);
                    return (this.volver(() => this.gestionUsuarios()));
                  }
                  // Añadimos el amigo al usuario actual
                  usuarioAModificar.addAmigoApp(nuevoAmigo.getID());
                  // Lo escribimos en el fichero 
                  this.jsonColeccionUsuario.addAmigo(usuarioAModificar);

                  console.log(`Amigo ${nuevoAmigo.getNombre()} añadido al usuario ${usuarioAModificar.getNombre()}.`);
                  return (this.volver(() => this.gestionUsuarios()));
                });
              break;
              case 'Borrar Amigo':
                console.clear();
                inquirer.prompt({
                  type: 'list',
                  name: 'nombre',
                  choices: Array.from(usuarioAModificar.getAmigosApp().values()).map((id) => this.coleccionUsuarios.getUsuario(id).getNombre()).concat('Cancelar'),
                }).then((respuesta2) => {
                  // Obtenemos el id del usuario que queremos borrar 
                  const idUsuarioBorrar = Array.from(usuarioAModificar.getAmigosApp().values()).find((id) => this.coleccionUsuarios.getUsuario(id).getNombre() === respuesta2.nombre);
                  
                  // Comprobamos que el usuario exista
                  if ( idUsuarioBorrar == undefined ) {
                    throw new Error (`No se ha encontrado ningún usuario con el nombre ${respuesta2.nombre}.`);
                    return (this.volver(() => this.gestionUsuarios()));
                  }
                  // Borramos el usuario de la lista de amigos del usuario actual
                  usuarioAModificar.eraseAmigoApp(idUsuarioBorrar);
                  // Lo escribimos en el fichero
                  this.jsonColeccionUsuario.eraseAmigo(usuarioAModificar, idUsuarioBorrar);
                  return (this.volver(() => this.gestionUsuarios()));
                });
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
        choices: ['cilismo', 'running'],
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
          } catch (error: unknown) {
            if (error instanceof Error) {
              console.log('\x1b[31m%s\x1b[0m', 'Error al crear el usuario: ', error.message);
            }
            console.log('Introduce un nombre de usuario válido no vacío y/o contraseña válida');
            // pulsar enter para volver a introducir un nombre de usuario
            inquirer.prompt({
              type: 'input',
              name: 'volver',
              message: 'Pulsa enter para volver a introducir un usuario',
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
        this.consola();
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

  ///////////////////////////////////////
  ////////// Gestión de Grupos //////////
  ///////////////////////////////////////

  public gestionGrupos(): void {
    console.clear();
    console.log('Bienvenido a gestión de grupos. ¿Qué desea hacer?');
    inquirer.prompt({
      type: 'list',
      name: 'opcion',
      message: 'Elige una opción: ',
      choices: [
        'Registrar grupo',
        'Listar grupos',
        'Modificar grupos',
        'Eliminar grupo',
        'Volver al menú anterior'
      ],
    }).then((respuesta) => {
      switch (respuesta.opcion) {
        case 'Registrar grupo':
          this.registrarGrupo();
          break;
        case 'Listar grupos':
          this.listarGrupos();
          break;
        case 'Modificar grupos':
          this.modificarGrupo();
          break;
        case 'Eliminar grupo':
          this.eliminarGrupo();
          break;
        case 'Volver al menú anterior':
          this.gestionInfo()
          break;
        default:
          break;
      }
    });
  }

  private modificarGrupo(): void {
    console.clear();
    // Obtener el listado de grupos
    const grupos = this.coleccionGrupos.getGrupos();
    // Pedir al usuario que seleccione el grupo a modificar
    inquirer.prompt({
      type: 'list',
      name: 'grupo',
      message: 'Selecciona el grupo que deseas modificar:',
      choices: Array.from(grupos.values()).map((grupo) => grupo.getNombre()).concat('Cancelar'),
    }).then((respuesta) => {
      if (respuesta.grupo === 'Cancelar') {
        this.gestionGrupos();
      } else {
        // Buscar el grupo a modificar por su nombre y modificarlo
        const grupoAModificar = Array.from(grupos.values()).find((grupo) => grupo.getNombre() === respuesta.grupo);
        if (grupoAModificar) {
          console.clear();
          console.log('¿Qué atributo desea modificar?');
          inquirer.prompt({
            type: 'list',
            name: 'opcion',
            message: 'Elige una opción: ',
            choices: [
              'Modificar Nombre de Usuario',
              'Editar Actividad',
              'Añadir Amigo',
              'Borrar Amigo',
              'Añadir Rutas Favoritas',
              'Borrar Rutas Favoritas',
              'Añadir Retos activos',
              'Borrar Retos activos',
              'Salir',
            ],
          }).then((respuesta) => {
            switch (respuesta.opcion) {
              case 'Modificar nombre de Usuario':
                
                break;
              case 'Editar Actividad':
                
                break;
              case 'Añadir Amigo':
                
                break;
              case 'Borrar Amigo':
                
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

  private registrarGrupo(): void {
    console.clear();
    console.log('Registrando grupo...');
    inquirer.prompt({
      type: 'input',
      name: 'nombre',
      message: 'Introduce tu nombre de grupo: ',
    }).then((respuesta) => {
      inquirer.prompt({
        type: 'input',
        name: 'creador',
        message: 'Introduce el id del creador del grupo: ',
      }).then((respuesta2) => {
        try {
          let grupo = new Grupo(respuesta.nombre, respuesta2.creador);
          // Insertamos el grupo en la colección de grupos
          this.coleccionGrupos.insertar(grupo);
          // Insertamos el grupo en el json
          this.jsonColeccionGrupo.insertarGrupo(grupo);

          console.log('Grupo registrado con éxito:', grupo);
          this.volver(() => this.gestionInfo());
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.log('\x1b[31m%s\x1b[0m', 'Error al crear el grupo: ', error.message);
          }
          console.log('Introduce un nombre de grupo válido no vacío');
          // pulsar enter para volver a introducir un nombre de grupo
          inquirer.prompt({
            type: 'input',
            name: 'volver',
            message: 'Pulsa enter para volver a introducir un nombre de grupo',
          }).then(() => {
            this.registrarGrupo();
          });
          return;
        }
      });
    });
  }  

  private listarGrupos(): void {
    console.clear();
    console.log('Listando grupos...');
    for (const grupos of this.coleccionGrupos) {
      // console.log(usuario.getNombre());
      console.log(grupos);
    }
    this.volver(() => this.gestionInfo());
  }

  /**
   * Eliminar un grupo de la lista de usuarios con opción a cancelar
   */
  private eliminarGrupo(): void {
    console.clear();
    console.log('Eliminando grupo...');
  
    // Obtener el listado de usuarios
    const grupos = this.coleccionGrupos.getGrupos();
  
    // Pedir al grupo que seleccione el grupo a eliminar
    inquirer.prompt({
      type: 'list',
      name: 'grupo',
      message: 'Selecciona el grupo que deseas eliminar:',
      choices: Array.from(grupos.values()).map((grupo) => grupo.getNombre()).concat('Cancelar'),
    }).then((respuesta) => {
      if (respuesta.grupo === 'Cancelar') {
        this.gestionInfo();
      } else {
        // Buscar el grupo a eliminar por su nombre y eliminarlo
        const grupoAEliminar = Array.from(grupos.values()).find((grupo) => grupo.getNombre() === respuesta.grupo);
        if (grupoAEliminar) {
          // Lo eliminamos del json
          this.jsonColeccionGrupo.eliminarGrupo(grupoAEliminar);
          // Lo eliminamos del map de grupos
          grupos.delete(grupoAEliminar.getID());
          console.log(`Grupo ${grupoAEliminar.getNombre()} eliminado con éxito`);

        } else {
          console.log(`No se encontró el usuario ${respuesta.usuario}`);
        }
        this.volver(() => this.gestionInfo());
      }
    });
  }
  
  ///////////////////////////////////////
  ////////// Gestión de Rutas  //////////
  ///////////////////////////////////////

  private gestionRutas(): void {
    console.clear();
    console.log('Bienvenido a gestión de rutas. ¿Qué desea hacer?');
    inquirer.prompt({
      type: 'list',
      name: 'opcion',
      message: 'Elige una opción: ',
      choices: [
        'Registrar ruta',
        'Listar rutas',
        'Modificar rutas',
        'Eliminar ruta',
        'Volver al menú anterior'
      ],
    }).then((respuesta) => {
      switch (respuesta.opcion) {
        case 'Registrar ruta':
          this.registrarRuta();
          break;
        case 'Listar rutas':
          this.listarRutas();
          break;
        case 'Modificar rutas':
          this.modificarRuta();
          break;
        case 'Eliminar rutas':
          // this.eliminarRuta();
          break;
        case 'Volver al menú anterior':
          this.gestionInfo()
          break;
        default:
          break;
      }
    });
  }

  /**
   * Registra una ruta en la aplicación
   */
  public registrarRuta(): void {
    console.clear();
    console.log('Bienvenido a la creación de rutas. Por favor, rellene los siguientes campos:');
    inquirer.prompt([
      {
        type: 'input',
        name: 'nombre',
        message: 'Nombre de la ruta: ',
      },
      {
        type: 'input',
         name: 'coordenadasInicio',
        message: 'Coordenadas de inicio: ',
      },
      {
        type: 'input',
        name: 'coordenadasFin',
        message: 'Coordenadas de fin: ',
      },
      {
        type: 'input',
        name: 'longitud',
        message: 'Longitud de la ruta: ',
      },
      {
        type: 'input',
        name: 'desnivel',
        message: 'Desnivel de la ruta: ',
      },
      {
        type: 'list',
        name: 'tipoActividad',
        choices: [ 'Ciclismo', 'Running' ],
      },
      {
        type: 'list',
        name: 'dificultad',
        choices: [ 'Fácil', 'Media', 'Difícil' ],
      },
    ]).then((respuesta: any) => {
      try {
        checkCoordenadas(respuesta.coordenadasInicio);
        checkCoordenadas(respuesta.coordenadasFin);

        const coordenadasInicio = stringToCoordenadas(respuesta.coordenadasInicio);
        const coordenadasFin = stringToCoordenadas(respuesta.coordenadasFin);
        const ruta = new Ruta(
          respuesta.nombre,
          coordenadasInicio,
          coordenadasFin,
          respuesta.longitud,
          respuesta.desnivel,
          respuesta.tipoActividad,
          respuesta.dificultad
        );
        // Lo añadimos a la colección de rutas
        this.coleccionRutas.addRuta(ruta);
  
        // Lo escribimos en el fichero
        this.jsonColeccionRuta.insertarRuta(ruta);
  
        console.log('Ruta registrada con éxito');
        this.volver(() => this.gestionRutas());

      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log('\x1b[31m%s\x1b[0m', 'Error al registrar la ruta: ', error.message);
        }
        console.log('Introduce los datos de nuevo');
        // pulsar enter para volver a introducir un nombre de usuario
        inquirer.prompt({
          type: 'input',
          name: 'volver',
          message: 'Pulsa enter para volver a introducir los datos',
        }).then(() => {
          this.registrarRuta();
        });
        return;
      }
    });
  }

  private listarRutas(): void {
    console.clear();
    console.log('Listado de rutas:');
    const rutas = this.coleccionRutas.getRutas();
    rutas.forEach((ruta) => {
      // console.log(ruta.getNombre());
      console.log(ruta);
    });
    this.volver(() => this.gestionRutas());
  }

  private modificarRuta(): void {
    console.clear();
    // Obtener el listado de rutas
    const rutas = this.coleccionRutas.getRutas();
    // Pedir al usuario que seleccione el ruta a modificar
    inquirer.prompt({
      type: 'list',
      name: 'ruta',
      message: 'Selecciona el ruta que deseas modificar:',
      choices: Array.from(rutas.values()).map((ruta) => ruta.getNombre()).concat('Cancelar'),
    }).then((respuesta) => {
      if (respuesta.ruta === 'Cancelar') {
        this.gestionRutas();
      } else {
        // Buscar la ruta a modificar por su nombre y modificarlo
        const rutaAModificar = Array.from(rutas.values()).find((ruta) => ruta.getNombre() === respuesta.ruta);
        if (rutaAModificar) {
          console.clear();
          console.log('¿Qué atributo desea modificar?');
          inquirer.prompt({
            type: 'list',
            name: 'opcion',
            message: 'Elige una opción: ',
            choices: [
              'Modificar nombre de ruta',
              'Modificar coordenadas de inicio y fin',
              'Modificar longitud',
              'Modificar desnivel',
              'Modificar tipo de actividad',
              'Modificar dificultad',
              'Modificar calificación',
              'Salir',
            ],
          }).then((respuesta) => {
            switch (respuesta.opcion) {
              case 'Modificar nombre de ruta':
                console.clear();
                inquirer.prompt({
                  type: 'input',
                  name: 'nombre',
                  message: 'Introduce tu nombre de ruta: ',
                }).then((respuesta2) => {
                  try {
                    this.jsonColeccionRuta.modificarNombreRuta(rutaAModificar, respuesta2.nombre)
                    this.coleccionRutas.modificarNombreRuta(rutaAModificar, respuesta2.nombre)
                    this.gestionInfo();
                  } catch (error: unknown) {
                    if (error instanceof Error) {
                      console.log('\x1b[31m%s\x1b[0m', 'Error al modificar el ruta: ', error.message);
                    }
                    console.log('Introduce un nombre de ruta nuevo');
                    // pulsar enter para volver a introducir un nombre de Ruta
                    inquirer.prompt({
                      type: 'input',
                      name: 'volver',
                      message: 'Pulsa enter para volver a introducir un ruta',
                    }).then(() => {
                      this.registrarRuta();
                    });
                    return;
                  }
                });
              case 'Modificar coordenadas de inicio y fin':
                console.clear();
<<<<<<< HEAD
                inquirer.prompt({
                  type: 'input',
                  name: 'coordenadasInicio',
                  message: 'Introduce las coordenadas de inicio: ',
                }).then((respuesta2) => {
                  try {
                    //this.jsonColeccionRuta.modificarCoordenadasInicioRuta(rutaAModificar, respuesta2.coordenadasInicio)
                    //this.coleccionRutas.modificarCoordenadasInicioRuta(rutaAModificar, respuesta2.coordenadasInicio)
                    this.gestionInfo();
                  } catch (error: unknown) {
                    if (error instanceof Error) {
                      console.log('\x1b[31m%s\x1b[0m', 'Error al modificar el ruta: ', error.message);
                    }
                    console.log('Introduce un nombre de ruta nuevo');
                    // pulsar enter para volver a introducir un nombre de Ruta
                    inquirer.prompt({
                      type: 'input',
                      name: 'volver',
                      message: 'Pulsa enter para volver a introducir un ruta',
                    }).then(() => {
                      this.registrarRuta();
                    });
                    return;
=======
                inquirer.prompt(
                  {
                    type: 'input',
                    name: 'coordenadasInicio',
                    message: 'Introduce las coordenadas de inicio: ',
                  },
                  {
                    type: 'input',
                    name: 'coordenadasFin',
                    message: 'Introduce las coordenadas de fin: ',
>>>>>>> a51011102bcce9ff8980cbc01716df188748be02
                  }
                ).then((respuesta2) => {
                  // this.coleccionRutas.modificarCoordenadasRuta(rutaAModificar, respuesta2.coordenadasInicio, respuesta2.coordenadasFin);
                  // this.jsonColeccionRuta.modificarCoordenadasRuta(rutaAModificar, respuesta2.coordenadasInicio, respuesta2.coordenadasFin);
                  this.gestionInfo();
                });
              break;
              case 'Modificar longitud':
                // this.modificarLongitudRuta(rutaAModificar);
                break;
              case 'Modificar desnivel':
                // this.modificarDesnivelRuta(rutaAModificar);
                break;
              case 'Modificar tipo de actividad':
                // this.modificarTipoActividadRuta(rutaAModificar);
                break;
              case 'Modificar dificultad':
                // this.modificarDificultadRuta(rutaAModificar);
                break;
              case 'Modificar calificación':
                // this.modificarCalificacionRuta(rutaAModificar);
                break;
              case 'Salir':
                this.gestionRutas();
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

    ///////////////////////////////////////
  ////////// Gestión de Reto //////////
  ///////////////////////////////////////

  public gestionRetos(): void {
    console.clear();
    console.log('Bienvenido a gestión de Retos. ¿Qué desea hacer?');
    inquirer.prompt({
      type: 'list',
      name: 'opcion',
      message: 'Elige una opción: ',
      choices: [
        'Registrar reto',
        'Listar retos',
        'Modificar retos',
        'Eliminar reto',
        'Volver al menú anterior'
      ],
    }).then((respuesta) => {
      switch (respuesta.opcion) {
        case 'Registrar Reto':
          this.registrarUsuario();
          break;
        case 'Listar Retos':
          // //this.listarRetos();
          break;
        case 'Modificar Retos':
          this.modificarReto();
          break;
        case 'Eliminar Retos':
          // //this.eliminarReto(); 
          break;
        case 'Volver al menú anterior':
          this.gestionInfo();
          break;
        default:
          break;
      }
    });
  }

  private modificarReto(): void {
    console.clear();
    // Obtener el listado de grupos
    const grupos = this.coleccionGrupos.getGrupos();
    // Pedir al usuario que seleccione el grupo a modificar
    inquirer.prompt({
      type: 'list',
      name: 'grupo',
      message: 'Selecciona el grupo que deseas modificar:',
      choices: Array.from(grupos.values()).map((grupo) => grupo.getNombre()).concat('Cancelar'),
    }).then((respuesta) => {
      if (respuesta.grupo === 'Cancelar') {
        this.gestionGrupos();
      } else {
        // Buscar el grupo a modificar por su nombre y modificarlo
        const grupoAModificar = Array.from(grupos.values()).find((grupo) => grupo.getNombre() === respuesta.grupo);
        if (grupoAModificar) {
          console.clear();
          console.log('¿Qué atributo desea modificar?');
          inquirer.prompt({
            type: 'list',
            name: 'opcion',
            message: 'Elige una opción: ',
            choices: [
              'Modificar Nombre de Usuario',
              'Editar Actividad',
              'Añadir Amigo',
              'Borrar Amigo',
              'Añadir Rutas Favoritas',
              'Borrar Rutas Favoritas',
              'Añadir Retos activos',
              'Borrar Retos activos',
              'Salir',
            ],
          }).then((respuesta) => {
            switch (respuesta.opcion) {
              case 'Modificar nombre de Usuario':
                
                break;
              case 'Editar Actividad':
                
                break;
              case 'Añadir Amigo':
                
                break;
              case 'Borrar Amigo':
                
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

}


const gestor = new Gestor();
gestor.consola();
  