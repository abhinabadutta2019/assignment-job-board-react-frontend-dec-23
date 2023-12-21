import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Card, ListGroup } from "react-bootstrap";

const YourAppliedJobs = () => {
  const { user, url } = useContext(AuthContext);

  // Define a state variable to store the applied jobs data
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Fetch applied jobs data when the component mounts
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch(`${url}/jobs/appliedJobs`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          console.log(data);
          setAppliedJobs(data);
        } else {
          // Handle errors if needed
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    fetchAppliedJobs(); // Call the fetch function when the component mounts
  }, []);
  return (
    <Container>
      <h2 className="mt-4">Your Applied Jobs</h2>
      {appliedJobs.map((job) => (
        <Card key={job._id} className="mb-3">
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <Card.Text>Contact: {job.createdBy.email}</Card.Text>
            <Card.Text>Details: {job.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default YourAppliedJobs;
