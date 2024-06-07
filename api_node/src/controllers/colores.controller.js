// Imports de constantes
import {pool} from '../db.js'


// Endpoint para listar todos los colores existentes
export const getColores = async (req, res) => {
    try {
        // Obtener una conexión de la pool
        const connection = await pool.getConnection();

        // Ejecutar la consulta SQL para obtener todos los colores
        const [rows] = await connection.query('SELECT * FROM colores');

        // Liberar la conexión de vuelta a la pool
        connection.release();

        // Verificar si hay datos
        if (rows.length > 0) {
            // Mapear los resultados a un formato deseado
            const respuesta = rows.map(row => ({
                id_color: row.id_color,
                nombre_color: row.nombre_color,
                valor_hex: row.valor_hex
            }));

            // Retornar la respuesta
            res.json(respuesta);
        } else {
            // Si no hay datos, lanzar un error 404
            res.status(404).json({ message: 'No hay colores en la Base de datos' });
        }
    } catch (error) {
        // Manejar cualquier error interno
        console.error('Error al listar los colores:', error.message);
        res.status(500).send('Error interno al listar los colores');
    }
}

export const getColor = async (req, res) => {
    const { id_color } = req.params;

    try {
        // Obtener una conexión de la pool
        const connection = await pool.getConnection();

        // Ejecutar la consulta SQL para obtener el color por ID
        const [rows] = await connection.query('SELECT * FROM colores WHERE id_color = ?', [id_color]);

        // Liberar la conexión de vuelta a la pool
        connection.release();

        // Verificar si hay datos
        if (rows.length > 0) {
            // Mapear los resultados a un formato deseado
            const respuesta = rows.map(row => ({
                id_color: row.id_color,
                nombre_color: row.nombre_color,
                valor_hex: row.valor_hex
            }));

            // Retornar la respuesta
            res.json(respuesta);
        } else {
            // Si no hay datos, lanzar un error 404
            res.status(404).json({ message: 'No existe un color con ese id en la Base de datos' });
        }
    } catch (error) {
        // Manejar cualquier error interno
        console.error('Error al buscar el color por ID:', error.message);
        res.status(500).send('Error interno al buscar el color por ID');
    }
}

export const postColor = async (req, res) => {
    const { nombre_color, valor_hex } = req.body;

    try {
        // Obtener una conexión de la pool
        const connection = await pool.getConnection();

        // Insertar el color en la base de datos
        const query = "INSERT INTO colores (nombre_color, valor_hex) VALUES (?, ?)";
        const [result] = await connection.query(query, [nombre_color, valor_hex]);

        // Liberar la conexión de vuelta a la pool
        connection.release();

        // Retornar el color creado
        res.status(200).json({
            nombre_color: nombre_color,
            valor_hex: valor_hex
        });
    } catch (error) {
        // Manejar cualquier error interno
        console.error('Error al crear un color:', error.message);
        res.status(500).send('Error interno al crear un color');
    }
}

export const putColor = async (req, res) => {
    const { nombre_color, valor_hex } = req.body;
    const { id_color } = req.params;

    try {
        // Obtener una conexión de la pool
        const connection = await pool.getConnection();

        // Actualizar el color en la base de datos
        const query = "UPDATE colores SET nombre_color = ?, valor_hex = ? WHERE id_color = ?";
        await connection.query(query, [nombre_color, valor_hex, id_color]);

        // Liberar la conexión de vuelta a la pool
        connection.release();

        // Retornar el color editado
        res.status(200).json({
            id_color: id_color,
            nombre_color: nombre_color,
            valor_hex: valor_hex
        });
    } catch (error) {
        // Manejar cualquier error interno
        console.error('Error al editar un color:', error.message);
        res.status(500).send('Error interno al editar un color');
    }
}

export const deleteColor = async (req, res) => {
    const { id_color } = req.params;

    try {
        // Obtener una conexión de la pool
        const connection = await pool.getConnection();

        // Verificar si el color existe
        const [rows] = await connection.query('SELECT * FROM colores WHERE id_color = ?', [id_color]);
        if (rows.length === 0) {
            // Si el color no existe, lanzar un error 404
            res.status(404).json({ message: 'Color no encontrado' });
            return;
        }

        // Eliminar el color de la base de datos
        await connection.query('DELETE FROM colores WHERE id_color = ?', [id_color]);

        // Liberar la conexión de vuelta a la pool
        connection.release();

        // Retornar un mensaje de éxito
        res.status(200).json({ message: 'Color borrado correctamente', id_color: id_color });
    } catch (error) {
        // Manejar cualquier error interno
        console.error('Error al borrar un color:', error.message);
        res.status(500).send('Error interno al borrar un color');
    }
}