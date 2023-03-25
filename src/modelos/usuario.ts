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
  actividades: Actividad; // deberia ser un array de actividades
  amigosApp: number[] = [];
  amigosFrecuentes: number[] = [];
  estadisticas: EstadisticasEntrenamiento = { semana: { km: 0, desnivel: 0 }, mes: { km: 0, desnivel: 0 }, anio: { km: 0, desnivel: 0 } };
  rutasFavoritas: number[] = [];
  retosActivos: number[] = [];
  historicoRutas: { ruta: number; fecha: Date; }[] = [];
  
  constructor(nombre: string, contraseña: string, actividades: Actividad) {
    /// Comprobamos que el nombre no esté vacío y que la actividad sea válida
    if (nombre === '') {
      throw new Error('Nombre de usuario vacío o actividad no válida');
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

  *[Symbol.iterator]() {
    yield this.nombre;
    yield* this.actividades;
  }

  getID(): number {
    return this.id;
  }

  getNombre(): string {
    return this.nombre;
  }

  getContraseña(): string {
    return this.contraseña;
  }

  getActividades(): Actividad {
    return this.actividades;
  }

  getAmigosApp(): number[] {
    return this.amigosApp;
  }

  getAmigosFrecuentes(): number[] {
    return this.amigosFrecuentes;
  }

  getEstadisticas(): {
    semana: { km: number; desnivel: number };
    mes: { km: number; desnivel: number };
    anio: { km: number; desnivel: number };
  } {
    return this.estadisticas;
  }

  getRutasFavoritas(): number[] {
    return this.rutasFavoritas;
  }

  getRetosActivos(): number[] {
    return this.retosActivos;
  }

  getHistoricoRutas(): { ruta: number; fecha: Date; }[] {
    return this.historicoRutas;
  }

  setID = (id: number): void => {
    this.id = id;
    if ( id > contador_id ) {
      contador_id = id = 1;
    }
  }

  // Métodos de modificación
  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  setContraseña(contraseña: string): void {
    this.contraseña = contraseña;
  }
  
  setActividades(actividades: Actividad): void {
    this.actividades = actividades;
  }

  setAmigosApp(amigosApp: number[]): void {
    this.amigosApp = amigosApp;
  }

  setAmigosFrecuentes(amigosFrecuentes: number[]): void {
    this.amigosFrecuentes = amigosFrecuentes;
  }

  setEstadisticas(estadisticas: {
    semana: { km: number; desnivel: number };
    mes: { km: number; desnivel: number };
    anio: { km: number; desnivel: number };
  }): void {
    this.estadisticas = estadisticas;
  }

  setRutasFavoritas(rutasFavoritas: number[]): void {
    this.rutasFavoritas = rutasFavoritas;
  }

  setRetosActivos(retosActivos: number[]): void {
    this.retosActivos = retosActivos;
  }

  setHistoricoRutas(historicoRutas: { ruta: number; fecha: Date; }[]): void {
    this.historicoRutas = historicoRutas;
  }
  
  addAmigoApp(idAmigo: number): void {
    // Compruebamos si el id del amigo ya está en la lista
    if (this.amigosApp.includes(idAmigo)) {
      throw new Error('El amigo ya está en la lista de amigos');
    }
    this.amigosApp.push(idAmigo);
  }

  eraseAmigoApp(idAmigo: number): void {
    this.amigosApp = this.amigosApp.filter((id) => id !== idAmigo);
  }

  addRutaFavorita(idRuta: number): void {
    this.rutasFavoritas.push(idRuta);
  }

  eraseRutaFavorita(idRuta: number): void {
    this.rutasFavoritas = this.rutasFavoritas.filter((id) => id !== idRuta);
  }

  addRetosActivos(idReto: number): void {
    this.retosActivos.push(idReto);
  }

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