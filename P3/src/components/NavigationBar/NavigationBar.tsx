import React, {useContext, useEffect, useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/logo-cropped.png";
import styles from "./NavigationBar.module.css";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import UserDropdown from "./UserDropdown";
import { Nav, NavItem } from "react-bootstrap";
import Notifications from "../Notifications";
import { Notification } from '../../responses/notification';

const NavigationBar: React.VFC = () => {
  const { header, user, signOut } = useContext(AuthContext);
  const [nots, setNots] = useState<Notification[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log(`user id: ${user?.id}`)
    const fetchNots = () => {
      fetch("/notifications/", {
        headers: header
      }).then(r => r.json())
      .catch(e => console.log(e))
        .then(d => {
          console.log(d);
          setNots(d);
        });
    } 
    fetchNots();
    const timer = setInterval(fetchNots, 5 * 60 * 1000);
    return () => clearInterval(timer);
  }, [header]);

  return <>
      <Navbar bg="red" variant="dark">
        <Container fluid>
          <Navbar.Brand className="d-flex" as={Link} to="/">
            <img src={logo} className={styles.logo} alt="Logo" />
            <span>estify™</span>
          </Navbar.Brand>
          <Nav>
            {user ? <><NavItem style={{
              display: "flex",
              alignItems: "center"
            }}><a onClick={() => setShow(!show)}>{nots.length} notifications</a></NavItem> <UserDropdown user={user} signOut={signOut} /></> :
              <>
                <Nav.Link as={Link} to="/signup" className="fw-bold text-white">Sign Up</Nav.Link>
                <Nav.Link as={Link} to="/signin" className="fw-bold text-white ms-2">Sign In</Nav.Link>
              </>
            }
          </Nav>
        </Container>
      </Navbar>

      <Notifications show={show} setShow={setShow} nots={nots}/>
    </>;
}

export default NavigationBar;