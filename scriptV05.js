//Inicialización de Arrays
let impuestos = [];

//Inicialización de Variables
let formularioImpuestos;
let inputNombreImpuesto;
let inputPorcentajeImpuesto;

//Crea Objetos
class Impuesto {
  constructor(nombreImpuesto, porcentajeImpuesto) {
    this.nombreImpuesto = nombreImpuesto.toUpperCase();
    this.porcentajeImpuesto = porcentajeImpuesto;
  }
}

//Inicializa Elementos
function inicializarElementos() {
  formularioImpuestos = document.getElementById("formularioImpuestos");
  inputNombreImpuesto = document.getElementById("inputNombreImpuesto");
  inputPorcentajeImpuesto = document.getElementById("inputPorcentajeImpuesto");
}

//Incilializa Eventos
function inicializarEventos() {
  formularioImpuestos.onsubmit = (event) => validarFormulario(event);
}

// ** FUNCIONES
// Validaciones
function validarFormulario(event) {
  event.preventDefault();
  let nombreImpuesto = inputNombreImpuesto.value;
  let porcentajeImpuesto = parseInt(inputPorcentajeImpuesto.value);

  const NombreImpuestoExiste = impuestos.some(
    (impuesto) => impuesto.nombreImpuesto === nombreImpuesto
  );
  if (!NombreImpuestoExiste) {
    let impuesto = new Impuesto(nombreImpuesto, porcentajeImpuesto);

    impuestos.push(impuesto);
    formularioImpuestos.reset();
    pintarImpuestos();
  } else {
    alert("Ya existe un impuesto con ese nombre, utiliza otro");
  }
}
// Eliminar Impuestos
function eliminarImpuesto(idImpuesto) {
  let columnaImpuestoBorrar = document.getElementById(
    `columnaImpuesto-${idImpuesto + 1}`
  );
  let indiceBorrar = idImpuesto;
  impuestos.splice(indiceBorrar, 1);
  columnaImpuestoBorrar.remove();
}

function pintarImpuestos() {
  contenedorImpuestos.innerHTML = "";
  impuestos.forEach((impuesto) => {
    let column = document.createElement("div");
    column.className = "col-md-4 mt-3";
    column.id = `columnaImpuesto-${impuestos.indexOf(impuesto) + 1}`;
    column.innerHTML = `
            <div class="card">
                <div class="card-body">
                <p class="card-text">ID:
                    <b>${impuestos.indexOf(impuesto) + 1}</b>
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
                      impuestos.indexOf(impuesto) + 1
                    }" >Eliminar</button>
                </div>
            </div>`;
    ``;

    contenedorImpuestos.append(column);

    let botonEliminarImpuesto = document.getElementById(
      `botonEliminarImpuesto-${impuestos.indexOf(impuesto) + 1}`
    );
    botonEliminarImpuesto.onclick = () =>
      eliminarImpuesto(impuestos.indexOf(impuesto));
  });
}

//Función main
function main() {
  inicializarElementos();
  inicializarEventos();
}

//Ejecuta / Llama a main
main();
