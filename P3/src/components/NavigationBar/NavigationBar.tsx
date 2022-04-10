import React, {useContext} from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/logo-cropped.png";
import styles from "./NavigationBar.module.css";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import UserDropdown from "./UserDropdown";

const NavigationBar: React.VFC = () => {

  const { user, signOut } = useContext(AuthContext);

  return (
    <Navbar bg="red" variant="dark">
      <Container fluid>
        <Navbar.Brand className="d-flex" as={Link} to="/">
          <img src={logo} className={styles.logo} alt="Logo" />
          <span>estify™</span>
        </Navbar.Brand>
        {user && <UserDropdown user={user} signOut={signOut} />}
      </Container>
    </Navbar>
  );
}

export default NavigationBar;