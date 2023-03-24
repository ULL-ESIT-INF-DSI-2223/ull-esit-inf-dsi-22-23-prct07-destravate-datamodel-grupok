import { EntidadInterface } from "../interfaces/entidadInterface";

export class Reto implements EntidadInterface {
    id: number;
    nombre: string;
    rutas: string[];
    tipoActividad: string;
    kmTotales: number;
    usuarios: number[];
  
    constructor(id: number, nombre: string, rutas: string[], tipoActividad: string, kmTotales: number, usuarios: number[]) {
      this.id = id;
      this.nombre = nombre;
      this.rutas = rutas;
      this.tipoActividad = tipoActividad;
      this.kmTotales = kmTotales;
      this.usuarios = usuarios;
    }
  
    // Métodos para acceder a los atributos de la clase
    public getId(): number {
      return this.id;
    }
  
    public getNombre(): string {
      return this.nombre;
    }
  
    public getRutas(): string[] {
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
  
    // Métodos para actualizar los atributos de la clase
    public setNombre(nombre: string): void {
      this.nombre = nombre;
    }
  
    public setRutas(rutas: string[]): void {
      this.rutas = rutas;
    }
  
    public setTipoActividad(tipoActividad: string): void {
      this.tipoActividad = tipoActividad;
    }
  
    public setKmTotales(kmTotales: number): void {
      this.kmTotales = kmTotales;
    }
  
    public setUsuarios(usuarios: number[]): void {
      this.usuarios = usuarios;
    }
  }
  