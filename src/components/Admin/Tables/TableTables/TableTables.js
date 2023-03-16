import React, { useState } from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { map } from "loadsh";
import QRCode from "qrcode.react";
import "./TableTables.scss";
import { ModalBasic } from "../../../Common/ModalBasic/ModalBasic";

export const TableTables = (props) => {
  const { tables, onDeleteTable, editTable } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const onShowModal = () => setShowModal((prev) => !prev);

  const showQr = (table) => {
    const url = `${window.location.origin}/client/${table.number}`;
    setContentModal(
      <div style={{ textAlign: "center" }}>
        <QRCode value={url} />
      </div>
    );
    onShowModal();
  };

  return (
    <>
      <Table className="table-tables-admin">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Numero</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {map(tables, (table, index) => (
            <Table.Row key={index}>
              <Table.Cell>{table.number}</Table.Cell>
              <Actions
                table={table}
                onDeleteTable={onDeleteTable}
                editTable={editTable}
                showQr={showQr}
              />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <ModalBasic
        show={showModal}
        onClose={onShowModal}
        title="CodigoQR"
        size="mini"
        children={contentModal}
      />
    </>
  );
};

function Actions(props) {
  const { table, onDeleteTable, editTable, showQr } = props;
  return (
    <Table.Cell textAlign="right">
      <Button icon onClick={() => showQr(table)}>
        <Icon name="qrcode" />
      </Button>
      <Button icon onClick={() => editTable(table)}>
        <Icon name="pencil" />
      </Button>

      <Button icon negative onClick={() => onDeleteTable(table)}>
        <Icon name="trash" />
      </Button>
    </Table.Cell>
  );
}
