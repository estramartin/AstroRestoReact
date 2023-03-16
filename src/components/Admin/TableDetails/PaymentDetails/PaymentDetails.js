import React from "react";
import { Table, Button, Icon, TableCell } from "semantic-ui-react";
import "./PaymentDetails.scss";
import { map } from "loadsh";
import { PAYMENT_TYPE } from "../../../../utils/constants";
import { usePayment, useOrder } from "../../../../hooks";

export const PaymentDetails = (props) => {
  const { paymentData, onReloadOrder, orders, openCloseModal, setPaymentData } =
    props;
  const { closePayment } = usePayment();
  const { closeOrder } = useOrder();

  const getIconPayment = (key) => {
    if (key === PAYMENT_TYPE.CARD) return "credit card outline";
    if (key === PAYMENT_TYPE.CASH) return "money bill alternate outline";
    return null;
  };

  const onCloseTable = async () => {
    const result = window.confirm("Cerrar mesa?");

    if (result) {
      const response = await closePayment(paymentData.pay_id);

      for await (const order of orders) {
        await closeOrder(order.ord_id);
      }
      setPaymentData(null);
      onReloadOrder();
      openCloseModal();

      console.log(response);
    }
  };

  return (
    <div className="paymet-detail">
      <Table striped>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Mesa:</Table.Cell>
            <Table.Cell>{paymentData.table_data.number}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          {map(orders, (order, index) => (
            <Table.Row key={index}>
              <Table.Cell>{order.data_product.title}</Table.Cell>
              <Table.Cell>${order.data_product.price}</Table.Cell>
            </Table.Row>
          ))}

          <Table.Row>
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Total:</Table.Cell>
            <Table.Cell>${paymentData.total_payment}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Forma de pago:</Table.Cell>
            <Table.Cell>
              <Icon name={getIconPayment(paymentData.payment_type)} />{" "}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Button primary fluid content="Cerrar mesa" onClick={onCloseTable} />
    </div>
  );
};
