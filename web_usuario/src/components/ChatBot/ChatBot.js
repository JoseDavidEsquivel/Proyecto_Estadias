import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { host } from '../../conexion.js'; // Asegúrate de que esta importación apunte a tu archivo de configuración del host

const ChatbotComponent = () => {
    const [userData, setUserData] = useState({ nombre: '', correo: '', problema: '' });

    const theme = {
        background: '#f5f8fb',
        headerBgColor: '#e73c4c',
        headerFontColor: '#fff',
        headerFontSize: '20px',
        fontFamily: 'Signika bold',
        botBubbleColor: '#ececec',
        botFontColor: '#00000',
        botFontSize: '15px',
        userBubbleColor: '#e73c4c',
        userFontColor: '#fff',
        userFontSize: '15px',
    };

    const handleEnd = ({ values }) => {
        // Aquí se recopilan los datos del usuario y se envía la solicitud POST
        const [nombre, correo, problema] = values;
        const data = {
            nombre,
            correo,
            problema,
            area: 'ciudadania'
        };

        fetch(`${host}/bot/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const steps = [
        {
            id: '1',
            message: 'Hola, ¿cómo te llamas?',
            trigger: 'name',
        },
        {
            id: 'name',
            user: true,
            validator: (value) => {
                if (value.trim().length === 0) {
                    return 'Por favor, ingresa tu nombre';
                }
                setUserData((prevData) => ({ ...prevData, nombre: value }));
                return true;
            },
            trigger: '3',
        },
        {
            id: '3',
            message: '¿Cuál es tu correo electrónico?',
            trigger: 'email',
        },
        {
            id: 'email',
            user: true,
            validator: (value) => {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(value)) {
                    return 'Por favor, ingresa un correo electrónico válido';
                }
                setUserData((prevData) => ({ ...prevData, correo: value }));
                return true;
            },
            trigger: '5',
        },
        {
            id: '5',
            message: '¿En qué puedo ayudarte?',
            trigger: 'options',
        },
        {
            id: 'options',
            options: [
                { value: 'trámites', label: 'Trámites', trigger: 'trámites' },
                { value: 'noticias', label: 'Noticias', trigger: 'noticias' },
                { value: 'eventos', label: 'Eventos', trigger: 'eventos' },
                { value: 'funcionarios', label: 'Funcionarios', trigger: 'funcionarios' },
                { value: 'dependencias', label: 'Dependencias', trigger: 'dependencias' },
                { value: 'otro', label: 'Otro servicio', trigger: 'otro' },
            ],
        },
        {
            id: 'trámites',
            message: '¿Qué trámite deseas realizar?',
            trigger: 'trámites-options',
        },
        {
            id: 'trámites-options',
            options: [
                { value: 'acta', label: 'Acta de nacimiento', trigger: 'acta' },
                { value: 'cartilla', label: 'Cartilla militar', trigger: 'cartilla' },
                { value: 'predial', label: 'Pago predial', trigger: 'predial' },
            ],
        },
        {
            id: 'acta',
            message: 'Para tramitar tu acta de nacimiento, visita nuestra oficina...',
            trigger: 'more-help',
        },
        {
            id: 'cartilla',
            message: 'Para tramitar tu cartilla militar, visita nuestra oficina...',
            trigger: 'more-help',
        },
        {
            id: 'predial',
            message: 'Para realizar el pago predial, visita nuestra oficina...',
            trigger: 'more-help',
        },
        {
            id: 'noticias',
            message: 'En esta página tenemos las noticias más importantes de Santiago.',
            trigger: 'noticias-link',
        },
        {
            id: 'noticias-link',
            component: (
                <a href="/noticias" target="_blank" rel="noopener noreferrer">
                    Ir a Noticias
                </a>
            ),
            trigger: 'more-help',
        },
        {
            id: 'eventos',
            message: 'En esta página tenemos los eventos más recientes e importantes de Santiago.',
            trigger: 'eventos-link',
        },
        {
            id: 'eventos-link',
            component: (
                <a href="/turismo/eventos" target="_blank" rel="noopener noreferrer">
                    Ir a Eventos
                </a>
            ),
            trigger: 'more-help',
        },
        {
            id: 'funcionarios',
            message: 'En esta página tenemos el Directorio de nuestros funcionarios.',
            trigger: 'funcionarios-link',
        },
        {
            id: 'funcionarios-link',
            component: (
                <a href="/gobierno/directorio" target="_blank" rel="noopener noreferrer">
                    Ir a Directorio
                </a>
            ),
            trigger: 'more-help',
        },
        {
            id: 'dependencias',
            message: 'En esta página tenemos las dependencias más importantes de Santiago.',
            trigger: 'dependencias-link',
        },
        {
            id: 'dependencias-link',
            component: (
                <a href="/gobierno/dependencias" target="_blank" rel="noopener noreferrer">
                    Ir a Dependencias
                </a>
            ),
            trigger: 'more-help',
        },
        {
            id: 'otro',
            message: '¿Cuál es tu situación?',
            trigger: 'situation',
        },
        {
            id: 'situation',
            user: true,
            validator: (value) => {
                if (value.trim().length === 0) {
                    return 'Por favor, describe tu situación';
                }
                setUserData((prevData) => ({ ...prevData, problema: value }));
                return true;
            },
            trigger: 'situation-response',
        },
        {
            id: 'situation-response',
            message: 'Nos pondremos en contacto contigo para resolver tu situación.',
            trigger: 'more-help',
        },
        {
            id: 'more-help',
            message: '¿Te puedo ayudar con algo más?',
            trigger: 'help-options',
        },
        {
            id: 'help-options',
            options: [
                { value: 'sí', label: 'Sí', trigger: 'options' },
                { value: 'no', label: 'No', trigger: 'end' },
            ],
        },
        {
            id: 'end',
            message: 'Gracias por utilizar nuestros servicios. ¡Hasta luego!',
            end: true,
        },
    ];

    return (
        <ThemeProvider theme={theme}>
            <ChatBot steps={steps} floating={true} handleEnd={handleEnd} width="400px" />
        </ThemeProvider>
    );
};

export default ChatbotComponent;
