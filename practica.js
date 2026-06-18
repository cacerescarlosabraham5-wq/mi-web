// Corrección de paréntesis faltantes en el fetch original del documento
fetch("https://jsonplaceholder.typicode.com/users") // Paréntesis cerrado correctamente
    .then(response => response.json())
    .then(data => {
        console.log("Arreglo de usuarios recibido:", data);
    })
    .catch(error => {
        console.error("Error detectado en la petición:", error);
    });