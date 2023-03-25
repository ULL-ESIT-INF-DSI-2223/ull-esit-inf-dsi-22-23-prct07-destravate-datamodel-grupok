import { EntidadInterface } from "../interfaces/entidadInterface";
import { Actividad } from "../enums/actividadEnum";

export class Reto implements EntidadInterface {
    id: number;
    nombre: string;
    rutas: number[];
    tipoActividad: Actividad;
    kmTotales: number;
    usuarios: number[];
  
    constructor(id: number, nombre: string, rutas: number[], tipoActividad: Actividad, kmTotales: number) {
      this.id = id;
      this.nombre = nombre;
      this.rutas = rutas;
      this.tipoActividad = tipoActividad;
      this.kmTotales = kmTotales;
      this.usuarios = []
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
  