// Imports de constantes
import {pool} from '../db.js'

export const getAños = async (req, res) => {
    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Ejecutar la consulta SQL para obtener todos los años
        const [rows] = await connection.execute("SELECT * FROM años");

        if (rows.length > 0) {
            // Si hay años en la base de datos, formatear la respuesta
            const años = rows.map(año => ({
                id_año: año.id_año,
                año: año.año
            }));
            res.json(años);
        } else {
            // Si no hay años en la base de datos, devolver un mensaje de error
            res.status(404).json({ detail: "No hay años en la Base de datos" });
        }
    } catch (error) {
        // Manejar errores de la base de datos
        console.error('Error al listar los años:', error.message);
        res.status(500).send('Error interno al listar los años');
    } finally {
        // Liberar la conexión a la base de datos
        connection.release();
    }
};

export const getAño = async (req, res) => {
    const { id } = req.params;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Ejecutar la consulta SQL para obtener el año específico por su id
        const [rows] = await connection.execute("SELECT * FROM años WHERE id_año = ?", [id]);

        if (rows.length > 0) {
            // Si el año existe en la base de datos, formatear la respuesta
            const respuesta = rows.map(row => ({
                id_año: row.id_año,
                año: row.año,
            }));
            res.json(respuesta);
        } else {
            // Si el año no existe en la base de datos, devolver un mensaje de error
            res.status(404).json({ detail: "No existe un año con ese id en la Base de datos" });
        }
    } catch (error) {
        // Manejar errores de la base de datos
        console.error('Error al buscar el año:', error.message);
        res.status(500).send('Error interno al buscar el año');
    } finally {
        // Liberar la conexión a la base de datos
        connection.release();
    }
};

export const deleteAño = async (req, res) => {
    const { id } = req.params;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Verificar si la respuesta existe
        const [rows] = await connection.execute("SELECT * FROM años WHERE id_año = ?", [id]);
        const aviso = rows[0];

        if (!aviso) {
            // Si el año no se encuentra, devolver un mensaje de error
            res.status(404).json({ detail: "Año no encontrado" });
            return;
        }

        // Eliminar el aviso de la base de datos
        await connection.execute("DELETE FROM años WHERE id_año = ?", [id]);
        await connection.commit();

        // Devolver una respuesta exitosa
        res.json({ message: "Año borrado correctamente", id });
    } catch (error) {
        // Manejar errores de la base de datos
        console.error('Error al borrar el año:', error.message);
        res.status(500).send('Error interno al borrar el año');
    } finally {
        // Liberar la conexión a la base de datos
        connection.release();
    }
};
