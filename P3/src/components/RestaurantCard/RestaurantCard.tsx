import React, { useContext } from "react";
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
        navigate(`/restaurant/${data.id}/`)
    }

    const likes = data.likes ? <span style={{fontWeight: "bold"}}>{data.likes} {data.likes === 1 ? "like" : "likes"}</span> : <></>;
    const follows = data.follows ? <span style={{fontWeight: "bold"}}>{data.follows} {data.follows === 1 ? "follower" : "followers"}</span> : <></>;

    return <Card className={styles.card}>
            <a className="stretched-link" onClick={link} href=""></a>
            <Card.Img variant="top" src={ data.logo } className={styles.img}/>
            <Card.Body className={styles.body}>
                <Card.Title className={styles.title}>{ data.name }</Card.Title>
                <div style={{
                    display: "flex",
                    gap: "4px"
                }}>
                    {likes}
                    <b>|</b>
                    {follows}
                </div>
                <span style={{
                    overflow: 'hidden',
                }}>{data.description}</span>
            </Card.Body>
        </Card>;
}

export default RestaurantCard;