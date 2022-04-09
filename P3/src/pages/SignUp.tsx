import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SignUpForm from "../components/Forms/SignUpForm";
import { SignUpRequest } from "../validation/signup";

const SignUp: React.VFC = () => {


  const signUp = (data: SignUpRequest) => {
    console.log(data);
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={{ span: 4, offset: 4 }}>
          <SignUpForm onSubmit={signUp} />
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;