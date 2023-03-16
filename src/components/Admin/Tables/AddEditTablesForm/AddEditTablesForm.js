import React from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTable } from "../../../../hooks";

import "./AddEditTablesForm.scss";

export const AddEditTablesForm = (props) => {
  const { table, onRefetch, onOpenCloseModal } = props;
  const { addTable, updateTable } = useTable();
  const formik = useFormik({
    initialValues: initialValues(table),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (table) {
          await updateTable(table.tab_id, formValue);
        } else {
          await addTable(formValue);
        }
        onRefetch();
        onOpenCloseModal();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Form  className="add-edit-table-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="number"
        type="number"
        value={formik.values.number}
        placeholder="Ingrese un numero de Mesa"
        onChange={formik.handleChange}
        error={formik.errors.number}
      />
      <Button
        type="submit"
        fluid
        primary
        content={table ? "Editar" : "Crear"}
      />
    </Form>
  );
};

function initialValues(table) {
  return {
    number: table?.number || "",
  };
}

function validationSchema() {
  return {
    number: Yup.number().required(true),
  };
}
