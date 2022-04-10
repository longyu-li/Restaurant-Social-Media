import React from "react";
import {Form, Row, Col} from "react-bootstrap";

const EditProfileForm: React.VFC = () => {
  return (
    <Form noValidate>
      <Row className="g-3">
        <Col xs={12} className="text-center">
          <h1>Edit Profile</h1>
        </Col>
      </Row>
    </Form>
  );
}

export default EditProfileForm;
