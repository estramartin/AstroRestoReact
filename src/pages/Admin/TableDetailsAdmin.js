import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import { useOrder, usePayment } from "../../hooks";
import { forEach, size } from "loadsh";
import {
  HeaderPage,
  ListOrderAdmin,
  AddOrderForm,
  PaymentDetails,
} from "../../components/Admin";

import { useTable } from "../../hooks";
import { ModalBasic } from "../../components/Common/ModalBasic/ModalBasic";

export const TableDetailAdmin = () => {
  const { orders, loading, getOrdersByTable, addPaymentToOrder } = useOrder();
  const { createPayment, getPaymentByTable } = usePayment();
  const { table, getTable } = useTable();
  const { tab_id } = useParams();

  const [reloadOrder, setReloadOrder] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const onReloadOrder = () => setReloadOrder((prev) => !prev);
  const openCloseModal = () => setShowModal((prev) => !prev);

  const onCreatePayment = async () => {
    const result = window.confirm("Estas seguro de generar la cuenta?");

    if (result) {
      let totalPayment = 0;
      const resultTypePayment = window.confirm("Pago con tarjeta?");
      forEach(orders, (order) => {
        totalPayment += Number(order.data_product.price);
      });

      const paymentData = {
        table: tab_id,
        total_payment: totalPayment.toFixed(2),
        payment_type: resultTypePayment ? "CARD" : "CASH",
        status_payment: "PENDING",
      };

      const payment = await createPayment(paymentData);

      for await (const order of orders) {
        await addPaymentToOrder(order.ord_id, payment.pay_id);
      }
      onReloadOrder();
      const table_payment = await getPaymentByTable(tab_id);
      console.log(table_payment);
    }
  };

  useEffect(() => {
    getOrdersByTable(tab_id, "", "ordering=-status,created_at");
  }, [tab_id, reloadOrder]);

  useEffect(() => {
    getTable(tab_id);
  }, [tab_id]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(tab_id);
      if (size(response) > 0) {
        setPaymentData(response[0]);
      }
    })();
  }, [reloadOrder]);
  return (
    <>
      <HeaderPage
        title={`Lista de pedidos de Mesa ${table?.number || ""}`}
        btnTitle={!paymentData ? "Nuevo Pedido" : "Ver Cuenta"}
        btnClick={openCloseModal}
        btnTitle2={!paymentData ? "Generar Cuenta" : null}
        btnClick2={onCreatePayment}
      />
      {loading ? (
        <Loader active inline="centered">
          {" "}
          Cargando...
        </Loader>
      ) : (
        <ListOrderAdmin orders={orders} onReloadOrder={onReloadOrder} />
      )}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title="Agregar nuevo pedido"
      >
        {paymentData ? (
          <PaymentDetails
            paymentData={paymentData}
            setPaymentData={setPaymentData}
            orders={orders}
            onReloadOrder={onReloadOrder}
            openCloseModal={openCloseModal}
          />
        ) : (
          <AddOrderForm
            idTable={tab_id}
            openCloseModal={openCloseModal}
            onReloadOrder={onReloadOrder}
          />
        )}
      </ModalBasic>
    </>
  );
};
