import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

const CreateJob = () => {
  const { user, url } = useContext(AuthContext);

  const formHandler = async (event) => {
    event.preventDefault();

    const titleElement = document.getElementById("title");
    const descriptionElement = document.getElementById("description");

    const title = titleElement.value;
    const description = descriptionElement.value;

    try {
      const response = await fetch(`${url}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });

      if (response.ok) {
        window.alert("Job created successfully");
        titleElement.value = "";
        descriptionElement.value = "";
      } else if (response.status === 403) {
        alert("Job title already used");
      }
    } catch (error) {
      console.error(error);
      alert("Error creating the job");
    }
  };

  return (
    <Container>
      <h2 className="mt-4">Create Job post</h2>
      <Row>
        <Col md={4}>
          <Form onSubmit={formHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" required />
            </Form.Group>
            <Button type="submit" variant="success">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateJob;
