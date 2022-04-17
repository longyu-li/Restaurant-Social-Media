import React, {useContext, useEffect, useState} from "react";
import styles from "./RestaurantBanner.module.css";
import logo from "../../assets/logo-cropped.png";
import {Button, Card, Col, Image, Row, Stack, ToggleButton} from "react-bootstrap";
import {Restaurant} from "../../responses/restaurant";
import {AuthContext} from "../../contexts/AuthContext";


interface Props {
    restaurant: Restaurant;
}

const RestaurantBanner: React.VFC<Props> = ({ restaurant}) => {
    const user = useContext(AuthContext).user;
    const [liked, setLiked] = useState(true);
    const [following, setFollowing] = useState(true);
    const access  = useContext(AuthContext).tokens!;

    useEffect(() => {
        if (access){
            fetch(`/restaurants/${restaurant.id}/like/`, {headers: {'Authorization': `Bearer ${access.access}`}})
                .then(res => {
                    if (res.ok) {
                        res.json().then(data => {
                            setLiked(!data);
                        })
                    }})
        }
    });

    const toggleLike = async () => {
        fetch(`/restaurants/${restaurant.id}/like/`, {
            method: "POST",
            headers: {'Authorization': `Bearer ${access.access}`}})
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setLiked(!data);
                    })
                }})
    };

    useEffect(() => {
        if (access){
            fetch(`/restaurants/${restaurant.id}/follow/`, {headers: {'Authorization': `Bearer ${access.access}`}})
                .then(res => {
                    if (res.ok) {
                        res.json().then(data => {
                            setFollowing(!data);
                        })
                    }})
        }
    });

    const toggleFollow = async () => {
        fetch(`/restaurants/${restaurant.id}/follow/`, {
            method: "POST",
            headers: {'Authorization': `Bearer ${access.access}`}})
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setFollowing(!data);
                    })
                }})
    };

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
                            {(user !== null && restaurant.id !== user.id) ?
                                <>
                                    <ToggleButton  className={styles.toggle} id="toggle-like" type="checkbox" variant="outline-dark" checked={liked} value="1"
                                                   onChange={toggleLike}>
                                        {liked ? <>Like</>: <>Liked</>}
                                    </ToggleButton>
                                    <ToggleButton  className={styles.toggle} id="toggle-follow" type="checkbox" variant="outline-dark" checked={following} value="1"
                                                   onChange={toggleFollow}>
                                        {following ? <>Follow</>: <>Following</>}
                                    </ToggleButton></> : <></>}
                            {(user !== null && restaurant.id === user.id) ? <Button variant="danger" id={styles.edit}>Edit profile</Button> : <></>}
                        </Stack>
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