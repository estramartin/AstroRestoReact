import React, { useCallback, useState } from "react";
import { Form, Button, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCategory } from "../../../../hooks";
import "./AddEditCategoryForm.scss";

export const AddEditCategoryForm = (props) => {
  const { onClose, onRefetch, category } = props;
  const [previewImage, setPreviewImage] = useState(category?.image || null);
  const { addCategory, updateCategory } = useCategory();

  const formik = useFormik({
    initialValues: initialValues(category),
    validationSchema: Yup.object(category ? updateSchema() : newSchema()),
    validateOnChange: false,
    onSubmit: async (formvalue) => {
      try {
        if (category) {
          await updateCategory(category.cat_id, formvalue);
        } else {
          await addCategory(formvalue);
        }
        onRefetch();
        onClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  return (
    <>
      <Form className="add-edit-category-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          name="title"
          placeholder="Ingrese una Categoria"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />
        <Button
          type="button"
          fluid
          color={formik.errors.image && "red"}
          {...getRootProps()}
        >
          {previewImage ? "Cambiar Imagen" : "Subir Imagen"}
        </Button>

        <input {...getInputProps()} />
        <Image src={previewImage} fluid></Image>

        <Button
          type="submit"
          content={category ? "Editar" : "Crear"}
          primary
          fluid
        />
      </Form>
    </>
  );
};

function initialValues(category) {
  return {
    title: category?.title || "",
    image: "",
  };
}

function newSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string().required(true),
  };
}

function updateSchema() {
  return {
    title: Yup.string().required(true),
    image: Yup.string(),
  };
}
