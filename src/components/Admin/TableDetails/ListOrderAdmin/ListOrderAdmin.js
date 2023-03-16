import React from "react";
import { OrderItemAdmin } from "../OrderItemAdmin";
import "./ListOrderAdmin.scss";
import { map } from "loadsh";

export const ListOrderAdmin = (props) => {
  const { orders, onReloadOrder } = props;
  return (
    <div className="list-roders-admin">
      {map(orders, (order) => (
        <OrderItemAdmin
          key={order.ord_id}
          order={order}
          onReloadOrder={onReloadOrder}
        />
      ))}
    </div>
  );
};
