import 'mocha';
import { expect } from 'chai';

import { ColeccionReto } from '../../src/colecciones/coleccionReto';
import { Reto } from '../../src/modelos/reto';

describe('ColeccionReto', () => {
  let coleccionReto: ColeccionReto;
  let retos: Map<number, Reto>;

  beforeEach(() => {
    coleccionReto = new ColeccionReto();
    retos = new Map();
  });

  it('should create a new collection of challenges', () => {
    expect(coleccionReto).to.be.instanceOf(ColeccionReto);
  });

  it ('should set the challenges', () => {
    coleccionReto.setRetos(retos);
    expect(coleccionReto.getRetos()).to.be.instanceOf(Map);
  });

  it ('should set the challenges from an array', () => {
    const retosArray: Reto[] = [];
    coleccionReto.setRetosFromArray(retosArray);
    expect(coleccionReto.getRetos()).to.be.instanceOf(Map);
  });

  it ('should list the challenges', () => {
    coleccionReto.setRetosFromArray([]);
    expect(coleccionReto.listar()).to.be.undefined;
  });
});
