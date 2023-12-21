import React, { useEffect, useContext } from "react";
import Job from "../components/Job";
import { AuthContext } from "../context/AuthContext";
import { Container } from "react-bootstrap";

const Home = () => {
  const { jobs, fetchJobs } = useContext(AuthContext);

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Container>
      <h2 className="mt-4">Home</h2>
      {jobs.length > 0 ? (
        jobs.map((job) => (
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

export default Home;
