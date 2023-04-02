//Inicialización de Arrays
let impuestos = [];
let dolares = [];

//Inicialización de Variables
let formularioImpuestos;
let contadorImpuestosId = 0;
let inputNombreImpuesto;
let inputPorcentajeImpuesto;
let contenedorImpuestos;

let formularioDolares;
let contadorDolaresId = 0;
let inputNombreDolar;
let inputImpuestosAplicados;
let contenedorDolares;

// let listaImpuestos;

//Crea Clases de Objetos
// Objeto Impuestos
class Impuesto {
  constructor(idImpuesto, nombreImpuesto, porcentajeImpuesto) {
    this.idImpuesto = idImpuesto;
    this.nombreImpuesto = nombreImpuesto.toUpperCase();
    this.porcentajeImpuesto = porcentajeImpuesto;
  }
}
//Objeto Dolares
class Dolar {
  constructor(NombreDolar, ImpuestosAplicados) {
    this.NombreDolar = NombreDolar;
    this.ImpuestosAplicados = ImpuestosAplicados;
  }
}

//Inicializa Elementos
function inicializarElementos() {
  formularioImpuestos = document.getElementById("formularioImpuestos");
  inputNombreImpuesto = document.getElementById("inputNombreImpuesto");
  inputPorcentajeImpuesto = document.getElementById("inputPorcentajeImpuesto");
  contenedorImpuestos = document.getElementById("contenedorImpuestos");

  formularioDolares = document.getElementById("formularioDolares");
  inputNombreDolar = document.getElementById("inputNombreDolar");
  inputImpuestosAplicados = document.getElementById("inputImpuestosAplicados");
  contenedorDolares = document.getElementById("contenedorDolares");

  // listaImpuestos = document.getElementById("impuestos-lista");
}

//Incilializa Eventos
function inicializarEventos() {
  formularioImpuestos.onsubmit = (event) => validarFormularioImpuestos(event);
  formularioDolares.onsubmit = (event) => validarFormularioDolares(event);
}

// ** FUNCIONES
// Valida Formulario Impuestos
function validarFormularioImpuestos(event) {
  event.preventDefault();
  contadorImpuestosId++;
  let idImpuesto = contadorImpuestosId;
  let nombreImpuesto = inputNombreImpuesto.value;
  let porcentajeImpuesto = parseInt(inputPorcentajeImpuesto.value);
  const NombreImpuestoExiste = impuestos.some(
    (impuesto) => impuesto.nombreImpuesto === nombreImpuesto
  );

  if (nombreImpuesto === "" || isNaN(porcentajeImpuesto)) {
    alert("Por favor completar todos los campos");
    formularioImpuestos.reset();
  } else if (!NombreImpuestoExiste) {
    let impuesto = new Impuesto(idImpuesto, nombreImpuesto, porcentajeImpuesto);

    impuestos.push(impuesto);
    formularioImpuestos.reset();
    pintarImpuestos();
    actulizaImpuestosStorage();
    // mostrarListaImpuestos();
  } else {
    alert("Ya existe un impuesto con ese nombre, utiliza otro");
  }
}
//Valida Formulario Dolares
// function validarFormularioDolares(event) {
//   event.preventDefault();
//   let NombreDolar = inputNombreDolar;
//   let ImpuestosAplicados = inputImpuestosAplicados;
// }

//Valida Formulario Dolares - Version desde crea batalla de ChatGPT
function validarFormularioDolares(event) {
  event.preventDefault();
  // const nombreBatalla = document.getElementById("nombre-batalla").value;
  inputImpuestosAplicados = [];
  let checkboxesImpuestosAplicados = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );
  checkboxesImpuestosAplicados.forEach((checkbox) => {
    inputImpuestosAplicados.push(JSON.parse(checkbox.value));
  });
  let nombreDolar = inputNombreDolar.value;
  let ImpuestosAplicados = inputImpuestosAplicados;

  let dolar = new Dolar(nombreDolar, ImpuestosAplicados);
  dolares.push(dolar);

  console.log(JSON.stringify(dolares));

  formularioDolares.reset();
  pintarDolares();
  actulizaDolaresStorage();
  // mostrarListaImpuestos();
}

//Lista Impuestos: Lista los impuestos creados para que sean seleccionables.
// function mostrarListaImpuestos() {
//   impuestos.forEach((impuesto, idImpuesto) => {
//     const li = document.createElement("li");
//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
//     checkbox.name = `impuesto-${idImpuesto}`;
//     checkbox.value = JSON.stringify(impuesto);
//     const label = document.createElement("label");
//     label.innerHTML = `${impuesto.nombreImpuesto} - Percentaje: ${impuesto.porcentajeImpuesto})`;
//     li.appendChild(checkbox);
//     li.appendChild(label);
//     listaImpuestos.appendChild(li);
//   });
// }

//STORAGE
//Obtener Impuestos Storage
function obtenerImpuestosStorage() {
  let impuestosJSON = localStorage.getItem("impuestos");
  if (impuestosJSON != null) {
    impuestos = JSON.parse(impuestosJSON);
    pintarImpuestos();
  }
}

//Actualiza Storage
function actulizaImpuestosStorage() {
  let impuestosJSON = JSON.stringify(impuestos);
  localStorage.setItem("impuestos", impuestosJSON);
}
//Limpiar Storage
const limpiarStorageBtn = document.getElementById("limpiar-storage");
limpiarStorageBtn.addEventListener("click", function () {
  localStorage.clear();
  impuestos = [];
  pintarImpuestos();
});

//IMPUESTOS
// Eliminar Impuestos
function eliminarImpuesto(idImpuesto) {
  let columnaImpuestoBorrar = document.getElementById(
    `columnaImpuesto-${idImpuesto}`
  );
  let indiceBorrar = impuestos.findIndex(
    (impuesto) => impuesto.idImpuesto === idImpuesto
  );
  impuestos.splice(indiceBorrar, 1);
  columnaImpuestoBorrar.remove();
  actulizaImpuestosStorage();
  // mostrarListaImpuestos();
}

function pintarImpuestos() {
  contenedorImpuestos.innerHTML = "";
  impuestos.forEach((impuesto) => {
    let column = document.createElement("div");
    column.className = "col-md-4 mt-3";
    column.id = `columnaImpuesto-${impuesto.idImpuesto}`;
    column.innerHTML = `
            <div class="card">
                <div class="card-body">
                <p class="card-text">ID:
                    <b>${impuesto.idImpuesto}</b>
                </p>
                <p class="card-text">Nombre del Impuesto:
                    <b>${impuesto.nombreImpuesto}</b>
                </p>
                <p class="card-text">Porcentaje del Impuesto:
                    <b>${impuesto.porcentajeImpuesto}</b>
                </p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger" id="botonEliminarImpuesto-${
                      impuesto.idImpuesto
                    }" >Eliminar</button>
                    <label>
                      <input type="checkbox" name="checkAgregaImpuesto-${
                        impuesto.idImpuesto
                      }" value=${JSON.stringify(impuesto)}>
                        Inculir
                    </label>
                </div>
            </div>`;
    ``;

    contenedorImpuestos.append(column);

    let botonEliminarImpuesto = document.getElementById(
      `botonEliminarImpuesto-${impuesto.idImpuesto}`
    );
    botonEliminarImpuesto.onclick = () => eliminarImpuesto(impuesto.idImpuesto);
  });
}

//Función main
function main() {
  inicializarElementos();
  inicializarEventos();
  obtenerImpuestosStorage();
  // mostrarListaImpuestos();
}

//Ejecuta / Llama a main
main();
