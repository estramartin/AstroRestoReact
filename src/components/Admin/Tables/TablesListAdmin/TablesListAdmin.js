import React, { useState, useEffect } from "react";
import { map } from "loadsh";
import { TableAdmin } from "../";
import { w3cwebsocket } from 'websocket';
import { Button, Icon, Checkbox } from "semantic-ui-react";
import { BASE_WS } from "../../../../utils/constants";
import "./TablesListAdmin.scss";

export const TablesListAdmin = (props) => {
  const { tables } = props;
  const [reload, setReload] = useState(false);
  //const [autoreload, setAutoreload] = useState(false);

  const onReload = () => setReload((prev) => !prev);

  useEffect(() => {
      const client = new w3cwebsocket(BASE_WS);
      client.onmessage = () => {
        onReload();
      }
  }, []);



  return (
    <div className="tables-list-admin">
      <Button
        primary
        icon
        className="tables-list-admin__reload"
        onClick={onReload}
      >
      <Icon name="refresh"></Icon>
      </Button>       
      {map(tables, (table, index) => (
        <TableAdmin key={table.number} table={table} reload={reload} />
      ))}
    </div>
  );
};
