import 'mocha';
import { expect } from 'chai';
import { ColeccionGrupo } from '../../src/colecciones/coleccionGrupo';
import { EstadisticasEntrenamiento } from '../../src/interfaces/estadisticasEntrenamiento';

describe('ColeccionGrupo', () => {
  let coleccionGrupo: ColeccionGrupo;
  const estadisticasEntrenamiento: EstadisticasEntrenamiento = {
    semana: { km: 20, desnivel: 100 },
    mes: { km: 50, desnivel: 500 },
    anio: { km: 200, desnivel: 2000 },
  };

  beforeEach(() => {
    coleccionGrupo = new ColeccionGrupo();
  });

  it('should create a new collection of groups', () => {
    expect(coleccionGrupo).to.be.instanceOf(ColeccionGrupo);
  });

  it('should set the groups', () => {
    coleccionGrupo.setGrupos(new Map());
    expect(coleccionGrupo.getGrupos()).to.be.instanceOf(Map);
  });

  it('should set the groups from an array', () => {
    coleccionGrupo.setGruposFromArray([]);
    expect(coleccionGrupo.getGrupos()).to.be.instanceOf(Map);
  });

  it('should list the groups', () => {
    coleccionGrupo.setGruposFromArray([]);
    expect(coleccionGrupo.listar()).to.be.undefined;
  });

  it ('should make the collection iterable', () => {
    coleccionGrupo.setGruposFromArray([]);
    expect(coleccionGrupo[Symbol.iterator]()).to.be.instanceOf(Map);
  });

  it ('should set the groups from a map', () => {
    coleccionGrupo.setGrupos(new Map());
    expect(coleccionGrupo.getGrupos()).to.be.instanceOf(Map);
  });

  it ('should set the groups from an array', () => {
    coleccionGrupo.setGruposFromArray([]);
    expect(coleccionGrupo.getGrupos()).to.be.instanceOf(Map);
  });

  it ('should get the groups', () => {
    coleccionGrupo.setGrupos(new Map());
    expect(coleccionGrupo.getGrupos()).to.be.instanceOf(Map);
  });

  it ('should list the groups', () => {
    coleccionGrupo.setGruposFromArray([]);
    expect(coleccionGrupo.listar()).to.be.undefined;
  });

  it ('should delete a group', () => {
    coleccionGrupo.setGruposFromArray([]);
    expect(coleccionGrupo.eliminar({} as any)).to.be.undefined;
  });

  it ('should modify the name of a group', () => {
    coleccionGrupo.setGruposFromArray([]);
    expect(coleccionGrupo.modificarNombre({} as any, 'nombre')).to.be.undefined;
  });

  it ('should modify the creator of a group', () => {
    coleccionGrupo.setGruposFromArray([]);
    expect(coleccionGrupo.modificarCreador({} as any, 1)).to.be.undefined;
  });

  it ('should add a favorite route to a group', () => {
    coleccionGrupo.setGruposFromArray([]);
    expect(coleccionGrupo.addRutaFavorita({} as any, 1)).to.be.undefined;
  });

  it ('should erase a favorite route from a group', () => {
    coleccionGrupo.setGruposFromArray([]);
    expect(coleccionGrupo.eraseRutaFavorita({} as any, 1)).to.be.undefined;
  });

  it ('should add a route to a group', () => {
    coleccionGrupo.setGruposFromArray([]);
    expect(coleccionGrupo.addRutaRealizada({} as any, { ruta: 1, fecha: '2020-01-01' })).to.be.undefined;
  });

  it ('should add a participant to a group', () => {
    coleccionGrupo.setGruposFromArray([]);
    expect(coleccionGrupo.addParticipante({} as any, 1)).to.be.undefined;
  });

  it ('should erase a participant from a group', () => {
    coleccionGrupo.setGruposFromArray([]);
    expect(coleccionGrupo.eraseParticipante({} as any, 1)).to.be.undefined;
  });

  it ('should set the groups from an array', () => {
    coleccionGrupo.setGruposFromArray([]);
    expect(coleccionGrupo.getGrupos()).to.be.instanceOf(Map);
  });

  it ('should list the groups', () => {
    coleccionGrupo.setGruposFromArray([]);
    expect(coleccionGrupo.listar()).to.be.undefined;
  });

  it ('should insert a group', () => {
    coleccionGrupo.setGruposFromArray([]);
    expect(coleccionGrupo.insertar({} as any)).to.be.undefined;
  });
});