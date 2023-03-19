const btnCreaImpuesto = document.getElementById("btnCreaImpuesto");

btnCreaImpuesto.addEventListener("click", agregarTipoDeImpuestos());

// Agregar tipos de Impuestos
function agregarTipoDeImpuestos() {
  let nombreDeImpuesto = prompt(
    "💱 Ingrese el nombre del impuesto que desea agregar"
  );

  if (nombreDeImpuesto == null) {
    11;
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
    }
  }
}
