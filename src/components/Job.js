import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
//
import { Button, Card } from "react-bootstrap";
//
const Job = ({ job }) => {
  const { user, url, fetchJobs } = useContext(AuthContext);
  const navigate = useNavigate(); // Use useNavigate

  //
  const viewApplicants = () => {
    const jobId = job._id;
    navigate(`/applicant-details/${jobId}`);
  };
  //

  //
  const fetchApiOfApply = async () => {
    try {
      const response = await fetch(`${url}/jobs/apply/${job._id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Successful application
        alert("Job application successful");
      } else if (response.status === 403) {
        alert("Permission denied");
      } else if (response.status === 400) {
        alert("Job already applied");
      } else {
        alert("Error applying for the job");
      }
    } catch (error) {
      alert("Error applying for the job");
    }
  };
  //
  const applyHandler = async () => {
    await fetchApiOfApply();
    //
    await fetchJobs();
  };
  //
  return (
    <Card key={job._id}>
      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <Card.Text>Posted by email: {job.createdBy.email}</Card.Text>
        <Card.Text>Description: {job.description}</Card.Text>
        <Card.Text>Posted on: {job.createdAt}</Card.Text>
        <Card.Text>Total applicants: {job.appliedBy.length}</Card.Text>

        {user.userType === "applicant" && ( // Conditionally render the Apply button
          <Button variant="primary" onClick={applyHandler}>
            Apply
          </Button>
        )}
        {user.userType === "jobcreator" && job.appliedBy.length > 0 && (
          <Button variant="secondary" onClick={viewApplicants}>
            View Applicants
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Job;
