import { EntidadInterface } from "../interfaces/entidadInterface";
import { EstadisticasEntrenamiento } from "../interfaces/estadisticasEntrenamiento";

let contador_id = 0;
const EMPTY_ESTADISTICAS_ENTRENAMIENTO: EstadisticasEntrenamiento = {
  semana: { km: 0, desnivel: 0 },
  mes: { km: 0, desnivel: 0 },
  anio: { km: 0, desnivel: 0 },
};

/**
 * Clase que representa a un grupo
 */
export class Grupo implements EntidadInterface {
  id: number;
  nombre: string;
  creador: number;
  participantes: number[] = [];
  estadisticasEntrenamiento: EstadisticasEntrenamiento =
    EMPTY_ESTADISTICAS_ENTRENAMIENTO;
  clasificacion: { id: number; km: number; desnivel: number }[] = [];
  rutasFavoritas: number[] = [];
  historicoRutas: { ruta: number; fecha: string }[] = [];

  /**
   * Constructor del grupo
   * @param nombre Nombre del grupo
   * @param creador Creador del grupo
   */
  constructor(nombre: string, creador: number) {
    if (nombre === "") {
      throw new Error("Nombre de grupo vacío");
    }
    contador_id++;
    this.id = contador_id;
    this.nombre = nombre;
    this.creador = creador;
  }

  /**
   * Getter del
   * @returns
   */
  getID(): number {
    return this.id;
  }

  /**
   * Getter del nombre
   * @returns nombre del grupo
   */
  getNombre(): string {
    return this.nombre;
  }

  /**
   * Getter del creador
   * @returns ID del creador
   */
  getCreador(): number {
    return this.creador;
  }

  /**
   * Getter de los participantes del grupo
   * @returns ID's de los participantes del grupo
   */
  getParticipantes(): number[] {
    return this.participantes;
  }

  /**
   * Getter de las estadísticas
   * @returns estadísticas
   */
  getEstadisticasEntrenamiento(): {
    semana: { km: number; desnivel: number };
    mes: { km: number; desnivel: number };
    anio: { km: number; desnivel: number };
  } {
    return this.estadisticasEntrenamiento;
  }

  /**
   * Getter de la clasificación
   * @returns id de los usuarios ordenados segun la clasificación
   */
  getClasificacion(): { id: number; km: number; desnivel: number }[] {
    return this.clasificacion;
  }

  /**
   * Getter de las rutas favoritas
   * @returns lista de ID's de las rutas favoritas del grupo
   */
  getRutasFavoritas(): number[] {
    return this.rutasFavoritas;
  }

  /**
   * Getter del historico de rutas
   * @returns lista de ID que las rutas que ha recorrido el grupo
   */
  getHistoricoRutas(): { ruta: number; fecha: string }[] {
    return this.historicoRutas;
  }

  /**
   * Propierdad que establece el ID de los grupos
   * @param id id desde el que va a empezar a crear grupos
   */
  setID = (id: number): void => {
    this.id = id;
    if (id > contador_id) {
      contador_id = id;
    }
  };

  /**
   * Setter del nombre
   * @param nombre Nuevo nombre del grupo
   */
  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  /**
   * Setter del creador del grupo
   * @param creador nueva ID del creador del grupo
   */
  setCreador(creador: number): void {
    this.creador = creador;
  }

  /**
   * Setter de participantes
   * @param participantes Nuevo array con los ID's de los participantes
   */
  setParticipantes(participantes: number[]): void {
    this.participantes = participantes;
  }

  /**
   * Setter de las estadísticas del grupo
   * @param estadisticasEntrenamiento Nuevas estadísticas
   */
  setEstadisticasEntrenamiento(estadisticasEntrenamiento: {
    semana: { km: number; desnivel: number };
    mes: { km: number; desnivel: number };
    anio: { km: number; desnivel: number };
  }): void {
    this.estadisticasEntrenamiento = estadisticasEntrenamiento;
  }

  /**
   * Setter de la clasifiación de usuarios
   * @param clasificacion Nueva clasificación
   */
  setClasificacion(
    clasificacion: { id: number; km: number; desnivel: number }[]
  ): void {
    this.clasificacion = clasificacion;
  }

  /**
   * Setter de rutas favoritas
   * @param rutasFavoritas ID's de las nuevas rutas v¡favoritas
   */
  setRutasFavoritas(rutasFavoritas: number[]): void {
    this.rutasFavoritas = rutasFavoritas;
  }

  /**
   * Setter del historico de rutas
   * @param historicoRutas id's del nuevo historico de rutas
   */
  setHistoricoRutas(historicoRutas: { ruta: number; fecha: string }[]): void {
    this.historicoRutas = historicoRutas;
  }

  /**
   * Método que permite añadir rutas favoritas
   * @param idRuta id de la ruta a añadir
   */
  addRutaFavorita(idRuta: number): void {
    this.rutasFavoritas.push(idRuta);
  }

  /**
   * Método que permite añadir rutas realizadas
   * @param idRuta ruta realizada por el grupo (id + fecha)
   */
  addRutaRealizada(ruta: { ruta: number; fecha: string }): void {
    this.historicoRutas.push(ruta);
  }

  /**
   * Método que permite eliminar rutas favoritas
   * @param idRuta id de la ruta a eliminar
   */
  eraseRutaFavorita(idRuta: number): void {
    this.rutasFavoritas = this.rutasFavoritas.filter((id) => id !== idRuta);
  }

  /**
   * Método que permite añadir participantes al grupo
   * @param idRuta id del participante a añadir
   */
  addParticipante(id: number): void {
    this.participantes.push(id);
  }

  /**
   * Método que permite eliminar participantes de un grupo
   * @param idRuta id del participante a eliminar
   */
  eraseParticipante(idParticipante: number): void {
    this.participantes = this.participantes.filter(
      (id) => id !== idParticipante
    );
  }
}
