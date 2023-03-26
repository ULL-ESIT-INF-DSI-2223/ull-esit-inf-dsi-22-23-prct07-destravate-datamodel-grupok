import "mocha";
import { expect } from "chai";

import { Reto } from "../../src/modelos/reto";
import { Actividad } from "../../src/enums/actividadEnum";

describe("Reto", () => {
  it("should create a new Reto", () => {
    const nombre = "Reto de prueba";
    const tipoActividad = Actividad.ciclismo;
    const reto = new Reto(nombre, tipoActividad);

    expect(reto).to.be.an.instanceOf(Reto);
    expect(reto.getNombre()).to.equal(nombre);
    expect(reto.getTipoActividad()).to.equal(tipoActividad);
    expect(reto.getKmTotales()).to.equal(0);
  });

  it("should update a Reto", () => {
    const reto = new Reto("Reto de prueba", Actividad.ciclismo);
    const newNombre = "Nuevo reto";
    const newTipoActividad = Actividad.ciclismo;

    reto.setNombre(newNombre);
    reto.setTipoActividad(newTipoActividad);

    expect(reto.getNombre()).to.equal(newNombre);
    expect(reto.getTipoActividad()).to.equal(newTipoActividad);
    expect(reto.getKmTotales()).to.equal(0);
  });

  it("should get the ID of a Reto", () => {
    const reto = new Reto("Reto de prueba", Actividad.ciclismo);
    expect(reto.getID()).to.equal(13);
  });

  it("should get the name of a Reto", () => {
    const nombre = "Reto de prueba";
    const reto = new Reto(nombre, Actividad.ciclismo);
    expect(reto.getNombre()).to.equal(nombre);
  });

  it("should get the routes of a Reto", () => {
    const reto = new Reto("Reto de prueba", Actividad.ciclismo);
    expect(reto.getRutas()).to.be.an("array");
    expect(reto.getRutas()).to.be.empty;
  });

  it("should get the type of activity of a Reto", () => {
    const tipoActividad = Actividad.ciclismo;
    const reto = new Reto("Reto de prueba", tipoActividad);
    expect(reto.getTipoActividad()).to.equal(tipoActividad);
  });

  it("should get the total kilometers of a Reto", () => {
    const reto = new Reto("Reto de prueba", Actividad.ciclismo);
    expect(reto.getKmTotales()).to.equal(0);
  });

  it("should get the users of a Reto", () => {
    const reto = new Reto("Reto de prueba", Actividad.ciclismo);
    expect(reto.getUsuarios()).to.be.an("array");
    expect(reto.getUsuarios()).to.be.empty;
  });

  it("should set the ID of a Reto", () => {
    const reto = new Reto("Reto de prueba", Actividad.ciclismo);
    const newID = 1;
    reto.setID(newID);
    expect(reto.getID()).to.equal(newID);
  });

  it("should set the name of a Reto", () => {
    const reto = new Reto("Reto de prueba", Actividad.ciclismo);
    const newNombre = "Nuevo reto";
    reto.setNombre(newNombre);
    expect(reto.getNombre()).to.equal(newNombre);
  });

  it("should set the routes of a Reto", () => {
    const reto = new Reto("Reto de prueba", Actividad.ciclismo);
    const newRutas = [1, 2, 3];
    reto.setRutas(newRutas);
    expect(reto.getRutas()).to.equal(newRutas);
  });

  it("should set the type of activity of a Reto", () => {
    const reto = new Reto("Reto de prueba", Actividad.ciclismo);
    const newTipoActividad = Actividad.ciclismo;
    reto.setTipoActividad(newTipoActividad);
    expect(reto.getTipoActividad()).to.equal(newTipoActividad);
  });

  it("should set the total kilometers of a Reto", () => {
    const reto = new Reto("Reto de prueba", Actividad.ciclismo);
    const newKmTotales = 100;
    reto.setKmTotales(newKmTotales);
    expect(reto.getKmTotales()).to.equal(newKmTotales);
  });

  it("should set the users of a Reto", () => {
    const reto = new Reto("Reto de prueba", Actividad.ciclismo);
    const newUsuarios = [1, 2, 3];
    reto.setUsuarios(newUsuarios);
    expect(reto.getUsuarios()).to.equal(newUsuarios);
  });

  it("should add a user to a Reto", () => {
    const reto = new Reto("Reto de prueba", Actividad.ciclismo);
    const newUsuario = 1;
    reto.addUsuario(newUsuario);
    expect(reto.getUsuarios()).to.include(newUsuario);
  });

  it("should remove a user from a Reto", () => {
    const reto = new Reto("Reto de prueba", Actividad.ciclismo);
    const newUsuario = 1;
    reto.addUsuario(newUsuario);
    expect(reto.getUsuarios()).to.include(newUsuario);
    reto.removeUsuario(newUsuario);
    expect(reto.getUsuarios()).to.not.include(newUsuario);
  });

  it("should add a route to a Reto", () => {
    const reto = new Reto("Reto de prueba", Actividad.ciclismo);
    const newRuta = 1;
    reto.addRuta(newRuta);
    expect(reto.getRutas()).to.include(newRuta);
  });

  it("should remove a route from a Reto", () => {
    const reto = new Reto("Reto de prueba", Actividad.ciclismo);
    const newRuta = 1;
    reto.addRuta(newRuta);
    expect(reto.getRutas()).to.include(newRuta);
    reto.removeRuta(newRuta);
    expect(reto.getRutas()).to.not.include(newRuta);
  });
});
