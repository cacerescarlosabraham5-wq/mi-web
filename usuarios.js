// Selección del contenedor en el DOM
const usersContainer = document.querySelector("#users");

// Petición corregida (se eliminaron barras invertidas y comillas rotas del innerHTML)
fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => {
        usersContainer.innerHTML = ""; // Limpiar contenedor o mensajes de carga

        users.forEach(user => {
            // Crear el elemento contenedor de la tarjeta
            const card = document.createElement("div");
            card.classList.add("user-card");

            // Inyección de HTML usando Template Literals de forma correcta (` y ${}`)
            card.innerHTML = `
                <h2>${user.name}</h2>
                <p><strong>Usuario:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Ciudad:</strong> ${user.address.city}</p>
            `;

            // Insertar la tarjeta en el contenedor principal
            usersContainer.appendChild(card);
        });
    })
    .catch(error => {
        usersContainer.innerHTML = "<p class='error'>Error al cargar los datos de los usuarios.</p>";
        console.error("Error en Fetch:", error);
    });