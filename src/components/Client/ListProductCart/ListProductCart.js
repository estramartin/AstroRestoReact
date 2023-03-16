import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Image, Button, Icon } from "semantic-ui-react";
import { map, forEach } from "loadsh";
import "./ListProductCart.scss";
import { removeProductCart, cleanProductCart } from "../../../api/cart";
import { useOrder, useTable } from "../../../hooks";

export const ListProductCart = (props) => {
  const { products, onReloadCart } = props;
  const { getTableByNumber } = useTable();
  const { addOrderToTable } = useOrder();
  const [total, setTotal] = useState(0);
  const { tableNumber } = useParams();
  const navigate = useNavigate();
  const removeProduct = (index) => {
    removeProductCart(index);
    onReloadCart();
  };

  const createOrder = async () => {
    const tableData = await getTableByNumber(tableNumber);
    console.log(tableData);
    const idTable = tableData[0].tab_id;
    console.log(idTable);
    for await (const product of products) {
      await addOrderToTable(idTable, product.prod_id);
    }
    cleanProductCart();
    navigate(`/client/${tableNumber}/orders`);
  };

  useEffect(() => {
    let totalTemp = 0;
    forEach(products, (product) => {
      totalTemp += Number(product.price);
    });
    setTotal(totalTemp.toFixed(2));
  }, [products]);

  return (
    <div className="list-product-cart">
      {map(products, (product, index) => (
        <div key={index} className="list-product-cart__product">
          <div>
            <Image src={product.image} avatar />
            <span>{product.title}</span>
          </div>
          <span>$ {product.price}</span>
          <Icon name="trash" onClick={() => removeProduct(index)} />
        </div>
      ))}
      <Button primary fluid onClick={createOrder}>
        Realizar Pedido (${total})
      </Button>
    </div>
  );
};
