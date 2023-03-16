import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import {
  HeaderPage,
  TableUsers,
  AddEditUserForm,
} from "../../components/Admin";
import { useUser } from "../../hooks";
import { ModalBasic } from "../../components/Common";

export const UserAdmin = () => {
  const [titleModal, setTitleModal] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [contentModal, setContentModal] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const { loading, users, getUsers, deleteUser } = useUser();

  const openCloseModal = () => setShowModal((prev) => !prev);

  const onRefetch = () => setRefetch((prev) => !prev);

  const createUser = () => {
    setTitleModal("Nuevo Usuario");
    setContentModal(
      <AddEditUserForm onClose={openCloseModal} onRefetch={onRefetch} />
    );
    openCloseModal();
  };

  const updateUser = (data) => {
    setTitleModal(`${data.username}`);
    setContentModal(
      <AddEditUserForm
        user={data}
        onClose={openCloseModal}
        onRefetch={onRefetch}
      />
    );
    openCloseModal();
  };

  const onDeleteUser = async (user) => {
    let result = window.confirm(`Desea eliminar el usuario: ${user.username}?`);
    if (result) {
      try {
        await deleteUser(user.id);
        onRefetch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, [refetch]);

  return (
    <>
      <HeaderPage
        title="Usuarios"
        btnTitle="Nuevo Usuario"
        btnClick={createUser}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <TableUsers
          users={users}
          updateUser={updateUser}
          onDeleteUser={onDeleteUser}
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
