//Inicialización de Arrays
let impuestos = [];

//Inicialización de Variables
let formularioImpuestos;
let contadorImpuestosId = 0;
let inputNombreImpuesto;
let inputPorcentajeImpuesto;

//Crea Objetos
class Impuesto {
  constructor(idImpuesto, nombreImpuesto, porcentajeImpuesto) {
    this.idImpuesto = idImpuesto;
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
  formularioImpuestos.onsubmit = (event) => validarFormularioImpuestos(event);
}

// ** FUNCIONES
// Validaciones
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
    console.log(
      `Array Impuestos luego de Creacion:  ${JSON.stringify(impuestos)}`
    );
  } else {
    alert("Ya existe un impuesto con ese nombre, utiliza otro");
  }
}

// Eliminar Impuestos
function eliminarImpuesto(idImpuesto) {
  let columnaImpuestoBorrar = document.getElementById(
    `columnaImpuesto-${idImpuesto}`
  );
  let indiceBorrar = impuestos.findIndex(
    (impuesto) => impuesto.idImpuesto === idImpuesto
  );
  impuestos.splice(indiceBorrar, 1);
  console.log(
    `Array Impuestos luego de Eliminacion:  ${JSON.stringify(impuestos)}`
  );
  columnaImpuestoBorrar.remove();
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
                    <button class="btn btn-danger" id="botonEliminarImpuesto-${impuesto.idImpuesto}" >Eliminar</button>
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
}

//Ejecuta / Llama a main
main();
