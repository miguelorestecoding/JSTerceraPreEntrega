const personajesLOTR = [
  {
    nombre: "Frodo",
    edad: 33,
    poder: 7,
  },
  {
    nombre: "Gandalf",
    edad: 2019,
    poder: 10,
  },
  {
    nombre: "Aragorn",
    edad: 87,
    poder: 9,
  },
];

const lista = document.getElementById("personajes-lista");

personajesLOTR.forEach((personaje, index) => {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = `personaje-${index}`;
  checkbox.value = JSON.stringify(personaje);
  const label = document.createElement("label");
  label.innerHTML = `${personaje.nombre} (Edad: ${personaje.edad}, Poder: ${personaje.poder})`;
  li.appendChild(checkbox);
  li.appendChild(label);
  lista.appendChild(li);
});

const form = document.getElementById("batalla-form");
const infoDiv = document.getElementById("batalla-info");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nombreBatalla = document.getElementById("nombre-batalla").value;
  const luchadores = [];

  const checkboxes = document.querySelectorAll("input[type=checkbox]:checked");

  checkboxes.forEach((checkbox) => {
    luchadores.push(JSON.parse(checkbox.value));
  });

  const batalla = {
    nombre: nombreBatalla,
    luchadores: luchadores,
  };

  const p = document.createElement("p");
  p.innerHTML = `Batalla: ${batalla.nombre} - Luchadores: ${batalla.luchadores
    .map((luchador) => luchador.nombre)
    .join(", ")}`;
  infoDiv.appendChild(p);
});
