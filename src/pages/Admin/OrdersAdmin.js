import React, { useEffect } from "react";
import { HeaderPage } from "../../components/Admin";
import { Loader } from "semantic-ui-react";
import { useTable } from "../../hooks";
import { TablesListAdmin } from "../../components/Admin";
export function OrdersAdmin() {
  const { loading, tables, getTables } = useTable();

  useEffect(() => {
    getTables();
  }, []);

  return (
    <>
      <HeaderPage title="Restaurante" />

      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TablesListAdmin tables={tables} />
      )}
    </>
  );
}
