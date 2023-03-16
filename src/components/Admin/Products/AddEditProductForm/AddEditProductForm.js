import React, { useState, useCallback, useEffect } from "react";
import { Form, Image, Button, Checkbox, Dropdown } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { map } from "loadsh";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCategory, useProduct } from "../../../../hooks";
import "./AddEditProductForm.scss";

export const AddEditProductForm = (props) => {
  const { onRefetch, openCloseModal, product } = props;
  const { getCategories, categories } = useCategory();
  const { addProduct, updateProduct } = useProduct();

  const [previewImage, setPreviewImage] = useState(product?.image || null);
  const [categoriasFormat, setCactegoriasFormat] = useState([]);

  const onDrop = useCallback(async (acceptedFile) => {
    const file = acceptedFile[0];
    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpg, image/png",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  const formik = useFormik({
    initialValues: initialValues(product),
    validationSchema: Yup.object(
      product ? validationEditSchema(product) : validationNewSchema()
    ),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (product) {
          await updateProduct(product.prod_id, formValue);
        } else {
          await addProduct(formValue);
        }
        onRefetch();
        openCloseModal();
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setCactegoriasFormat(formatDropDown(categories));
  }, [categories]);

  return (
    <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        placeholder="Nombre del producto"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <Form.Input
        name="price"
        type="number"
        placeholder="Precio"
        value={formik.values.price}
        onChange={formik.handleChange}
        error={formik.errors.price}
      />
      <Dropdown
        placeholder="Categoria"
        fluid
        selection
        search
        options={categoriasFormat}
        value={formik.values.category}
        onChange={(_, data) => formik.setFieldValue("category", data.value)}
        error={formik.errors.category}
      />

      <div className="add-edit-product-form__active">
        <Checkbox
          toggle
          checked={formik.values.active}
          onChange={(_, data) => formik.setFieldValue("active", data.checked)}
          error={formik.errors.active}
        />
        Activo
      </div>

      <Button
        type="button"
        fluid
        color={formik.errors.image && "red"}
        content={previewImage ? "Editar Imagen" : "Subir Image"}
        {...getRootProps()}
      />

      <input {...getInputProps()} />
      <Image src={previewImage} fluid></Image>
      <Button
        type="submit"
        primary
        fluid
        content={product ? "Editar" : "Crear"}
      />
    </Form>
  );
};

function formatDropDown(data) {
  return map(data, (item) => ({
    key: item.cat_id,
    text: item.title,
    value: item.cat_id,
  }));
}

function initialValues(product) {
  return {
    title: product?.title || "",
    category: product?.category || "",
    image: "",
    price: product?.price || "",
    active: product?.active || false,
  };
}

function validationNewSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    image: Yup.string().required(true),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
  };
}

function validationEditSchema() {
  return {
    title: Yup.string().required(true),
    price: Yup.number().required(true),
    image: Yup.string(),
    category: Yup.number().required(true),
    active: Yup.boolean().required(true),
  };
}
