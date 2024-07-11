import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

// const host= 'https://localhost:8000'
const host = 'https://api-santiago.onrender.com'
// URL de la API
const API_URL = `${host}/color`;

// Ruta del archivo variables.scss
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scssFilePath = path.join(__dirname, 'src', 'components', 'variables.scss');

// Función para obtener los colores de la API
const getColorsFromAPI = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los colores de la API:', error);
    return null;
  }
};


// Función para generar el contenido de variables.scss
const generateScssContent = (colors) => {
  let scssContent = ':root {\n';
  
  // Iterar sobre los colores obtenidos de la API
  colors.forEach(color => {
    scssContent += `  --${color.nombre_color.replace(/\s+/g, '-').toLowerCase()}: ${color.valor_hex};\n`;
  });

  // Agregar el color blanco
  scssContent += '  --white: white;\n';

  scssContent += '}';
  return scssContent;
};

// Función para leer el contenido actual de variables.scss
const readCurrentScssContent = () => {
  try {
    if (fs.existsSync(scssFilePath)) {
      return fs.readFileSync(scssFilePath, 'utf-8');
    } else {
      return '';
    }
  } catch (error) {
    console.error('Error al leer el archivo variables.scss:', error);
    return '';
  }
};

// Función para escribir el contenido en variables.scss
const writeScssFile = (content) => {
  try {
    fs.writeFileSync(scssFilePath, content, 'utf-8');
  } catch (error) {
    console.error('Error al escribir el archivo variables.scss:', error);
  }
};

// Función principal para actualizar el archivo variables.scss
const updateScssFile = async () => {
  const colors = await getColorsFromAPI();
  if (colors) {
    const newScssContent = generateScssContent(colors);
    const currentScssContent = readCurrentScssContent();

    if (newScssContent !== currentScssContent) {
      writeScssFile(newScssContent);
      console.log('Archivo variables.scss actualizado.');
    } else {
      console.log('El archivo variables.scss ya está actualizado.');
    }
  }
};

updateScssFile();
