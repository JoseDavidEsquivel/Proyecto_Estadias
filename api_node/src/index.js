import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';  // Importar fileURLToPath para manejar la ruta del módulo

import employeesRoutes from './routes/employees.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import loginRoutes from './routes/login.routes.js';
import logosRoutes from './routes/logo.routes.js';
import coloresRoutes from './routes/colores.routes.js'
import avisosRoutes from './routes/avisos.routes.js'
import ubicacionesRoutes from './routes/ubicaciones.routes.js'
import noticiasRoutes from './routes/noticias.routes.js'
import eventosRoutes from './routes/eventos.routes.js'
import botRoutes from './routes/bot.routes.js'
import articulosRoutes from './routes/articulos.routes.js'
import fraccionesRoutes from './routes/fracciones.routes.js'
import añoRoutes from './routes/años.routes.js'
import documentosRoutes from './routes/documentos.routes.js'


const app = express();

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors()); // Usar CORS para permitir todas las conexiones
app.use(express.json()); // Habilitar el procesamiento de JSON en el cuerpo de las solicitudes

// Rutas para el funcionamiento de la API
app.use(employeesRoutes)
app.use(usuariosRoutes)
app.use(loginRoutes)
app.use(logosRoutes)
app.use(coloresRoutes)
app.use(avisosRoutes)
app.use(ubicacionesRoutes)
app.use(noticiasRoutes)
app.use(eventosRoutes)
app.use(botRoutes)
app.use(articulosRoutes)
app.use(fraccionesRoutes)
app.use(añoRoutes)
app.use(documentosRoutes)


// Montar el directorio estático
app.use('/static', express.static(path.join(__dirname, 'static')));

app.listen(8000, () => {
    console.log('API funcionando en el Puerto 8000');
    // console.log(path.join(__dirname, 'static'));

});
