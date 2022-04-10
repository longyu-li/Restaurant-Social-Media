import React from "react";
// have to use Dropdown instead of NavDropdown to style the Toggle text color
import {Dropdown, NavItem, NavLink} from "react-bootstrap";
import {User} from "../../../responses/user";

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
        {user.first_name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <p>PLACEHOLDER</p>
        <Dropdown.Divider />
        <Dropdown.Item as="button" onClick={signOut}>
          Sign Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropdown;