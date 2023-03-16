import React, { useState } from "react";
import {
  createPaymentApi,
  getPaymentByTableApi,
  closePaymentApi,
  getPaymentsApi,
} from "../api/paymet";
import { useAuth } from "./useAuth";

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [payment, setPayment] = useState(null);
  const [payments, setPayments] = useState(null);
  const { auth } = useAuth();

  const createPayment = async (paymentData) => {
    try {
      setLoading(true);
      const response = await createPaymentApi(paymentData);
      setPayment(response);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getPaymentByTable = async (idTable) => {
    try {
      setLoading(true);
      const response = await getPaymentByTableApi(idTable);
      setPayment(response);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const closePayment = async (idPayment) => {
    try {
      setLoading(true);
      const response = await closePaymentApi(idPayment);
      setPayment(response);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getPayments = async () => {
    try {
      setLoading(true);
      const response = await getPaymentsApi();
      setPayments(response);
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
    payment,
    payments,
    createPayment,
    getPaymentByTable,
    closePayment,
    getPayments,
  };
};
