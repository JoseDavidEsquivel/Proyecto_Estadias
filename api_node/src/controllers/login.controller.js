// Imports de constantes
import {pool} from '../db.js'

// Imports a librerias
import * as crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const jwtSign = promisify(jwt.sign);

// Clave secreta para firmar los tokens JWT
const SECRET_KEY = "MEXICO_0-4_URUGUAY";

// Función para verificar las credenciales
const verificarCredenciales = async (nombre, contrasena) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute('SELECT contrasena, salt, permisos, estado, area FROM usuarios WHERE nombre = ?', [nombre]);
        const usuario = rows[0];

        if (usuario) {
            const { contrasena: contrasenaDB, salt: saltBase64, estado } = usuario;
            const saltOriginal = Buffer.from(saltBase64, 'base64');

            // Generar hash SHA-256 de la contraseña proporcionada con el salt de la base de datos
            const contrasenaConSalt = Buffer.concat([saltOriginal, Buffer.from(contrasena)]);
            const sha256Hash = crypto.createHash('sha256').update(contrasenaConSalt).digest();
            const contrasenaHashed = sha256Hash.toString('base64');

            if (contrasenaHashed === contrasenaDB) {
                if (estado === '0') {
                    return { mensaje: "Usuario no activo" };
                } else {
                    let rol;
                    if (usuario.permisos === '0') {
                        rol = 'director area';
                    } else if (usuario.permisos === '1') {
                        rol = 'administrador';
                    } else {
                        rol = 'director transparencia';
                    }
                    const area = usuario.area;

                    // Generar el token JWT
                    const token = await jwtSign(
                        {
                            nombre,
                            rol,
                            area,
                            exp: Math.floor(Date.now() / 1000) + (60 * 60) // Expira en 1 hora
                        },
                        SECRET_KEY
                    );

                    return { mensaje: "Credenciales correctas", rol, area, token };
                }
            } else {
                return { mensaje: "Credenciales incorrectas" };
            }
        } else {
            return { mensaje: "Usuario no encontrado" }; // Mensaje de usuario no encontrado
        }
    } catch (error) {
        console.error("Error al verificar credenciales en la base de datos:", error);
        return { mensaje: "Error al verificar credenciales en la base de datos" };
    } finally {
        connection.release();
    }
}

// Login
export const login = async (req, res) => {
    const credenciales = req.body;
    console.log
    const resultadoVerificacion = await verificarCredenciales(credenciales.nombre, credenciales.contrasena);

    if (resultadoVerificacion.mensaje === "Credenciales correctas") {
        res.send({
            mensaje: "Sesión iniciada",
            rol: resultadoVerificacion.rol,
            area: resultadoVerificacion.area,
            token: resultadoVerificacion.token
        });
    } else if (resultadoVerificacion.mensaje === "Usuario no activo") {
        res.status(403).send("Usuario no activo");
    } else {
        res.status(401).send("Credenciales incorrectas");
    }
}