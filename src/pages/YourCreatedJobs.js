import React, { useEffect, useContext } from "react";
import Job from "../components/Job";
import { AuthContext } from "../context/AuthContext";
import { Container } from "react-bootstrap";
//
const YourCreatedJobs = () => {
  //
  const { yourCreatedJobs, fetchYourCreatedJobs } = useContext(AuthContext);
  //
  useEffect(() => {
    fetchYourCreatedJobs();
  }, []);
  //
  return (
    <Container>
      <h2 className="mt-4">Your Created Jobs</h2>
      {yourCreatedJobs.length > 0 ? (
        yourCreatedJobs.map((job) => (
          <div key={job._id} className="mb-3">
            <Job job={job} />
          </div>
        ))
      ) : (
        <p>No jobs available</p>
      )}
    </Container>
  );
};

export default YourCreatedJobs;
