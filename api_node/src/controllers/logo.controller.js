// Imports de constantes
import { pool } from '../db.js';

// Librerias para trabajar
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Endpoint para listar el logo activo de la página
export const getLogos = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query("SELECT * FROM logo");
        if (rows.length > 0) {
            const respuesta = rows.map(row => ({
                archivo: row.imagen,
                ruta: row.ruta
            }));
            res.send(respuesta);
        } else {
            res.status(404).send("No hay un logo en la Base de datos");
        }
    } catch (error) {
        console.error("Error al listar el logo activo de la página:", error.message);
        res.status(500).send("Error interno al listar el logo");
    } finally {
        connection.release();
    }
}


export const subirLogo = async (req, res) => {
    const { file } = req;

    if (!file) {
        return res.status(400).send('No se ha enviado ningún archivo');
    }

    // Comprobar la extensión del archivo
    if (!file.originalname.toLowerCase().endsWith('.png')) {
        return res.status(400).send('Solo se permiten archivos con extensión .png');
    }

    const tempFilePath = path.join('src/static/temp',file.originalname);
    const finalFilePath = path.join('src/static/images/logos', file.originalname);

    try {
        // Guardar temporalmente el archivo
        await fs.promises.writeFile(tempFilePath, file.buffer);

        // Abrir la imagen y comprobar el tamaño
        const image = sharp(tempFilePath);
        const metadata = await image.metadata();

        if (metadata.width < 200 || metadata.height < 200) {
            await fs.promises.unlink(tempFilePath);
            return res.status(400).send('El logo tiene que ser mayor a 200x200');
        } else if (metadata.width > 1500 || metadata.height > 1500) {
            await fs.promises.unlink(tempFilePath);
            return res.status(400).send('El logo tiene que ser menor a 1500x1500');
        }

        // Mover el archivo al directorio final si pasa las validaciones
        await fs.promises.rename(tempFilePath, finalFilePath);

        // Actualizar la base de datos
        const connection = await pool.getConnection();
        const query = `
            UPDATE logo
            SET imagen = ?, ruta = ?
            WHERE id_logo = 1
        `;
        const usuarioData = [file.originalname, 'static/images/logos/'];

        await connection.execute(query, usuarioData);
        connection.release();

        res.json({ filename: file.originalname });
    } catch (error) {
        console.error('Error al subir el logo:', error.message);
        res.status(500).send('Error interno al subir el logo');
    }
};


export const borrarLogo = async (req, res) => {
    const defaultFilename = "no_image_default_logo.png";
    const defaultPath = "static/images/logos/";

    try {
        // Obtener el nombre del archivo actual desde la base de datos
        const connection = await pool.getConnection();
        const [rows] = await connection.query("SELECT imagen FROM logo WHERE id_logo = 1");
        connection.release();

        if (rows.length === 0) {
            return res.status(404).json({ message: "Logo no encontrado" });
        }

        const currentFilename = rows[0].imagen;

        // Actualizar la base de datos con el nombre del archivo por defecto
        const updateQuery = `
            UPDATE logo
            SET imagen = ?, ruta = ?
            WHERE id_logo = 1
        `;
        await pool.query(updateQuery, [defaultFilename, defaultPath]);

        // Borrar el archivo físico si no es el archivo por defecto
        if (currentFilename !== defaultFilename) {
            const currentFilePath = path.join(defaultPath, currentFilename);
            if (fs.existsSync(currentFilePath)) {
                fs.unlinkSync(currentFilePath);
            }
        }

        res.status(200).json({ message: "Logo borrado y reemplazado por el ícono por defecto" });
    } catch (error) {
        console.error('Error al borrar el logo:', error.message);
        res.status(500).send('Error interno al borrar el logo');
    }
};

