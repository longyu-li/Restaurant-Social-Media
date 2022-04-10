import React, {useContext} from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/logo-cropped.png";
import styles from "./NavigationBar.module.css";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import UserDropdown from "./UserDropdown";
import { Nav } from "react-bootstrap";

const NavigationBar: React.VFC = () => {

  const { user } = useContext(AuthContext);

  return (
    <Navbar bg="red" variant="dark">
      <Container fluid>
        <Navbar.Brand className="d-flex" as={Link} to="/">
          <img src={logo} className={styles.logo} alt="Logo" />
          <span>estify™</span>
        </Navbar.Brand>
        <Nav>
          {user ? <UserDropdown user={user} /> :
            <>
              <Nav.Link as={Link} to="/signup" className="fw-bold text-white">Sign Up</Nav.Link>
              <Nav.Link as={Link} to="/signin" className="fw-bold text-white ms-2">Sign In</Nav.Link>
            </>
          }
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;