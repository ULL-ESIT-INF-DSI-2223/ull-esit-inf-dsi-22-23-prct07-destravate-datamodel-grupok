import inquirer from 'inquirer';

import { Usuario } from './modelos/usuario';
import { Ruta } from './modelos/ruta';
import { Grupo } from './modelos/grupo';
import { Reto } from './modelos/reto';

import { ColeccionUsuario } from './colecciones/coleccionUsuario';
import { ColeccionRuta } from './colecciones/coleccionRuta';
import { ColeccionGrupo } from './colecciones/coleccionGrupo';
import { ColeccionReto } from './colecciones/coleccionReto';

import { JsonColeccionUsuario } from './jsonModifiers/jsonColeccionUsuario';
import { JsonColeccionReto } from './jsonModifiers/jsonColeccionReto';
import { JsonColeccionRuta } from './jsonModifiers/jsonColeccionRuta';
import { JsonColeccionGrupo } from './jsonModifiers/jsonColeccionGrupo';
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
          this.logIn();
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
              'Añadir Ruta Realizada',
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
                  if (respuesta2.usuario === 'Cancelar') {
                    this.gestionUsuarios();
                  }
                  // Obtenemos el id del usuario que queremos borrar 
                  const idUsuarioBorrar = Array.from(usuarioAModificar.getAmigosApp().values()).find((id) => this.coleccionUsuarios.getUsuario(id).getNombre() === respuesta2.nombre);
                  
                  // Comprobamos que el usuario exista
                  if ( idUsuarioBorrar == undefined ) {
                    throw new Error (`No se ha encontrado ningún usuario con el nombre ${respuesta2.nombre}.`);
                  }
                  // Borramos el usuario de la lista de amigos del usuario actual
                  usuarioAModificar.eraseAmigoApp(idUsuarioBorrar);
                  // Lo escribimos en el fichero
                  this.jsonColeccionUsuario.eraseAmigo(usuarioAModificar, idUsuarioBorrar);
                  return (this.volver(() => this.gestionUsuarios()));
                });
              break;
              case 'Añadir Rutas Favoritas':
                console.clear();
                console.log('Añadiendo ruta favorita...');
                inquirer.prompt({
                  type: 'list',
                  name: 'nombre',
                  choices: Array.from(this.coleccionRutas.getRutas().values()).map((ruta) => ruta.getNombre()).concat('Cancelar'),
                }).then((respuesta2) => {
                  if (respuesta2.usuario === 'Cancelar') {
                    this.gestionUsuarios();
                  }
                  // Obtenemos el id de la ruta que queremos añadir
                  const idRuta = Array.from(this.coleccionRutas.getRutas().values()).find((ruta) => ruta.getNombre() === respuesta2.nombre)?.getID();
                  // Comprobamos que la ruta exista
                  if ( idRuta == undefined ) {
                    throw new Error (`No se ha encontrado ninguna ruta con el nombre ${respuesta2.nombre}.`);
                  }
                  // Añadimos la ruta a la lista de rutas favoritas del usuario actual
                  usuarioAModificar.addRutaFavorita(idRuta);
                  // Lo escribimos en el fichero
                  this.jsonColeccionUsuario.addRutaFavorita(usuarioAModificar, idRuta);
                  return (this.volver(() => this.gestionUsuarios()));
                });
              break;
              case 'Borrar Rutas Favoritas':
                const rutasFavoritas = Array.from(usuarioAModificar.getRutasFavoritas().values()).map((id) => this.coleccionRutas.getRuta(id).getNombre());
                if ( rutasFavoritas.length === 0 ) {
                  console.log('No tienes rutas favoritas.');
                  return (this.volver(() => this.gestionUsuarios()));
                }
                console.clear();
                inquirer.prompt({
                  type: 'list',
                  name: 'nombre',
                  choices: rutasFavoritas.concat('Cancelar'),
                }).then((respuesta2) => {
                  if (respuesta2.usuario === 'Cancelar') {
                    this.gestionUsuarios();
                  }
                  // Obtenemos el id de la ruta que queremos borrar
                  const idRuta = Array.from(usuarioAModificar.getRutasFavoritas().values()).find((id) => this.coleccionRutas.getRuta(id).getNombre() === respuesta2.nombre);
                  // Comprobamos que la ruta exista
                  if ( idRuta == undefined ) {
                    throw new Error (`No se ha encontrado ninguna ruta con el nombre ${respuesta2.nombre}.`);
                  }
                  // Borramos la ruta de la lista de rutas favoritas del usuario actual
                  usuarioAModificar.eraseRutaFavorita(idRuta);
                  // Lo escribimos en el fichero
                  this.jsonColeccionUsuario.eraseRutaFavorita(usuarioAModificar, idRuta);
                  return (this.volver(() => this.gestionUsuarios()));
                });
              break;
              case 'Añadir Ruta Realizada':
                console.clear();
                console.log('Añadiendo ruta realizada...');
                inquirer.prompt({
                  type: 'list',
                  name: 'nombre',
                  choices: Array.from(this.coleccionRutas.getRutas().values()).map((ruta) => ruta.getNombre()).concat('Cancelar'),
                }).then((respuesta2) => {
                  if (respuesta2.usuario === 'Cancelar') {
                    this.gestionUsuarios();
                  }
                  // Obtenemos el id de la ruta que queremos añadir
                  const idRuta = Array.from(this.coleccionRutas.getRutas().values()).find((ruta) => ruta.getNombre() === respuesta2.nombre)?.getID();
                  // Comprobamos que la ruta exista
                  if ( idRuta == undefined ) {
                    throw new Error (`No se ha encontrado ninguna ruta con el nombre ${respuesta2.nombre}.`);
                  }
                  // Añadimos la ruta a la lista de rutas realizadas del grupo actual
                  usuarioAModificar.addRutaRealizada({ ruta: idRuta, fecha: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()});
                  // Lo escribimos en el fichero
                  this.jsonColeccionUsuario.addRutaRealizada(usuarioAModificar, { ruta: idRuta, fecha: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()});
                  return (this.volver(() => this.gestionUsuarios()));
                });
              break;
              case 'Añadir Retos Activos':
                console.clear();
                console.log('Añadiendo reto activo...');
                const retosActivos = Array.from(this.coleccionRetos.getRetos().values()).map((reto) => reto.getNombre()).concat('Cancelar');
                if ( retosActivos.length === 0 ) {
                  console.log('No hay retos disponibles.');
                  return (this.volver(() => this.gestionUsuarios()));
                }
                inquirer.prompt({
                  type: 'list',
                  name: 'nombre',
                  choices: retosActivos.concat('Cancelar'),
                }).then((respuesta2) => {
                  if (respuesta2.usuario === 'Cancelar') {
                    this.gestionUsuarios();
                  }
                  // Obtenemos el id del reto que queremos añadir
                  const idReto = Array.from(this.coleccionRetos.getRetos().values()).find((reto) => reto.getNombre() === respuesta2.nombre)?.getID();
                  // Comprobamos que el reto exista
                  if ( idReto == undefined ) {
                    throw new Error (`No se ha encontrado ningún reto con el nombre ${respuesta2.nombre}.`);
                  }
                  // Añadimos el reto a la lista de retos activos del usuario actual
                  usuarioAModificar.addRetosActivos(idReto);
                  // Lo escribimos en el fichero
                  this.jsonColeccionUsuario.addRetosActivos(usuarioAModificar, idReto);
                  return (this.volver(() => this.gestionUsuarios()));
                });
              break;
              case 'Borrar Retos Activos':
                const retosActivosUsuario = Array.from(usuarioAModificar.getRetosActivos().values()).map((id) => this.coleccionRetos.getReto(id).getNombre());
                if ( retosActivosUsuario.length === 0 ) {
                  console.log('No tienes retos activos.');
                  return (this.volver(() => this.gestionUsuarios()));
                }
                console.clear();
                inquirer.prompt({
                  type: 'list',
                  name: 'nombre',
                  choices: retosActivosUsuario.concat('Cancelar'),
                }).then((respuesta2) => {
                  if (respuesta2.usuario === 'Cancelar') {
                    this.gestionUsuarios();
                  }
                  // Obtenemos el id del reto que queremos borrar
                  const idReto = Array.from(usuarioAModificar.getRetosActivos().values()).find((id) => this.coleccionRetos.getReto(id).getNombre() === respuesta2.nombre);
                  // Comprobamos que el reto exista
                  if ( idReto == undefined ) {
                    throw new Error (`No se ha encontrado ningún reto con el nombre ${respuesta2.nombre}.`);
                  }
                  // Borramos el reto de la lista de retos activos del usuario actual
                  usuarioAModificar.eraseRetosActivos(idReto);
                  // Lo escribimos en el fichero
                  this.jsonColeccionUsuario.eraseRetosActivos(usuarioAModificar, idReto);
                  return (this.volver(() => this.gestionUsuarios()));
                });
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

  private logIn() {
    console.clear();
    console.log('Iniciando sesión...');
    inquirer.prompt({
      type: 'input',
      name: 'usuario',
      message: 'Introduce tu nombre de usuario: ',
    }).then((respuesta) => {
      inquirer.prompt({
        type: 'input',
        name: 'contraseña',
        message: 'Introduce tu contraseña: '
      }).then((respuesta2) => {
        // Buscamos en la colección de usuarios el usuario que se ha logueado
        const usuario = Array.from(this.coleccionUsuarios.getUsuarios().values()).find((usuario) => usuario.getNombre() === respuesta.usuario);
        if ( usuario != undefined ) {
          if ( usuario.getContraseña() === respuesta2.contraseña ) {
            console.log('Sesión iniciada correctamente.');
            this.menuUsuario(usuario.id);
          } else {
            console.log('Contraseña incorrecta.');
            this.volver(() => this.logIn());
          }
        } else {
          console.log(`No se encontró el usuario ${respuesta.usuario}`);
          this.volver(() => this.logIn());
        }
      });
    });
  }

  private menuUsuario(id: number) {
    console.clear();
    // Cogemos el usuario de la colección de usuarios
    const usuarioActual = this.coleccionUsuarios.getUsuario(id);
    inquirer.prompt({
      type: 'list',
      name: 'menu',
      message: 'Elige una opción: ',
      choices: ['Lista de usuarios', 'Amigos', 'Rutas', 'Grupos', 'Estadísticas', 'Retos', 'Histórico de rutas', 'Salir'],
    }).then((respuesta) => {
      switch (respuesta.menu) {
        case 'Lista de usuarios':
          console.clear();
          this.listarUsuarios();
        break;
        case 'Amigos':
          console.clear();
          this.gestionAmigos(usuarioActual);
        break;
        case 'Rutas':
          console.clear();
          this.gestionRutasUsuario(id);
        break;
        case 'Grupos':
          console.clear();
          this.gestionGruposUsuario(id);
        break;
        case 'Estadísticas':
          console.clear();
          // this.gestionEstadisticas(usuarioActual);
        break;
        case 'Retos':
          console.clear();
          // this.gestionRetos(usuarioActual);
        break;
        case 'Histórico de rutas':
          console.clear();
          // this.gestionHistoricoRutas(usuarioActual);
        break;
        case 'Salir':
          console.clear();
          console.log('Saliendo...');
          this.consola();
        break;
        default:
        break;
      }
    });
  }

  private gestionAmigos(usuarioActual: Usuario) {
    inquirer.prompt({
      type: 'list',
      name: 'menu',
      message: 'Elige una opción: ',
      choices: ['Listar amigos', 'Añadir amigos', 'Borrar amigos', 'Volver'],
    }).then((respuesta) => {
      switch (respuesta.menu) {
        case 'Listar amigos':
          console.clear();
          usuarioActual.getAmigosApp().forEach((id) => {
            console.log(this.coleccionUsuarios.getUsuario(id).getNombre());
          });
          this.volver(() => this.gestionAmigos(usuarioActual));
        break;
        case 'Añadir amigos':
          console.clear();
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
            usuarioActual.addAmigoApp(nuevoAmigo.getID());
            // Lo escribimos en el fichero 
            this.jsonColeccionUsuario.addAmigo(usuarioActual);
            console.log(`Amigo ${nuevoAmigo.getNombre()} añadido al usuario ${usuarioActual.getNombre()}.`);
            return (this.volver(() => this.gestionUsuarios()));
          });
        break;
        case 'Borrar amigos':
          console.clear();
          inquirer.prompt({
            type: 'list',
            name: 'nombre',
            choices: Array.from(usuarioActual.getAmigosApp().values()).map((id) => this.coleccionUsuarios.getUsuario(id).getNombre()).concat('Cancelar'),
          }).then((respuesta2) => {
            // Obtenemos el id del usuario que queremos borrar 
            const idUsuarioBorrar = Array.from(usuarioActual.getAmigosApp().values()).find((id) => this.coleccionUsuarios.getUsuario(id).getNombre() === respuesta2.nombre);
            
            // Comprobamos que el usuario exista
            if ( idUsuarioBorrar == undefined ) {
              throw new Error (`No se ha encontrado ningún usuario con el nombre ${respuesta2.nombre}.`);
            }
            // Borramos el usuario de la lista de amigos del usuario actual
            usuarioActual.eraseAmigoApp(idUsuarioBorrar);
            // Lo escribimos en el fichero
            this.jsonColeccionUsuario.eraseAmigo(usuarioActual, idUsuarioBorrar);
            return (this.volver(() => this.gestionUsuarios()));
          });
        break;
        case 'Volver':
          console.clear();
          this.menuUsuario(usuarioActual.id);
        break;
        default:
        break;
      }
    });
  }

  private gestionRutasUsuario(id: number) {
    console.log('Gestionando rutas...');
    inquirer.prompt({
      type: 'list',
      name: 'menu',
      message: 'Elige una opción: ',
      choices: ['Listar rutas', 'Mostrar rutas', 'Volver'],
    }).then((respuesta) => {
      switch (respuesta.menu) {
        case 'Listar rutas':
          console.clear();
          console.log('Listando rutas...');
          this.listarRutasUsuario();
          this.gestionRutasUsuario(id);
        break;
        case 'Mostrar rutas':
          console.clear();
          console.log('Añadiendo ruta...');
          this.mostrarRutas();
          this.gestionRutasUsuario(id);
        break;
        case 'Volver':
          console.clear();
          this.menuUsuario(id);
        break;
        default:
        break;
      }
    });
  }
  
  /** 
   * Permite listar, crear, borrar y unirse a grupos
   */
  private gestionGruposUsuario(id: number) {
    console.log('Gestionando grupos...');
    inquirer.prompt({
      type: 'list',
      name: 'menu',
      message: 'Elige una opción: ',
      choices: ['Listar grupos', 'Borrar', 'Unirse', 'Volver'],
    }).then((respuesta) => {
      switch (respuesta.menu) {
        case 'Listar grupos':
          console.clear();
          console.log('Listando grupos...');
          this.listarGruposUsuario();
          this.gestionGruposUsuario(id);
        break;
        case 'Borrar':
          console.clear();
          console.log('Borrando grupo...');
          // Hacemos que el usuario elija el grupo que quiere borrar de los cuales es administrador
          inquirer.prompt({
            type: 'list',
            name: 'nombre',
            // Ponemos como choices solo aquellos grupos de los cuales el usuario con id es administrador
            choices: Array.from(this.coleccionGrupos.getGrupos().values()).filter((grupo) => grupo.getCreador() === id).map((grupo) => grupo.getNombre()).concat('Cancelar'),
          }).then((respuesta2) => {
            // Obtenemos el nombre del grupo que queremos borrar 
            const grupoBorrar = Array.from(this.coleccionGrupos.getGrupos().values()).find((grupo) => grupo.getNombre() === respuesta2.nombre);
            
            // Comprobamos que el grupo exista
            if ( grupoBorrar == undefined ) {
              throw new Error (`No se ha encontrado ningún grupo con el nombre ${respuesta2.nombre}.`);
            }
            // Borramos el grupo de la lista de grupos del usuario actual
            this.coleccionGrupos.eliminar(grupoBorrar);
            // Lo escribimos en el fichero
            this.jsonColeccionGrupo.eliminarGrupo(grupoBorrar);
            return (this.volver(() => this.gestionGruposUsuario(id)));
          });
        break;
        case 'Unirse':
          console.clear();
          console.log('Uniendo grupo...');
          // this.unirseGrupos();
          this.gestionGruposUsuario(id);
        break;
        case 'Volver':
          console.clear();
          this.menuUsuario(id);
        break;
        default:
        break;
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
        this.gestionInfo();
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
              'Modificar Nombre de Grupo',
              'Añadir Participante',
              'Borrar Participante',
              'Añadir Rutas Favoritas',
              'Borrar Rutas Favoritas',
              'Añadir Ruta Realizada',
              'Salir',
            ],
          }).then((respuesta) => {
            switch (respuesta.opcion) {
              case 'Salir':
                this.gestionInfo()
                break;
              case 'Modificar Nombre de Grupo':
                console.clear();
                inquirer.prompt({
                  type: 'input',
                  name: 'nombre',
                  message: 'Introduce tu nombre de grupo: ',
                }).then((respuesta2) => {
                  try {
                    this.jsonColeccionGrupo.modificarNombre(grupoAModificar, respuesta2.nombre)
                    this.coleccionGrupos.modificarNombre(grupoAModificar, respuesta2.nombre)
                    this.gestionGrupos();
                  } catch (error: unknown) {
                    if (error instanceof Error) {
                      console.log('\x1b[31m%s\x1b[0m', 'Error al modificar el grupo: ', error.message);
                    }
                    console.log('Introduce un nombre de grupo nuevo');
                    // pulsar enter para volver a introducir un nombre de grupo
                    inquirer.prompt({
                      type: 'input',
                      name: 'volver',
                      message: 'Pulsa enter para volver a introducir un grupo',
                    }).then(() => {
                      this.registrarGrupo();
                    });
                    return;
                  }
                });
                break;
              case 'Añadir Participante':
                console.clear();
                console.log('Añadiendo participante...');
                console.clear();
                inquirer.prompt({
                  type: 'input',
                  name: 'nombre',
                  message: 'Introduce el nombre del participante que deseas añadir: ',
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
                  // Buscamos el participante por su nombre dentro del map
                  const nuevoParticipante = Array.from(usuarios.values()).find((usuario) => usuario.getNombre() === respuesta2.nombre);
                  // Comprobamos que exista el participante
                  if ( nuevoParticipante == undefined ) {
                    console.log(`No se ha encontrado ningún usuario con el nombre ${respuesta2.nombre}.`);
                    return (this.volver(() => this.gestionUsuarios()));
                  }
                  // Añadimos el participante al grupo
                  grupoAModificar.addParticipante(nuevoParticipante.getID());
                  // Lo escribimos en el fichero 
                  this.jsonColeccionGrupo.addParticipante(grupoAModificar, nuevoParticipante.getID());

                  console.log(`Participante ${nuevoParticipante.getNombre()} añadido al grupo ${grupoAModificar.getNombre()}.`);
                  return (this.volver(() => this.gestionGrupos()));
                });
                break;
              case 'Borrar Participante':
                console.clear();
                inquirer.prompt({
                  type: 'list',
                  name: 'nombre',
                  choices: Array.from(grupoAModificar.getParticipantes().values()).map((id) => this.coleccionUsuarios.getUsuario(id).getNombre()).concat('Cancelar'),
                }).then((respuesta2) => {
                  if (respuesta2.nombre === 'Cancelar') {
                    this.gestionGrupos();
                  }
                  // Obtenemos el id del participante que queremos borrar 
                  const idParticipanteBorrar = Array.from(grupoAModificar.getParticipantes().values()).find((id) => this.coleccionUsuarios.getUsuario(id).getNombre() === respuesta2.nombre);
                  
                  // Comprobamos que el participante exista
                  if ( idParticipanteBorrar == undefined ) {
                    throw new Error (`No se ha encontrado ningún participante con el nombre ${respuesta2.nombre}.`);
                  }
                  // Borramos el participante de la lista del grupo actual
                  grupoAModificar.eraseParticipante(idParticipanteBorrar);
                  // Lo escribimos en el fichero
                  this.jsonColeccionGrupo.eraseParticipante(grupoAModificar, idParticipanteBorrar);
                  return (this.volver(() => this.gestionGrupos()));
                });
                break;
              case 'Añadir Rutas Favoritas':
                console.clear();
                console.log('Añadiendo ruta favorita...');
                inquirer.prompt({
                  type: 'list',
                  name: 'nombre',
                  choices: Array.from(this.coleccionRutas.getRutas().values()).map((ruta) => ruta.getNombre()).concat('Cancelar'),
                }).then((respuesta2) => {
                  if (respuesta2.usuario === 'Cancelar') {
                    this.gestionGrupos();
                  }
                  // Obtenemos el id de la ruta que queremos añadir
                  const idRuta = Array.from(this.coleccionRutas.getRutas().values()).find((ruta) => ruta.getNombre() === respuesta2.nombre)?.getID();
                  // Comprobamos que la ruta exista
                  if ( idRuta == undefined ) {
                    throw new Error (`No se ha encontrado ninguna ruta con el nombre ${respuesta2.nombre}.`);
                  }
                  // Añadimos la ruta a la lista de rutas favoritas del grupo actual
                  grupoAModificar.addRutaFavorita(idRuta);
                  // Lo escribimos en el fichero
                  this.jsonColeccionGrupo.addRutaFavorita(grupoAModificar, idRuta);
                  return (this.volver(() => this.gestionGrupos()));
                });
                break;
              case 'Borrar Rutas Favoritas':
                const rutasFavoritas = Array.from(grupoAModificar.getRutasFavoritas().values()).map((id) => this.coleccionRutas.getRuta(id).getNombre());
                if ( rutasFavoritas.length === 0 ) {
                  console.log('No tienes rutas favoritas.');
                  return (this.volver(() => this.gestionUsuarios()));
                }
                console.clear();
                inquirer.prompt({
                  type: 'list',
                  name: 'nombre',
                  choices: rutasFavoritas.concat('Cancelar'),
                }).then((respuesta2) => {
                  if (respuesta2.usuario === 'Cancelar') {
                    this.gestionGrupos();
                  }
                  // Obtenemos el id de la ruta que queremos borrar
                  const idRuta = Array.from(grupoAModificar.getRutasFavoritas().values()).find((id) => this.coleccionRutas.getRuta(id).getNombre() === respuesta2.nombre);
                  // Comprobamos que la ruta exista
                  if ( idRuta == undefined ) {
                    throw new Error (`No se ha encontrado ninguna ruta con el nombre ${respuesta2.nombre}.`);
                  }
                  // Borramos la ruta de la lista de rutas favoritas del grupo actual
                  grupoAModificar.eraseRutaFavorita(idRuta);
                  // Lo escribimos en el fichero
                  this.jsonColeccionGrupo.eraseRutaFavorita(grupoAModificar, idRuta);
                  return (this.volver(() => this.gestionGrupos()));
                });
                break;
              case 'Añadir Ruta Realizada':
                console.clear();
                console.log('Añadiendo ruta realizada...');
                inquirer.prompt({
                  type: 'list',
                  name: 'nombre',
                  choices: Array.from(this.coleccionRutas.getRutas().values()).map((ruta) => ruta.getNombre()).concat('Cancelar'),
                }).then((respuesta2) => {
                  // Obtenemos el id de la ruta que queremos añadir
                  if (respuesta2.usuario === 'Cancelar') {
                    this.gestionGrupos();
                  }
                  const idRuta = Array.from(this.coleccionRutas.getRutas().values()).find((ruta) => ruta.getNombre() === respuesta2.nombre)?.getID();
                  // Comprobamos que la ruta exista
                  if ( idRuta == undefined ) {
                    throw new Error (`No se ha encontrado ninguna ruta con el nombre ${respuesta2.nombre}.`);
                  }
                  // Añadimos la ruta a la lista de rutas realizadas del grupo actual
                  grupoAModificar.addRutaRealizada({ ruta: idRuta, fecha: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()});
                  // Lo escribimos en el fichero
                  this.jsonColeccionGrupo.addRutaRealizada(grupoAModificar, { ruta: idRuta, fecha: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()});
                  return (this.volver(() => this.gestionGrupos()));
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
      console.log(grupos.getNombre());
    }
    this.volver(() => this.gestionInfo());
  }

  private listarGruposUsuario() {
    console.clear();
    console.log('Listando grupos...');
    for (const grupos of this.coleccionGrupos) {
      // console.log(grupos.getNombre());
      console.log(grupos);
    }
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
        case 'Eliminar ruta':
          this.eliminarRuta();
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
      console.log(ruta.getNombre());
      // console.log(ruta);
    });
    this.volver(() => this.gestionRutas());
  }

  private mostrarRutas(): void {
    console.clear();
    console.log('Listado de rutas:');
    const rutas = this.coleccionRutas.getRutas();
    rutas.forEach((ruta) => {
      // console.log(ruta.getNombre());
      console.log(ruta);
    });
  }

  private listarRutasUsuario(): void {
    console.clear();
    console.log('Listado de rutas:');
    const rutas = this.coleccionRutas.getRutas();
    rutas.forEach((ruta) => {
      console.log(ruta.getNombre());
      // console.log(ruta);
    });
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
                inquirer.prompt([
                  {
                    type: 'input',
                     name: 'coordenadasInicio',
                    message: 'Coordenadas de inicio: ',
                  },
                  {
                    type: 'input',
                    name: 'coordenadasFin',
                    message: 'Coordenadas de fin: ',
                  }
                ]).then((respuesta: any) => {
                  try { 
                    checkCoordenadas(respuesta.coordenadasInicio);
                    checkCoordenadas(respuesta.coordenadasFin);
            
                    const coordenadasInicio = stringToCoordenadas(respuesta.coordenadasInicio);
                    const coordenadasFin = stringToCoordenadas(respuesta.coordenadasFin);
                    
                    this.jsonColeccionRuta.modificarCoordenadasRuta(rutaAModificar, coordenadasInicio, coordenadasFin);
                    this.coleccionRutas.modificarCoordenadasRuta(rutaAModificar, coordenadasInicio, coordenadasFin);
                    this.gestionInfo();
                  } catch (error: any) {
                    if (error instanceof Error) {
                      console.log('\x1b[31m%s\x1b[0m', 'Error al modificar la ruta: ', error.message);
                    }
                    // pulsar enter para volver a introducir un nombre de Ruta
                    inquirer.prompt({
                      type: 'input',
                      name: 'volver',
                      message: 'Pulsa enter para volver al menú',
                    }).then(() => {
                      this.gestionInfo();
                    });
                    return;
                  }
                  this.gestionInfo();
                });
              break;
              case 'Modificar longitud':
                console.clear();
                inquirer.prompt({
                  type: 'input',
                  name: 'longitud',
                  message: 'Introduce la longitud de la ruta: ',
                }).then((respuesta2) => {
                  try {
                    this.jsonColeccionRuta.modificarLongitudRuta(rutaAModificar, respuesta2.longitud)
                    this.coleccionRutas.modificarLongitudRuta(rutaAModificar, respuesta2.longitud)
                    this.gestionInfo();
                  } catch (error: unknown) {
                    if (error instanceof Error) {
                      console.log('\x1b[31m%s\x1b[0m', 'Error al modificar el ruta: ', error.message);
                    }
                    console.log('Introduce una longitud de ruta nueva');
                    // pulsar enter para volver a introducir un nombre de Ruta
                    inquirer.prompt({
                      type: 'input',
                      name: 'volver',
                      message: 'Pulsa enter para volver al menu',
                    }).then(() => {
                      this.gestionInfo();
                    });
                    return;
                  }
                });
                break;
              case 'Modificar desnivel':
                console.clear();
                inquirer.prompt({
                  type: 'input',
                  name: 'desnivel',
                  message: 'Introduce el desnivel de la ruta: ',
                }).then((respuesta2) => {
                  try {
                    this.jsonColeccionRuta.modificarDesnivelRuta(rutaAModificar, respuesta2.desnivel)
                    this.coleccionRutas.modificarDesnivelRuta(rutaAModificar, respuesta2.desnivel)
                    this.gestionInfo();
                  } catch (error: unknown) {
                    if (error instanceof Error) {
                      console.log('\x1b[31m%s\x1b[0m', 'Error al modificar el ruta: ', error.message);
                    }
                    console.log('Introduce un desnivel de ruta nuevo');
                    // pulsar enter para volver a introducir un nombre de Ruta
                    inquirer.prompt({
                      type: 'input',
                      name: 'volver',
                      message: 'Pulsa enter para volver al menu',
                    }).then(() => {
                      this.gestionInfo();
                    });
                    return;
                  }
                });
                break;
              case 'Modificar tipo de actividad':
                console.clear();
                inquirer.prompt({
                  type: 'list',
                  name: 'tipoActividad',
                  choices: [ 'Ciclismo', 'Running' ],
                }).then((respuesta2) => {
                  try {
                    this.jsonColeccionRuta.modificarTipoActividadRuta(rutaAModificar, respuesta2.tipoActividad)
                    this.coleccionRutas.modificarTipoActividadRuta(rutaAModificar, respuesta2.tipoActividad)
                    this.gestionInfo();
                  } catch (error: unknown) {
                    if (error instanceof Error) {
                      console.log('\x1b[31m%s\x1b[0m', 'Error al modificar el ruta: ', error.message);
                    }
                    console.log('Introduce un tipo de actividad de ruta nuevo');
                    // pulsar enter para volver a introducir un nombre de Ruta
                    inquirer.prompt({
                      type: 'input',
                      name: 'volver',
                      message: 'Pulsa enter para volver al menu',
                    }).then(() => {
                      this.gestionInfo();
                    });
                    return;
                  }
                });
                break;
              case 'Modificar dificultad':
                console.clear();
                inquirer.prompt({
                  type: 'list',
                  name: 'dificultad',
                  choices: [ 'Fácil', 'Media', 'Difícil' ]
                }).then((respuesta2) => {
                  try {
                    this.jsonColeccionRuta.modificarDificultadRuta(rutaAModificar, respuesta2.dificultad)
                    this.coleccionRutas.modificarDificultadRuta(rutaAModificar, respuesta2.dificultad)
                    this.gestionInfo();
                  } catch (error: unknown) {
                    if (error instanceof Error) {
                      console.log('\x1b[31m%s\x1b[0m', 'Error al modificar el ruta: ', error.message);
                    }
                    console.log('Introduce una dificultad de ruta nueva');
                    // pulsar enter para volver a introducir un nombre de Ruta
                    inquirer.prompt({
                      type: 'input',
                      name: 'volver',
                      message: 'Pulsa enter para volver al menu',
                    }).then(() => {
                      this.gestionInfo();
                    });
                    return;
                  }
                });
                break;
              case 'Salir':
                this.gestionInfo();
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

  private eliminarRuta(): void {
    console.clear();
    console.log('Eliminando ruta...');

    // Obtener el listado de rutas
    const rutas = this.coleccionRutas.getRutas();
      
    // Pedir al usuario que seleccione la ruta a eliminar
    inquirer.prompt({
      type: 'list',
      name: 'ruta',
      message: 'Selecciona la ruta que deseas eliminar:',
      choices: Array.from(rutas.values()).map((ruta) => ruta.getNombre()).concat('Cancelar'),
    }).then((respuesta) => {
      if (respuesta.ruta === 'Cancelar') {
        this.consola();
      } else {
        // Buscar la ruta a eliminar por su nombre y eliminarla
        const rutaAEliminar = Array.from(rutas.values()).find((ruta) => ruta.getNombre() === respuesta.ruta);
        if (rutaAEliminar) {
          // Eliminamos la ruta del JSON
          this.jsonColeccionRuta.eliminarRuta(rutaAEliminar);
          // Eliminamos la ruta del Map de rutas
          rutas.delete(rutaAEliminar.getID());
          console.log(`ruta ${rutaAEliminar.getNombre()} eliminada con éxito`);
        } else {
          console.log(`No se encontró la ruta ${respuesta.ruta}`);
        }
        this.volver(() => this.consola());
      }
    });
  }

  /////////////////////////////////////
  ////////// Gestión de Reto //////////
  /////////////////////////////////////

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
  