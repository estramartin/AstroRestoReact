import { useState } from "react";
import { useAuth } from "./useAuth";
import {
  getOrdersApi,
  getOrderApi,
  addOrderToTableApi,
  updateOrdersApi,
  deleteOrdersApi,
  getOrdersByTableApi,
  checkDeliveredOrderApi,
  addPaymentToOrderApi,
  closeOrderApi,
  getOrderByPaymentApi,
} from "../api/orders";

export const useOrder = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrder] = useState(null);

  const getOrdersByTable = async (idTable, status, ordering) => {
    try {
      setLoading(true);
      const response = await getOrdersByTableApi(idTable, status, ordering);
      setOrder(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const checkDeliveredOrder = async (idOrder) => {
    try {
      setLoading(true);
      const response = await checkDeliveredOrderApi(idOrder);
      setOrder(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrdersApi();
      setOrder(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getOrder = async (id) => {
    try {
      setLoading(true);
      const response = await getOrderApi(id);
      setOrder(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteOrders = async (id) => {
    try {
      setLoading(true);
      const response = await deleteOrdersApi(id);
      setOrder(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addOrderToTable = async (idTable, idPorduct) => {
    try {
      setLoading(true);
      const response = await addOrderToTableApi(idTable, idPorduct);
      setOrder(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateOrder = async (id, order) => {
    try {
      setLoading(true);
      const response = await updateOrdersApi(id, order);
      setOrder(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addPaymentToOrder = async (idOrder, idPayment) => {
    try {
      setLoading(true);
      const response = await addPaymentToOrderApi(idOrder, idPayment);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const closeOrder = async (idOrder) => {
    try {
      setLoading(true);
      const response = await closeOrderApi(idOrder);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getOrderByPayment = async (idPayment) => {
    try {
      setLoading(true);
      const response = await getOrderByPaymentApi(idPayment);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    orders,
    getOrders,
    getOrder,
    deleteOrders,
    addOrderToTable,
    updateOrder,
    getOrdersByTable,
    checkDeliveredOrder,
    addPaymentToOrder,
    closeOrder,
    getOrderByPayment,
  };
};
