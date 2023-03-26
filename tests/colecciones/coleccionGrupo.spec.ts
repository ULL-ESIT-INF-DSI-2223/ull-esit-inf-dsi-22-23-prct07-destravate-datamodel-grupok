import 'mocha';
import { expect } from 'chai';
import { ColeccionGrupo } from '../../src/colecciones/coleccionGrupo';
import { Grupo } from '../../src/modelos/grupo';
import { EstadisticasEntrenamiento } from '../../src/interfaces/estadisticasEntrenamiento';

describe('ColeccionGrupo', () => {
  
  // Creamos una coleccion de grupos
  let coleccionGrupo: ColeccionGrupo;

  const estadisticasEntrenamiento: EstadisticasEntrenamiento = {
    semana: { km: 20, desnivel: 100 },
    mes: { km: 50, desnivel: 500 },
    anio: { km: 200, desnivel: 2000 },
  };
  // Creamos un map con los grupos 
  let grupos: Map<number, Grupo>;
  // Creamos grupos
  const grupo1 = new Grupo('Grupo 1', 1);
  const grupo2 = new Grupo('Grupo 2', 2);
  const grupo3 = new Grupo('Grupo 3', 3);

  beforeEach(() => {
    // Insertamos los grupos en el map
    grupos = new Map();
    grupos.set(grupo1.getID(), grupo1);
    grupos.set(grupo2.getID(), grupo2);
    grupos.set(grupo3.getID(), grupo3);
    coleccionGrupo = new ColeccionGrupo();
    // Metemos los grupos en la coleccion
    coleccionGrupo.setGrupos(grupos);
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

  // it('should return an iterator', () => {
  //   expect(coleccionGrupo[Symbol.iterator]()).to.be.an('iterator');
  // });

  it('should iterate over the collection', () => {
    const iterator = coleccionGrupo[Symbol.iterator]();
    expect(iterator.next().value).to.equal(grupo1);
    expect(iterator.next().value).to.equal(grupo2);
    expect(iterator.next().value).to.equal(grupo3);
    expect(iterator.next().done).to.be.true;
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
    // Borramos el grupo 1
    coleccionGrupo.eliminar(grupo1);
    // Comprobamos que el grupo 1 no esta en la coleccion
    expect(coleccionGrupo.getGrupos().has(grupo1.getID())).to.be.false;
  });

  it ('should modify the name of a group', () => {
    // Modificamos el nombre del grupo 2
    coleccionGrupo.modificarNombre(grupo2, 'Nuevo nombre');
    // Comprobamos que el nombre del grupo 2 es el nuevo
    expect(grupo2.getNombre()).to.equal('Nuevo nombre');
  });

  it ('should modify the creator of a group', () => {
    // Modificamos el creador del grupo 3
    coleccionGrupo.modificarCreador(grupo3, 2);
    // Comprobamos que el creador del grupo 3 es el nuevo
    expect(grupo3.getCreador()).to.equal(2);
  });

  it ('should add a favorite route to a group', () => {
    // Añadimos una ruta favorita al grupo 1
    coleccionGrupo.addRutaFavorita(grupo1, 1);
    // Comprobamos que la ruta favorita del grupo 1 es la nueva
    expect(grupo1.getRutasFavoritas().includes(1)).to.be.true;
  });
  

  it ('should erase a favorite route from a group', () => {
    // Borramos una ruta favorita del grupo 1
    coleccionGrupo.eraseRutaFavorita(grupo1, 1);
    // Comprobamos que la ruta favorita del grupo 1 no es la nueva
    expect(grupo1.getRutasFavoritas().includes(1)).to.be.false;
  });

  it ('should add a participant to a group', () => {
    // Añadimos un participante al grupo 1
    coleccionGrupo.addParticipante(grupo1, 1);
    // Comprobamos que el participante del grupo 1 es el nuevo
    expect(grupo1.getParticipantes().includes(1)).to.be.true;
  });

  it ('should erase a participant from a group', () => {
    // Borramos un participante del grupo 1
    coleccionGrupo.eraseParticipante(grupo1, 1);
    // Comprobamos que el participante del grupo 1 no es el nuevo
    expect(grupo1.getParticipantes().includes(1)).to.be.false;
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
    // Creamos un nuevo grupo
    const grupo4 = new Grupo('Grupo 4', 4);
    // Insertamos el grupo en la coleccion
    coleccionGrupo.insertar(grupo4);
    // Comprobamos que el grupo esta en la coleccion
    expect(coleccionGrupo.getGrupos().has(grupo4.getID())).to.be.true;
  });

  it ('should not insert a group with the same ID', () => {
    // Creamos un grupo con el mismo ID que un grupo de dentro de la colección
    const grupo4 = new Grupo('Grupo 4', 1);
    grupo4.setID(2);
    // Intentamos insertar el grupo en la coleccion
    expect(() => coleccionGrupo.insertar(grupo4)).to.throw('Existe un grupo con el mismo ID.');
  });

  it ('should not insert a group with the same name', () => {
    // Creamos un grupo con el mismo nombre que un grupo de dentro de la colección
    const grupo4 = new Grupo('Grupo 1', 4);
    // Intentamos insertar el grupo en la coleccion
    expect(() => coleccionGrupo.insertar(grupo4)).to.throw('El grupo con nombre Grupo 1 ya existe');
  });

  it ('should throw an error if the group does not exist', () => {
    // Creamos un grupo
    const grupo4 = new Grupo('Grupo 4', 4);
    // Intentamos eliminar el grupo
    expect(() => coleccionGrupo.eliminar(grupo4)).to.throw('El grupo que deseas eliminar no existe.');
  });

  // public addRutaRealizada( grupo: Grupo, ruta: { ruta: number; fecha: string; }) {
  //   this.grupos.get(grupo.getID())!.addRutaRealizada(ruta);
  // }
  it ('should add a route to a group', () => {
    // Creamos una ruta
    const ruta = { ruta: 1, fecha: '2020-01-01' };
    // Añadimos la ruta al grupo 1
    coleccionGrupo.addRutaRealizada(grupo1, ruta);
    // Comprobamos que la ruta esta en el grupo 1
    expect(grupo1.getHistoricoRutas().includes(ruta)).to.be.true;
  });
});