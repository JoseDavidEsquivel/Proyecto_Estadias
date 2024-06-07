// Imports de constantes
import {pool} from '../db.js'


export const getEventos = async (req, res) => {
    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        const [rows] = await connection.execute("SELECT * FROM eventos");

        if (rows.length > 0) {
            const respuesta = rows.map(evento => ({
                id_evento: evento.id_evento,
                titulo: evento.titulo,
                descripcion: evento.descripcion,
                fecha: evento.fecha,
                hora: evento.hora
            }));
            res.json(respuesta);
        } else {
            res.status(404).json({ detail: "No hay eventos en la Base de datos" });
        }
    } catch (error) {
        console.error('Error al listar los eventos:', error.message);
        res.status(500).send('Error interno al listar los eventos');
    } finally {
        connection.release();
    }
}

export const getEvento = async (req, res) => {
    const { id_evento } = req.params;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        const [rows] = await connection.execute("SELECT * FROM eventos WHERE id_evento = ?", [id_evento]);

        if (rows.length > 0) {
            const respuesta = rows.map(evento => ({
                id_evento: evento.id_evento,
                titulo: evento.titulo,
                descripcion: evento.descripcion,
                fecha: evento.fecha,
                hora: evento.hora
            }));
            res.json(respuesta);
        } else {
            res.status(404).json({ detail: "No existe ese evento en la Base de datos" });
        }
    } catch (error) {
        console.error('Error al buscar el evento en la base de datos:', error.message);
        res.status(500).send('Error interno al buscar el evento en la base de datos');
    } finally {
        connection.release();
    }
}

export const postEvento = async (req, res) => {
    const { titulo, descripcion, fecha, hora } = req.body;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Insertar nuevo evento en la base de datos
        const query = "INSERT INTO eventos (titulo, descripcion, fecha, hora) VALUES (?, ?, ?, ?)";
        const eventoData = [titulo, descripcion, fecha, hora];
        await connection.execute(query, eventoData);

        res.json({
            titulo,
            descripcion,
            fecha,
            hora
        });
    } catch (error) {
        console.error('Error al insertar evento en la base de datos:', error.message);
        res.status(500).send('Error interno al crear evento');
    } finally {
        connection.release();
    }
}

export const putEvento = async (req, res) => {
    const id_evento = req.params.id_evento;
    const { titulo, descripcion, fecha, hora } = req.body;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Actualizar los datos del evento en la base de datos
        const query = "UPDATE eventos SET titulo=?, descripcion=?, fecha=?, hora=? WHERE id_evento=?";
        const eventData = [titulo, descripcion, fecha, hora, id_evento];
        await connection.execute(query, eventData);

        res.json({
            id_evento,
            titulo,
            descripcion,
            fecha,
            hora
        });
    } catch (error) {
        console.error('Error al actualizar evento en la base de datos:', error.message);
        res.status(500).send('Error interno al actualizar evento');
    } finally {
        connection.release();
    }
}

export const deleteEvento = async (req, res) => {
    const id_evento = req.params.id_evento;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Verificar si el evento existe en la base de datos
        const [evento] = await connection.execute("SELECT * FROM eventos WHERE id_evento=?", [id_evento]);
        
        if (evento.length === 0) {
            return res.status(404).json({ detail: "Evento no encontrado" });
        }

        // Eliminar el evento de la base de datos
        await connection.execute("DELETE FROM eventos WHERE id_evento=?", [id_evento]);

        res.json({ message: "Evento borrado correctamente", id_evento });
    } catch (error) {
        console.error('Error al borrar evento en la base de datos:', error.message);
        res.status(500).send('Error interno al borrar evento');
    } finally {
        connection.release();
    }
}

