import { BASE_API } from "../utils/constants";
import { PAYMENT_STATUS } from "../utils/constants";
const route = "api/pagos";
export async function createPaymentApi(paymentData) {
  try {
    const url = `${BASE_API}/${route}/`;
    const params = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPaymentByTableApi(idTable) {
  try {
    const tableFilter = `table=${idTable}`;
    const statusFilter = `status_payment=${PAYMENT_STATUS.PENDING}`;

    const url = `${BASE_API}/${route}/?${tableFilter}&${statusFilter}`;
    const params = {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function closePaymentApi(idPayment) {
  try {
    const url = `${BASE_API}/${route}/${idPayment}/`;
    const status_payment = PAYMENT_STATUS.PAID;
    const params = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status_payment: status_payment,
      }),
    };
    const response = await fetch(url, params);
    const result = response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPaymentsApi() {
  try {
    const orderStatus = `status_payment=${PAYMENT_STATUS.PAID}`;
    const orderingFilter = `ordering=created_at`;

    const url = `${BASE_API}/${route}/?${orderStatus}&${orderingFilter}`;
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
