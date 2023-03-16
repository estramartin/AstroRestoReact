import { useAuth } from "./useAuth";
import {
  getTablesApi,
  getTableApi,
  deleteTableApi,
  updateTableApi,
  addTableApi,
  getTableByNumberApi,
} from "../api/tables";
import { size } from "loadsh";
import { useState } from "react";

export const useTable = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tables, setTables] = useState(null);
  const [table, setTable] = useState(null);

  const getTables = async () => {
    try {
      setLoading(true);
      const response = await getTablesApi(auth.token);
      setTables(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const getTable = async (id) => {
    try {
      setLoading(true);
      const response = await getTableApi(id);
      setTable(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const deleteTable = async (id) => {
    try {
      setLoading(true);
      const response = await deleteTableApi(id, auth.token);
      setTables(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const addTable = async (table) => {
    try {
      setLoading(true);
      const response = await addTableApi(table, auth.token);
      setTables(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const updateTable = async (id, table) => {
    try {
      setLoading(true);
      const response = await updateTableApi(id, table, auth.token);
      setTables(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const isExistTable = async (numberTable) => {
    try {
      setLoading(true);
      const response = await getTableByNumberApi(numberTable);
      if (size(response) === 0) throw Error();
      return true;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const getTableByNumber = async (numberTable) => {
    try {
      setLoading(true);
      const response = await getTableByNumberApi(numberTable);
      setLoading(false);
      return response;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    tables,
    table,
    getTables,
    getTable,
    deleteTable,
    addTable,
    updateTable,
    isExistTable,
    getTableByNumber,
  };
};
