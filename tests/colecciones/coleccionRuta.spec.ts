import "mocha";
import { expect } from "chai";

import { ColeccionRuta } from '../../src/colecciones/coleccionRuta';
import { Actividad } from '../../src/enums/actividadEnum';
import { Dificultad } from '../../src/enums/dificultadEnum';
import { Ruta } from '../../src/modelos/ruta';

describe('ColeccionRuta', () => {
  let coleccionRuta: ColeccionRuta;
  // Creamos el map
  let rutas: Map<number, Ruta>;
  // Creamos Rutas
  let coordenadas = {latitud: 0, longitud: 0};
  const ruta1 = new Ruta('Ruta 1', coordenadas, coordenadas, 13, 321, Actividad.ciclismo, Dificultad.dificil );
  const ruta2 = new Ruta('Ruta 2', coordenadas, coordenadas, 13, 321, Actividad.ciclismo, Dificultad.dificil);
  const ruta3 = new Ruta('Ruta 3', coordenadas, coordenadas, 13, 321, Actividad.ciclismo, Dificultad.dificil);

  // Metemos en el map las rutas

  beforeEach(() => {
    rutas = new Map();
    rutas.set(ruta1.getID(), ruta1);
    rutas.set(ruta2.getID(), ruta2);
    rutas.set(ruta3.getID(), ruta3);
    
    coleccionRuta = new ColeccionRuta();
    coleccionRuta.setRutas(rutas);
  });

  it('should create a new collection of routes', () => {
    expect(coleccionRuta).to.be.instanceOf(ColeccionRuta);
  });

  it('should set the routes', () => {
    coleccionRuta.setRutas(new Map());
    expect(coleccionRuta.getRutas()).to.be.instanceOf(Map);
  });

  it ('should set the routes from an array', () => {
    const rutasArray: Ruta[] = [];
    rutasArray.push(ruta1);
    rutasArray.push(ruta2);
    rutasArray.push(ruta3);

    coleccionRuta.setRutasFromArray(rutasArray);
    expect(coleccionRuta.getRutas()).to.be.instanceOf(Map);
  });

  it('should list the routes', () => {
    coleccionRuta.setRutasFromArray([]);
    expect(coleccionRuta.listar()).to.be.undefined;
  });

  // it('should return an iterator', () => {
  //   expect(coleccionRuta.getIterator()).to.be.instanceOf(Map);
  // });

//   /**
//    * Setter de las rutas (entrada en formato map)
//    * @param rutas Rutas en formato map
//    */
//   public setRutas( rutas : Map<number, Ruta>): void {
//     this.rutas = rutas;
//   }
  it ('should return a route from its id', () => {
    expect(coleccionRuta.getRuta(ruta1.getID())).to.be.eql(ruta1);
  });

  it ('should insert a route', () => {
    const ruta4 = new Ruta('Ruta 4', coordenadas, coordenadas, 13, 321, Actividad.ciclismo, Dificultad.dificil);
    coleccionRuta.insertar(ruta4);
    expect(coleccionRuta.getRutas().size).to.be.eql(4);
  });

  it ('should delete a route', () => {
    coleccionRuta.eliminar(ruta1);
    expect(coleccionRuta.getRutas().size).to.be.eql(2);
  });
 
  it ('should modify the name of a route', () => {
    coleccionRuta.modificarNombreRuta(ruta1, 'Ruta 1 modificado');
    expect(coleccionRuta.getRuta(ruta1.getID()).getNombre()).to.be.eql('Ruta 1 modificado');
  });

  it ('should modify the coordinates of a route', () => {
    const coordenadas2 = {latitud: 1, longitud: 1};
    coleccionRuta.modificarCoordenadasRuta(ruta1, coordenadas2, coordenadas2);
    expect(coleccionRuta.getRuta(ruta1.getID()).getCoordenadasInicio()).to.be.eql(coordenadas2);
    expect(coleccionRuta.getRuta(ruta1.getID()).getCoordenadasFin()).to.be.eql(coordenadas2);
  });

  it ('should insert a route', () => {
    const ruta4 = new Ruta('Ruta 4', coordenadas, coordenadas, 13, 321, Actividad.ciclismo, Dificultad.dificil);
    coleccionRuta.insertar(ruta4);
    expect(coleccionRuta.getRutas().size).to.be.eql(4);
  })

  it ('should remove a route', () => {
    coleccionRuta.eliminar(ruta1);
    expect(coleccionRuta.getRutas().size).to.be.eql(2);
  });

  it ('should modify the name of a route', () => {
    coleccionRuta.modificarNombreRuta(ruta1, 'Ruta 1 modificado');
    expect(coleccionRuta.getRuta(ruta1.getID()).getNombre()).to.be.eql('Ruta 1 modificado');
  });

  it ('should modify the coordinates of a route', () => {
    const coordenadas2 = {latitud: 1, longitud: 1};
    coleccionRuta.modificarCoordenadasRuta(ruta1, coordenadas2, coordenadas2);
    expect(coleccionRuta.getRuta(ruta1.getID()).getCoordenadasInicio()).to.be.eql(coordenadas2);
    expect(coleccionRuta.getRuta(ruta1.getID()).getCoordenadasFin()).to.be.eql(coordenadas2);
  });

  it ('should modify the length of a route', () => {
    coleccionRuta.modificarLongitudRuta(ruta1, 100);
    expect(coleccionRuta.getRuta(ruta1.getID()).getLongitud()).to.be.eql(100);
  });

  it ('should modify the elevation of a route', () => {
    coleccionRuta.modificarDesnivelRuta(ruta1, 100);
    expect(coleccionRuta.getRuta(ruta1.getID()).getDesnivel()).to.be.eql(100);
  });

  it ('should modify the activity of a route', () => {
    coleccionRuta.modificarTipoActividadRuta(ruta1, Actividad.ciclismo);
    expect(coleccionRuta.getRuta(ruta1.getID()).getTipoActividad()).to.be.eql(Actividad.ciclismo);
  });
  
 it ('should modify the difficulty of a route', () => {
    coleccionRuta.modificarDificultadRuta(ruta1, Dificultad.dificil);
    expect(coleccionRuta.getRuta(ruta1.getID()).getDificultad()).to.be.eql(Dificultad.dificil);
  });

  it ('should return the names of the routes', () => {
    expect(coleccionRuta.getNombreRutas()).to.be.eql(['Ruta 1 modificado', 'Ruta 2', 'Ruta 3']);
  });

  it ('should return the names of the routes', () => {
    expect(coleccionRuta.getNombreRutas()).to.be.eql(['Ruta 1 modificado', 'Ruta 2', 'Ruta 3']);
  });

  it ('should throw an error if the route does not exist', () => {
    const ruta4 = new Ruta('Ruta 4', coordenadas, coordenadas, 13, 321, Actividad.ciclismo, Dificultad.dificil);
    expect(() => coleccionRuta.modificarDificultadRuta(ruta4, Dificultad.dificil)).to.throw('La ruta que deseas modificar no existe.');
  });

  it ('should throw an error if the route does exist', () => {
    const ruta4 = new Ruta('Ruta 4', coordenadas, coordenadas, 13, 321, Actividad.ciclismo, Dificultad.dificil);
    expect(() => coleccionRuta.modificarTipoActividadRuta(ruta4, Actividad.ciclismo)).to.throw('La ruta que deseas modificar no existe.');
  });

  it ('should throw an error if the route does not exist', () => {
    const ruta4 = new Ruta('Ruta 4', coordenadas, coordenadas, 13, 321, Actividad.ciclismo, Dificultad.dificil);
    expect(() => coleccionRuta.modificarDesnivelRuta(ruta4, 100)).to.throw('La ruta que deseas modificar no existe.');
  });

  it ('should throw an error if the route does not exist', () => {
    const ruta4 = new Ruta('Ruta 4', coordenadas, coordenadas, 13, 321, Actividad.ciclismo, Dificultad.dificil);
    expect(() => coleccionRuta.modificarLongitudRuta(ruta4, 100)).to.throw('La ruta que deseas modificar no existe.');
  });
  
  it ('should throw an error if the route does not exist', () => {
    const ruta4 = new Ruta('Ruta 4', coordenadas, coordenadas, 13, 321, Actividad.ciclismo, Dificultad.dificil);
    expect(() => coleccionRuta.modificarCoordenadasRuta(ruta4, coordenadas, coordenadas)).to.throw('La ruta que deseas modificar no existe.');
  });

  it ('should throw an error if the route does not exist', () => {
    const ruta4 = new Ruta('Ruta 4', coordenadas, coordenadas, 13, 321, Actividad.ciclismo, Dificultad.dificil);
    expect(() => coleccionRuta.modificarNombreRuta(ruta4, 'Ruta 4 modificado')).to.throw('La ruta que deseas modificar no existe.');
  });

  it ('should throw an error if the route does not exist', () => {
    const ruta4 = new Ruta('Ruta 4', coordenadas, coordenadas, 13, 321, Actividad.ciclismo, Dificultad.dificil);
    expect(() => coleccionRuta.eliminar(ruta4)).to.throw('La ruta que deseas eliminar no existe.');
  })

  it ('should throw an error if the route does exist', () => {
    expect(() => coleccionRuta.insertar(ruta1)).to.throw('La ruta que deseas insertar ya existe.');
  })

});
