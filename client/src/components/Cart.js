import React from "react";
import { Table } from 'semantic-ui-react'

function Cart() {
  return (
    <div>
      <h1 className="cart-header">
        My Cart
      </h1>
      <Table celled className="custom-cart-table">
        <Table.Header size='medium'>
        </Table.Header>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={10}>Movies</Table.HeaderCell>
            <Table.HeaderCell width={2}>Quantity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row key={4}>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>

  )
}

export default Cart;
