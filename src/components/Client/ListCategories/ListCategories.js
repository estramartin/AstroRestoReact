import React from "react";
import { Image } from "semantic-ui-react";
import { map } from "loadsh";
import "./ListCategories.scss";
import { useNavigate, useLocation } from "react-router-dom";

export const ListCategories = (props) => {
  const { categories } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const goToCategory = (idCategory) => {
    navigate(`${location.pathname}/${idCategory}`);
  };

  return (
    <div className="list-categories-client">
      {map(categories, (category) => (
        <div
          key={category.cat_id}
          className="list-categories-client__category"
          onClick={() => {
            goToCategory(category.cat_id);
          }}
        >
          <Image src={category.image} size="small" />
          <span>{category.title}</span>
        </div>
      ))}
    </div>
  );
};
