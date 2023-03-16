import React, { useState, useEffect } from "react";
import { getProductCart } from "../../api/cart";
import { Link, useParams } from "react-router-dom";
import { size } from "lodash";
import { useProduct } from "../../hooks";
import { Button } from "semantic-ui-react";
import { ListProductCart } from "../../components/Client/ListProductCart/ListProductCart";

export const Cart = () => {
  const { getProduct } = useProduct();
  const [products, setProducts] = useState(null);
  const { tableNumber } = useParams();
  const [reloadCart, setReloadCart] = useState(false);

  const onReloadCart = () => setReloadCart((prev) => !prev);

  useEffect(() => {
    (async () => {
      const idProductCart = await getProductCart();
      const producArray = [];
      for await (const idProduct of idProductCart) {
        const response = await getProduct(idProduct);
        producArray.push(response);
      }
      setProducts(producArray);
    })();

    //setCart(getProductCart());
  }, [reloadCart]);

  return (
    <>
      <h1>Carrito</h1>
      {!products ? (
        <p>Cargando...</p>
      ) : size(products) < 1 ? (
        <div style={{ textAlign: "center" }}>
          <p>Tu carrito esta vacio</p>
          <Link to={`/client/${tableNumber}/orders`}>
            <Button primary>Ver Pedido</Button>
          </Link>
        </div>
      ) : (
        <ListProductCart products={products} onReloadCart={onReloadCart} />
      )}
    </>
  );
};
