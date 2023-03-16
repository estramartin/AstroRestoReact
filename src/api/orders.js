import { BASE_API, ORDER_STATUS } from "../utils/constants";
const route = "api/pedidos";

export const getOrdersByTableApi = async (
  idTable,
  status = "",
  ordering = ""
) => {
  try {
    const tableFilter = `table=${idTable}`;
    const statusFilter = `status=${status}`;
    const closeFilter = `close=False`;

    const url = `${BASE_API}/${route}/?${tableFilter}&${statusFilter}&${closeFilter}&${ordering}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export async function checkDeliveredOrderApi(id) {
  try {
    const url = `${BASE_API}/${route}/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: ORDER_STATUS.DELIVERED,
      }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export const getOrdersApi = async () => {
  try {
    const url = `${BASE_API}/${route}/`;
    const params = {
      method: "GET",
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getOrderApi = async (id) => {
  try {
    const url = `${BASE_API}/${route}/${id}/`;
    const params = {
      method: "GET",
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
export const deleteOrdersApi = async (id) => {
  try {
    const url = `${BASE_API}/${route}/${id}/`;
    const params = {
      method: "DELETE",
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const addOrderToTableApi = async (idTable, idProduct) => {
  try {
    const url = `${BASE_API}/${route}/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: ORDER_STATUS.PENDING,
        table: idTable,
        product: idProduct,
      }),
    };
    const response = await fetch(url, params);
    const result = response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateOrdersApi = async (id, order) => {
  try {
    const url = `${BASE_API}/${route}/${id}`;
    const params = {
      method: "PATCH",
      body: JSON.stringify(order),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const addPaymentToOrderApi = async (idOrder, idPayment) => {
  try {
    const url = `${BASE_API}/${route}/${idOrder}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payment: idPayment,
      }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const closeOrderApi = async (idOrder) => {
  try {
    const url = `${BASE_API}/${route}/${idOrder}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        close: true,
      }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getOrderByPaymentApi = async (idPayment) => {
  try {
    const paymentFilter = `payment=${idPayment}`;
    const url = `${BASE_API}/${route}/?${paymentFilter}`;

    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
