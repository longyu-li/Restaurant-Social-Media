import React, {useContext} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import EditProfileForm from "../components/Forms/EditProfileForm";
import {AuthContext} from "../contexts/AuthContext";

const Settings: React.VFC = () => {

  const { user } = useContext(AuthContext);

  return (
    <Container fluid>
      <Row>
        <Col xs={{ span: 4, offset: 4 }}>
          {user && <EditProfileForm user={user} />}
        </Col>
      </Row>
    </Container>
  );
}

export default Settings;