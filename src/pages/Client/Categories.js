import React, { useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { ListCategories } from "../../components/Client";

import { useCategory } from "../../hooks";

export const Categories = () => {
  const { loading, categories, getCategories } = useCategory();

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div>
      <h1>Categorieas</h1>
      {loading ? (
        <Loader>Cargando...</Loader>
      ) : (
        <ListCategories categories={categories} />
      )}
    </div>
  );
};
