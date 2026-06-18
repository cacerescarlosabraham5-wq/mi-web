-- ========================================================
-- TAREA PARA CASA: CRUD COMPLETO EN NUEVA TABLA
-- ========================================================

-- [PASO 1]: Creación de la nueva tabla independiente
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- [PASO 2]: Operación CREATE (Insertar un mínimo de 5 registros de prueba)
INSERT INTO productos (nombre, categoria, precio, stock)
VALUES 
('Teclado Mecánico RGB', 'Periféricos', 125.50, 15),
('Mouse Óptico Inalámbrico', 'Periféricos', 45.00, 30),
('Monitor Gamer 24 pulgadas', 'Pantallas', 280.00, 8),
('Memoria RAM DDR4 16GB', 'Componentes', 65.00, 25),
('Disco Duro Sólido SSD 1TB', 'Componentes', 85.20, 0),
('Auriculares con Micrófono', 'Audio', 75.00, 12);


-- [PASO 3]: Operación READ (Consultas de visualización obligatorias)

-- Consulta A: Lectura global de todo el catálogo
SELECT * FROM productos;

-- Consulta B (Requisito): Filtrado selectivo usando la cláusula WHERE
-- Busca todos los artículos que pertenezcan a la categoría 'Componentes'
SELECT * FROM productos 
WHERE categoria = 'Componentes';

-- Consulta C (Requisito): Filtrado combinado WHERE adicional
-- Busca artículos con precio superior a 50 dólares y que tengan existencias disponibles
SELECT * FROM productos 
WHERE precio > 50.00 AND stock > 0;

-- Consulta D (Requisito): Uso de la cláusula ORDER BY
-- Lista los productos ordenados de forma descendente (del más caro al más barato)
SELECT * FROM productos 
ORDER BY precio DESC;


-- [PASO 4]: Operación UPDATE (Modificar valores de registros existentes)
-- Actualiza el precio y repone el stock del artículo cuyo ID es 5
UPDATE productos
SET precio = 79.90, stock = 10
WHERE id = 5;

-- Verificar la actualización específica
SELECT * FROM productos WHERE id = 5;


-- [PASO 5]: Operación DELETE (Borrar registros innecesarios)
-- Elimina del catálogo el producto con ID 2 (Mouse Óptico)
DELETE FROM productos
WHERE id = 2;


-- [COMPROBACIÓN FINAL]: Repetición de consulta para auditar los cambios
-- Muestra el estado final de la base de datos ordenado alfabéticamente por nombre
SELECT id, nombre, categoria, precio, stock 
FROM productos
ORDER BY nombre ASC;