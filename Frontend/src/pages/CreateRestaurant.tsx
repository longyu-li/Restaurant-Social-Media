import React, {useContext, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CreateRestaurantForm from "../components/Forms/CreateRestaurantForm/CreateRestaurantForm";
import {AuthContext} from "../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

const CreateRestaurant: React.VFC = () => {

  const { header } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Restify - Create Restaurant";

    fetch("/restaurants/", {
      headers: { ...header }
    })
        .then(res => {
          if (res.ok) {
            res.json().then(value => navigate(`/restaurant/${value.id}`));
          } else if (res.status !== 404) {
            res.json().then(value => console.log(value));
          }
        });
  }, [header, navigate]);

  return (
    <Container fluid className="flex-grow-1 d-flex flex-column justify-content-center">
      <Row className="justify-content-center">
        <Col sm={10} md={8} lg={6} xl={4}>
          <CreateRestaurantForm />
        </Col>
      </Row>
    </Container>
  );
}

export default CreateRestaurant;