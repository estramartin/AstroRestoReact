import React, { useEffect, useState } from "react";
import { Label } from "semantic-ui-react";
import { size } from "loadsh";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { getOrdersByTableApi } from "../../../../api/orders";
import { ORDER_STATUS } from "../../../../utils/constants";
import { ReactComponent as IcTable } from "../../../../assets/table.svg";
import { usePayment } from "../../../../hooks";
import "./TableAdmin.scss";

export const TableAdmin = (props) => {
  const { table, reload } = props;
  const { getPaymentByTable } = usePayment();
  const [orders, setOrders] = useState(false);
  const [tableBusy, setTableBusy] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getOrdersByTableApi(
        table.tab_id,
        ORDER_STATUS.PENDING
      );
      setOrders(response);
    })();
  }, [reload]);

  useEffect(() => {
    (async () => {
      const response = await getOrdersByTableApi(
        table.tab_id,
        ORDER_STATUS.DELIVERED
      );
      if (size(response) > 0) setTableBusy(response);
      else setTableBusy(false);
    })();
  }, [reload]);

  useEffect(() => {
    (async () => {
      const response = await getPaymentByTable(table.tab_id);
      if (size(response) > 0) setPendingPayment(true);
      else setPendingPayment(false);
    })();
  }, [reload]);

  return (
    <Link className="table-admin" to={`table/${table.tab_id}`}>
      {size(orders) > 0 ? (
        <Label circular color="orange">
          {size(orders)}
        </Label>
      ) : null}
      {pendingPayment && <Label circular color="orange" content="Cuenta" />}

      <IcTable
        className={classNames({
          pending: size(orders) > 0,
          busy: tableBusy,
          "pending-payment": pendingPayment,
        })}
      />
      <p>Mesa:{table.number}</p>
    </Link>
  );
};
