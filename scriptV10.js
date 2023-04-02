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
  constructor(idDolar, NombreDolar, ImpuestosAplicados) {
    this.idDolar = idDolar;
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
function validarFormularioDolares(event) {
  event.preventDefault();
  inputImpuestosAplicados = [];
  let checkboxesImpuestosAplicados = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );
  checkboxesImpuestosAplicados.forEach((checkbox) => {
    inputImpuestosAplicados.push(JSON.parse(checkbox.value));
  });
  contadorDolaresId++;
  let idDolar = contadorDolaresId;
  let nombreDolar = inputNombreDolar.value;
  let ImpuestosAplicados = inputImpuestosAplicados;

  let dolar = new Dolar(idDolar, nombreDolar, ImpuestosAplicados);
  dolares.push(dolar);

  console.log(JSON.stringify(dolares));

  formularioDolares.reset();
  pintarDolares();
  actulizaDolaresStorage();
}

//STORAGE
//Obtener desde Storage
function obtenerImpuestosStorage() {
  let impuestosJSON = localStorage.getItem("impuestos");
  if (impuestosJSON != null) {
    impuestos = JSON.parse(impuestosJSON);
    pintarImpuestos();
  }
}
function obtenerDolaresStorage() {
  let dolaresJSON = localStorage.getItem("dolares");
  if (dolaresJSON != null) {
    dolares = JSON.parse(dolaresJSON);
    pintarDolares();
  }
}
//Actualiza Storage
function actulizaImpuestosStorage() {
  let impuestosJSON = JSON.stringify(impuestos);
  localStorage.setItem("impuestos", impuestosJSON);
}
function actulizaDolaresStorage() {
  let dolaresJSON = JSON.stringify(dolares);
  localStorage.setItem("dolares", dolaresJSON);
}
//Limpiar Storage
const limpiarStorageBtn = document.getElementById("limpiar-storage");
limpiarStorageBtn.addEventListener("click", function () {
  localStorage.clear();
  impuestos = [];
  dolares = [];
  pintarImpuestos();
  pintarDolares();
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
}

//Muestra Cards Impuestos
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

//Dolares
//Muestra Cards Dolares
function pintarDolares() {
  contenedorDolares.innerHTML = "";
  dolares.forEach((dolar) => {
    let column = document.createElement("div");
    let listaImpuestos = document.createElement("ul");
    column.className = "col-md-4 mt-3";
    column.id = `columnaDolar-${dolar.idDolar}`;
    column.innerHTML = `
            <div class="card">
                <div class="card-body">
                <p class="card-text">ID:
                    <b>${dolar.idDolar}</b>
                </p>
                <p class="card-text">Nombre del Dolar:
                    <b>${dolar.NombreDolar}</b>
                </p>
                <p class="card-text">Impuestos Aplicados:
                    <b>${dolar.ImpuestosAplicados.map(
                      (impuesto) => impuesto.nombreImpuesto
                    ).join(", ")}</b>
                </p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger" id="botonEliminarDolar-${
                      dolar.idDolar
                    }" >Eliminar</button>
                </div>
            </div>`;
    ``;

    contenedorDolares.append(column);

    let botonEliminarDolar = document.getElementById(
      `botonEliminarDolar-${dolar.idDolar}`
    );
    botonEliminarDolar.onclick = () => eliminarDolar(dolar.idDolar);
  });
}
// Eliminar Dolares
function eliminarDolar(idDolar) {
  let columnaDolarBorrar = document.getElementById(`columnaDolar-${idDolar}`);
  let indiceBorrar = dolares.findIndex((dolar) => dolar.idDolar === idDolar);
  dolares.splice(indiceBorrar, 1);
  columnaDolarBorrar.remove();
  actulizaDolaresStorage();
}

//Función main
function main() {
  inicializarElementos();
  inicializarEventos();
  obtenerImpuestosStorage();
}

//Función main
function main() {
  inicializarElementos();
  inicializarEventos();
  obtenerImpuestosStorage();
}

//Ejecuta / Llama a main
main();
