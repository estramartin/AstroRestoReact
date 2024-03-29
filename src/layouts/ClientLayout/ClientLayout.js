import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Button, Icon } from "semantic-ui-react";
import { useTable } from "../../hooks";

import "./ClientLayout.scss";
export function ClientLayout(props) {
  const { children } = props;
  const { isExistTable } = useTable();
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const exist = await isExistTable(tableNumber);
      if (!exist) closeTable();
    })();
  }, [tableNumber]);

  const closeTable = () => {
    navigate("/");
  };

  const goToOrders = () => {
    navigate(`/client/${tableNumber}/orders`);
  };

  const goToCart = () => {
    navigate(`/client/${tableNumber}/cart`);
  };

  const goToCategories = () => {
    navigate(`/client/${tableNumber}`);
  };

  return (
    <div className="client-layout-bg">
      <Container className="client-layout">
        <div className="client-layout__header">
          {/* <Link to={`/client/${tableNumber}`}>
            <h1>RestoNauta</h1>
          </Link> */}
          
          <span>Mesa {tableNumber}</span>
          <div>
          <Button icon onClick={goToCategories}>
              <Icon name="shopping basket" />
            </Button>
            <Button icon onClick={goToCart}>
              <Icon name="shop" />
            </Button>
            <Button icon onClick={goToOrders}>
              <Icon name="list" />
            </Button>
            <Button icon onClick={closeTable}>
              <Icon name="sign-out" />
            </Button>
          </div>
        </div>
        <div className="client-layout__content">{children}</div>
      </Container>
    </div>
  );
}
