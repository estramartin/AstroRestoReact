import React, { useEffect, useState } from "react";
import { useTable } from "../../hooks";
import { Loader } from "semantic-ui-react";
import {
  HeaderPage,
  TableTables,
  AddEditTablesForm,
} from "../../components/Admin";
import { ModalBasic } from "../../components/Common";

export const TablesAdmin = () => {
  const { tables, loading, getTables, deleteTable } = useTable();
  const [refetch, setRefetch] = useState(false);
  const [openCloseModal, setOpenCloseModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  useEffect(() => {
    getTables();
  }, [refetch]);

  const onRefetch = () => setRefetch((prev) => !prev);
  const onOpenCloseModal = () => setOpenCloseModal((prev) => !prev);

  const onDeleteTable = async (table) => {
    const result = window.confirm(`Desea Eliminar la mesa ${table.number}?`);
    if (result) {
      await deleteTable(table.tab_id);
      onRefetch();
    }
  };

  const addTable = () => {
    setModalTitle("Nueva Mesa");
    setModalContent(
      <AddEditTablesForm
        onRefetch={onRefetch}
        onOpenCloseModal={onOpenCloseModal}
      />
    );
    onOpenCloseModal();
  };

  const editTable = (table) => {
    setModalTitle("Editar Mesa");
    setModalContent(
      <AddEditTablesForm
        onRefetch={onRefetch}
        onOpenCloseModal={onOpenCloseModal}
        table={table}
      />
    );
    onOpenCloseModal();
  };
  return (
    <>
      <HeaderPage title="Mesas" btnTitle="Neva Mesa" btnClick={addTable} />

      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableTables
          tables={tables}
          onDeleteTable={onDeleteTable}
          editTable={editTable}
        />
      )}

      <ModalBasic
        show={openCloseModal}
        onClose={onOpenCloseModal}
        title={modalTitle}
        children={modalContent}
      />
    </>
  );
};
