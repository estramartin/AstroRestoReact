import React, { useEffect, useState } from "react";
import { HeaderPage } from "../../components/Admin";
import { usePayment } from "../../hooks";
import { Loader } from "semantic-ui-react";
import { TablePayments } from "../../components/Admin";

export const PaymentHistory = () => {
  const { loading, payments, getPayments } = usePayment();
  const [reloadPayments, setReloadPayments] = useState(false);

  const onReloadPayments = () => setReloadPayments((prev) => !prev);

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <>
      <HeaderPage title="Historial de pago" />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TablePayments
          payments={payments}
          onReloadPayments={onReloadPayments}
        />
      )}
    </>
  );
};
