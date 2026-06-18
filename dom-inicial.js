// --- 1. Selección de Elementos ---
const titulo = document.querySelector("#titulo-principal"); // Selección por ID
const parrafo = document.querySelector(".descripcion");    // Selección por Clase
const boton = document.querySelector("#btnCambiar");       // Selección por ID

// Enviar a la consola del navegador para verificar
console.log(titulo);

// --- 2. Modificación Directa ---
titulo.innerText = "¡Hola Mundo desde el DOM!";
parrafo.textContent = "Texto actualizado de forma dinámica mediante JS.";

// --- 3. Eventos (EventListener corregido) ---
boton.addEventListener("click", () => {
    titulo.innerText = "¡Texto cambiado mediante un Clic!";
    titulo.style.color = "#3498db"; // Extra: Cambia el color visual al presionar
});