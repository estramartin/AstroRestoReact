import React, { useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import { HeaderPage, TableProducts } from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import { useProduct } from "../../hooks";
import { AddEditProductForm } from "../../components/Admin";

export const ProductsAdmin = () => {
  const { getProducts, deleteProduct, loading, products } = useProduct();

  const [refetch, setRefetch] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const onRefetch = () => setRefetch((prev) => !prev);
  const openCloseModal = () => setShowModal((prev) => !prev);

  const onDelete = async (product) => {
    const result = window.confirm("Desea eliminar este producto?");
    if (result) {
      try {
        await deleteProduct(product.prod_id);
        onRefetch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const createProduct = () => {
    setTitleModal("Nuevo producto");
    setContentModal(
      <AddEditProductForm
        openCloseModal={openCloseModal}
        onRefetch={onRefetch}
      />
    );
    openCloseModal();
  };

  const updateProduct = (product) => {
    setTitleModal(`Editar ${product.title}`);
    setContentModal(
      <AddEditProductForm
        product={product}
        openCloseModal={openCloseModal}
        onRefetch={onRefetch}
      />
    );
    openCloseModal();
  };

  useEffect(() => {
    getProducts();
  }, [refetch]);

  return (
    <>
      <HeaderPage
        title="Productos"
        btnTitle="Nuevo producto"
        btnClick={createProduct}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableProducts
          products={products}
          onDelete={onDelete}
          updateProduct={updateProduct}
        />
      )}

      <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
};
