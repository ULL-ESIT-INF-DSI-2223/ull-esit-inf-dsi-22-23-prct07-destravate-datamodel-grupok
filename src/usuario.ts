import { EntidadInterface } from "./interfaces/entidadInterface";

export class Usuario implements EntidadInterface {
  id: number;
  nombre: string;
  actividades: string[]; // deberia ser un array de actividades
  amigosApp: number[];
  amigosFrecuentes: number[];
  estadisticas: {
    semana: { km: number; desnivel: number };
    mes: { km: number; desnivel: number };
    anio: { km: number; desnivel: number };
  };
  rutasFavoritas: number[];
  retosActivos: number[];
  historicoRutas: { ruta: number; fecha: Date; }[];

  constructor(
    id: number,
    nombre: string,
    actividades: string[],
    amigosApp: number[],
    amigosFrecuentes: number[],
    estadisticas: {
      semana: { km: number; desnivel: number };
      mes: { km: number; desnivel: number };
      anio: { km: number; desnivel: number };
    },
    rutasFavoritas: number[],
    retosActivos: number[],
    historicoRutas: { ruta: number; fecha: Date; }[]
  ) {
    this.id = id;
    this.nombre = nombre;
    this.actividades = actividades;
    this.amigosApp = amigosApp;
    this.amigosFrecuentes = amigosFrecuentes;
    this.estadisticas = estadisticas;
    this.rutasFavoritas = rutasFavoritas;
    this.retosActivos = retosActivos;
    this.historicoRutas = historicoRutas;
  }

  