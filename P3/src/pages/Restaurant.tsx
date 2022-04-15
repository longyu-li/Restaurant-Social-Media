import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import RestaurantBanner from "../components/RestaurantBanner";
import {RestaurantProvider} from "../contexts/RestaurantContext";
import RestaurantNav from "../components/RestaurantNav";
import {useParams} from "react-router-dom";


const Restaurant: React.VFC = () => {

  const params = useParams();

  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    fetch(`/restaurants/${params.id}`)
      .then(res => {
         if (res.ok) {

           res.json().then(data => setRestaurant(data));

         }
      });
  }, [params.id]);

  useEffect(() => {
    if (restaurant) {
      console.log(restaurant);
    }
  }, [restaurant]);

  return (
      <RestaurantProvider>
          <Container fluid>
              <Row>
                  <Col xs={{ span: 8, offset: 2 }}>
                      <RestaurantBanner />
                      <RestaurantNav/>
                  </Col>
              </Row>
          </Container>
      </RestaurantProvider>
  );
}

export default Restaurant;