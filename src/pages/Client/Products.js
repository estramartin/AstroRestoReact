import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader } from "semantic-ui-react";
import { useProduct } from "../../hooks";
import { ListProducts } from "../../components/Client/ListProducts/ListProducts";

export const Products = () => {
  const { tableNumber, idCategory } = useParams();
  const { getProductsByCategory, loading, products } = useProduct();

  useEffect(() => {
    getProductsByCategory(idCategory);
  }, [idCategory]);

  return (
    <div>
      <Link to={`/client/${tableNumber}`}>Volver a Categorias</Link>
      {loading ? (
        <Loader>Cargando...</Loader>
      ) : (
        <ListProducts products={products} />
      )}
    </div>
  );
};
