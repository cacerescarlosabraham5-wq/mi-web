// Referencias a los elementos del DOM
const container = document.querySelector("#products-container");
const apiTitle = document.querySelector("#api-title");

// Función asíncrona robusta para cargar los productos (Estructura corregida de la Etapa 4)
async function cargarProductos() {
    // Mostrar mensaje de carga inicial
    container.innerHTML = "<p style='text-align:center; grid-column: 1/-1;'>Cargando catálogo...</p>";
    
    try {
        // Petición HTTP mediante Fetch apuntando a Fake Store API
        const response = await fetch("https://fakestoreapi.com/products?limit=6");
        
        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }
        
        const products = await response.json();
        
        // 1. Requisito: Modificar título dinámico con el nombre de la API usada
        apiTitle.textContent = "Catálogo Dinámico: Fake Store API";
        
        // Limpiar el contenedor antes de renderizar
        container.innerHTML = "";
        
        // Recorrer los productos obtenidos
        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");
            
            // 2. Requisito: Renderizar al menos 6 datos por registro en las tarjetas
            // Datos mapeados: 1. Imagen, 2. Categoría, 3. Título, 4. Descripción, 5. Precio, 6. Calificación (Puntuación)
            card.innerHTML = `
                <div>
                    <img src="${product.image}" alt="${product.title}">
                    <p class="category">${product.category}</p>
                    <h3>${product.title}</h3>
                    <p class="description">${product.description}</p>
                </div>
                <div>
                    <p class="price">$${product.price.toFixed(2)}</p>
                    <p class="rating">⭐ ${product.rating.rate} (${product.rating.count} reviews)</p>
                </div>
            `;
            
            container.appendChild(card);
        });
        
    } catch (error) {
        // Manejo controlado de excepciones con catch
        apiTitle.textContent = "Error de Conexión";
        container.innerHTML = "<p style='color:red; text-align:center; grid-column:1/-1;'>Hubo un problema al procesar la información de los productos externos.</p>";
        console.error("Detalles del error:", error);
    }
}

// Invocación inicial automática al cargar la página por primera vez
document.addEventListener("DOMContentLoaded", cargarProductos);