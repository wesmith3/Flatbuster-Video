import React from "react";
import { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import * as SemanticUI from "semantic-ui-react";

import ErrorSnackBar from "./ErrorSnackBar";


const Signup = () => {
  const emptyState = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    password: "",
    is_employee: false,
  };
  const [formData, setFormData] = useState(emptyState);
  const [errors, setErrors] = useState([]);
  const validateForm = () => {
    const errorMessages = [];

    // Regex to check for email
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errorMessages.push("Please enter a valid email address");
    }
    if (!formData.password || formData.password.length < 8) {
      errorMessages.push("Password must be at least 8 characters long");
    }

    setErrors(errorMessages);

    // If true, there are no validation errors
    return errorMessages.length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
  
    fetch("http://localhost:5555/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((userData) => {
        // Assuming userData includes the user ID as userData.id
        const userId = userData.id;
  
        // Create a cart for the new user
        return fetch("http://localhost:5555/carts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        });
      })
      .then((r) => r.json())
      .then((cartData) => {
        setFormData(emptyState);
        window.localStorage.setItem("UserId", cartData.user_id);
      })
      .catch((err) => alert(err));

  };
  

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          <Image className="img-logo" src="/logo.png" /> Create your account.
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="First Name"
              value={formData.first_name}
              name="first_name"
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Last Name"
              value={formData.last_name}
              name="last_name"
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              placeholder="E-mail address"
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="phone"
              iconPosition="left"
              placeholder="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              name="phone_number"
            />
            <Form.Input
              fluid
              icon="home"
              iconPosition="left"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              name="address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
            />
            <ErrorSnackBar errors={errors} />
            <SemanticUI.Button color="blue" fluid size="large">
              Signup
            </SemanticUI.Button>
          </Segment>
        </Form>
        <Message>
          Already a member? <a href="/login">Login</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Signup;
