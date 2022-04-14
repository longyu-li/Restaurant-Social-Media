import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import EditProfileForm from "../components/Forms/EditProfileForm";

const Settings: React.VFC = () => {
  return (
    <Container fluid className="flex-grow-1 d-flex flex-column justify-content-center">
      <Row>
        <Col xs={{ span: 4, offset: 4 }}>
          <EditProfileForm />
        </Col>
      </Row>
    </Container>
  );
}

export default Settings;