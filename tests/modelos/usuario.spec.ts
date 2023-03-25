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
});
