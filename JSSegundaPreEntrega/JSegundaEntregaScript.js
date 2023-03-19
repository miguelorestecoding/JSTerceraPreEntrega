// Variables Globales
let impuestosAlDolar = [];
let tiposDeDolar = [];
let textoListaImpuestosAgregados = `Impuestos Definidos:\n`;
let textoListaDolaresAgregados = `Dolares Disponibles para calcular su valor:\n`;
let opcionImpuesto = "";
let factorTotal = 0;
let dolarOficialBNVendedor;

// Clases
class ImpuestosAlDolar {
  constructor(nombre, factor) {
    this.nombre = nombre;
    this.factor = factor;
  }
}

class TiposDeDolar {
  constructor(nombre, factor, detalleImpuestos) {
    this.nombre = nombre;
    this.factor = factor;
    this.detalleImpuestos = detalleImpuestos;
  }
}

//Definición de Funciones

function menuPrincipal() {
  let opcionMenuPrincipal = "";

  opcionMenuPrincipal = prompt(
    `Elige la opcion:\n1 - 💱Crear Impuesto\n2 - 🧐💱 Ver Impuestos Existentes\n3 - 💵 Crear Nuevo Tipo de Dolar\n4 - 🧐💵 Ver tipo de Dolares Existentes\n5 - 🤑 Utilizar el Calculador del Dolar\n6 - 👋 Salir del Aplicativo `
  );

  if (opcionMenuPrincipal == null) {
    alert(
      "⛔ En el Menu Principal has presionado el botón cancelar.\n👋 Adios, vuelve cuando Quieras! "
    );
    return;
  }

  switch (parseInt(opcionMenuPrincipal)) {
    case 1:
      agregarTipoDeImpuestos();
      menuPrincipal();
      break;
    case 2:
      if (impuestosAlDolar.length == 0) {
        alert(
          `🤐 Aun no tienes impuestos Generados.\n👉 Ve a la opción 1 para crear los impuestos.`
        );
        menuPrincipal();
      } else {
        alert(mostrarTiposDeImpuestos(impuestosAlDolar));
        menuPrincipal();
      }
      break;
    case 3:
      if (impuestosAlDolar.length == 0) {
        alert(
          `🤐 Para crear Tipos de Dolar necesitas tener impuestos creados y aun no tienes ninguno.\n👉 Ve a la opción 1 para crear los impuestos.`
        );3
        menuPrincipal();
      } else {
        creaTipoDeDolar();
      menuPrincipal();
    }
      
      break;
    case 4:
      if (tiposDeDolar.length == 0) {
        alert(
          `🤐 Aun no has creado tipos de Dolar.\n👉 Ve a la opción 3 para crearlos.`
        );
        menuPrincipal();
      } else {
        alert(mostrarTiposDeDolar(tiposDeDolar));
        menuPrincipal();
      }
      break;
    case 5:
      if (tiposDeDolar.length == 0) {
        alert(
          `🤐 Aun no has creado tipos de Dolar.\nVe a la opción 3 para crearlos.`
        );
        menuPrincipal();
      } else {
        cotizadorDeDolares();
        menuPrincipal();
      }
      break;
    case 6:
      alert(
        "⛔ En el Menu Principal has presionado la Opcion 6.\n👋 eso es un Adios! "
      );
      break;
    default:
      alert(
        "🥴 Opción inválida en el Menú Principal, por favor seleccione una opción válida."
      );
      menuPrincipal();
      break;
  }
}

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
      return 
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

//Mostrar tipos de Impuestos
function mostrarTiposDeImpuestos(impuestosAlDolar) {
  textoListaImpuestosAgregados = `Impuestos Definidos:\n`;
  for (const impuesto of impuestosAlDolar) {
    textoListaImpuestosAgregados += `\n💱 **Orden**: ${
      impuestosAlDolar.indexOf(impuesto) + 1
    } / **Nombre**: ${impuesto.nombre} / **Factor**: ${impuesto.factor}`;
  }
  return textoListaImpuestosAgregados;
}

//Crea Tipos de Dolar
function creaTipoDeDolar() {
  let nombreDeDolar = prompt("Ingrese el nombre del Dolar que desea Crear!");
if (nombreDeDolar == "") {alert("⛔ Por Favor ingresa un nombre valido de Dolar!")
return creaTipoDeDolar()
} else if (nombreDeDolar == null) {
  alert(
    "⛔ Creando Nombre a un nuevo Dolar has presionado Cancelar, vuelves al Menu Principal!"
  );
return
}
  sumaImpuestosAlDolar();

  if (factorTotal > 0) {
    let dolarACrear = new TiposDeDolar(nombreDeDolar, factorTotal + 1);
    alert(
      `😎 Has creado un nuevo tipo de Dolar llamado "${nombreDeDolar}" que que es un %${Math.round(
        factorTotal * 100
      )} mas caro 😮 que el Dolar Oficial Banco Nación. En la opción 5 del Menu Principal podrás ahora calcular su valor.`
    );
    tiposDeDolar.push(dolarACrear);
    console.log(tiposDeDolar);
    factorTotal = 0;
  } else {return}
  
}
//Suma Impuesto al Dolar
function sumaImpuestosAlDolar() {
  opcionImpuesto = prompt(
    `💸Ingresa que impuestos se aplican al dolar que estas creando. Presiona *Cancelar* para cancelar la creación *OK* para finalizar:
    *** Por ahora, tu factor total es de: ${Math.round(factorTotal * 100) / 100}
    ${mostrarTiposDeImpuestos(impuestosAlDolar)}`
  );

  if (opcionImpuesto === null) {
    alert(
      "⛔ Agregando Impuestos has cancelado la creación de este tipo de Dolar."
    );
    opcionImpuesto = "";
  } else {
    opcionImpuesto = parseInt(opcionImpuesto);

    if (isNaN(opcionImpuesto) && factorTotal == 0) {
      alert("🚨 Debes agregar al menos 1 impuesto al dolar que estas creando. Si quieres suspender la cración presiona Cancelar. ")
      sumaImpuestosAlDolar()
    } else if (opcionImpuesto <= 0 || opcionImpuesto > impuestosAlDolar.length) {
      alert(
        "🥱 El Valor Ingresado No es Válido. Por favor ingresa un valor Valido"
      );
      sumaImpuestosAlDolar();
    } else {
      while (opcionImpuesto >= 0 && opcionImpuesto <= impuestosAlDolar.length) {
        factorTotal += traeFactorImpuesto(opcionImpuesto);
        sumaImpuestosAlDolar();
      }
    
      return factorTotal;
    }    
  }
    
}

function traeFactorImpuesto(opcionImpuesto) {
  let agregaFactor = impuestosAlDolar[opcionImpuesto - 1].factor;
  console.log(agregaFactor);
  return agregaFactor;
}

// Mostrar Tipos de Dolar
function mostrarTiposDeDolar(tiposDeDolar) {
  textoListaDolaresAgregados = `😂 Dolares Disponibles para calcular su valor:\n`;
  for (const dolar of tiposDeDolar) {
    textoListaDolaresAgregados += `\n**Orden**: ${
      tiposDeDolar.indexOf(dolar) + 1
    } / **Nombre**: ${dolar.nombre} / **Factor**: ${dolar.factor}`;
  }
  return textoListaDolaresAgregados;
}

// Calcula Valor de los Dolares Creados
function solicitaDolarOficialBNVendedor() {
  dolarOficialBNVendedor = prompt(
    "Hola! 💵 Este es un calculador del valor de los distintos precios del Dólar.\nAntes de continuar, por favor ingresa el valor del 'Dólar Oficial Banco Nación Vendedor' 🏦.\nPuedes consultarlo en: https://www.bna.com.ar/Personas"
  );

  return dolarOficialBNVendedor;
}

function calculaDolarTipo(tipo) {
  return parseFloat(dolarOficialBNVendedor) * tipo.factor;
}

function muestraPanelDeOpciones() {
  const dolarOficialIngresado = parseFloat(dolarOficialBNVendedor)
    .toFixed(2)
    .replace(".", ",");

  opcion = prompt(
    `*** DOLAR OFICIAL INGRESADO: $${dolarOficialIngresado}\n Selecciona qué tipo de Dólar quieres calcular:\n${tiposDeDolar
      .map((tipo, index) => `${index + 1} ${tipo.nombre}`)
      .join("\n")}\n${tiposDeDolar.length + 1} Volver al Menú Principal`
  );

  if (opcion === null) {
    alert(
      "⛔ Has presionado el botón cancelar, entiendo que han finalizado tus consultas.\n👋 Gracias por utilizar el calculador del Dólar! "
    );
    return;
  }

  opcion = parseInt(opcion);
  const tipoSeleccionado = tiposDeDolar[opcion - 1];

  if (tipoSeleccionado) {
    mostrarResultado(
      calculaDolarTipo(tipoSeleccionado),
      tipoSeleccionado.nombre
    );
  } else if (opcion === tiposDeDolar.length + 1) {
    alert("👋 Gracias por utilizar el calculador del Dólar!");
  } else {
    alert("🥴 Opción inválida, por favor seleccione una opción válida.");
    muestraPanelDeOpciones();
  }
}

function mostrarResultado(resultado, tipoDolar) {
  alert(
    `😉 El resultado de tu consulta para el Dólar ${tipoDolar} es : $${resultado
      .toFixed(2)
      .replace(".", ",")}`
  );
}

function cotizadorDeDolares() {
  if (dolarOficialBNVendedor === undefined) {
    solicitaDolarOficialBNVendedor();

    if (dolarOficialBNVendedor === null) {
      alert(
        "⛔ Has presionado el botón cancelar, entiendo que no quieres realizar calculos ahora.\nCalcularemos el valor del dolar en otra ocasión 🤑!."
      );
      return;
    } else if (isNaN(parseFloat(dolarOficialBNVendedor))) {
      alert(" ⛔ Valor de dolar no válido. Por favor ingresa un número.");
      dolarOficialBNVendedor = undefined;
      return cotizadorDeDolares();
    }
  }

  muestraPanelDeOpciones();

  if (opcion && opcion <= tiposDeDolar.length) {
    let otraConsulta = confirm("🧐 Quieres realizar otra consulta?");
    if (otraConsulta) {
      cotizadorDeDolares();
      return;
    } else {
      alert("👋 Adios, espero haberte sido útil.");
      return;
    }
  }
}

//Función de Ejecución
function main() {
  menuPrincipal();
}

main();
