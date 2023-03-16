import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { ModalBasic } from "../../components/Common";
import {
  AddEditCategoryForm,
  HeaderPage,
  TableCategories,
} from "../../components/Admin";
import { useCategory } from "../../hooks";

export const CategoriesAdmin = () => {
  const [refetch, setRefetch] = useState(false);
  const [titleModal, setTitleModal] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const { loading, categories, getCategories, deleteCategery } = useCategory();

  const openCloseModal = () => setShowModal((prev) => !prev);

  const onRefetch = () => setRefetch((prev) => !prev);

  const onDeleteCategory = async (category) => {
    let result = window.confirm(
      `Desea eliminar la categoria ${category.title}`
    );
    if (result) {
      try {
        await deleteCategery(category.id);
        onRefetch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateCategory = (category) => {
    setTitleModal("Editar categoria");
    setContentModal(
      <AddEditCategoryForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        category={category}
      />
    );
    openCloseModal();
  };

  const createCategory = () => {
    setTitleModal("Nueva Categoria");
    setContentModal(
      <AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  useEffect(() => {
    getCategories();
  }, [refetch]);
  return (
    <>
      <HeaderPage
        title="Categorias"
        btnTitle="Nueva Categoria"
        btnClick={createCategory}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableCategories
          categories={categories}
          onDeleteCategory={onDeleteCategory}
          updateCategory={updateCategory}
        />
      )}
      <ModalBasic
        onClose={openCloseModal}
        show={showModal}
        title={titleModal}
        children={contentModal}
      />
    </>
  );
};
