import "mocha";
import { expect } from "chai";

import { ColeccionUsuario } from "../../src/colecciones/coleccionUsuario";
import { Usuario } from "../../src/modelos/usuario";
import { Actividad } from "../../src/enums/actividadEnum";

describe("ColeccionUsuario", () => {
  let coleccionUsuario: ColeccionUsuario;
  // Creamos el map
  let usuarios: Map<number, Usuario>;
  // Creamos Usuarios
  const usuario1 = new Usuario("usuario1", "1Pr*", Actividad.ciclismo);
  const usuario2 = new Usuario("usuario2", "1Pr*", Actividad.ciclismo);
  const usuario3 = new Usuario("usuario3", "1Pr*", Actividad.ciclismo);

  // Metemos en el map los usuarios

  beforeEach(() => {
    usuarios = new Map();
    usuarios.set(usuario1.getID(), usuario1);
    usuarios.set(usuario2.getID(), usuario2);
    usuarios.set(usuario3.getID(), usuario3);
    
    coleccionUsuario = new ColeccionUsuario();
    coleccionUsuario.setUsuarios(usuarios);
  });

  it("should create a new collection of users", () => {
    expect(coleccionUsuario).to.be.instanceOf(ColeccionUsuario);
  });

  it("should set the users", () => {
    coleccionUsuario.setUsuarios(new Map());
    expect(coleccionUsuario.getUsuarios()).to.be.instanceOf(Map);
  });

  it ("should set the users from an array", () => {
    const usuariosArray: Usuario[] = [];
    usuariosArray.push(usuario1);
    usuariosArray.push(usuario2);
    usuariosArray.push(usuario3);

    coleccionUsuario.setUsuariosFromArray(usuariosArray);
    expect(coleccionUsuario.getUsuarios()).to.be.instanceOf(Map);
  });

  it("should list the users", () => {
    coleccionUsuario.setUsuariosFromArray([]);
    expect(coleccionUsuario.listar()).to.be.undefined;
  });

  // it("should return an iterator", () => {
  //   expect(coleccionReto.getIterator()).to.be.instanceOf(Map);
  // });

  it ("should get the user map", () => {
    expect(coleccionUsuario.getUsuarios()).to.be.instanceOf(Map);
  });

});