// Variables
let impuestosAlDolar = [];


// Clases
class ImpuestosAlDolar {
  constructor(nombre, factor) {
    this.nombre = nombre;
    this.factor = factor;
  }
}

const btnCreaImpuesto = document.getElementById("btnCreaImpuesto");

btnCreaImpuesto.addEventListener("click", () => {agregarTipoDeImpuestos()});

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
      localStorage.setItem("impuestosAlDolarls", JSON.stringify(impuestosAlDolar) )
    }
  }
}

impuestosAlDolar = localStorage.getItem(JSON.parse(impuestosAlDolarls))
console.log(impuestosAlDolar)

for (const impuesto of impuestosAlDolar) {
  let h3ImpuetosExistentes = document.createElement("h3");
  h3ImpuetosExistentes.innerHTML = impuestosAlDolar;
  document.body.appendChild(h3ImpuetosExistentes);
}