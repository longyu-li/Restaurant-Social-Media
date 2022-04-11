import React from "react";
// have to use Dropdown instead of NavDropdown to style the Toggle text color
import {Dropdown, NavItem, NavLink} from "react-bootstrap";
import {User} from "../../../responses/user";
import styles from "./UserDropdown.module.css";
import {Link} from "react-router-dom";

interface Props {
  user: User;
  signOut: () => void;
}

const UserDropdown: React.VFC<Props> = ({
  user,
  signOut
}) => {
  return (
    <Dropdown as={NavItem} align="end">
      <Dropdown.Toggle as={NavLink} className="text-white">
        {user.first_name + " "}
      </Dropdown.Toggle>
      <Dropdown.Menu className="text-center">
        <img src={user.avatar} alt="Avatar" className={`${styles.avatar} mx-5`} />
        <h6 className="text-wrap text-break mx-2 my-3">{`${user.first_name} ${user.last_name}`}</h6>
        <a className="d-block mx-2 mb-2 text-break" href={`mailto:${user.email}`}>{user.email}</a>
        <a className="d-block mx-2 mb-3" href={`tel:${user.phone_num}`}>{user.phone_num}</a>
        <Dropdown.Divider />
        <Dropdown.Item as={Link} to="/settings">
          Edit Profile
        </Dropdown.Item>
        <Dropdown.Item as="button" onClick={signOut}>
          Sign Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropdown;