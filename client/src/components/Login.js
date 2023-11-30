import React from "react";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";

const Login = ({ currentUser }) => {
  const emptyState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(emptyState);
  const history = useHistory()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5555/login/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((data) => {
        currentUser(data)
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("token", data["access_token"]);
        history.push('/movies')
      })
      .catch((err) => alert(err)); //useNavigate
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          <Image className="img-logo" src="/logo.png" /> Log-in to your account
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              value={formData.email}
              onChange={handleChange}
              name="email"
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

            <Button color="blue" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="/signup">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
