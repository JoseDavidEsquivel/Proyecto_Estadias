// Imports de constantes
import {pool} from '../db.js'

export const getFracciones = async (req, res) => {
    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Ejecutar la consulta SQL para obtener todas las fracciones
        const [rows] = await connection.execute("SELECT * FROM fracciones");

        // Verificar si se encontraron fracciones
        if (rows.length > 0) {
            const respuesta = rows.map(fraccion => ({
                id_fraccion: fraccion.id_fraccion,
                fraccion: fraccion.fraccion,
                descripcion: fraccion.descripcion,
                area: fraccion.area,
                num_articulo: fraccion.num_articulo
            }));
            res.json(respuesta);
        } else {
            // Si no se encontraron fracciones, devolver un error 404
            res.status(404).json({ detail: "No hay fracciones en la Base de datos" });
        }
    } catch (error) {
        // Manejar errores de la base de datos
        console.error('Error al listar las fracciones:', error.message);
        res.status(500).send('Error interno al listar las fracciones');
    } finally {
        // Liberar la conexión a la base de datos
        connection.release();
    }
};

export const getFraccion = async (req, res) => {
    const id_fraccion = req.params.id_fraccion;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Ejecutar la consulta SQL para obtener la fracción por su ID
        const [rows] = await connection.execute("SELECT * FROM fracciones WHERE id_fraccion = ?", [id_fraccion]);

        // Verificar si se encontró la fracción
        if (rows.length > 0) {
            const fraccion = {
                id_fraccion: rows[0].id_fraccion,
                fraccion: rows[0].fraccion,
                descripcion: rows[0].descripcion,
                area: rows[0].area,
                num_articulo: rows[0].num_articulo
            };
            res.json(fraccion);
        } else {
            // Si no se encontró la fracción, devolver un error 404
            res.status(404).json({ detail: "No existe una fracción con ese id en la Base de datos" });
        }
    } catch (error) {
        // Manejar errores de la base de datos
        console.error('Error al buscar la fracción por su ID:', error.message);
        res.status(500).send('Error interno al buscar la fracción por su ID');
    } finally {
        // Liberar la conexión a la base de datos
        connection.release();
    }
};

export const buscarFracciones = async (req, res) => {
    const { area, num_articulo } = req.query;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Construir la consulta SQL dinámicamente según los parámetros proporcionados
        let query = "SELECT * FROM fracciones WHERE";
        let conditions = [];
        let parameters = [];

        if (area) {
            conditions.push(" area = ?");
            parameters.push(area);
        }

        if (num_articulo) {
            conditions.push(" num_articulo = ?");
            parameters.push(num_articulo);
        }

        // Verificar que al menos un parámetro haya sido proporcionado
        if (conditions.length === 0) {
            throw new Error("Debe proporcionar al menos un parámetro de búsqueda");
        }

        query += conditions.join(" AND ");

        // Ejecutar la consulta SQL con los parámetros proporcionados
        const [rows] = await connection.execute(query, parameters);

        // Verificar si se encontraron fracciones con los criterios especificados
        if (rows.length > 0) {
            const respuesta = rows.map(row => ({
                id_fraccion: row.id_fraccion,
                fraccion: row.fraccion,
                descripcion: row.descripcion,
                area: row.area,
                num_articulo: row.num_articulo
            }));
            res.json(respuesta);
        } else {
            // Si no se encontraron fracciones, devolver un error 404
            res.status(404).json({ detail: "No se encontraron fracciones con los criterios especificados" });
        }
    } catch (error) {
        // Manejar errores
        console.error('Error al buscar fracciones:', error.message);
        res.status(500).send('Error interno al buscar fracciones');
    } finally {
        // Liberar la conexión a la base de datos
        connection.release();
    }
};

export const postFraccion = async (req, res) => {
    const fraccion = req.body;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Insertar una fracción en la base de datos
        const query = "INSERT INTO fracciones (fraccion, descripcion, area, num_articulo) VALUES (?, ?, ?, ?)";
        const fraccionData = [fraccion.fraccion, fraccion.descripcion, fraccion.area, fraccion.num_articulo];
        await connection.execute(query, fraccionData);

        // Devolver la fracción creada como respuesta
        res.json({
            fraccion: fraccion.fraccion,
            descripcion: fraccion.descripcion,
            area: fraccion.area,
            num_articulo: fraccion.num_articulo
        });
    } catch (error) {
        // Manejar errores
        console.error('Error al insertar fracción en la base de datos:', error.message);
        res.status(500).send('Error interno al crear una fracción');
    } finally {
        // Liberar la conexión a la base de datos
        connection.release();
    }
};

export const putFraccion = async (req, res) => {
    const { id_fraccion } = req.params;
    const fraccion = req.body;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Actualizar la fracción en la base de datos
        const query = "UPDATE fracciones SET fraccion = ?, descripcion = ?, area = ?, num_articulo = ? WHERE id_fraccion = ?";
        const fraccionData = [fraccion.fraccion, fraccion.descripcion, fraccion.area, fraccion.num_articulo, id_fraccion];
        await connection.execute(query, fraccionData);

        // Devolver la fracción actualizada como respuesta
        res.json({
            id_fraccion: id_fraccion,
            fraccion: fraccion.fraccion,
            descripcion: fraccion.descripcion,
            area: fraccion.area,
            num_articulo: fraccion.num_articulo
        });
    } catch (error) {
        // Manejar errores
        console.error('Error al actualizar la fracción en la base de datos:', error.message);
        res.status(500).send('Error interno al actualizar la fracción');
    } finally {
        // Liberar la conexión a la base de datos
        connection.release();
    }
};

export const deleteFraccion = async (req, res) => {
    const { id_fraccion } = req.params;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Verificar si la fracción existe
        const [rows] = await connection.execute("SELECT * FROM fracciones WHERE id_fraccion = ?", [id_fraccion]);
        if (!rows.length) {
            return res.status(404).json({ message: "Fracción no encontrada" });
        }

        // Eliminar la fracción de la base de datos
        await connection.execute("DELETE FROM fracciones WHERE id_fraccion = ?", [id_fraccion]);

        // Devolver una respuesta de éxito
        res.json({ message: "Fracción borrada correctamente", id_fraccion: id_fraccion });
    } catch (error) {
        // Manejar errores
        console.error('Error al borrar la fracción de la base de datos:', error.message);
        res.status(500).send('Error interno al borrar la fracción');
    } finally {
        // Liberar la conexión a la base de datos
        connection.release();
    }
};
