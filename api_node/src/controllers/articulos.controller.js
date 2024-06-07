// Imports de constantes
import {pool} from '../db.js'


export const getArticulos = async (req, res) => {
    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        const [rows] = await connection.execute("SELECT * FROM articulos");

        if (rows.length > 0) {
            const respuesta = rows.map(articulo => ({
                id_articulo: articulo.id_articulo,
                num_articulo: articulo.num_articulo
            }));
            res.json(respuesta);
        } else {
            res.status(404).json({ detail: "No hay artículos en la Base de datos" });
        }
    } catch (error) {
        console.error('Error al listar los artículos:', error.message);
        res.status(500).send('Error interno al listar los artículos');
    } finally {
        connection.release();
    }
};

export const getArticulo = async (req, res) => {
    const { id_articulo } = req.params;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        const [rows] = await connection.execute("SELECT * FROM articulos WHERE id_articulo = ?", [id_articulo]);

        if (rows.length > 0) {
            const respuesta = rows.map(articulo => ({
                id_articulo: articulo.id_articulo,
                num_articulo: articulo.num_articulo
            }));
            res.json(respuesta);
        } else {
            res.status(404).json({ detail: "No existe un artículo con ese id en la Base de datos" });
        }
    } catch (error) {
        console.error('Error al buscar el artículo:', error.message);
        res.status(500).send('Error interno al buscar el artículo');
    } finally {
        connection.release();
    }
};

export const postArticulo = async (req, res) => {
    const { num_articulo } = req.body;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Insertar un artículo en la base de datos
        const query = "INSERT INTO articulos (num_articulo) VALUES (?)";
        const [result] = await connection.execute(query, [num_articulo]);

        // Verificar si la inserción fue exitosa
        if (result.affectedRows === 1) {
            res.json({ num_articulo });
        } else {
            res.status(500).json({ detail: "Error interno al crear un artículo" });
        }
    } catch (error) {
        console.error('Error al insertar artículo en la base de datos:', error.message);
        res.status(500).send('Error interno al crear un artículo');
    } finally {
        connection.release();
    }
};

export const putArticulo = async (req, res) => {
    const { id_articulo } = req.params;
    const { num_articulo } = req.body;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Actualizar artículo en la base de datos
        const query = "UPDATE articulos SET num_articulo = ? WHERE id_articulo = ?";
        const [result] = await connection.execute(query, [num_articulo, id_articulo]);

        // Verificar si la actualización fue exitosa
        if (result.affectedRows === 1) {
            res.json({ 'Nuevo articulo editado': num_articulo });
        } else {
            res.status(500).json({ detail: "Error interno al actualizar el artículo" });
        }
    } catch (error) {
        console.error('Error al actualizar el artículo en la base de datos:', error.message);
        res.status(500).send('Error interno al actualizar el artículo');
    } finally {
        connection.release();
    }
};

export const deleteArticulo = async (req, res) => {
    const { id_articulo } = req.params;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Verificar si el artículo existe
        const [aviso] = await connection.execute("SELECT * FROM articulos WHERE id_articulo = ?", [id_articulo]);
        
        if (aviso.length === 0) {
            res.status(404).json({ detail: "Artículo no encontrado" });
            return;
        }

        // Eliminar el artículo de la base de datos
        const [result] = await connection.execute("DELETE FROM articulos WHERE id_articulo = ?", [id_articulo]);

        // Verificar si la eliminación fue exitosa
        if (result.affectedRows === 1) {
            res.json({ message: "Artículo borrado correctamente", id_articulo: id_articulo });
        } else {
            res.status(500).json({ detail: "Error al borrar el artículo" });
        }
    } catch (error) {
        console.error('Error al borrar el artículo en la base de datos:', error.message);
        res.status(500).send('Error interno al borrar el artículo');
    } finally {
        connection.release();
    }
};
