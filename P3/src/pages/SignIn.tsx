import React, {useContext} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SignInForm from "../components/Forms/SignInForm/SignInForm";
import {AuthContext} from "../contexts/AuthContext";

const SignIn: React.VFC = () => {

  const { signIn } = useContext(AuthContext);

  return (
    <Container fluid>
      <Row>
        <Col xs={{ span: 4, offset: 4 }}>
          <SignInForm onSubmit={signIn} />
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;