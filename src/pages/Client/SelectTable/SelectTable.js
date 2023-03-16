import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useTable } from "../../../hooks";

import "./SelectTable.scss";

export const SelectTable = () => {
  const { isExistTable } = useTable();
  const [tableNum, SetTableNum] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const onSubmit = async () => {
    setError(null);
    if (!tableNum) {
      setError("Introduce el numero de tu mesa!");
    } else {
      const exist = await isExistTable(tableNum);
      if (exist) navigate(`/client/${tableNum}`);
      else setError("El numero de la mesa no existe");
    }
  };

  return (
    <div className="select-table">
      <div className="select-table__content">
        <h1>Bienvenido a Restonauta</h1>
        <h2>Introduce tu numero de mesa</h2>

        <Form onSubmit={onSubmit}>
          <Form.Input
            placeholder="Ejemplo: 5"
            type="number"
            onChange={(_, data) => SetTableNum(data.value)}
          />
          <Button primary fluid content="Entrar" />
        </Form>

        <p className="select-table__content-error">{error}</p>
      </div>
    </div>
  );
};
