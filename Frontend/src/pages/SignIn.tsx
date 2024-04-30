import React, {useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SignInForm from "../components/Forms/SignInForm";

const SignIn: React.VFC = () => {

  useEffect(() => {
    document.title = "Restify - Sign In";
  }, []);

  return (
    <Container fluid className="flex-grow-1 d-flex flex-column justify-content-center">
      <Row className="justify-content-center">
        <Col sm={10} md={8} lg={6} xl={4}>
          <SignInForm />
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;