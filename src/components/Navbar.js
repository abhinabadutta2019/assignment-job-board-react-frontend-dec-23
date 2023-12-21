import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

const MyNavbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        WorkPro
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {user?.userType === "jobcreator" && (
            <Nav.Link as={Link} to="/create-job">
              Create Job
            </Nav.Link>
          )}
          {user?.userType === "jobcreator" && (
            <Nav.Link as={Link} to="/your-created-jobs">
              Your Created Jobs
            </Nav.Link>
          )}
          {user?.userType === "applicant" && (
            <Nav.Link as={Link} to="/your-applied-job">
              Your Applied Jobs
            </Nav.Link>
          )}
        </Nav>
        {user ? (
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Nav.Link as={Link} to="/auth">
            Auth
          </Nav.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
