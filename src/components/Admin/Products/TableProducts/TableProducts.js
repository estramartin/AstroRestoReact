import React from "react";
import { Table, Button, Image, Icon } from "semantic-ui-react";
import { map } from "loadsh";
import "./TableProducts.scss";

export const TableProducts = (props) => {
  const { products, onDelete, updateProduct } = props;

  return (
    <Table className="table-product-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Nombre</Table.HeaderCell>
          <Table.HeaderCell>Categoria</Table.HeaderCell>
          <Table.HeaderCell>Precio</Table.HeaderCell>
          <Table.HeaderCell>Activo</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(products, (product, index) => (
          <Table.Row key={index}>
            <Table.Cell width={2}>
              {" "}
              <Image src={product.image} />
            </Table.Cell>
            <Table.Cell>{product.title}</Table.Cell>
            <Table.Cell>{product.category_data.title}</Table.Cell>
            <Table.Cell>${product.price}</Table.Cell>
            <Table.Cell className="status">
              {product.active ? <Icon name="check" /> : <Icon name="close" />}
            </Table.Cell>
            <Actions
              product={product}
              onDelete={onDelete}
              updateProduct={updateProduct}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

const Actions = (props) => {
  const { product, onDelete, updateProduct } = props;
  return (
    <Table.Cell textAlign="right">
      <Button
        icon
        onClick={() => {
          updateProduct(product);
        }}
      >
        <Icon name="pencil" />
      </Button>
      <Button
        icon
        negative
        onClick={() => {
          onDelete(product);
        }}
      >
        <Icon name="trash" />
      </Button>
    </Table.Cell>
  );
};
