import React from "react";
import { Container, Alert } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container className="mt-4">
      <Alert variant="danger">
        <h2>Not found, please try another page.</h2>
      </Alert>
    </Container>
  );
};

export default NotFound;
