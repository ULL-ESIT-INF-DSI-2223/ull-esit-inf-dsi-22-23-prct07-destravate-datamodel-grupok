/**
 * Interfaz que permite implementar los métodos eliminar, insertar y  listar
 */
export interface Coleccion<T> {
  insertar(elemento: T): void;
  eliminar(elemento: T): void;
  listar(): void;
}