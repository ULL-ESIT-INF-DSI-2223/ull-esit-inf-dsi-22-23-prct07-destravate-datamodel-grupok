import 'mocha';
import { expect } from 'chai';

import { ColeccionReto } from '../../src/colecciones/coleccionReto';
import { Reto } from '../../src/modelos/reto';
import { Actividad } from '../../src/enums/actividadEnum';

describe('ColeccionReto', () => {
  let coleccionReto: ColeccionReto;
  // Creamos el map
  let retos: Map<number, Reto>;
  // Creamos Retos
  const reto1 = new Reto('Reto 1', Actividad.ciclismo);
  const reto2 = new Reto('Reto 2', Actividad.ciclismo);
  const reto3 = new Reto('Reto 3', Actividad.ciclismo);

  // Metemos en el map los retos

  beforeEach(() => {
    retos = new Map();
    retos.set(reto1.getID(), reto1);
    retos.set(reto2.getID(), reto2);
    retos.set(reto3.getID(), reto3);
    
    coleccionReto = new ColeccionReto();
    coleccionReto.setRetos(retos);
  });

  it('should create a new collection of challenges', () => {
    expect(coleccionReto).to.be.instanceOf(ColeccionReto);
  });

  it('should set the challenges', () => {
    coleccionReto.setRetos(new Map());
    expect(coleccionReto.getRetos()).to.be.instanceOf(Map);
  });

  it ('should set the challenges from an array', () => {
    const retosArray: Reto[] = [];
    retosArray.push(reto1);
    retosArray.push(reto2);
    retosArray.push(reto3);

    coleccionReto.setRetosFromArray(retosArray);
    expect(coleccionReto.getRetos()).to.be.instanceOf(Map);
  });

  it('should list the challenges', () => {
    coleccionReto.setRetosFromArray([]);
    expect(coleccionReto.listar()).to.be.undefined;
  });

  // it('should return an iterator', () => {
  //   expect(coleccionReto.getIterator()).to.be.instanceOf(Map);
  // });

  it ('should get the challenge map', () => {
    expect(coleccionReto.getRetos()).to.be.instanceOf(Map);
  });

  it ('should get a challenge by its id', () => {
    expect(coleccionReto.getReto(reto1.getID())).to.be.eql(reto1);
  });

  // /**
  //  * Método que permite lista los retos
  //  */
  // public listar(): void {
  //   console.clear();
  //   console.log('Listando retos...');
  //   for (const reto of this.retos.values()) {
  //     console.log(reto);
  //   }
  // }
  it ('should list the challenges', () => {
    expect(coleccionReto.listar()).to.be.undefined;
  });

  it ('should insert a challenge', () => {
    // Creamos un reto
    const nuevoReto = new Reto('Reto 4', Actividad.ciclismo);
    coleccionReto.insertar(nuevoReto);
    expect(coleccionReto.getReto(nuevoReto.getID())).to.be.eql(nuevoReto);
  });

  it ('should delete a challenge', () => {
    coleccionReto.eliminar(reto1);
    expect(coleccionReto.getRetos().has(reto1.getID())).to.be.false;
  });

  it ('should modify the name of a challenge', () => {
    const nuevoNombre = 'patata';
    console.log ('---------------------------------------------');
    console.log ('---------------------------------------------');
    console.log ('---------------------------------------------');
    console.log ('---------------------------------------------');
    console.log(coleccionReto);
    
    coleccionReto.modificarNombre(reto1, nuevoNombre);
    expect(coleccionReto.getReto(reto1.getID()).getNombre()).to.be.eql(nuevoNombre);
  });

  it ('should add a route to a challenge', () => {
    const ruta = 1;
    coleccionReto.addRuta(reto1, ruta);
    expect(coleccionReto.getReto(reto1.getID()).getRutas()).to.be.eql([ruta]);
  });

  it ('should delete a route from a challenge', () => {
    const ruta = 1;
    coleccionReto.addRuta(reto1, ruta);
    coleccionReto.eraseRuta(reto1, ruta);
    expect(coleccionReto.getReto(reto1.getID()).getRutas()).to.be.eql([]);
  });

  it ('should modify the activity type of a challenge', () => {
    const nuevaActividad = Actividad.running;
    coleccionReto.modificarActividad(reto1, nuevaActividad);
    expect(coleccionReto.getReto(reto1.getID()).getTipoActividad()).to.be.eql(nuevaActividad);
  });

  it ('should add a user to a challenge', () => {
    const usuario = 1;
    coleccionReto.addUsuario(reto1, usuario);
    expect(coleccionReto.getReto(reto1.getID()).getUsuarios()).to.be.eql([usuario]);
  });

  it ('should delete a user from a challenge', () => {
    const usuario = 1;
    coleccionReto.addUsuario(reto1, usuario);
    coleccionReto.eraseUsuario(reto1, usuario);
    expect(coleccionReto.getReto(reto1.getID()).getUsuarios()).to.be.eql([]);
  });
});
