/// poner en una interfaz el buscar, eliminar, insertar, listar, etc los métodos triviales vamos
export interface Coleccion<T> {
  insertar(elemento: T): void;
  eliminar(elemento: T): void;
  listar(): void;
}