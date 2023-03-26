import "mocha";
import { expect } from "chai";
import { Grupo } from "../../src/modelos/grupo";
import { EstadisticasEntrenamiento } from "../../src/interfaces/estadisticasEntrenamiento";

describe("Grupo", () => {
  let grupo: Grupo;
  const estadisticasEntrenamiento: EstadisticasEntrenamiento = {
    semana: { km: 20, desnivel: 100 },
    mes: { km: 50, desnivel: 500 },
    anio: { km: 200, desnivel: 2000 },
  };

  beforeEach(() => {
    grupo = new Grupo("Grupo de corredores", 1);
  });

  it("should create a new group with given name and creator", () => {
    expect(grupo.getID()).to.be.eql(8);
    expect(grupo.getNombre()).to.be.eql("Grupo de corredores");
    expect(grupo.getCreador()).to.be.eql(1);
  });

  it("should throw an error if the group name is empty", () => {
    expect(() => new Grupo("", 1)).to.throw("Nombre de grupo vacío");
  });

  it("should set the group name", () => {
    grupo.setNombre("Nuevo nombre de grupo");
    expect(grupo.getNombre()).to.be.eql("Nuevo nombre de grupo");
  });

  it("should set the group creator", () => {
    grupo.setCreador(2);
    expect(grupo.getCreador()).to.be.eql(2);
  });

  it("should add participants to the group", () => {
    grupo.getParticipantes().push(2);
    expect(grupo.getParticipantes()).to.be.eql([2]);
  });

  it("should set the training statistics for the group", () => {
    grupo.estadisticasEntrenamiento = estadisticasEntrenamiento;
    expect(grupo.getEstadisticasEntrenamiento()).to.be.eql(
      estadisticasEntrenamiento
    );
  });

  it("should add a new route to the favorite routes list", () => {
    grupo.getRutasFavoritas().push(1);
    expect(grupo.getRutasFavoritas()).to.be.eql([1]);
  });

  it("should add a new route to the historical routes list", () => {
    const fecha = new Date();
    grupo
      .getHistoricoRutas()
      .push({ ruta: 1, fecha: fecha.toLocaleDateString() });
    expect(grupo.getHistoricoRutas()).to.be.eql([
      { ruta: 1, fecha: fecha.toLocaleDateString() },
    ]);
  });

  it("should update the group classification", () => {
    grupo.clasificacion = [
      { id: 1, km: 100, desnivel: 1000 },
      { id: 2, km: 50, desnivel: 500 },
    ];
    expect(grupo.getClasificacion()).to.be.eql([
      { id: 1, km: 100, desnivel: 1000 },
      { id: 2, km: 50, desnivel: 500 },
    ]);
  });

  it("should set the group id", () => {
    grupo.setID(2);
    expect(grupo.getID()).to.be.eql(2);
  });

  it("should set the group participants", () => {
    grupo.setParticipantes([1, 2, 3]);
    expect(grupo.getParticipantes()).to.be.eql([1, 2, 3]);
  });

  it("should set the group favorite routes", () => {
    grupo.setRutasFavoritas([1, 2, 3]);
    expect(grupo.getRutasFavoritas()).to.be.eql([1, 2, 3]);
  });

  it("should set the group historical routes", () => {
    const fecha = new Date();
    grupo.setHistoricoRutas([{ ruta: 1, fecha: fecha.toLocaleDateString() }]);
    expect(grupo.getHistoricoRutas()).to.be.eql([
      { ruta: 1, fecha: fecha.toLocaleDateString() },
    ]);
  });

  it("should add a new route to the favorite routes list", () => {
    grupo.addRutaFavorita(1);
    expect(grupo.getRutasFavoritas()).to.be.eql([1]);
  });

  it("should erase a route from the favorite routes list", () => {
    grupo.setRutasFavoritas([1, 2, 3]);
    grupo.eraseRutaFavorita(2);
    expect(grupo.getRutasFavoritas()).to.be.eql([1, 3]);
  });

  it("should add a new participant to the group", () => {
    grupo.addParticipante(2);
    expect(grupo.getParticipantes()).to.be.eql([2]);
  });

  it("should erase a participant from the group", () => {
    grupo.setParticipantes([1, 2, 3]);
    grupo.eraseParticipante(2);
    expect(grupo.getParticipantes()).to.be.eql([1, 3]);
  });

  it("Should update the group training statistics", () => {
    grupo.setEstadisticasEntrenamiento(estadisticasEntrenamiento);
    expect(grupo.getEstadisticasEntrenamiento()).to.be.eql(
      estadisticasEntrenamiento
    );
  });

  it("should update the group classification", () => {
    grupo.setClasificacion([
      { id: 1, km: 100, desnivel: 1000 },
      { id: 2, km: 50, desnivel: 500 },
    ]);
    expect(grupo.getClasificacion()).to.be.eql([
      { id: 1, km: 100, desnivel: 1000 },
      { id: 2, km: 50, desnivel: 500 },
    ]);
  });

  it("should add a new route to the historical routes list", () => {
    const fecha = new Date();
    grupo.addRutaRealizada({ ruta: 1, fecha: fecha.toLocaleDateString() });
    expect(grupo.getHistoricoRutas()).to.be.eql([
      { ruta: 1, fecha: fecha.toLocaleDateString() },
    ]);
  });
});
