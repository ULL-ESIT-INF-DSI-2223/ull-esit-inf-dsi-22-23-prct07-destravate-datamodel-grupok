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
  
  it ("should set the users from an array", () => {
    const usuariosArray: Usuario[] = [];
    usuariosArray.push(usuario1);
    usuariosArray.push(usuario2);
    usuariosArray.push(usuario3);

    let coleccionUsuario2: ColeccionUsuario;
    // creamos un nuevo map
    const usuariosMap: Map<number, Usuario> = new Map();
    usuariosMap.set(usuario1.getID(), usuario1);
    usuariosMap.set(usuario2.getID(), usuario2);
    usuariosMap.set(usuario3.getID(), usuario3);
    // Creamos una nueva colección
    coleccionUsuario2 = new ColeccionUsuario();
    // Asignamos el map
    coleccionUsuario2.setUsuarios(usuariosMap);
    coleccionUsuario2.setUsuariosFromArray(usuariosArray);
    expect(coleccionUsuario.getUsuarios()).to.be.eql(coleccionUsuario2.getUsuarios());
  });

  it ("should get the users", () => {
    expect(coleccionUsuario.getUsuarios()).to.be.instanceOf(Map);
  });

  it ("should list the users", () => {
    coleccionUsuario.listar();
    expect(coleccionUsuario.listar()).to.be.undefined;
  });

  it ("should insert a user", () => {
    const usuario4 = new Usuario("usuario4", "1Pr*", Actividad.ciclismo);
    coleccionUsuario.insertar(usuario4);
    expect(coleccionUsuario.getUsuarios().has(usuario4.getID())).to.be.true;
  });

  it ("should delete a user", () => {
    coleccionUsuario.eliminar(usuario1);
    expect(coleccionUsuario.getUsuarios().has(usuario1.getID())).to.be.false;
  });

  it ("should modify the name of a user", () => {
    const usuario4 = new Usuario("usuario4", "1Pr*", Actividad.ciclismo);
    coleccionUsuario.insertar(usuario4);
    coleccionUsuario.modificarNombre(usuario4, "usuario5");
    expect(coleccionUsuario.getUsuarios().get(usuario4.getID())!.getNombre()).to.be.equal("usuario5");
  });

  it ("should modify the password of a user", () => {
    const usuario4 = new Usuario("usuario4", "1Pr*", Actividad.ciclismo);
    coleccionUsuario.insertar(usuario4);
    coleccionUsuario.modificarContraseña(usuario4, "2Pr*");
    expect(coleccionUsuario.getUsuarios().get(usuario4.getID())!.getContraseña()).to.be.equal("2Pr*");
  });

  it ("should modify the activity of a user", () => {
    const usuario4 = new Usuario("usuario4", "1Pr*", Actividad.ciclismo);
    coleccionUsuario.insertar(usuario4);
    coleccionUsuario.modificarActividad(usuario4, Actividad.running);
    expect(coleccionUsuario.getUsuarios().get(usuario4.getID())!.getActividades()).to.be.equal(Actividad.running);
  });

  it ("should add a friend to a user", () => {
    const usuario4 = new Usuario("usuario4", "1Pr*", Actividad.ciclismo);
    coleccionUsuario.insertar(usuario4);
    coleccionUsuario.addAmigo(usuario4, 1);
    expect(coleccionUsuario.getUsuarios().get(usuario4.getID())!.getAmigosApp()).to.be.eql([1]);
  });

  it ("should erase a friend from a user", () => {
    const usuario4 = new Usuario("usuario4", "1Pr*", Actividad.ciclismo);
    coleccionUsuario.insertar(usuario4);
    coleccionUsuario.addAmigo(usuario4, 1);
    coleccionUsuario.eraseAmigo(usuario4, 1);
    expect(coleccionUsuario.getUsuarios().get(usuario4.getID())!.getAmigosApp()).to.be.eql([]);
  });

  it ("should add a favorite route to a user", () => {
    const usuario4 = new Usuario("usuario4", "1Pr*", Actividad.ciclismo);
    coleccionUsuario.insertar(usuario4);
    coleccionUsuario.addRutaFavorita(usuario4, 1);
    expect(coleccionUsuario.getUsuarios().get(usuario4.getID())!.getRutasFavoritas()).to.be.eql([1]);
  });

  it ("should erase a favorite route from a user", () => {
    const usuario4 = new Usuario("usuario4", "1Pr*", Actividad.ciclismo);
    coleccionUsuario.insertar(usuario4);
    coleccionUsuario.addRutaFavorita(usuario4, 1);
    coleccionUsuario.eraseRutaFavorita(usuario4, 1);
    expect(coleccionUsuario.getUsuarios().get(usuario4.getID())!.getRutasFavoritas()).to.be.eql([]);
  });
  
  it ("should add a route to the user's routes", () => {
    const usuario4 = new Usuario("usuario4", "1Pr*", Actividad.ciclismo);
    coleccionUsuario.insertar(usuario4);
    coleccionUsuario.addRutaRealizada(usuario4, {ruta: 1, fecha: "2020-12-12"});
    expect(coleccionUsuario.getUsuarios().get(usuario4.getID())!.getHistoricoRutas()).to.be.eql([{ruta: 1, fecha: "2020-12-12"}]);
  });

  it ("should add a challenge to the user's challenges", () => {
    const usuario4 = new Usuario("usuario4", "1Pr*", Actividad.ciclismo);
    coleccionUsuario.insertar(usuario4);
    coleccionUsuario.addRetosActivos(usuario4, 1);
    expect(coleccionUsuario.getUsuarios().get(usuario4.getID())!.getRetosActivos()).to.be.eql([1]);
  });

  it ("should erase a challenge from the user's challenges", () => {
    const usuario4 = new Usuario("usuario4", "1Pr*", Actividad.ciclismo);
    coleccionUsuario.insertar(usuario4);
    coleccionUsuario.addRetosActivos(usuario4, 1);
    coleccionUsuario.eraseRetosActivos(usuario4, 1);
    expect(coleccionUsuario.getUsuarios().get(usuario4.getID())!.getRetosActivos()).to.be.eql([]);
  });

  it ("should get a user", () => {
    expect(coleccionUsuario.getUsuario(1)).to.be.instanceOf(Usuario);
  });
  
  it ('should throw an error when inserting a user with an existing name', () => {
    const usuario4 = new Usuario("usuario4", "1Pr*", Actividad.ciclismo);
    coleccionUsuario.insertar(usuario4);
    const usuario5 = new Usuario("usuario4", "2Pr*", Actividad.ciclismo);
    expect(() => coleccionUsuario.insertar(usuario5)).to.throw('El usuario con nombre ' + usuario5.getNombre() + ' ya existe');
  });

  it ('should throw an error when inserting a user with an existing id', () => {
    const usuario4 = new Usuario("usuario4", "1Pr*", Actividad.ciclismo);
    coleccionUsuario.insertar(usuario4);
    expect(() => coleccionUsuario.insertar(usuario4)).to.throw('El usuario con id ' + usuario4.getID() + ' ya existe');
  });

  it ('should throw an error when deleting a user that does not exist', () => {
    const usuario4 = new Usuario("usuario4", "1Pr*", Actividad.ciclismo);
    expect(() => coleccionUsuario.eliminar(usuario4)).to.throw('El usuario que deseas eliminar no existe.');
  });

  it ('should throw an error when modifying the name of a user with an existing name', () => {
    const usuario4 = new Usuario("usuario4", "1Pr*", Actividad.ciclismo);
    coleccionUsuario.insertar(usuario4);
    const usuario5 = new Usuario("usuario5", "2Pr*", Actividad.ciclismo);
    coleccionUsuario.insertar(usuario5);
    expect(() => coleccionUsuario.modificarNombre(usuario4, "usuario5")).to.throw('El usuario con nombre ' + "usuario5" + ' ya existe');
  });
});