// Imports de constantes
import {pool} from '../db.js'

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const getAvisos = async (req, res) => {
    try {
        // Obtener una conexión de la pool
        const connection = await pool.getConnection();

        // Ejecutar la consulta SQL para obtener los avisos
        const [rows] = await connection.query('SELECT * FROM carrusel');

        // Liberar la conexión de vuelta a la pool
        connection.release();

        // Verificar si hay datos
        if (rows.length > 0) {
            // Mapear los resultados a un formato deseado
            const respuesta = rows.map(row => ({
                id_aviso: row.id_imagen,
                imagen: row.imagen,
                ruta: row.ruta,
                estado: row.estado,
                url: row.url
            }));

            // Retornar la respuesta
            res.json(respuesta);
        } else {
            // Si no hay datos, lanzar un error 404
            res.status(404).json({ message: 'No hay avisos en la Base de datos' });
        }
    } catch (error) {
        // Manejar cualquier error interno
        console.error('Error al listar los avisos:', error.message);
        res.status(500).send('Error interno al listar los avisos');
    }
}

export const getAvisosActivos =async (req, res) => {
    try {
        // Obtener una conexión de la pool
        const connection = await pool.getConnection();

        // Ejecutar la consulta SQL para obtener los avisos activos
        const [rows] = await connection.query("SELECT * FROM carrusel WHERE estado ='1'");

        // Liberar la conexión de vuelta a la pool
        connection.release();

        // Verificar si hay datos
        if (rows.length > 0) {
            // Mapear los resultados a un formato deseado
            const respuesta = rows.map(row => ({
                id_aviso: row.id_imagen,
                imagen: row.imagen,
                ruta: row.ruta,
                estado: row.estado,
                url: row.url
            }));

            // Retornar la respuesta
            res.json(respuesta);
        } else {
            // Si no hay datos, lanzar un error 404
            res.status(404).json({ message: 'No hay avisos activos en la Base de datos' });
        }
    } catch (error) {
        // Manejar cualquier error interno
        console.error('Error al listar los avisos activos:', error.message);
        res.status(500).send('Error interno al listar los avisos activos');
    }
}

export const getAviso = async (req, res) => {
    const { id_aviso } = req.params;

    try {
        // Obtener una conexión de la pool
        const connection = await pool.getConnection();

        // Ejecutar la consulta SQL para obtener el aviso específico
        const [rows] = await connection.query('SELECT * FROM carrusel WHERE id_imagen = ?', [id_aviso]);

        // Liberar la conexión de vuelta a la pool
        connection.release();

        // Verificar si hay datos
        if (rows.length > 0) {
            // Mapear los resultados a un formato deseado
            const respuesta = rows.map(row => ({
                id_aviso: row.id_imagen,
                imagen: row.imagen,
                ruta: row.ruta,
                estado: row.estado,
                url: row.url
            }));

            // Retornar la respuesta
            res.json(respuesta);
        } else {
            // Si no hay datos, lanzar un error 404
            res.status(404).json({ message: 'No existe ese aviso en la Base de datos' });
        }
    } catch (error) {
        // Manejar cualquier error interno
        console.error('Error al listar el aviso:', error.message);
        res.status(500).send('Error interno al listar el aviso');
    }
}

// Función para sanitizar nombres de archivos
const sanitizeFilename = (filename) => {
    return filename.replace(/[^a-z0-9_\-\.]/gi, '_').toLowerCase();
};

export const postAviso = async (req, res) => {
    const { estado, url } = req.body;
    const { file } = req;


    console.log(file)
    // Validar valores de estado
    if (!['0', '1'].includes(estado)) {
        return res.status(400).json({ detail: "El valor de 'estado' debe ser '0' o '1'" });
    }

    // Ruta temporal del archivo
    const tempFilePath = path.join('src/static/temp', file.filename);

    try {
        // Comprobar el tamaño de la imagen
        const image = sharp(tempFilePath);
        const metadata = await image.metadata();

        if (metadata.width < 200 || metadata.height < 200) {
            await fs.promises.unlink(tempFilePath);
            return res.status(400).json({ detail: "La imagen tiene que ser mayor a 200x200" });
        } else if (metadata.width > 5000 || metadata.height > 5000) {
            await fs.promises.unlink(tempFilePath);
            return res.status(400).json({ detail: "La imagen tiene que ser menor a 5000x5000" });
        }

        // Sanitizar el nombre del archivo
        const sanitizedFilename = sanitizeFilename(file.originalname);

        // Ruta final del archivo
        const finalFilePath = path.join('src/static/images/carrusel', sanitizedFilename);

        // Asegúrate de que la carpeta de destino exista
        const finalDir = path.dirname(finalFilePath);
        await fs.promises.mkdir(finalDir, { recursive: true });

        // Renombrar el archivo
        await fs.promises.rename(tempFilePath, finalFilePath);

        // Conectar a la base de datos
        const connection = await pool.getConnection();

        // Insertar datos en la base de datos
        const query = 'INSERT INTO carrusel (imagen, ruta, estado, url) VALUES (?, ?, ?, ?)';
        const usuarioData = [sanitizedFilename, 'static/images/carrusel/', estado, url];
        await connection.execute(query, usuarioData);
        connection.release();

        res.json({
            filename: sanitizedFilename,
            estado,
            url
        });
    } catch (error) {
        console.error('Error al crear el aviso:', error.message);
        res.status(500).send('Error interno al crear el aviso');
    }
}

export const putAviso = async (req, res) => {
    const { id_aviso } = req.params;
    const { estado, url } = req.body;
    const { file } = req;

    // Validar valores de estado
    if (!['0', '1'].includes(estado)) {
        return res.status(400).json({ detail: "El valor de 'estado' debe ser '0' o '1'" });
    }

    let usuarioData;
    let query;
    let sanitizedFilename = ''; // Declarar sanitizedFilename fuera del bloque if (file)

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        if (file) {
            // Ruta temporal del archivo
            const tempFilePath = path.join('src/static/temp', file.filename);

            // Comprobar el tamaño de la imagen
            const image = sharp(tempFilePath);
            const metadata = await image.metadata();

            if (metadata.width < 200 || metadata.height < 200) {
                await fs.promises.unlink(tempFilePath);
                return res.status(400).json({ detail: "La imagen tiene que ser mayor a 200x200" });
            } else if (metadata.width > 1500 || metadata.height > 1500) {
                await fs.promises.unlink(tempFilePath);
                return res.status(400).json({ detail: "La imagen tiene que ser menor a 1500x1500" });
            }

            // Sanitizar el nombre del archivo
            sanitizedFilename = sanitizeFilename(file.originalname);

            // Ruta final del archivo
            const finalFilePath = path.join('src/static/images/carrusel', sanitizedFilename);
            await fs.promises.rename(tempFilePath, finalFilePath);

            // Actualizar los datos en la base de datos
            query = 'UPDATE carrusel SET imagen = ?, ruta = ?, estado = ?, url = ? WHERE id_imagen = ?';
            usuarioData = [sanitizedFilename, 'static/images/carrusel/', estado, url, id_aviso];
        } else {
            // Actualizar los datos en la base de datos sin cambiar la imagen
            query = 'UPDATE carrusel SET estado = ?, url = ? WHERE id_imagen = ?';
            usuarioData = [estado, url, id_aviso];
        }

        await connection.execute(query, usuarioData);
        connection.release();

        // Definir el nombre de archivo para la respuesta JSON
        const filenameResponse = file ? sanitizedFilename : "No se cambió la imagen";

        res.json({
            id_aviso: id_aviso,
            estado,
            url,
            filename: filenameResponse
        });
    } catch (error) {
        console.error('Error al editar el aviso:', error.message);
        res.status(500).send('Error interno al editar el aviso');
    }
}
export const deleteAviso = async (req, res) => {
    const { id_aviso } = req.params;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Verificar si el aviso existe y obtener la información del archivo
        const [aviso] = await connection.query("SELECT imagen FROM carrusel WHERE id_imagen=?", [id_aviso]);

        if (aviso.length === 0) {
            return res.status(404).json({ detail: "Aviso no encontrado" });
        }

        // Obtener el nombre del archivo
        const file_name = aviso[0].imagen;
        const file_path = path.join('src/static/images/carrusel', file_name);

        // Eliminar el aviso de la base de datos
        await connection.query("DELETE FROM carrusel WHERE id_imagen=?", [id_aviso]);
        connection.release();

        // Eliminar el archivo de imagen si existe
        if (fs.existsSync(file_path)) {
            fs.unlinkSync(file_path);
        }

        res.json({ message: "Aviso borrado correctamente", aviso_id: id_aviso });
    } catch (error) {
        console.error('Error al borrar el aviso:', error.message);
        res.status(500).send('Error interno al borrar el aviso');
    }
}