import React, {useContext} from "react";
import styles from "./RestaurantBanner.module.css";
import logo from "../../assets/logo-cropped.png";
import {Button, Card, Col, Image, Row, Stack} from "react-bootstrap";
import {RestaurantContext} from "../../contexts/RestaurantContext";

const RestaurantBanner: React.VFC = () => {

    const restaurant = useContext(RestaurantContext).restaurant;

    if (restaurant === null){
        return (<h1> This Restaurant Does Not Exist</h1>);
    }

    return (
        <Card style={{}} id={styles.bannerCard}>
            <Card.Img variant="top" src={restaurant.banner} id={styles.banner}/>
            <Card.Body>
                <Row>
                    <Col xs={2}>
                        <Image roundedCircle={true} thumbnail={true} src={restaurant.logo} alt={"logo"} className={styles.icon}/>
                    </Col>
                    <Col>
                        <Stack direction="horizontal" gap={3} className={styles.stack}>
                            <h4 id={styles.restaurantName}>{restaurant.name}</h4>
                            <Button variant="primary">Like</Button>
                            <Button variant="primary">Follow</Button>
                            <Button variant="danger" id={styles.edit}>Edit profile</Button>
                        </Stack>
                        <br/>
                        <Stack direction="horizontal" gap={3}>
                            <p>
                                {restaurant.likes} Likes
                            </p>
                            <p>
                                {restaurant.follows} Followers
                            </p>
                        </Stack>
                        <Stack direction="horizontal" gap={3}>
                            <p>
                                {restaurant.phone_num}
                            </p>
                            <p>
                                {restaurant.address}
                            </p>
                        </Stack>
                        <Card.Text>
                            {restaurant.description}
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
  );
}

export default RestaurantBanner;