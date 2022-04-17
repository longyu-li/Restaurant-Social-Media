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
import { ReactComponent as BellIcon } from "bootstrap-icons/icons/bell.svg";

const NavigationBar: React.VFC = () => {
  const { header, user, signOut } = useContext(AuthContext);
  const [nots, setNots] = useState<Notification[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchNots = () => {
      if (!header)
        return;
      fetch("/notifications?page_size=50", {
        headers: header!
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
            {user ? <>
              <Nav.Link as={Link} to="#" className="fw-bold text-white" onClick={() => setShow(!show)}>
              <div id={styles.bell}>
                  <BellIcon />
                  <span>{nots.length}</span>
              </div>
              </Nav.Link>
              <UserDropdown user={user} signOut={signOut} />
            </>
            : <>
                <Nav.Link as={Link} to="/signup" className="fw-bold text-white">Sign Up</Nav.Link>
                <Nav.Link as={Link} to="/signin" className="fw-bold text-white ms-2">Sign In</Nav.Link>
              </>
            }
          </Nav>
        </Container>
      </Navbar>

    {header ? <Notifications show={show} setShow={setShow} nots={nots}/> : <></>}
    </>;
}

export default NavigationBar;