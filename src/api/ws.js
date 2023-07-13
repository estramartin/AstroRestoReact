import { BASE_WS } from "../utils/constants";
import { w3cwebsocket } from 'websocket';

export const connect = async () => {
    console.log(BASE_WS);
    const client =  new w3cwebsocket(BASE_WS);
    return client;
}

export const disconnect = async (client) => {
    client.close();
}

export const sendMessage = async (client, message) => {
    client.send(message);
}

export const onMessage = async (client, onMessage) => {
    client.onmessage = onMessage;
}

export const onClose = async (client, onClose) => {
    client.onclose = onClose;
}

export const onOpen = async (client, onOpen) => {
    client.onopen = onOpen;
}

