import React, { useState } from "react";
import "./TablePayments.scss";
import { Table, TableCell, Button, Icon } from "semantic-ui-react";
import moment from "moment";
import { map } from "loadsh";
import { PAYMENT_TYPE } from "../../../../utils/constants";
import { ModalBasic } from "../../../Common";
import { PaymentProdcutsList } from "../PaymentProductsList";

export const TablePayments = (props) => {
  const { payments, onReloadPayments } = props;
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const getIconName = (key) => {
    if (key === PAYMENT_TYPE.CARD) return "credit card outline";
    if (key === PAYMENT_TYPE.CASH) return "money bill alternate outline";
    return null;
  };

  const onShowModal = () => setShowModal((prev) => !prev);

  const showDetail = (payment) => {
    setModalTitle(`Pedido de la mensa ${payment.table_data.number}`);
    setModalContent(<PaymentProdcutsList payment={payment} />);
    onShowModal();
  };

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Nro</Table.HeaderCell>
            <Table.HeaderCell>Mesa</Table.HeaderCell>
            <Table.HeaderCell>Monto</Table.HeaderCell>
            <Table.HeaderCell>Forma de Pago</Table.HeaderCell>
            <Table.HeaderCell>Fecha</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {map(payments, (payment, index) => (
            <Table.Row key={index}>
              <TableCell>{payment.pay_id}</TableCell>
              <TableCell>{payment.table_data.number}</TableCell>
              <TableCell>${payment.total_payment}</TableCell>
              <TableCell>
                <Icon name={getIconName(payment.payment_type)} />
              </TableCell>
              <TableCell>
                {moment(payment.created_at).format("DD-MM-yyyy - HH:mm")}hs
              </TableCell>
              <Actions showDetail={showDetail} payment={payment} />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <ModalBasic
        show={showModal}
        onClose={onShowModal}
        title={modalTitle}
        children={modalContent}
      />
    </>
  );
};

const Actions = (props) => {
  const { payment, showDetail } = props;

  return (
    <TableCell textAlign="right">
      <Button icon onClick={() => showDetail(payment)}>
        <Icon name="eye" />
      </Button>
    </TableCell>
  );
};
