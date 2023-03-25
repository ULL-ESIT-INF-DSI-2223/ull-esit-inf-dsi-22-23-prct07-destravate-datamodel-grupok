import "mocha";
import { expect } from "chai";

import { Gestor } from "../../src/app";

describe("Gestor", () => {
  it("should return true", () => {
    const gestor = new Gestor();
    expect(gestor).to.be.an.instanceOf(Gestor);
  });
})
