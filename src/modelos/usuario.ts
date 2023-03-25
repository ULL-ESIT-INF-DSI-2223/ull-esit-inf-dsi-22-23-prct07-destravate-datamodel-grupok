import { EntidadInterface } from "../interfaces/entidadInterface";

type Actividad = 'bicicleta' | 'corredor';
let contador_id = 0;

export class Usuario implements EntidadInterface {
  id: number;
  nombre: string;
  actividades: Actividad; // deberia ser un array de actividades
  amigosApp: number[] = [];
  amigosFrecuentes: number[] = [];
  estadisticas: {
    semana: { km: number; desnivel: number };
    mes: { km: number; desnivel: number };
    anio: { km: number; desnivel: number };
  } = { semana: { km: 0, desnivel: 0 }, mes: { km: 0, desnivel: 0 }, anio: { km: 0, desnivel: 0 } };
  rutasFavoritas: number[] = [];
  retosActivos: number[] = [];
  historicoRutas: { ruta: number; fecha: Date; }[] = [];
  
  constructor(nombre: string, actividades: Actividad) {
    /// Comprobamos que el nombre no esté vacío y que la actividad sea válida
    if (nombre === '' || (actividades !== 'bicicleta' && actividades !== 'corredor')) {
      throw new Error('Nombre de usuario vacío o actividad no válida');
    }
    contador_id++;
    this.id = contador_id;
    this.nombre = nombre;
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
}