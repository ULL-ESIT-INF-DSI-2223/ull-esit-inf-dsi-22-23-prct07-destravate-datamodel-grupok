import { EntidadInterface } from "../interfaces/entidadInterface";
import { Actividad } from "../enums/actividadEnum";

let contador_id = 0;

export class Reto implements EntidadInterface {
    id: number;
    nombre: string;
    rutas: number[] = [];
    tipoActividad: Actividad;
    kmTotales: number = 0;
    usuarios: number[] = [];
  
    constructor(nombre: string, tipoActividad: Actividad) {
      this.id = contador_id++;
      this.nombre = nombre;
      this.tipoActividad = tipoActividad;
    }
  
    // Métodos para acceder a los atributos de la clase
    public getID(): number {
      return this.id;
    }
  
    public getNombre(): string {
      return this.nombre;
    }
  
    public getRutas(): number[] {
      return this.rutas;
    }
  
    public getTipoActividad(): string {
      return this.tipoActividad;
    }
  
    public getKmTotales(): number {
      return this.kmTotales;
    }
  
    public getUsuarios(): number[] {
      return this.usuarios;
    }

    setID = (id: number): void => {
      this.id = id;
      if ( id > contador_id ) {
        contador_id = id;
      }
    }
  
    // Métodos para actualizar los atributos de la clase
    public setNombre(nombre: string): void {
      this.nombre = nombre;
    }
  
    public setRutas(rutas: number[]): void {
      this.rutas = rutas;
    }
  
    public setTipoActividad(tipoActividad: Actividad): void {
      this.tipoActividad = tipoActividad;
    }
  
    public setKmTotales(kmTotales: number): void {
      this.kmTotales = kmTotales;
    }
  
    public setUsuarios(usuarios: number[]): void {
      this.usuarios = usuarios;
    }

    addUsuario(id: number): void {
      this.usuarios.push(id);
    }

    removeUsuario(id: number): void {
      this.usuarios = this.usuarios.filter((usuario) => usuario !== id);
    }

    addRuta(id: number): void {
      this.rutas.push(id);
    }

    removeRuta(id: number): void {
      this.rutas = this.rutas.filter((ruta) => ruta !== id);
    }
  }
  