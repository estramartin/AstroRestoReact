import React, { useState, useEffect } from "react";
import { map } from "loadsh";
import { TableAdmin } from "../";
import { Button, Icon, Checkbox } from "semantic-ui-react";
import "./TablesListAdmin.scss";

export const TablesListAdmin = (props) => {
  const { tables } = props;
  const [reload, setReload] = useState(false);
  const [autoreload, setAutoreload] = useState(false);

  const onReload = () => setReload((prev) => !prev);

  useEffect(() => {
    if (autoreload) {
      const autoreloadAction = () => {
        onReload();
        setTimeout(() => {
          autoreloadAction();
        }, 5000);
      };
      autoreloadAction();
    }
  }, [autoreload]);

  const onCheckAutoReload = (check) => {
    if (check) {
      setAutoreload(check);
    } else {
      window.location.reload();
    }
  };

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
      <div className="tables-list-admin__reload-toggle">
        <span>Reload automatico</span>
        <Checkbox
          toggle
          checked={autoreload}
          onChange={(_, data) => onCheckAutoReload(data.checked)}
        ></Checkbox>
      </div>
      {map(tables, (table, index) => (
        <TableAdmin key={table.number} table={table} reload={reload} />
      ))}
    </div>
  );
};
