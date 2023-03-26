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
    for (const nombreUsuario of usuario) {
      nombre = nombreUsuario;
    }
    expect(nombre).to.be.equal("o");
  });

  it ("Debería devolver el historico de rutas del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    expect(usuario.getHistoricoRutas()).to.be.deep.equal([]);
  });

  it ("Debería devolver el id del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.setID(10);
    expect(usuario.getID()).to.be.equal(10);
  });
  
  it ("Debería devolver el nombre del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.setNombre("usuario2");
    expect(usuario.getNombre()).to.be.equal("usuario2");
  });

  it ("Debería devolver la contraseña del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.setContraseña("Dsi23*");
    expect(usuario.getContraseña()).to.be.equal("Dsi23*");
  });
  
  it ("Debería devolver la actividad del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.setActividades(Actividad.ciclismo);
    expect(usuario.getActividades()).to.be.equal(Actividad.ciclismo);
  });

  it ("Debería devolver los amigos de la aplicación del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.setAmigosApp([1,2,3]);
    expect(usuario.getAmigosApp()).to.be.deep.equal([1,2,3]);
  });

  it ("Debería devolver los amigos frecuentes del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.setAmigosFrecuentes([1,2,3]);
    expect(usuario.getAmigosFrecuentes()).to.be.deep.equal([1,2,3]);
  });

  it ("Debería devolver las estadísticas del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.setEstadisticas({ semana: { km: 0, desnivel: 0 }, mes: { km: 0, desnivel: 0 }, anio: { km: 0, desnivel: 0 } });
    expect(usuario.getEstadisticas()).to.be.deep.equal({ semana: { km: 0, desnivel: 0 }, mes: { km: 0, desnivel: 0 }, anio: { km: 0, desnivel: 0 } });
  });

  it ("Debería devolver las rutas favoritas del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.setRutasFavoritas([1,2,3]);
    expect(usuario.getRutasFavoritas()).to.be.deep.equal([1,2,3]);
  });

  it ("Debería devolver los retos activos del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.setRetosActivos([1,2,3]);
    expect(usuario.getRetosActivos()).to.be.deep.equal([1,2,3]);
  });

  it ("Debería devolver el historico de rutas del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.setHistoricoRutas([{ ruta: 1, fecha: "2021-01-01" }, { ruta: 2, fecha: "2021-01-02" }]);
    expect(usuario.getHistoricoRutas()).to.be.deep.equal([{ ruta: 1, fecha: "2021-01-01" }, { ruta: 2, fecha: "2021-01-02" }]);
  });

  it ("Debería añadir un amigo a la lista de amigos de la aplicación", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.addAmigoApp(1);
    expect(usuario.getAmigosApp()).to.be.deep.equal([1]);
  });

  it ("Debería eliminar un amigo de la lista de amigos de la aplicación", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.addAmigoApp(1);
    usuario.addAmigoApp(2);
    usuario.addAmigoApp(3);
    usuario.eraseAmigoApp(2);
    expect(usuario.getAmigosApp()).to.be.deep.equal([1,3]);
  });

  it ("Debería añadir una ruta a la lista de rutas favoritas", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.addRutaFavorita(1);
    expect(usuario.getRutasFavoritas()).to.be.deep.equal([1]);
  });

  it ("Debería añadir una ruta al historico de rutas", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.addRutaRealizada({ ruta: 1, fecha: "2021-01-01" });
    expect(usuario.getHistoricoRutas()).to.be.deep.equal([{ ruta: 1, fecha: "2021-01-01" }]);
  });

  it ("Debería eliminar una ruta de la lista de rutas favoritas", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.addRutaFavorita(1);
    usuario.addRutaFavorita(2);
    usuario.addRutaFavorita(3);
    usuario.eraseRutaFavorita(2);
    expect(usuario.getRutasFavoritas()).to.be.deep.equal([1,3]);
  });

  it ("Debería añadir un reto a la lista de retos activos", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.addRetosActivos(1);
    expect(usuario.getRetosActivos()).to.be.deep.equal([1]);
  });

  it ("Debería eliminar un reto de la lista de retos activos", () => { 
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.addRetosActivos(1);
    usuario.addRetosActivos(2);
    usuario.addRetosActivos(3);
    usuario.eraseRetosActivos(2);
    expect(usuario.getRetosActivos()).to.be.deep.equal([1,3]);
  });
  it ("Debería devolver true si la contraseña es válida", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    expect(usuario.isValidPassword("Dsi23*")).to.be.equal(true);
  });

  it ("Debería devolver false si la contraseña es inválida", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    expect(usuario.isValidPassword("Dsi23")).to.be.equal(false);
  });

  it ('Debería devolver false si la contraseña es muy corta menos de 4 caracteres)', () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    expect(usuario.isValidPassword("D")).to.be.equal(false);
  });

  it ('Debería devolver false si la contraseña es muy larga (más de 30 caracteres)', () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    expect(usuario.isValidPassword("Dsi23*1234567890123456784234234234234234290")).to.be.equal(false);
  });

  it ('Debería devolver false si la contraseña contiene _ al principio o al final', () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    expect(usuario.isValidPassword("_Dsi23*")).to.be.equal(false);
  });

  it ("Debería devolver los amigos frecuentes del usuario", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.setAmigosFrecuentes([1,2,3]);
    expect(usuario.getAmigosFrecuentes()).to.be.deep.equal([1,2,3]);
  });

  it ("Debería devolver un error si el amigo ya está en la lista de amigos", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.addAmigoApp(1);
    expect(() => usuario.addAmigoApp(1)).to.throw(Error, "El amigo ya está en la lista de amigos");
  });

  it ("Debería actualizar el contador de ids", () => {
    const usuario = new Usuario("usuario", "Dsi23*", Actividad.ciclismo);
    usuario.setID(2);
    expect(usuario.getContadorID()).to.be.equal(37);
  });

});
