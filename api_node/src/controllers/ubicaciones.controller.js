import { pool } from '../db.js';


export const getUbicaciones = async (req, res) => {
    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Obtener todas las ubicaciones
        const [ubicaciones] = await connection.query('SELECT * FROM ubicaciones');

        if (ubicaciones.length === 0) {
            return res.status(404).json({ detail: "No hay ubicaciones en la Base de datos" });
        }

        // Mapear las ubicaciones a un formato adecuado
        const respuesta = ubicaciones.map(ubicacion => ({
            id_ubicacion: ubicacion.id_ubicacion,
            latitud: ubicacion.latitud,
            longitud: ubicacion.longitud,
            lugar: ubicacion.lugar
        }));

        res.json(respuesta);
    } catch (error) {
        console.error('Error al listar las ubicaciones:', error.message);
        res.status(500).send('Error interno al listar las ubicaciones');
    } finally {
        connection.release();
    }
}

export const getUbicacion = async (req, res) => {
    const { id_ubicacion } = req.params;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Buscar la ubicación por su ID
        const [ubicacion] = await connection.query('SELECT * FROM ubicaciones WHERE id_ubicacion = ?', [id_ubicacion]);

        if (ubicacion.length === 0) {
            return res.status(404).json({ detail: "No existe esa ubicacion en la Base de datos" });
        }

        // Formatear la respuesta
        const respuesta = {
            id_ubicacion: ubicacion[0].id_ubicacion,
            latitud: ubicacion[0].latitud,
            longitud: ubicacion[0].longitud,
            lugar: ubicacion[0].lugar
        };

        res.json(respuesta);
    } catch (error) {
        console.error('Error al buscar la ubicación:', error.message);
        res.status(500).send('Error interno al buscar la ubicación');
    } finally {
        connection.release();
    }
}

export const postUbicacion = async (req, res) => {
    const { latitud, longitud, lugar } = req.body;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Insertar nueva ubicación en la base de datos
        const query = 'INSERT INTO ubicaciones (latitud, longitud, lugar) VALUES (?, ?, ?)';
        const ubicacionData = [latitud, longitud, lugar];
        await connection.query(query, ubicacionData);
        connection.commit();

        res.status(200).json({
            latitud: latitud,
            longitud: longitud,
            lugar: lugar
        });
    } catch (error) {
        console.error('Error al insertar ubicacion en la base de datos:', error.message);
        res.status(500).json({ detail: "Error interno al crear ubicacion" });
    } finally {
        connection.release();
    }
}

export const putUbicacion = async (req, res) => {
    const { id_ubicacion } = req.params;
    const { latitud, longitud, lugar } = req.body;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Actualizar ubicación en la base de datos
        const query = 'UPDATE ubicaciones SET latitud=?, longitud=?, lugar=? WHERE id_ubicacion=?';
        const ubicacionData = [latitud, longitud, lugar, id_ubicacion];
        await connection.query(query, ubicacionData);
        connection.commit();

        res.status(200).json({
            latitud: latitud,
            longitud: longitud,
            lugar: lugar
        });
    } catch (error) {
        console.error('Error al actualizar ubicacion en la base de datos:', error.message);
        res.status(500).json({ detail: "Error interno al actualizar ubicacion" });
    } finally {
        connection.release();
    }
}

export const deleteUbicacion = async (req, res) => {
    const { id_ubicacion } = req.params;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Verificar si la ubicación existe
        const [ubicacion] = await connection.query("SELECT * FROM ubicaciones WHERE id_ubicacion=?", [id_ubicacion]);
        
        if (!ubicacion.length) {
            return res.status(404).json({ detail: "Ubicacion no encontrada" });
        }

        // Eliminar la ubicación de la base de datos
        await connection.query("DELETE FROM ubicaciones WHERE id_ubicacion=?", [id_ubicacion]);
        connection.commit();

        res.status(200).json({ message: "Ubicacion borrada correctamente", id_ubicacion: id_ubicacion });
    } catch (error) {
        console.error('Error al borrar la ubicacion:', error.message);
        res.status(500).json({ detail: "Error interno al borrar la ubicacion" });
    } finally {
        connection.release();
    }
}