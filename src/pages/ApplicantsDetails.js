import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";

const ApplicantsDetails = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const { user, url } = useContext(AuthContext);

  const fetchAppliedUsersDetails = async () => {
    try {
      const response = await fetch(`${url}/jobs/appliedUsers/${jobId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setApplicants(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAppliedUsersDetails();
  }, [jobId]);

  return (
    <Container className="mt-4">
      <h2>Applicants Details</h2>
      <ListGroup>
        {applicants.map((applicant) => (
          <ListGroupItem key={applicant.email}>
            <h4>User Email:</h4>
            <p>{applicant.email}</p>
            <h4>User CV link:</h4>
            <p>{applicant.cvUrl}</p>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

export default ApplicantsDetails;
