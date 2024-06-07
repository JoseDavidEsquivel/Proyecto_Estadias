// Imports de constantes
import {pool} from '../db.js'

// Imports a librerias
import * as crypto from 'crypto';

// Funciones extra
const generarContrasenaSalt = (contrasena) => {
    // Salt de 16 bytes (128 bits)
    const salt = crypto.randomBytes(16);  
    // Salt en Base64 para guardar en la base de datos
    const saltBase64 = salt.toString('base64');

    // Concatenar el salt con la contraseña original
    const contrasenaConSalt = Buffer.concat([salt, Buffer.from(contrasena)]);
    // Crear un hash SHA-256 de la contraseña con salt
    const sha256Hash = crypto.createHash('sha256').update(contrasenaConSalt).digest();
    // Codificar el hash resultante en Base64
    const contrasenaHashedBase64 = sha256Hash.toString('base64');
    
    return { contrasenaHashedBase64, saltBase64 };
}

// Usuarios
export const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id_usuario, nombre, area, estado, permisos FROM usuarios');
        if (rows.length > 0) {
            const respuesta = rows.map(usuario => ({
                id: usuario.id_usuario,
                nombre: usuario.nombre,
                area: usuario.area,
                estado: usuario.estado,
                permisos: usuario.permisos
            }));
            res.send(respuesta);
        } else {
            res.status(404).send("No hay usuarios en la Base de datos");
        }
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).send("Error interno al obtener los usuarios");
    }
}

export const getUsuario = async (req, res) => {
    const idUsuario = req.params.id_usuario;
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute('SELECT * FROM usuarios WHERE id_usuario = ?', [idUsuario]);
        if (rows.length > 0) {
            const respuesta = rows.map(usuario => ({
                id: usuario.id_usuario,
                nombre: usuario.nombre,
                area: usuario.area,
                estado: usuario.estado,
                permisos: usuario.permisos
            }));
            res.send(respuesta);
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).send("Error interno al obtener el usuario");
    } finally {
        connection.release();
    }
}

export const postUsuario = async (req, res) => {
    const usuario = req.body;
    const connection = await pool.getConnection();
    try {
        // Validar valores de estado y permisos
        if (usuario.estado !== '0' && usuario.estado !== '1') {
            throw new Error("El valor de 'estado' debe ser 0 o 1");
        }
        if (!['0', '1', '2'].includes(usuario.permisos)) {
            throw new Error("El valor de 'permisos' debe ser 0, 1 o 2");
        }
        
        
        usuario.estado = String(usuario.estado); // Convertimos a string el estado y permisos para que no tome como posición el valor
        usuario.permisos = String(usuario.permisos); // Si no, como el valor representado

        const { contrasenaHashedBase64, saltBase64 } = generarContrasenaSalt(usuario.contrasena);

        // Insertar nuevo usuario en la base de datos
        const query = "INSERT INTO usuarios (nombre, contrasena, area, estado, permisos, salt) VALUES (?, ?, ?, ?, ?, ?)";
        const usuarioData = [usuario.nombre, contrasenaHashedBase64, usuario.area, usuario.estado, usuario.permisos, saltBase64];
        await connection.execute(query, usuarioData);
        // Obtener el ID del nuevo usuario insertado
        const [result] = await connection.execute('SELECT LAST_INSERT_ID()');
        const nuevoID = result[0]['LAST_INSERT_ID()'];

        // Crear la respuesta con el ID del nuevo registro
        const respuesta = {
            id: nuevoID,
            nombre: usuario.nombre,
            area: usuario.area,
            estado: usuario.estado,
            permisos: usuario.permisos
        };

        res.send(respuesta);
    } catch (error) {
        console.error("Error al insertar usuario en la base de datos:", error.message);
        res.status(500).send("Error interno al crear usuario");
    } finally {
        connection.release();
    }
}

export const putUsuario = async (req, res) => {
    const idUsuario = req.params.id_usuario;
    const usuario = req.body;
    const connection = await pool.getConnection();
    try {
        // Validar valores de estado y permisos
        if (usuario.estado !== '0' && usuario.estado !== '1') {
            throw new Error("El valor de 'estado' debe ser '0' o '1'");
        }
        if (usuario.permisos !== '0' && usuario.permisos !== '1' && usuario.permisos !== '2') {
            throw new Error("El valor de 'permisos' debe ser 0, 1 o 2");
        }
        
        usuario.estado = String(usuario.estado); // Convertimos a string el estado y permisos para que no tome como posición el valor
        usuario.permisos = String(usuario.permisos); // Si no, como el valor representado

        // Obtener la contraseña y el salt actuales de la base de datos
        const [rows] = await connection.execute("SELECT contrasena, salt FROM usuarios WHERE id_usuario = ?", [idUsuario]);
        const resultado = rows[0];
        if (!resultado) {
            throw new Error(`Usuario con id ${idUsuario} no encontrado`);
        }
        
        const contrasenaActualHashed = resultado.contrasena;
        const saltActual = resultado.salt;

        // Verificar si la contraseña proporcionada es la misma que la almacenada
        let contrasenaHashed, salt;
        if (usuario.contrasena === contrasenaActualHashed) {
            contrasenaHashed = contrasenaActualHashed;
            salt = saltActual;
        } else {
            const { contrasenaHashedBase64, saltBase64 } = generarContrasenaSalt(usuario.contrasena);
            contrasenaHashed = contrasenaHashedBase64;
            salt = saltBase64;
        }

        // Actualizar usuario en la base de datos
        const query = `
            UPDATE usuarios
            SET nombre = ?, contrasena = ?, area = ?, estado = ?, permisos = ?, salt = ?
            WHERE id_usuario = ?
        `;
        const usuarioData = [usuario.nombre, contrasenaHashed, usuario.area, usuario.estado, usuario.permisos, salt, idUsuario];
        await connection.execute(query, usuarioData);
        await connection.commit();

        res.send({ mensaje: `Usuario con id ${idUsuario} actualizado correctamente` });
    } catch (error) {
        console.error("Error al actualizar usuario en la base de datos:", error.message);
        res.status(500).send("Error interno al editar usuario");
    } finally {
        connection.release();
    }
}

export const deleteUsuario = async (req, res) => {
    const idUsuario = req.params.id_usuario;
    const connection = await pool.getConnection();
    try {
        const query = "DELETE FROM usuarios WHERE id_usuario = ?";
        const [result] = await connection.execute(query, [idUsuario]);
        await connection.commit();

        if (result.affectedRows > 0) {
            res.send({ mensaje: `Usuario con id ${idUsuario} eliminado correctamente` });
        } else {
            res.status(404).send(`Usuario con id ${idUsuario} no encontrado`);
        }
    } catch (error) {
        console.error("Error al borrar usuario en la base de datos:", error.message);
        res.status(500).send("Error interno al borrar usuario");
    } finally {
        connection.release();
    }
}

