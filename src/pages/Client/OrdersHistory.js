import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { Loader } from "semantic-ui-react";
import { OrderHistoryItems } from "../../components/Client/OrderHistoryItems/OrderHistoryItems";
import { useOrder, useTable, usePayment } from "../../hooks";
import { map, size, forEach } from "lodash";
import { ModalConfirm } from "../../components/Common/ModalConfirm/ModalConfirm";
import { PAYMENT_TYPE, PAYMENT_STATUS } from "../../utils/constants";

export const OrderHistory = () => {
  const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { createPayment, getPaymentByTable } = usePayment();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const [showTypePayment, setShowTypePayment] = useState(false);
  const [idTable, setIdTabel] = useState(0);
  const [isRequestAccount, setIsRequestAccount] = useState(false);

  const onCreatePayment = async (paymentType) => {
    setShowTypePayment(false);
    let totalPayment = 0;

    forEach(orders, (order) => {
      totalPayment += Number(order.data_product.price);
    });

    const paymentData = {
      table: idTable,
      total_payment: totalPayment.toFixed(2),
      payment_type: paymentType,
      status_payment: PAYMENT_STATUS.PENDING,
    };

    const paymnet = await createPayment(paymentData);

    for await (const order of orders) {
      await addPaymentToOrder(order.ord_id, paymnet.pay_id);
    }
    window.location.reload();
  };

  useEffect(() => {
    (async () => {
      const idTable = await getTableByNumber(tableNumber);
      setIdTabel(idTable[0].tab_id);
      getOrdersByTable(idTable[0].tab_id, "", "ordering=-status,-created_at");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (idTable) {
        const response = await getPaymentByTable(idTable);
        setIsRequestAccount(response);
      }
    })();
  }, [idTable]);
  return (
    <div>
      <h1>Historial de pedidos</h1>
      {map(orders, (order) => (
        <OrderHistoryItems key={order.ord_id} order={order} />
      ))}
      {loading ? (
        <Loader>Cargando...</Loader>
      ) : (
        <>
          {size(orders) > 0 && (
            <Button
              primary
              fluid
              onClick={() =>
                size(isRequestAccount) === 0 && setShowTypePayment(true)
              }
            >
              {size(isRequestAccount) > 0
                ? "La cuenta esta pedida"
                : "Pedir Cuenta"}
            </Button>
          )}
        </>
      )}

      <ModalConfirm
        title="Pagar con tarjeta o efectivo"
        show={showTypePayment}
        onCloseText="Efectivo"
        onClose={() => onCreatePayment(PAYMENT_TYPE.CASH)}
        onConfirmText="Tarjeta"
        onConfirm={() => onCreatePayment(PAYMENT_TYPE.CARD)}
      />
    </div>
  );
};
