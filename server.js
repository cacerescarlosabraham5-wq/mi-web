const http = require("http"); // [cite: 348]
const fs = require("fs");     // 
const path = require("path"); // [cite: 350]

const server = http.createServer((req, res) => { // [cite: 351]
    const { url } = req; // [cite: 351]

    // 1. Servir archivo estático CSS de forma correcta
    if (url === '/styles.css') { // [cite: 353]
        const cssPath = path.join(__dirname, 'styles.css'); // Corregido __dirname 
        const css = fs.readFileSync(cssPath, 'utf8'); // 
        res.writeHead(200, { 'Content-Type': 'text/css' }); // [cite: 355]
        res.end(css); // [cite: 355]
        return; // [cite: 356]
    }

    let html = ""; // Corregido las comillas iniciales [cite: 357]

    switch(url) { // [cite: 358]
        // Ruta Principal: Lee el archivo externo index.html (Homework Avanzado)
        case '/': // [cite: 359]
            try {
                html = fs.readFileSync('index.html', 'utf8'); // [cite: 360]
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("Error interno: No se pudo cargar index.html");
                return;
            }
            break;

        // Ruta: Portafolio HTML
        case '/portfolio': // [cite: 362]
            html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <link rel="stylesheet" href="/styles.css">
            </head>
            <body>
                <div class="container">
                    <h1>Mi Portafolio</h1>
                    <p>Carlos Antonio Martínez Sánchez</p>
                    <p>Desarrollador Web Frontend & Backend</p>
                    <a href="/" class="btn">Inicio</a>
                </div>
            </body>
            </html>`; // Corregidos errores tipográficos y agregados backticks [cite: 363, 364, 376]
            break;

        // Ruta: Habilidades HTML
        case '/skills': // [cite: 378]
            html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <link rel="stylesheet" href="/styles.css">
            </head>
            <body>
                <div class="container">
                    <h1>Mis Habilidades</h1>
                    <ul>
                        <li>HTML5</li>
                        <li>CSS3</li>
                        <li>JavaScript</li>
                        <li>Node.js</li>
                        <li>Responsive Design</li>
                    </ul>
                    <a href="/" class="btn">Inicio</a>
                </div>
            </body>
            </html>`; // Agregados backticks y corregida la estructura [cite: 379, 380, 396]
            break;

        // Ruta API: Habilidades en formato JSON (Corregido array faltante)
        case '/api/skills': // [cite: 398]
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' }); // [cite: 399]
            res.end(JSON.stringify([ // Corregido: se encapsuló en un arreglo [] legítimo 
                { id: 1, skill: "HTML5", level: "Avanzado" }, // [cite: 401]
                { id: 2, skill: "CSS3", level: "Avanzado" }, // [cite: 402]
                { id: 3, skill: "JavaScript", level: "Intermedio" }, // [cite: 403]
                { id: 4, skill: "Node.js", level: "Básico" } // [cite: 404]
            ]));
            return; // [cite: 405]

        // Ruta: Formulario de Contacto HTML
        case '/contact': // [cite: 406]
            html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <link rel="stylesheet" href="/styles.css">
            </head>
            <body>
                <div class="container">
                    <h1>Contacto</h1>
                    <form onsubmit="alert('¡Mensaje enviado simulado!'); return false;">
                        <input type="text" placeholder="Nombre" required>
                        <input type="email" placeholder="Email" required>
                        <textarea placeholder="Mensaje" required></textarea>
                        <button type="submit" class="btn">Enviar</button>
                    </form>
                    <a href="/" class="btn">Inicio</a>
                </div>
            </body>
            </html>`; // Agregados backticks y reparada la estructura [cite: 407, 408, 423]
            break;

        /* ========================================================
           RUTAS AGREGADAS PARA LA TAREA (HOMEWORK OBLIGATORIO) 
           ======================================================== */
        case '/proyectos':
            html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <link rel="stylesheet" href="/styles.css">
            </head>
            <body>
                <div class="container">
                    <h1>Mis Proyectos</h1>
                    <p><strong>Proyecto 1:</strong> E-commerce local con Flexbox.</p>
                    <p><strong>Proyecto 2:</strong> To-Do List interactivo con LocalStorage.</p>
                    <p><strong>Proyecto 3:</strong> Servidor HTTP Nativo con enrutamiento dinámico.</p>
                    <a href="/" class="btn">Inicio</a>
                </div>
            </body>
            </html>`;
            break;

        case '/cv':
            html = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <link rel="stylesheet" href="/styles.css">
            </head>
            <body>
                <div class="container">
                    <h1>Mi Currículum Vitae</h1>
                    <p><strong>Educación:</strong> Programación Web IV - Villarrica, Paraguay.</p>
                    <p><strong>Experiencia:</strong> Desarrollo Frontend interactivo y maquetación ágil.</p>
                    <p><strong>Idiomas:</strong> Español, Guaraní e Inglés Técnico.</p>
                    <a href="/" class="btn">Inicio</a>
                </div>
            </body>
            </html>`;
            break;

        // Ruta por defecto: Manejo del Error 404
        default: // [cite: 425]
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); // [cite: 426]
            html = '<h1>404 - Página no encontrada</h1><p>El recurso solicitado no existe.</p><a href="/" class="btn">Volver al Inicio</a>'; // [cite: 427]
            res.end(html);
            return;
    }

    // Respuesta genérica para las rutas que definen la variable `html`
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); // [cite: 428]
    res.end(html); // [cite: 428]
});

// Corregido el callback del servidor para producción limpia
server.listen(3000, () => { // [cite: 429]
    console.log('Servidor backend corriendo exitosamente en http://localhost:3000'); // [cite: 431]
});