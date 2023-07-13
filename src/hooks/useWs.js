import { useState } from "react";
import { useAuth } from "./useAuth";
import {
    connect,
    disconnect,
    sendMessage,
    onMessage,
    onClose,
    onOpen,    
} from "../api/ws";

export const useWs = () => {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ws, setWs] = useState(null);

    const connectWs = async () => {
        try {
            setLoading(true);
            const response = await connect();
            setWs(response);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const disconnectWs = async () => {
        try {
            setLoading(true);
            const response = await disconnect();
            setWs(response);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const sendMessageWs = async (message) => {
        try {
            setLoading(true);
            const response = await sendMessage(ws, message);
            setWs(response);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const onMessageWs = async (onMessage) => {
        try {
            setLoading(true);
            const response = await onMessage(ws, onMessage);
            setWs(response);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const onCloseWs = async (onClose) => {
        try {
            setLoading(true);
            const response = await onClose(ws, onClose);
            setWs(response);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    const onOpenWs = async (onOpen) => {
        try {
            setLoading(true);
            const response = await onOpen(ws, onOpen);
            setWs(response);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    };

    return{
        loading,
        error,
        ws,
        connectWs,
        disconnectWs,
        sendMessageWs,
        onMessageWs,
        onCloseWs,
        onOpenWs,        
    }
};