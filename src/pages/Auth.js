import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Form, Container, Col, Row } from "react-bootstrap";

const Auth = () => {
  const { login, url } = useContext(AuthContext);

  const [isLoginForm, setIsLoginForm] = useState(true);

  const loginHandler = async (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const response = await fetch(`${url}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const loginResult = await response.json();

        if (loginResult.token) {
          login(loginResult);
        }
      } else {
        window.alert("Login failed. Please check your username and password.");
      }
    } catch (err) {
      console.log(err);
      window.alert("An error occurred. Please try again.");
    }
  };

  const toggleForm = () => {
    setIsLoginForm((prevIsLoginForm) => !prevIsLoginForm);
  };

  const registrationHandler = async (event) => {
    event.preventDefault();

    const email = document.getElementById("registrationEmail").value;
    const password = document.getElementById("registrationPassword").value;
    const cvUrl = document.getElementById("registrationCV").value;
    const userType = document.getElementById("userType").value;

    try {
      const response = await fetch(`${url}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          cvUrl: cvUrl,
          userType: userType,
        }),
      });

      if (response.ok) {
        const registrationResult = await response.json();

        if (registrationResult.token) {
          login(registrationResult);
        }
      } else {
        if (response.status === 401) {
          const errorResponse = await response.json();
          window.alert(errorResponse.error);
        } else {
          window.alert("Registration failed. Please check your input.");
        }
      }
    } catch (err) {
      console.log(err);
      window.alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <Container>
      <h1 className="mt-4">WorkWave Auth</h1>
      <Row>
        <Col md={4} className="mt-4">
          <Button onClick={toggleForm} variant="primary">
            {isLoginForm ? "Switch to Registration" : "Switch to Login"}
          </Button>
        </Col>
      </Row>
      {isLoginForm ? (
        <Row>
          <Col md={4}>
            <h2>Login form</h2>
            <Form onSubmit={loginHandler}>
              <Form.Group controlId="loginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
              <Form.Group controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
              <Button type="submit" variant="success">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={4}>
            <h2>Registration form</h2>
            <Form onSubmit={registrationHandler}>
              <Form.Group controlId="registrationEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
              <Form.Group controlId="registrationPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
              <Form.Group controlId="registrationCV">
                <Form.Label>CV URL</Form.Label>
                <Form.Control type="text" required />
              </Form.Group>
              <Form.Group controlId="userType">
                <Form.Label>Select User Type</Form.Label>
                <Form.Control as="select">
                  <option value="applicant">Applicant</option>
                  <option value="jobcreator">Job Creator</option>
                </Form.Control>
              </Form.Group>
              <Button type="submit" variant="success">
                Register
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Auth;
