import React from "react";
import { Table, Image, Icon, Button } from "semantic-ui-react";
import { map } from "loadsh";
import "./TableCategories.scss";

export const TableCategories = (props) => {
  const { categories, updateCategory, onDeleteCategory } = props;
  return (
    <Table className="table-categories-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Nombre</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(categories, (category, index) => (
          <Table.Row key={index}>
            <Table.Cell width={2}>
              <Image src={category.image} />
            </Table.Cell>
            <Table.Cell>{category.title}</Table.Cell>

            <Actions
              category={category}
              updateCategory={updateCategory}
              onDeleteCategory={onDeleteCategory}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

function Actions(props) {
  const { category, updateCategory, onDeleteCategory } = props;
  return (
    <Table.Cell textAlign="right">
      <Button
        icon
        onClick={() => {
          updateCategory(category);
        }}
      >
        <Icon name="pencil"></Icon>
      </Button>

      <Button
        icon
        negative
        onClick={() => {
          onDeleteCategory(category);
        }}
      >
        <Icon name="trash"></Icon>
      </Button>
    </Table.Cell>
  );
}
