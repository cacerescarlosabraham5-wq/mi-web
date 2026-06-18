// 1. Importación del framework Express [cite: 296, 389]
const express = require("express");
const app = express();
const PORT = 3000;

// 2. Middleware para habilitar la lectura de cuerpos JSON (Crucial para POST y PUT) [cite: 348, 371, 391]
app.use(express.json());

// 3. Base de datos volátil en memoria (Arreglo con el estado inicial) [cite: 386, 392, 393]
let tareas = [
    { id: 1, titulo: "Estudiar Express", completada: false },
    { id: 2, titulo: "Crear API REST", completada: false }
];

// --- RUTA GENERAL ---
// Mensaje base de bienvenida [cite: 380, 381, 394]
app.get("/", (req, res) => {
    res.send("Bienvenido a la API de tareas unificada de Express");
});

// --- OPERACIÓN: GET (Leer toda la lista) ---
// Devuelve el arreglo completo en formato JSON [cite: 382, 395]
app.get("/tareas", (req, res) => {
    res.json(tareas);
});

// --- OPERACIÓN: GET /:id (Buscar un elemento individual) ---
// Obtiene el parámetro dinámico y filtra si existe el ID [cite: 354, 355, 370, 383, 396]
app.get("/tareas/:id", (req, res) => {
    const id = parseInt(req.params.id); // Convierte el parámetro String a Entero [cite: 355, 397]
    const tarea = tareas.find(t => t.id === id); // Busca coincidencia exacta [cite: 356, 398]

    if (!tarea) {
        // Manejo controlado en caso de que el ID no exista en el arreglo [cite: 357, 358, 399]
        return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }

    res.json(tarea); // Envía la respuesta JSON [cite: 359, 400]
});

// --- OPERACIÓN: POST (Crear un nuevo recurso) ---
// Recibe un título del cuerpo de la petición y lo agrega [cite: 360, 361, 371, 384, 401]
app.post("/tareas", (req, res) => {
    const { titulo } = req.body; // Desestructuración del cuerpo [cite: 361, 401]

    // Validación elemental de campos obligatorios [cite: 402]
    if (!titulo) {
        return res.status(400).json({ mensaje: "El título es obligatorio" });
    }

    // Construcción del nuevo objeto modelo [cite: 362, 403]
    const nuevaTarea = {
        id: tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1, // Autoincremento robusto [cite: 363, 404]
        titulo: titulo, // [cite: 363, 405]
        completada: false
    };

    tareas.push(nuevaTarea); // Inyección en memoria [cite: 365, 406]
    res.status(201).json(nuevaTarea); // Devuelve el objeto creado con código HTTP 210 (Created) [cite: 366, 407]
});

/* ========================================================
   RUTAS AGREGADAS REQUERIDAS PARA LA TAREA PARA CASA 
   ======================================================== */

// --- OPERACIÓN: PUT (Actualizar datos completos) [cite: 333, 424] ---
app.put("/tareas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tarea = tareas.find(t => t.id === id);

    if (!tarea) {
        return res.status(404).json({ mensaje: "No se puede actualizar una tarea inexistente" });
    }

    const { titulo, completada } = req.body;

    // Validación parcial: Permite actualizar el título si se provee, o alternar su estado booleano
    if (titulo !== undefined) {
        if (titulo.trim() === "") {
            return res.status(400).json({ mensaje: "El título no puede estar vacío" });
        }
        tarea.titulo = titulo;
    }

    if (completada !== undefined) {
        if (typeof completada !== "boolean") {
            return res.status(400).json({ mensaje: "El estado completada debe ser un valor booleano (true/false)" });
        }
        tarea.completada = completada;
    }

    res.json({ mensaje: "Tarea actualizada exitosamente", tarea });
});

// --- OPERACIÓN: DELETE (Eliminar datos) [cite: 336, 425] ---
app.delete("/tareas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = tareas.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: "No se encontró la tarea elegida para eliminar" });
    }

    // Remueve el elemento del array usando su índice posicional
    const tareaEliminada = tareas.splice(index, 1);

    res.json({ 
        mensaje: "Tarea eliminada correctamente de los registros", 
        elemento: tareaEliminada[0] 
    });
});

// --- MANEJO CENTRALIZADO DE ERROR 404 ---
// Captura cualquier método o ruta no definidos anteriormente [cite: 385, 408]
app.use((req, res) => {
    res.status(404).json({ mensaje: "Ruta o recurso no encontrado en este servidor de Express" }); [cite: 409]
});

// --- APERTURA DEL PUERTO DE ESCUCHA ---
// Inicia el proceso de escucha de peticiones en el puerto asignado [cite: 298, 410]
app.listen(PORT, () => {
    console.log(`Servidor Express activo y listo en http://localhost:${PORT}`); [cite: 300, 411]
});