import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import "./SideMenu.scss";
import { useAuth } from "../../../hooks/useAuth";

export const SideMenu = (props) => {
  const { children } = props;
  const { pathname } = useLocation();

  return (
    <div className="side-menu-admin">
      <MenuLeft pathname={pathname} />
      <div className="content">{children}</div>
    </div>
  );
};

function MenuLeft(props) {
  const { auth } = useAuth();
  const { pathname } = props;
  return (
    <>
      <Menu fixed="left" borderless className="side" vertical>
        <Menu.Item as={Link} to={"/admin"} active={pathname === "/admin"}>
          <Icon name="home" />
          Pedidos
        </Menu.Item>
        <Menu.Item
          as={Link}
          to={"/admin/tables"}
          active={pathname === "/admin/tables"}
        >
          <Icon name="table" />
          Mesas
        </Menu.Item>
        <Menu.Item
          as={Link}
          to={"/admin/payment-history"}
          active={pathname === "/admin/payment-history"}
        >
          <Icon name="history" />
          Hisotrial de Pagos
        </Menu.Item>
        <Menu.Item
          as={Link}
          to={"/admin/categories"}
          active={pathname === "/admin/categories"}
        >
          <Icon name="folder" />
          Categorias
        </Menu.Item>
        <Menu.Item
          as={Link}
          to={"/admin/products"}
          active={pathname === "/admin/products"}
        >
          <Icon name="cart" />
          Productos
        </Menu.Item>
        {auth.me?.is_staff && (
          <Menu.Item
            as={Link}
            to={"/admin/users"}
            active={pathname === "/admin/users"}
          >
            <Icon name="users" />
            Usuarios
          </Menu.Item>
        )}
      </Menu>
    </>
  );
}
