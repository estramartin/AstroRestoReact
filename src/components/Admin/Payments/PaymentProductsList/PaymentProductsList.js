import React, { useState, useEffect } from "react";
import "./PaymentProductsList.scss";
import { map } from "loadsh";
import { useOrder } from "../../../../hooks";
import { Image } from "semantic-ui-react";

export const PaymentProdcutsList = (props) => {
  const { payment } = props;
  const { getOrderByPayment } = useOrder();
  const [orders, setOrders] = useState(undefined);

  useEffect(() => {
    (async () => {
      const response = await getOrderByPayment(payment.pay_id);
      console.log(response);
      setOrders(response);
    })();
  }, []);

  return (
    <div className="payment-product-list">
      {map(orders, (order, index) => (
        <div>
          <div className="payment-product-list__product" key={index}>
            <div>
              <Image src={order.data_product.image} avatar size="tiny" />

              <span>{order.data_product.title}</span>
            </div>
            <span>${order.data_product.price}</span>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};
