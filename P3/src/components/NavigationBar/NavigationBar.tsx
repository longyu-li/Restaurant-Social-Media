import React from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/logo-cropped.png";
import styles from "./NavigationBar.module.css";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const NavigationBar: React.VFC = () => {
  return (
    <Navbar bg="red" variant="dark">
      <Container fluid>
        <Navbar.Brand className="d-flex" as={Link} to="/">
          <img src={logo} className={styles.logo} alt="Logo" />
          <span>estify™</span>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;