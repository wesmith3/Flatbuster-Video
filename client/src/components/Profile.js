import React, { useEffect, useState } from "react"
import { Table } from 'semantic-ui-react'

function Profile() {
  const emptyState = {
    "first_name": "",
    "last_name": "",
    "email": "",
    "phone_number": "",
    "address": "",
    "created_at": "",
    "rentals": [],
  }
  const [rentalData, setRentalData] = useState(emptyState)
  useEffect(() => {
    const id = localStorage.getItem('UserId')
    fetch(`/user_rentals/${id}`)
    .then(res => res.json())
    .then(data => {
      setRentalData(data)
    })
    .catch(err => alert(err))
  }, [])
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
          <Table.Cell>{rentalData.first_name}</Table.Cell>
          <Table.Cell>{rentalData.last_name}</Table.Cell>
          <Table.Cell>{rentalData.email}</Table.Cell>
          <Table.Cell>{rentalData.phone_number}</Table.Cell>
          <Table.Cell>{rentalData.address}</Table.Cell>
          <Table.Cell>{rentalData.created_at}</Table.Cell>
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
       {rentalData.rentals.map((each, idx) => {
        return <Table.Row key={`key-${idx}-${each.id}`}>
              <Table.Cell>{each.title}</Table.Cell>
              <Table.Cell>09/14/2023</Table.Cell>
              <Table.Cell>09/21/2023</Table.Cell>
            </Table.Row>
        })}
      </Table.Body>
    </Table>
    </div>

  )
}

export default Profile;
