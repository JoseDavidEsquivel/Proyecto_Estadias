// Imports de constantes
import {pool} from '../db.js'

export const listarBot = async (req, res) => {
    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Consultar todos los contactos existentes en la base de datos
        const [rows] = await connection.execute("SELECT * FROM bot");

        if (rows.length > 0) {
            const respuesta = rows.map(contacto => ({
                id: contacto.id,
                nombre: contacto.nombre,
                correo: contacto.correo,
                problema: contacto.problema,
                area: contacto.area
            }));
            res.json(respuesta);
        } else {
            res.status(404).json({ detail: "No hay problemas con el bot en la Base de datos" });
        }
    } catch (error) {
        console.error('Error al listar los contactos del bot:', error.message);
        res.status(500).send('Error interno al listar los contactos del bot');
    } finally {
        connection.release();
    }
}

export const detalleBot = async (req, res) => {
    const { id_bot } = req.params;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        const query = "SELECT * FROM bot WHERE id = ?";
        const [rows] = await connection.execute(query, [id_bot]);

        if (rows.length > 0) {
            const respuesta = rows.map(row => ({
                id: row.id,
                nombre: row.nombre,
                correo: row.correo,
                problema: row.problema,
                area: row.area
            }));
            res.json(respuesta);
        } else {
            res.status(404).json({ detail: "No existe ese problema con el bot en la Base de datos" });
        }
    } catch (error) {
        console.error('Error al obtener el detalle del problema del bot:', error.message);
        res.status(500).send('Error interno al obtener el detalle del problema del bot');
    } finally {
        connection.release();
    }
};

export const postBot = async (req, res) => {
    const { nombre, correo, problema, area } = req.body;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Insertar nuevo evento en la base de datos
        const query = "INSERT INTO bot (nombre, correo, problema, area) VALUES (?, ?, ?, ?)";
        const [result] = await connection.execute(query, [nombre, correo, problema, area]);
        
        // Verificar si la inserción fue exitosa
        if (result.affectedRows > 0) {
            res.status(200).json({
                nombre,
                correo,
                problema,
                area
            });
        } else {
            res.status(500).json({ detail: "Error interno al crear un problema con el bot" });
        }
    } catch (error) {
        console.error('Error al insertar un problema con el bot en la base de datos:', error.message);
        res.status(500).send('Error interno al crear un problema con el bot');
    } finally {
        connection.release();
    }
};

export const putBot = async (req, res) => {
    const { id_bot } = req.params;
    const { nombre, correo, problema, area } = req.body;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Actualizar los datos en la base de datos
        const query = "UPDATE bot SET nombre = ?, correo = ?, problema = ?, area = ? WHERE id = ?";
        const [result] = await connection.execute(query, [nombre, correo, problema, area, id_bot]);

        // Verificar si la actualización fue exitosa
        if (result.affectedRows > 0) {
            res.status(200).json({
                nombre,
                correo,
                problema,
                area
            });
        } else {
            res.status(404).json({ detail: "No se encontró el problema con el bot en la Base de datos" });
        }
    } catch (error) {
        console.error('Error al actualizar problema con el bot en la base de datos:', error.message);
        res.status(500).send('Error interno al actualizar problema con el bot');
    } finally {
        connection.release();
    }
};

export const deleteBot = async (req, res) => {
    const { id_bot } = req.params;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Verificar si el problema con el bot existe
        const [rows] = await connection.execute("SELECT * FROM bot WHERE id = ?", [id_bot]);

        if (rows.length === 0) {
            return res.status(404).json({ detail: "Ubicación no encontrada" });
        }

        // Eliminar el problema de la base de datos
        await connection.execute("DELETE FROM bot WHERE id = ?", [id_bot]);
        connection.commit();

        res.json({ message: "Asunto con el bot borrado correctamente", id_bot: id_bot });
    } catch (error) {
        console.error('Error al borrar problema con el bot en la base de datos:', error.message);
        res.status(500).send('Error interno al borrar problema con el bot');
    } finally {
        connection.release();
    }
};
