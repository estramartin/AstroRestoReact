import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Image, Icon } from "semantic-ui-react";
import { useProduct, useOrder } from "../../../../hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import { map } from "loadsh";
import "./AddOrderForm.scss";

export const AddOrderForm = (props) => {
  const { idTable, openCloseModal, onReloadOrder } = props;
  const { products, getProducts, getProduct } = useProduct();
  const { addOrderToTable } = useOrder();

  const [productsData, setProductsData] = useState([]);
  const [prodcutFormat, setProductFormat] = useState([]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(initialSchema()),
    validateOnChange: false,

    onSubmit: async (formValidate) => {
      console.log(formValidate);
      try {
        for await (const idProduct of formValidate.products) {
          const response = await addOrderToTable(idTable, idProduct);
          console.log(response);
        }
        openCloseModal();
        onReloadOrder();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const addProductList = async () => {
    try {
      const productsId = formik.values.products;
      const arrayTemp = [];
      for await (const idProduct of productsId) {
        const response = await getProduct(idProduct);
        arrayTemp.push(response);
      }
      setProductsData(arrayTemp);
    } catch (error) {
      console.log(error);
    }
  };

  const removeProductList = (index) => {
    const idProduct = [...formik.values.products];
    idProduct.splice(index, 1);
    formik.setFieldValue("products", idProduct);
  };

  useEffect(() => {
    addProductList();
  }, [formik.values]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setProductFormat(formatDropdownData(products));
  }, [products]);

  return (
    <Form className="add-order-form" onSubmit={formik.handleSubmit}>
      <Dropdown
        placeholder="Productos"
        fluid
        search
        selection
        options={prodcutFormat}
        value={null}
        onChange={(_, data) => {
          formik.setFieldValue("products", [
            ...formik.values.products,
            data.value,
          ]);
        }}
      />
      <div className="add-order-form__list">
        {map(productsData, (product, index) => (
          <div className="add-order-form__list-product" key={index}>
            <div>
              <Image src={product.image} avatar size="mini" />
              <span>{product.title}</span>
            </div>
            <Button
              negative
              icon
              type="button"
              onClick={() => {
                removeProductList(index);
              }}
            >
              <Icon name="trash" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="submit"
        primary
        fluid
        content="Añadir productos a la mesa"
      />
    </Form>
  );
};

const formatDropdownData = (data) => {
  return map(data, (item) => ({
    key: item.prod_id,
    text: item.title,
    value: item.prod_id,
  }));
};

function initialSchema() {
  return {
    products: Yup.array().required(true),
  };
}

function initialValues() {
  return {
    products: [],
  };
}
