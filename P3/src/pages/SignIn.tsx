import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SignInForm from "../components/Forms/SignInForm/SignInForm";

const SignIn: React.VFC = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={{ span: 4, offset: 4 }}>
          <SignInForm />
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;