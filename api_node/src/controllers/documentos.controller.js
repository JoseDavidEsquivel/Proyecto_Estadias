// Imports de constantes
import {pool} from '../db.js'

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const getDocumentos = async (req, res) => {
    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Consultar todas las noticias
        const [documentos] = await connection.query("SELECT * FROM documentos");

        if (!documentos.length) {
            return res.status(404).json({ detail: "No hay documentos en la Base de datos" });
        }

        res.status(200).json(documentos);
    } catch (error) {
        console.error('Error al listar los documentos:', error.message);
        res.status(500).json({ detail: "Error interno al listar los documentos" });
    } finally {
        connection.release();
    }
}

export const getDocumentosFraccion = async (req, res) => {
    // Obtener el id_fraccion de los parámetros de la solicitud
    const { id_fraccion } = req.params;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Consultar documentos por id_fraccion
        const [documentos] = await connection.query("SELECT * FROM documentos WHERE id_fraccion = ?", [id_fraccion]);

        if (!documentos.length) {
            return res.status(404).json({ detail: "No hay documentos para el id_fraccion proporcionado" });
        }

        res.status(200).json(documentos);
    } catch (error) {
        console.error('Error al listar los documentos:', error.message);
        res.status(500).json({ detail: "Error interno al listar los documentos" });
    } finally {
        connection.release();
    }
}


export const getDocumento = async (req, res) => {
    const { id_documento } = req.params;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Consultar el documento por su ID
        const [documento] = await connection.query("SELECT * FROM documentos WHERE id_documento = ?", [id_documento]);

        if (!documento.length) {
            return res.status(404).json({ detail: "No existe un documento con ese id en la Base de datos" });
        }

        const respuesta = documento.map(row => ({
            id_documento: row.id_documento,
            documento: row.documento,
            ruta: row.ruta,
            trimestre: row.trimestre,
            año: row.año,
            id_fraccion: row.id_fraccion
        }));

        res.status(200).json(respuesta);
    } catch (error) {
        console.error('Error al obtener el documento:', error.message);
        res.status(500).json({ detail: "Error interno al obtener el documento" });
    } finally {
        connection.release();
    }
}

export const postDocumento = async (req, res) => {
    const { id_fraccion, periodo, trimestre } = req.body;
    const file = req.file;

    console.log(req.body)
    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Obtener el fraccion y num_articulo desde la base de datos
        const [fraccionArticulo] = await connection.query(`
            SELECT f.fraccion, a.num_articulo 
            FROM fracciones f
            JOIN articulos a ON f.num_articulo = a.num_articulo
            WHERE f.id_fraccion = ?
        `, [id_fraccion]);

        if (!fraccionArticulo.length) {
            return res.status(404).json({ detail: "Fracción o artículo no encontrado" });
        }

        const { fraccion, num_articulo: articulo } = fraccionArticulo[0];

        // Crear la ruta del archivo con la estructura especificada
        const directory = path.join("static/documents/transparencia", articulo.toString(), fraccion, periodo.toString());

        fs.mkdirSync(('src/' + directory), { recursive: true });
        const fileLocation = path.join('src/' + directory, file.originalname);

        // Asegurar que la ruta tenga barras normales
        const directoryUnix = directory.replace(/\\/g, '/');
        const fileLocationUnix = fileLocation.replace(/\\/g, '/');


        // Leer el contenido del archivo en el sistema de archivos
        fs.readFile(file.path, async (err, data) => {
            if (err) {
                console.error('Error al leer el archivo:', err.message);
                return res.status(500).json({ detail: "Error interno al leer el archivo" });
            }

            // Guardar el archivo localmente
            fs.writeFileSync(fileLocationUnix, data);

            // Insertar documento en la base de datos
            const query = "INSERT INTO documentos (documento, ruta, trimestre, año, id_fraccion) VALUES (?, ?, ?, ?, ?)";
            const eventoData = [file.originalname, directoryUnix, trimestre, periodo, id_fraccion];
            const [result] = await connection.query(query, eventoData);

            res.status(200).json({
                id_documento: result.insertId,
                documento: file.originalname,
                ruta: directoryUnix,
                trimestre: trimestre,
                año: periodo,
                id_fraccion: id_fraccion,
                ruta: fileLocationUnix
            });
        });
    } catch (error) {
        console.error('Error al insertar documento en la base de datos:', error.message);
        res.status(500).json({ detail: "Error interno al crear documento" });
    } finally {
        connection.release();
    }
};

export const borrarDocumento = async (req, res) => {
    const { id_documento } = req.params;

    // Conectar a la base de datos
    const connection = await pool.getConnection();

    try {
        // Verificar si el documento existe y obtener sus detalles
        const [documentoData] = await connection.query("SELECT documento, año, id_fraccion FROM documentos WHERE id_documento = ?", [id_documento]);

        if (!documentoData.length) {
            return res.status(404).json({ detail: "Documento no encontrado" });
        }
        
        const { documento, año, id_fraccion } = documentoData[0];

        // Obtener fraccion y num_articulo desde la base de datos
        const [fraccionArticulo] = await connection.query(`
            SELECT f.fraccion, a.num_articulo 
            FROM fracciones f
            JOIN articulos a ON f.num_articulo = a.num_articulo
            WHERE f.id_fraccion = ?
        `, [id_fraccion]);

        if (!fraccionArticulo.length) {
            return res.status(404).json({ detail: "Fracción o artículo no encontrado" });
        }

        const { fraccion, num_articulo } = fraccionArticulo[0];

        // Construir la ruta completa del archivo
        const fileLocation = path.join("src/static/documents/transparencia", num_articulo.toString(), fraccion, año.toString(), documento);

        // Eliminar el archivo localmente
        if (fs.existsSync(fileLocation)) {
            fs.unlinkSync(fileLocation);
        } else {
            return res.status(404).json({ detail: "Archivo no encontrado en el sistema de archivos" });
        }

        // Eliminar el documento de la base de datos
        await connection.query("DELETE FROM documentos WHERE id_documento = ?", [id_documento]);
        connection.commit();

        res.status(200).json({ message: "Documento borrado correctamente", id_documento: id_documento });
    } catch (error) {
        console.error('Error al borrar el documento en la base de datos:', error.message);
        res.status(500).json({ detail: "Error interno al borrar documento" });
    } finally {
        connection.release();
    }
};
