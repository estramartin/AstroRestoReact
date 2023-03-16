import React from "react";
import { Image } from "semantic-ui-react";
import classNames from "classnames";
import moment from "moment";
import "moment/locale/es";
import "./OrderHistoryItems.scss";
import { ORDER_STATUS } from "../../../utils/constants";

export const OrderHistoryItems = (props) => {
  const { order } = props;
  const { title, image } = order.data_product;

  return (
    <div
      className={classNames("order-history-item", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="order-history-item__time">
        <span>
          Pedido {moment(order.created_at).startOf("second").fromNow()}
        </span>
      </div>
      <div className="order-history-item__product">
        <Image src={image} />
        <p>{title}</p>
      </div>
      {order.status === ORDER_STATUS.PENDING ? (
        <span>En Marcha</span>
      ) : (
        <span>Entregado</span>
      )}
    </div>
  );
};
