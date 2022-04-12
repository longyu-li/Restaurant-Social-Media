import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import RestaurantBanner from "../components/RestaurantBanner";
import {RestaurantProvider} from "../contexts/RestaurantContext";

const Restaurant: React.VFC = () => {
  return (
      <RestaurantProvider>
          <Container fluid>
              <Row>
                  <Col xs={{ span: 8, offset: 2 }}>
                      <RestaurantBanner />
                  </Col>
              </Row>
          </Container>
      </RestaurantProvider>
  );
}

export default Restaurant;