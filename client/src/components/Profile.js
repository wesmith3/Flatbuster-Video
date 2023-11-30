import React from "react"
import { Table } from 'semantic-ui-react'

function Profile() {
  return (
    <div>
      <h1 className="cart-header">MY ACCOUNT INFO</h1>
    <Table celled className="profile-table">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={2}>First Name</Table.HeaderCell>
          <Table.HeaderCell width={2}>Last Name</Table.HeaderCell>
          <Table.HeaderCell width={3}>E-mail</Table.HeaderCell>
          <Table.HeaderCell width={3}>Phone Number</Table.HeaderCell>
          <Table.HeaderCell width={4}>Address</Table.HeaderCell>
          <Table.HeaderCell width={2}>Date Joined</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>John</Table.Cell>
          <Table.Cell>Doe</Table.Cell>
          <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
          <Table.Cell>(123) 456-7890</Table.Cell>
          <Table.Cell>420 Fake St. Springfield, IL</Table.Cell>
          <Table.Cell>04/20/2015</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    <br />
    <h1 className="cart-header">MY RENTALS</h1>
    <Table celled className="profile-table">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={5}>Movie Title</Table.HeaderCell>
          <Table.HeaderCell width={2}>Rental Date</Table.HeaderCell>
          <Table.HeaderCell width={2}>Return Date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>The Godfather</Table.Cell>
          <Table.Cell>09/14/2023</Table.Cell>
          <Table.Cell>09/21/2023</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Psycho</Table.Cell>
          <Table.Cell>09/14/2023</Table.Cell>
          <Table.Cell>09/21/2023</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Shawshank Redemption</Table.Cell>
          <Table.Cell>09/14/2023</Table.Cell>
          <Table.Cell>09/21/2023</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>M</Table.Cell>
          <Table.Cell>09/7/2023</Table.Cell>
          <Table.Cell>09/14/2023</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    </div>

  )
}

export default Profile;
