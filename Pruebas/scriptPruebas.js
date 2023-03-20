// let div = document.getElementById("app");
let parrafo = document.getElementById("parrafo1");
console.log(document.getElementById("app").innerHTML);
console.log(parrafo.innerHTML);

// Obtener el elemento h2
const h2 = document.querySelector("h2");

// Crear el elemento h3 y agregar contenido
const h3 = document.createElement("h3");
const texto = document.createTextNode("Nuevo título");
h3.appendChild(texto);

// Agregar el elemento h3 como hijo del h2 utilizando appendChild
h2.appendChild(h3);
