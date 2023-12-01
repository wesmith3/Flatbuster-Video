import React, { useEffect, useState } from "react"
import { Button, Table, Modal, Form } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";
import verifyJWT from "./Authorize";

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
  const [open, setOpen] = useState(false)
  const UserId = JSON.parse(localStorage.getItem("UserId")) || 0;
  const jwt = localStorage.getItem('token')
  const history = useHistory()
  verifyJWT(jwt, UserId)

  const checkLogin = () => {
    const show = JSON.parse(localStorage.getItem('isLoggedIn'))
    if (!show) {
      localStorage.clear()
      history.push('/')
      return
    }
  }
  
  useEffect(() => {
    checkLogin()
    const id = localStorage.getItem('UserId') || 0;
    fetch(`/user_rentals/${id}`)
    .then(res => res.json())
    .then(data => {
      setRentalData(data)
    })
    .catch(err => alert(err))
  }, [])

  checkLogin()
  
  const myInfo = {
    "first_name": rentalData.first_name,
    "last_name": rentalData.last_name,
    "email": rentalData.email,
    "phone_number": rentalData.phone_number,
    "address": rentalData.phone_number,
  }

  const [acctInfo, setAcctInfo] = useState(myInfo)

  const handleSubmit = (e) => {
    e.preventDefault()
    checkLogin()
    const id = localStorage.getItem('UserId') || 0;
    
    const updatedAcctInfo = {};
   
    Object.keys(acctInfo).forEach(field => {
      // console.log(field, acctInfo[field]==="")
      if (acctInfo[field] !== myInfo[field] && acctInfo[field].trim() !== "") {
        updatedAcctInfo[field] = acctInfo[field];
      }
    });
    console.log(updatedAcctInfo)
    fetch(`/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedAcctInfo),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setRentalData(data);
        setOpen(false);
      })
      .catch(err => alert(err));
  };

  const handleChange = (e) => {
    checkLogin()
    const { name, value } = e.target;
    setAcctInfo({ ...acctInfo, [name]: value });
  };
  
  
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
    <div className="act-btn">
    <Button floated="right" icon='edit' color="red">Delete Account</Button>
    <Button floated='right' icon='edit' onClick={() => setOpen(true)}>Edit Account</Button>
    </div>
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
    <Modal
        // className="movie-modal"
        onClose={() => setOpen(false)}
        dimmed="show"
        dimmer="blurring"
        size="small"
        open={open}
      >
      <Modal.Header>
        My Account Information
      </Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input 
            label="First Name" 
            onChange={handleChange}
            value={acctInfo.first_name}
            type="name" 
            placeholder={rentalData.first_name} 
            id="first_name" 
            name="first_name"
            width={8}
            />
            <Form.Input
            label='Last Name'
            onChange={handleChange}
            value={acctInfo.last_name}
            type="name"
            placeholder={rentalData.last_name}
            id="last_name" 
            name="last_name"
            width={8}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
            label='Email'
            onChange={handleChange}
            value={acctInfo.email}
            type="email"
            placeholder={rentalData.email}
            id="email"
            name="email"
            width={8}
            />
            <Form.Input
            label='Phone Number'
            onChange={handleChange}
            value={acctInfo.phone_number}
            type="phone_number"
            placeholder={rentalData.phone_number}
            id="phone_number"
            name="phone_number"
            width={8}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
            label='Address'
            onChange={handleChange}
            value={acctInfo.address}
            type="address"
            placeholder={rentalData.address}
            id="address"
            name="address"
            width={16}
            />
          </Form.Group>
          <Button>Update My Info</Button>
        </Form>
      </Modal.Content>
      </Modal>
    </div>

  )
}

export default Profile;
