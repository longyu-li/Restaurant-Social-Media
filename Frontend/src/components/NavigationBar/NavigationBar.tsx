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
  const [restaurantId, setRestaurantId] = useState<number>();

  useEffect(() => {

    fetch("/restaurants/", {
      headers: { ...header }
    })
      .then(res => {
        if (res.ok) {
          res.json().then(value => setRestaurantId(value.id));
        } else if (res.status === 404) {
          setRestaurantId(0);
        } else {
          res.json().then(value => console.log(value));
        }
      });

    const fetchNots = () => {
      if (!header)
        return;
      fetch("/notifications?page_size=50", {
        headers: header!
      }).then(r => r.json())
      .catch(e => console.log(e))
        .then(d => {
          if (!d)
            console.error("If you're seeing this then something bad happened to the notifications");
          else
            setNots(d);
        });
    } 
    fetchNots();
    const timer = setInterval(fetchNots, 5 * 60 * 1000);
    return () => clearInterval(timer);
  }, [header]);

  return <>
      <Navbar bg="red" variant="dark">
        <Container fluid className="justify-content-start">
          <Navbar.Brand className="d-flex" as={Link} to="/">
            <img src={logo} className={styles.logo} alt="Logo" />
            <span>estify™</span>
          </Navbar.Brand>
          <Nav className="me-auto">
            {user && <Nav.Link as={Link} to="feed" className="text-white">Feed</Nav.Link>}
            {user && restaurantId !== undefined && (
              restaurantId ? <Nav.Link as={Link} to={`/restaurant/${restaurantId}`} className="text-white">My Restaurant</Nav.Link> :
                  <Nav.Link as={Link} to="/create-restaurant" className="text-white">Create Restaurant</Nav.Link>
            )}
          </Nav>
          <div className="d-flex">
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
          </div>
        </Container>
      </Navbar>

    {header ? <Notifications show={show} setShow={setShow} nots={nots}/> : <></>}
    </>;
}

export default NavigationBar;