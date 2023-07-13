import React, { useEffect } from 'react';
import { w3cwebsocket } from 'websocket';
import { BASE_API } from '../../../utils/constants';

const NotificationComponent = () => {
    useEffect(() => {
        // Establece la conexión websocket
        const client = new w3cwebsocket(`ws://localhost:8080/ws/notifications/`);

        // Evento onopen: se ejecuta cuando la conexión websocket se establece correctamente
        client.onopen = () => {
            console.log('Conexión establecida');
        };

        // Evento onmessage: se ejecuta cuando se recibe un mensaje desde el backend
        client.onmessage = (message) => {
           
            console.log(message);
            alert('nuevo pedido')
            // Lógica para manejar las notificaciones en el frontend
        };

        // Evento onclose: se ejecuta cuando la conexión websocket se cierra
        client.onclose = () => {
            console.log('Conexión cerrada');
        };

        return () => {
            // Cierra la conexión websocket al desmontar el componente
            client.close();
        };
    }, []);

    return <div>Componente de Notificaciones</div>;
};

export default NotificationComponent;