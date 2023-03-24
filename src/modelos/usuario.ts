import { EntidadInterface } from "../interfaces/entidadInterface";
type Actividad = 'bicicleta' | 'corredor';
let contador_id = 0;
export class Usuario implements EntidadInterface {
  id: number;
  nombre: string;
  actividades: string[]; // deberia ser un array de actividades
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

  // constructor(
  //   id: number,
  //   nombre: string,
  //   actividades: string[],
  //   amigosApp: number[],
  //   amigosFrecuentes: number[],
  //   estadisticas: {
  //     semana: { km: number; desnivel: number };
  //     mes: { km: number; desnivel: number };
  //     anio: { km: number; desnivel: number };
  //   },
  //   rutasFavoritas: number[],
  //   retosActivos: number[],
  //   historicoRutas: { ruta: number; fecha: Date; }[]
  // ) {
  //   this.id = id;
  //   this.nombre = nombre;
  //   this.actividades = actividades;
  //   this.amigosApp = amigosApp;
  //   this.amigosFrecuentes = amigosFrecuentes;
  //   this.estadisticas = estadisticas;
  //   this.rutasFavoritas = rutasFavoritas;
  //   this.retosActivos = retosActivos;
  //   this.historicoRutas = historicoRutas;
  // }
  constructor(nombre: string, actividades: Actividad) {
    /// Comprobamos que el nombre no esté vacío y que la actividad sea válida
    if (nombre === '' || (actividades !== 'bicicleta' && actividades !== 'corredor')) {
      throw new Error('Nombre de usuario vacío o actividad no válida');
    }
    console.log(contador_id);
    this.id = contador_id;
    contador_id++;
    console.log(contador_id);

    this.nombre = nombre;
    this.actividades = [actividades];
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

  getActividades(): string[] {
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

  // Métodos de modificación
  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  setActividades(actividades: string[]): void {
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