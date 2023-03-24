import inquirer from 'inquirer';
import { Usuario } from './usuario';

export class Gestor {
  public usuarios: string[];

  constructor(usuarios: string[]) {
    this.usuarios = usuarios;
  }

  public getUsuarios(): string[] {
    return this.usuarios;
  }

  public registrarUsuario(): void {
    console.clear();
    console.log('Registrando usuario...');
    inquirer.prompt({
      type: 'input',
      name: 'nombre',
      message: 'Introduce tu nombre de usuario: ',
    }).then((respuesta) => {
      this.usuarios.push(respuesta.nombre);
      console.log('Usuario registrado con éxito');
      this.volverConsola();
    });
  }
  
  public listarUsuarios(): void {
    console.clear();
    console.log('Listando usuarios...');
    console.log(this.usuarios);
    this.volverConsola();
  }
  
  private volverConsola(): void {
    inquirer.prompt({
      type: 'list',
      name: 'volver',
      message: 'Presiona enter para volver a atrás en la consola',
      choices: ['Volver a la consola'],
    }).then((respuesta) => {
      this.consola();
    });
  }
  
  
  public consola(): void {
    console.clear();
    console.log('Bienvenido a la consola de gestión');
    inquirer.prompt({
      type: 'list',
      name: 'opcion',
      message: 'Elige una opción: ',
      choices: [
        'Registrar usuario',
        'Listar usuarios',
        'Salir',
      ],
    }).then((respuesta) => {
      switch (respuesta.opcion) {
        case 'Registrar usuario':
          this.registrarUsuario();
          break;
        case 'Listar usuarios':
          this.listarUsuarios();
          break;
        case 'Salir':
          console.log('Hasta pronto');
          break;
        default:
          break;
      }
    });
  }
}

const usuarios: string[] = ['Pepe', 'Juan', 'Luis'];
const gestor = new Gestor(usuarios);
gestor.consola();