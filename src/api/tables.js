import { BASE_API } from "../utils/constants";
const route = "api/mesas";

export const getTablesApi = async (token) => {
  try {
    const url = `${BASE_API}/${route}/`;
    const params = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    const result = response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getTableApi = async (id) => {
  try {
    const url = `${BASE_API}/${route}/${id}/`;
    const params = {
      method: "GET",
    };
    const response = await fetch(url, params);
    const result = response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteTableApi = async (id, token) => {
  try {
    const url = `${BASE_API}/${route}/${id}/`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    const result = response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const addTableApi = async (table, token) => {
  try {
    const url = `${BASE_API}/${route}/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(table),
    };
    const response = await fetch(url, params);
    const result = response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateTableApi = async (id, table, token) => {
  try {
    const url = `${BASE_API}/${route}/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        table: JSON.stringify(table),
      },
    };
    const response = await fetch(url, params);
    const result = response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getTableByNumberApi = async (numberTable) => {
  const tableFilter = `number=${numberTable}`;
  try {
    const url = `${BASE_API}/${route}/?${tableFilter}`;
    const params = {
      method: "GET",
    };
    const response = await fetch(url, params);
    const result = response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
