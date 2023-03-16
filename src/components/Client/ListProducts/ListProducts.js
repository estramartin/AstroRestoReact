import React from "react";
import { map } from "loadsh";
import { Image, Button, Icon } from "semantic-ui-react";
import { addProductcart } from "../../../api/cart";
import { toast } from "react-toastify";

import "./ListProducts.scss";

export const ListProducts = (props) => {
  const { products } = props;

  const addCart = (product) => {
    addProductcart(product.prod_id);
    toast.success(`${product.title} añadido al carrito.`);
  };
  return (
    <div className="list-products-client">
      {map(products, (product, index) => (
        <div key={index} className="list-products-client__product">
          <div>
            <Image src={product.image} />
            <p>{product.title}</p>
          </div>
          <Button primary icon onClick={() => addCart(product)}>
            <Icon name="add" />
          </Button>
        </div>
      ))}
    </div>
  );
};
