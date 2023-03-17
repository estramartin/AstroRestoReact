import React from "react";
import { Icon, Menu, Image } from "semantic-ui-react";
import { useAuth } from "../../../hooks";
import logo from "../../../assets/AstroRestoLogoSolo.png";
import "./TopMenu.scss";

export function TopMenu() {
  const { auth, logout } = useAuth();

  const renderName = () => {
    if (auth.me?.first_name && auth.me?.las_name) {
      return `${auth.me.first_name} ${auth.me.las_name}`;
    }
    return `${auth.me.email}`;
  };
  return (
    <div>
      <Menu fixed="top" className="top-menu-admin">
        <Menu.Item className="top-menu-admin__logo">
          <Image className="top-menu-admin__logo__img" src={logo} size="tiny" />
          <p className="top-menu-admin__logo__name">AstroRestó</p>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            {" "}
            <p className="user-name">Hola, {renderName()}</p>
          </Menu.Item>
          <Menu.Item onClick={logout}>
            <Icon name="sign-out"></Icon>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}
