import "mocha";
import { expect } from "chai";

import { Ruta } from '../../src/modelos/ruta';
import { Coordenadas } from '../../src/interfaces/coordenadasInterface';
import { Actividad } from '../../src/enums/actividadEnum';
import { Dificultad } from '../../src/enums/dificultadEnum';


describe('Ruta', () => {
  const coordenadasInicio: Coordenadas = { latitud: 0, longitud: 0 };
  const coordenadasFin: Coordenadas = { latitud: 1, longitud: 1 };
  const longitud = 10;
  const desnivel = 100;
  const tipoActividad = Actividad.ciclismo;
  const dificultad = Dificultad.media;

  it('should create a new Ruta', () => {
    const nombre = 'Ruta de prueba';
    const ruta = new Ruta(nombre, coordenadasInicio, coordenadasFin, longitud, desnivel, tipoActividad, dificultad);

    expect(ruta).to.be.an.instanceOf(Ruta);
    expect(ruta.getNombre()).to.equal(nombre);
    expect(ruta.getCoordenadasInicio()).to.deep.equal(coordenadasInicio);
    expect(ruta.getCoordenadasFin()).to.deep.equal(coordenadasFin);
    expect(ruta.getLongitud()).to.equal(longitud);
    expect(ruta.getDesnivel()).to.equal(desnivel);
    expect(ruta.getTipoActividad()).to.equal(tipoActividad);
    expect(ruta.getDificultad()).to.equal(dificultad);
    expect(ruta.getCalificacion()).to.be.within(0, 5);
  });

  it('should update a Ruta', () => {
    const ruta = new Ruta('Ruta de prueba', coordenadasInicio, coordenadasFin, longitud, desnivel, tipoActividad, dificultad);
    const newNombre = 'Nueva ruta';
    const newCoordenadasInicio: Coordenadas = { latitud: 2, longitud: 2 };
    const newCoordenadasFin: Coordenadas = { latitud: 3, longitud: 3 };
    const newLongitud = 20;
    const newDesnivel = 200;
    const newTipoActividad = Actividad.ciclismo;
    const newDificultad = Dificultad.dificil;

    ruta.setNombre(newNombre);
    ruta.setCoordenadasInicio(newCoordenadasInicio);
    ruta.setCoordenadasFin(newCoordenadasFin);
    ruta.setLongitud(newLongitud);
    ruta.setDesnivel(newDesnivel);
    ruta.setTipoActividad(newTipoActividad);
    ruta.setDificultad(newDificultad);

    expect(ruta.getNombre()).to.equal(newNombre);
    expect(ruta.getCoordenadasInicio()).to.deep.equal(newCoordenadasInicio);
    expect(ruta.getCoordenadasFin()).to.deep.equal(newCoordenadasFin);
    expect(ruta.getLongitud()).to.equal(newLongitud);
    expect(ruta.getDesnivel()).to.equal(newDesnivel);
    expect(ruta.getTipoActividad()).to.equal(newTipoActividad);
    expect(ruta.getDificultad()).to.equal(newDificultad);
    expect(ruta.getCalificacion()).to.be.within(0, 5);
  });

  it('should add a new user to the Ruta', () => {
    const ruta = new Ruta('Ruta de prueba', coordenadasInicio, coordenadasFin, longitud, desnivel, tipoActividad, dificultad);
    const usuario = 1;
    ruta.addUsuarioVisitante(usuario);

    expect(ruta.getUsuariosVisitantes()).to.include(usuario);
  });

  it('should remove a user from the Ruta', () => {
    const ruta = new Ruta('Ruta de prueba', coordenadasInicio, coordenadasFin, longitud, desnivel, tipoActividad, dificultad);
    const usuario = 1;
    ruta.addUsuarioVisitante(usuario);
    ruta.removeUsuarioVisitante(usuario);

    expect(ruta.getUsuariosVisitantes()).to.not.include(usuario);
  });

  it ('should update the visitant users of the Ruta', () => {
    const ruta = new Ruta('Ruta de prueba', coordenadasInicio, coordenadasFin, longitud, desnivel, tipoActividad, dificultad);
    const usuarios = [1, 2, 3];
    ruta.setUsuariosVisitantes(usuarios);
    expect(ruta.getUsuariosVisitantes()).to.deep.equal(usuarios);
  });

  it ('Should update the type of activity of the Ruta', () => {
    const ruta = new Ruta('Ruta de prueba', coordenadasInicio, coordenadasFin, longitud, desnivel, tipoActividad, dificultad);
    const newTipoActividad = Actividad.ciclismo;
    ruta.setTipoActividad(newTipoActividad);
    expect(ruta.getTipoActividad()).to.equal(newTipoActividad);
  });

  it ('Should update the difficulty of the Ruta', () => {
    const ruta = new Ruta('Ruta de prueba', coordenadasInicio, coordenadasFin, longitud, desnivel, tipoActividad, dificultad);
    const newDificultad = Dificultad.media;
    ruta.setDificultad(newDificultad);
    expect(ruta.getDificultad()).to.equal(newDificultad);
  });

  it ('Should update the rating of the Ruta', () => {
    const ruta = new Ruta('Ruta de prueba', coordenadasInicio, coordenadasFin, longitud, desnivel, tipoActividad, dificultad);
    const newCalificacion = 3;
    ruta.setCalificacion(newCalificacion);
    expect(ruta.getCalificacion()).to.equal(newCalificacion);
  });

  it ('Should update the rating of the Ruta', () => {
    const ruta = new Ruta('Ruta de prueba', coordenadasInicio, coordenadasFin, longitud, desnivel, tipoActividad, dificultad);
    const newCalificacion = 3;
    ruta.setCalificacion(newCalificacion);
    expect(ruta.getCalificacion()).to.equal(newCalificacion);
  });

  it ('Should remove a visitant user of the Ruta', () => {
    const ruta = new Ruta('Ruta de prueba', coordenadasInicio, coordenadasFin, longitud, desnivel, tipoActividad, dificultad);
    const usuario = 1;
    ruta.addUsuarioVisitante(usuario);
    ruta.removeUsuarioVisitante(usuario);
    expect(ruta.getUsuariosVisitantes()).to.not.include(usuario);
  });

  it ('Should get the id of the Ruta', () => {
    const ruta = new Ruta('Ruta de prueba', coordenadasInicio, coordenadasFin, longitud, desnivel, tipoActividad, dificultad);
    expect(ruta.getID()).to.be.a('number');
  });

  it ('Should set the id of the Ruta', () => {
    const ruta = new Ruta('Ruta de prueba', coordenadasInicio, coordenadasFin, longitud, desnivel, tipoActividad, dificultad);
    const id = 1;
    ruta.setID(id);
    expect(ruta.getID()).to.equal(id);
  });

});

