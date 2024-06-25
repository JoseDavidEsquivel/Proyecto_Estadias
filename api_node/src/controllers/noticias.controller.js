// Imports de constantes
import {pool} from '../db.js'

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const getNoticias = async (req, res) => {
    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Consultar todas las noticias
        const [noticias] = await connection.query("SELECT * FROM noticias");

        if (!noticias.length) {
            return res.status(404).json({ detail: "No hay noticias en la Base de datos" });
        }

        res.status(200).json(noticias);
    } catch (error) {
        console.error('Error al listar las noticias:', error.message);
        res.status(500).json({ detail: "Error interno al listar las noticias" });
    } finally {
        connection.release();
    }
}

export const getNoticia = async (req, res) => {
    const { id_noticia } = req.params;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Consultar la noticia con el ID proporcionado
        const [noticias] = await connection.query("SELECT * FROM noticias WHERE id_noticia = ?", [id_noticia]);

        if (!noticias.length) {
            return res.status(404).json({ detail: "No hay noticias con ese id en la Base de datos" });
        }

        res.status(200).json(noticias[0]);
    } catch (error) {
        console.error('Error al obtener la noticia:', error.message);
        res.status(500).json({ detail: "Error interno al obtener la noticia" });
    } finally {
        connection.release();
    }
}

// Función para sanitizar nombres de archivos
const sanitizeFilename = (filename) => {
    return filename.replace(/[^a-z0-9_\-\.]/gi, '_').toLowerCase();
};


export const postNoticia = async (req, res) => {
    const { titulo, contenido } = req.body;
    const { file } = req;

    const tempFilePath = path.join('src/static/temp', file.filename);

    try {
        // Validar tamaño de la imagen
        const image = sharp(tempFilePath);
        const metadata = await image.metadata();

        if (metadata.width < 200 || metadata.height < 200) {
            await fs.promises.unlink(tempFilePath);
            return res.status(400).json({ detail: "La imagen tiene que ser mayor a 200x200" });
        } else if (metadata.width > 5000 || metadata.height > 5000) {
            await fs.promises.unlink(tempFilePath);
            return res.status(400).json({ detail: "La imagen tiene que ser menor a 5000x5000" });
        }

        // Ruta y nombre de archivo sanitizado
        const sanitizedFilename = sanitizeFilename(file.originalname);
        const finalFilePath = path.join('src/static/images/noticias', sanitizedFilename);

        // Mover el archivo de la carpeta temp a la carpeta final
        await fs.promises.rename(tempFilePath, finalFilePath);

        // Insertar datos en la base de datos
        const connection = await pool.getConnection();
        const query = 'INSERT INTO noticias (titulo, contenido, imagen, ruta) VALUES (?, ?, ?, ?)';
        const data = [titulo, contenido, sanitizedFilename, 'static/images/noticias/'];
        await connection.execute(query, data);
        connection.release();

        res.json({
            titulo,
            contenido,
            imagen: sanitizedFilename,
            ruta: 'static/images/noticias/'
        });
    } catch (error) {
        console.error('Error al crear la noticia:', error.message);
        res.status(500).send('Error interno al crear la noticia');
    }
};

export const putNoticia = async (req, res) => {
    const { id_noticia }= req.params;
    const { titulo, contenido } = req.body;
    const { file } = req;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        if (file) {
            // Guardar temporalmente el archivo
            const tempFilePath = path.join('src/static/temp', file.filename);

            const image = sharp(tempFilePath);
            const metadata = await image.metadata();

            if (metadata.width < 200 || metadata.height < 200) {
                await fs.promises.unlink(tempFilePath);
                return res.status(400).json({ detail: "La imagen tiene que ser mayor a 200x200" });
            } else if (metadata.width > 1500 || metadata.height > 1500) {
                await fs.promises.unlink(tempFilePath);
                return res.status(400).json({ detail: "La imagen tiene que ser menor a 1500x1500" });
            }

            // Ruta final del archivo
            const finalFilePath = path.join('src/static/images/noticias', file.originalname);
            await fs.promises.rename(tempFilePath, finalFilePath);

            // Actualizar los datos en la base de datos con la imagen
            const query = 'UPDATE noticias SET titulo=?, contenido=?, imagen=? WHERE id_noticia=?';
            const usuarioData = [titulo, contenido, file.originalname, id_noticia];
            await connection.execute(query, usuarioData);
        } else {
            // Actualizar los datos en la base de datos sin cambiar la imagen
            const query = 'UPDATE noticias SET titulo=?, contenido=? WHERE id_noticia=?';
            const usuarioData = [titulo, contenido, id_noticia];
            await connection.execute(query, usuarioData);
        }

        connection.release();

        res.json({
            id_noticia,
            titulo,
            imagen: file ? file.originalname : "No se cambió la imagen"
        });
    } catch (error) {
        console.error('Error al editar la noticia:', error.message);
        res.status(500).send('Error interno al editar la noticia');
    }
}

export const deleteNoticia = async (req, res) => {
    const { id_noticia } = req.params;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Verificar si la noticia existe y obtener la información del archivo
        const [aviso] = await connection.execute("SELECT imagen FROM noticias WHERE id_noticia=?", [id_noticia]);
        
        if (aviso.length === 0) {
            return res.status(404).json({ detail: "Noticia no encontrada" });
        }

        // Obtener el nombre del archivo
        const file_name = aviso[0].imagen;
        const file_path = path.join('src/static/images/noticias', file_name);

        // Eliminar la noticia de la base de datos
        await connection.execute("DELETE FROM noticias WHERE id_noticia=?", [id_noticia]);
        connection.release();

        // Eliminar el archivo de imagen si existe
        if (fs.existsSync(file_path)) {
            fs.unlinkSync(file_path);
        }
        
        res.json({ message: "Noticia borrada correctamente", id_noticia });
    } catch (error) {
        console.error('Error al borrar la noticia:', error.message);
        res.status(500).send('Error interno al borrar la noticia');
    }
}