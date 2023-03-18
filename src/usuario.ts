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
  historicoRutas: number[];