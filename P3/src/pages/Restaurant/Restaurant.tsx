import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import RestaurantBanner from "../../components/RestaurantBanner";
import {useParams} from "react-router-dom";
import styles from "./Restaurant.module.css";
import {Tab, Tabs} from "react-bootstrap";
import Menu from "../../components/Menu";


const Restaurant: React.VFC = () => {

  const params = useParams();

  const [restaurant, setRestaurant] = useState();
  const [menu, setMenu] = useState();

  useEffect(() => {
    fetch(`/restaurants/${params.id}`)
      .then(res => {
         if (res.ok) {

           res.json().then(data => setRestaurant(data));

         }
      });
  }, [params.id]);

    useEffect(() => {
        fetch(`/restaurants/${params.id}/menu?cursor=`)
            .then(res => {
                if (res.ok) {

                    res.json().then(data => setMenu(data));

                }
            });
    }, [params.id]);

  useEffect(() => {
    if (restaurant) {
      console.log(restaurant);
    }
  }, [restaurant]);

    useEffect(() => {
        if (menu) {
            console.log(menu);
        }
    }, [menu]);

  return ((restaurant !== undefined) ?
          <Container fluid>
              <Row>
                  <Col xs={{ span: 8, offset: 2 }}>
                      <RestaurantBanner data={restaurant}/>
                      <Tabs variant="tabs" defaultActiveKey="menu" className={styles.tabs}>
                          <Tab eventKey="menu" tabClassName={styles.tab} title="Menu">
                              <Menu />
                          </Tab>
                          <Tab eventKey="blogs" tabClassName={styles.tab} title="Blog Posts">
                          </Tab>
                          <Tab eventKey="comments" tabClassName={styles.tab} title="Comments">
                          </Tab>
                          <Tab eventKey="images" tabClassName={styles.tab} title="Images">
                          </Tab>
                      </Tabs>
                  </Col>
              </Row>
          </Container> : <h1>Restaurant Does Not Exist</h1>
  );
}

export default Restaurant;