import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Restaurant } from "../../responses/restaurant";
import styles from './RestaurantCard.module.css';

interface Props {
    data: Restaurant
}

const RestaurantCard: React.VFC<Props> = ({ data }) => {
    const aContext = useContext(AuthContext);
    const user = aContext.user!;

    const navigate = useNavigate();
    
    const link = () => {
        navigate(`/restaurants/${data.id}/`)
    }

    const likes = data.likes ? <p><b>{data.likes}</b> likes</p> : <></>;

    return <Card className={styles.card}>
            <a className="stretched-link" onClick={link} href=""></a>
            <Card.Img variant="top" src={ data.logo } className={styles.img}/>
            <Card.Body className={styles.body}>
                <Card.Title className={styles.title}>{ data.name }</Card.Title>
                {likes}
                <span style={{
                    overflow: 'hidden',
                }}>{data.description}</span>
            </Card.Body>
        </Card>;
}

export default RestaurantCard;