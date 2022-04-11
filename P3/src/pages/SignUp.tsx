import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SignUpForm from "../components/Forms/SignUpForm";

const SignUp: React.VFC = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={{ span: 4, offset: 4 }}>
          <SignUpForm />
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;