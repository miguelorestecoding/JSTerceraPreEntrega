// Variables
let impuestosAlDolar = [];
let inputFactorImpuesto
let inputNombreImpuesto

// Clases
class ImpuestosAlDolar {
    constructor(nombre, factor) {
      this.nombre = nombre;
      this.factor = factor;
    }
  }

  function inicializarElementos() {
    formulario = document.getElementById("formulario");
    inputFactorImpuesto = document.getElementById("inputFactorImpuesto");
    inputNombreImpuesto = document.getElementById("inputNombreImpuesto");
  }