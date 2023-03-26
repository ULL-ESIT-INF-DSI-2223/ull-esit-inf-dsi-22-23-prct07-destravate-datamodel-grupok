import { EntidadInterface } from "../interfaces/entidadInterface";
import { Actividad } from "../enums/actividadEnum";
import { EstadisticasEntrenamiento } from "../interfaces/estadisticasEntrenamiento";

let contador_id = 0;
/**
 * Clase que representa a un usuario
 */
export class Usuario implements EntidadInterface {
  id: number;
  nombre: string;
  contraseña: string;
  actividades: Actividad; 
  amigosApp: number[] = [];
  amigosFrecuentes: number[] = [];
  estadisticas: EstadisticasEntrenamiento = { semana: { km: 0, desnivel: 0 }, mes: { km: 0, desnivel: 0 }, anio: { km: 0, desnivel: 0 } };
  rutasFavoritas: number[] = [];
  retosActivos: number[] = [];
  historicoRutas: { ruta: number; fecha: string; }[] = [];
  
  /**
   * Constructor de la clase
   * @param nombre Nombre del usuario
   * @param contraseña Contraseña
   * @param actividades Actividad que realiza
   */
  constructor(nombre: string, contraseña: string, actividades: Actividad) {
    /// Comprobamos que el nombre no esté vacío y que la actividad sea válida
    if (nombre === '') {
      throw new Error('Nombre de usuario vacío');
    }
    if (this.isValidPassword(contraseña) === false) {
      throw new Error('Contraseña no válida');
    }
    contador_id++;
    this.id = contador_id;
    this.nombre = nombre;
    this.contraseña = contraseña;
    this.actividades = actividades;
  }

  /**
   * Permite que se pueda iterar
   */
  *[Symbol.iterator]() {
    yield this.nombre;
    yield* this.actividades;
  }

  /**
   * Getter del ID
   * @returns ID del user
   */
  getID(): number {
    return this.id;
  }

  /**
   * Getter del nombre
   * @returns Nombre del user
   */
  getNombre(): string {
    return this.nombre;
  }

  /**
   * Getter de la contraseña
   * @returns Contraseña del usuario
   */
  getContraseña(): string {
    return this.contraseña;
  }

  /**
   * Getter de las actividades
   * @returns Actividad que realiza el usuario
   */
  getActividades(): Actividad {
    return this.actividades;
  }

  /**
   * Getter de la lista de amigos
   * @returns ID de los amigos del usuario
   */
  getAmigosApp(): number[] {
    return this.amigosApp;
  }

  /**
   * Getter de la lista de amigos frecuentes
   * @returns ID de los amigos frecuentes
   */
  getAmigosFrecuentes(): number[] {
    return this.amigosFrecuentes;
  }

  /**
   * Getter de estadísticas
   * @returns Estadísticas del usuario
   */
  getEstadisticas(): {
    semana: { km: number; desnivel: number };
    mes: { km: number; desnivel: number };
    anio: { km: number; desnivel: number };
  } {
    return this.estadisticas;
  }

  /**
   * Getter de las rutas favoritas
   * @returns ID De las rutas favoritas
   */
  getRutasFavoritas(): number[] {
    return this.rutasFavoritas;
  }

  /**
   * Getter de retos activos
   * @returns Id de los retos activos
   */
  getRetosActivos(): number[] {
    return this.retosActivos;
  }

  /**
   * Getter del historico de rutas
   * @returns Id de las rutas que ha recorrido junto a la fecha
   */
  getHistoricoRutas(): { ruta: number; fecha: string; }[] {
    return this.historicoRutas;
  }

  /**
   * Getter del contador que establece los id's
   * @returns Contador de ID's
   */
  getContadorID(): number {
    return contador_id;
  }

  /**
   * Setter del ID
   * @param id Nuevo ID del user
   */
  setID = (id: number): void => {
    this.id = id;
    if ( id > contador_id ) {
      contador_id = id;
    }
  }

  /**
   * Setter del nombre
   * @param nombre Nuevo nombre del user
   */
  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  /**
   * Setter de la contraseña
   * @param contraseña Nueva contraseña del user
   */
  setContraseña(contraseña: string): void {
    this.contraseña = contraseña;
  }
  
  /**
   * Setter de las actividades
   * @param actividades Nueva actividad del user
   */
  setActividades(actividades: Actividad): void {
    this.actividades = actividades;
  }

  /**
   * Setter de la lista de amigos
   * @param amigos Array de ID's de los nuevos amigos del user
   */
  setAmigosApp(amigosApp: number[]): void {
    this.amigosApp = amigosApp;
  }

  /**
   * Setter de amigos frecuentes
   * @param amigosFrecuentes Array de ID's de los nuevos amigos frecuentes del user
   */
  setAmigosFrecuentes(amigosFrecuentes: number[]): void {
    this.amigosFrecuentes = amigosFrecuentes;
  }

  /**
   * Setter de estadísticas
   * @param estadisticas Tipo personalizado de datos que expresa las estadísticas
   */
  setEstadisticas(estadisticas: {
    semana: { km: number; desnivel: number };
    mes: { km: number; desnivel: number };
    anio: { km: number; desnivel: number };
  }): void {
    this.estadisticas = estadisticas;
  }

  /**
   * Setter de rutas favoritas
   * @param rutasFavoritas Array de ID's de las nuevas rutas favoritas
   */
  setRutasFavoritas(rutasFavoritas: number[]): void {
    this.rutasFavoritas = rutasFavoritas;
  }

  /**
   * Setter de retos activos
   * @param retosActivos Array de ID's de las nuevos retos activos
   */
  setRetosActivos(retosActivos: number[]): void {
    this.retosActivos = retosActivos;
  }

  /**
   * Setter del historico de rutas
   * @param rutasFavoritas Tipo de datos que contiene por un lado la ruta y por otro la fecha en la que se realizó
   */
  setHistoricoRutas(historicoRutas: { ruta: number; fecha: string; }[]): void {
    this.historicoRutas = historicoRutas;
  }
  
  /**
   * Método que permite añadir un amigo al usuario
   * @param idAmigo ID del amigo a añadir
   */
  addAmigoApp(idAmigo: number): void {
    // Compruebamos si el id del amigo ya está en la lista
    if (this.amigosApp.includes(idAmigo)) {
      throw new Error('El amigo ya está en la lista de amigos');
    }
    this.amigosApp.push(idAmigo);
  }

  /**
   * Método que permite borrar un amigo del usuario
   * @param idAmigo ID del amigo a borrar
   */
  eraseAmigoApp(idAmigo: number): void {
    this.amigosApp = this.amigosApp.filter((id) => id !== idAmigo);
  }

  /**
   * Método que permite añadir una ruta favorita
   * @param idRuta ID de la ruta favorita a añadir
   */
  addRutaFavorita(idRuta: number): void {
    this.rutasFavoritas.push(idRuta);
  }

  /**
   * Método que permite añadir una ruta realizada
   * @param idRuta ID de la ruta realizada a añadir
   */
  addRutaRealizada(ruta: { ruta: number; fecha: string; }): void {
    this.historicoRutas.push(ruta);
  }

  /**
   * Método que permite eliminar una ruta favorita
   * @param idRuta ID de la ruta favorita a eliminar
   */
  eraseRutaFavorita(idRuta: number): void {
    this.rutasFavoritas = this.rutasFavoritas.filter((id) => id !== idRuta);
  }

  /**
   * Método qye permite añadir un reto activo
   * @param idReto ID del reto a añadir
   */
  addRetosActivos(idReto: number): void {
    this.retosActivos.push(idReto);
  }

  /**
   * Método qye permite eliminar un reto activo
   * @param idReto ID del reto a eliminar
   */
  eraseRetosActivos(idReto: number): void {
    this.retosActivos = this.retosActivos.filter((id) => id !== idReto);
  }

  /**
   * Validador de la contraseña
   * @param contraseña Contraseña a validar
   */
  isValidPassword(password: string): boolean {
    if(password.length < 4 || password.length > 30) {
      return false;
    }
    if(password[0] === '_' || password[password.length - 1] === '_') {
    return false;
    }
  
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[$,-,_,*]/.test(password);
  
    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
      return false;
    }
    return true;
  }
}