// Variables
let impuestosAlDolar = [];

// Clases
class ImpuestosAlDolar {
  constructor(nombre, factor) {
    this.nombre = nombre;
    this.factor = factor;
  }
}

// function inicializarElementos() {
//   formularioImpuestos = document.getElementById("formularioImpuestos");
//   inputNombreImpuesto = document.getElementById("inputNombreImpuesto");
//   inputFactorImpuesto = document.getElementById("inputFactorImpuesto");
// }

// formularioImpuestos.onsubmit = (e) => {
//   e.preventDefault();
//   const inputs = e.target.children;
//   estudiantes.push(
//     new Estudiante({
//       nombre: inputs[0].value,
//       edad: inputs[1].value,
//       curso: inputs[2].value,
//     })
//   );
//   document.body.append(" ALUMNO REGISTRADO ");
// };

// Agregar tipos de Impuestos
function agregarTipoDeImpuestos() {
  let nombreDeImpuesto = prompt(
    "💱 Ingrese el nombre del impuesto que desea agregar"
  );

  if (nombreDeImpuesto == null) {
    alert(
      "⛔ Creando Impuestos has presionado Cancelar, vuelves al Menu Principal!"
    );
  } else if (nombreDeImpuesto == "") {
    alert("⛔ Por Favor ingresa un nombre valido de impuesto!");
    agregarTipoDeImpuestos();
  } else {
    let factorDelImpuesto = prompt("💱 Ingrese el porcentaje del impuesto");
    if (factorDelImpuesto == null) {
      alert(
        "⛔ Agregando el factor a tu impuesto has presionado Cancelar, vuelves al Menu Principal!"
      );
      return;
    } else if (isNaN(parseInt(factorDelImpuesto))) {
      alert("⛔ Por Favor ingresa un factor valido de impuesto!");
      agregarTipoDeImpuestos();
    } else {
      let impuestoACrear = new ImpuestosAlDolar(
        nombreDeImpuesto,
        parseFloat(parseInt(factorDelImpuesto) / 100)
      );
      impuestosAlDolar.push(impuestoACrear);
      console.log(impuestosAlDolar);
      let imprimeImpuestos = document.getElementById("impuestosExistentes");
      imprimeImpuestos.innerHTML = "";
      for (const impuesto of impuestosAlDolar) {
        imprimeImpuestos.innerHTML +=
          "<h3>" +
          (parseInt(impuestosAlDolar.indexOf(impuesto)) + 1) +
          " - " +
          impuesto.nombre +
          ": " +
          impuesto.factor * 100 +
          "%" +
          "</h3>";
      }
    }
  }
}

function main() {
  const btnCreaImpuesto = document.getElementById("btnCreaImpuesto");
  btnCreaImpuesto.addEventListener("click", () => {
    agregarTipoDeImpuestos();
  });
}

main();
