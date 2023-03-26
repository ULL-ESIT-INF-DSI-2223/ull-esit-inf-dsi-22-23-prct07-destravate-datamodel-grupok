import "mocha";
import { expect } from "chai";

import { Usuario } from "../../src/modelos/usuario";
import { Actividad } from "../../src/enums/actividadEnum";

describe("Usuario", () => { 
  it("Debería crear un usuario con nombre y contraseña", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    expect(usuario.getNombre()).to.be.equal("usuario");
    expect(usuario.getContraseña()).to.be.equal("Dsi23*");
  });

  it ("Debería lanzar un error si el nombre está vacío", () => {
    expect(() => new Usuario("", "Dsi23*", Actividad.ciclismo)).to.throw("Nombre de usuario vacío");
  });

  it ("Debería lanzar un error si la contraseña no es válida", () => {
    expect(() => new Usuario("usuario", "Dsi23", Actividad.ciclismo)).to.throw("Contraseña no válida");
  });

  it ("Debería devolver el nombre del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    expect(usuario.getNombre()).to.be.equal("usuario");
  });

  it ("Debería devolver la contraseña del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    expect(usuario.getContraseña()).to.be.equal("Dsi23*");
  });

  it ("Debería devolver la actividad del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    expect(usuario.getActividades()).to.be.equal(Actividad.ciclismo);
  });

  it ("Debería devolver el id del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    expect(usuario.getID()).to.be.equal(5);
  });

  it ("Debería devolver los amigos de la aplicación del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    expect(usuario.getAmigosApp()).to.be.deep.equal([]);
  });

  it ("Debería devolver los amigos frecuentes del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    expect(usuario.getAmigosFrecuentes()).to.be.deep.equal([]);
  });

  it ("Debería devolver las estadísticas del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    expect(usuario.getEstadisticas()).to.be.deep.equal({ semana: { km: 0, desnivel: 0 }, mes: { km: 0, desnivel: 0 }, anio: { km: 0, desnivel: 0 } });
  });

  it ("Debería devolver las rutas favoritas del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    expect(usuario.getRutasFavoritas()).to.be.deep.equal([]);
  });

  it ("Debería devolver los retos activos del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    expect(usuario.getRetosActivos()).to.be.deep.equal([]);
  });

  it ("Debería devolver el nombre del usuario al iterar", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    let nombre = '';
    for (let dato of usuario) {
      nombre = dato;
    }
    expect(nombre).to.be.equal("usuario");
  });
});
