import React from "react";
import { ORDER_STATUS } from "../../../../utils/constants";
import moment from "moment";
import "moment/locale/es";
import { Button, Image } from "semantic-ui-react";
import classNames from "classnames";
import "./OrderItemAdmin.scss";
import { useOrder } from "../../../../hooks";

export const OrderItemAdmin = (props) => {
  const { order, onReloadOrder } = props;
  const { image, title } = order.data_product;
  const { PENDING, DELIVERED } = ORDER_STATUS;
  const { checkDeliveredOrder } = useOrder();

  const onCheckDeliveredOrder = async () => {
    await checkDeliveredOrder(order.ord_id);
    onReloadOrder();
  };

  return (
    <div
      className={classNames("order-item-admin", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="order-item-admin__time">
        <span>{moment(order.created_at).format("HH:mm")}</span>
        {" - "}
        <span>{moment(order.created_at).startOf("seconds").fromNow()}</span>
      </div>
      <div className="order-item-admin__product">
        {<Image src={image} />}
        <p>{title}</p>
      </div>
      {order.status === PENDING && (
        <Button
          primary
          onClick={() => {
            onCheckDeliveredOrder();
          }}
          content="Marcar Entrega"
        />
      )}
    </div>
  );
};
