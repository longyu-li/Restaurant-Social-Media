import React, { useContext, useEffect, useState } from "react";
import styles from "./RestaurantBanner.module.css";
import { Button, Card, Image, ToggleButton } from "react-bootstrap";
import { Restaurant } from "../../responses/restaurant";
import { AuthContext } from "../../contexts/AuthContext";
import { ReactComponent as PhoneIcon } from "bootstrap-icons/icons/telephone-fill.svg";
import { ReactComponent as MapIcon } from "bootstrap-icons/icons/geo-alt-fill.svg";
import EditRestaurantForm from "../Forms/EditRestaurantForm";

interface Props {
    restaurant: Restaurant;
    setRestaurant: React.Dispatch<React.SetStateAction<Restaurant | undefined>>
}

const RestaurantBanner: React.VFC<Props> = ({ restaurant, setRestaurant }) => {
    const [liked, setLiked] = useState<boolean>();
    const [following, setFollowing] = useState<boolean>();
    const { user, header } = useContext(AuthContext);

    const doLike = (set: boolean) => {
        if (!header)
            return;
        fetch(`/restaurants/${restaurant.id}/like/`, {
            method: set ? "POST" : "GET",
            headers: header
        }).then(res => res.json() as Promise<boolean>)
            .then(d => setLiked(d === true));
    }

    const refreshLike = () => doLike(false);
    const toggleLike = () => doLike(true);

    useEffect(refreshLike, [header]);

    const doFollow = (set: boolean) => {
        if (!header)
            return;
        fetch(`/restaurants/${restaurant.id}/follow/`, {
            method: set ? "POST" : "GET",
            headers: header
        }).then(res => res.json() as Promise<boolean>)
        .then(d => setFollowing(d === true));
    }

    const refreshFollow = () => doFollow(false);
    const toggleFollow = () => doFollow(true);

    useEffect(refreshFollow, [header]);

    const isOwner = user?.id === restaurant.user.id;

    const calcLikes = restaurant.likes + (liked ? 1 : 0);
    const calcFollows = restaurant.follows + (following ? 1 : 0);

    const [editOpen, setEditOpen] = useState(false);

    return (
        <Card style={{marginTop: "15px"}} className={styles.bannerCard}>
            <Card.Img variant="top" as="div" style={{ backgroundImage: `url(${restaurant.banner})` }} className={styles.banner} />
            <Card.Body>
                <div style={{
                    display: "flex",
                    gap: "30px"
                }}>
                    <div style={{
                        flexShrink: "0"
                    }}>
                        <Image roundedCircle={true} thumbnail={true} src={restaurant.logo} alt={"logo"} className={styles.icon} />
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        flexGrow: 1
                    }} className="me-2">
                        <div style={{
                            display: "flex",
                            gap: "25px"
                        }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <h4 id={styles.restaurantName}>{restaurant.name}</h4>
                                <div style={{
                                    display: "flex",
                                    gap: "15px",
                                    justifyContent: "center"
                                }}>
                                    <span>{calcLikes} {calcLikes === 1 ? "like" : "likes"}</span>
                                    <span>{calcFollows} {calcFollows === 1 ? "follower" : "followers"}</span>
                                </div>
                            </div>
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexGrow: "1"
                            }}>
                                <div style={{
                                    display: "flex",
                                    gap: "10px",
                                    visibility: isOwner || !header ? "hidden" : "visible"
                                }}>
                                    <ToggleButton className={styles.toggle} id="toggle-like" type="checkbox" variant="outline-dark" checked={liked ?? false} value="1"
                                        onChange={toggleLike}>
                                        {liked ? "liked" : "like"}
                                    </ToggleButton>
                                    <ToggleButton className={styles.toggle} id="toggle-follow" type="checkbox" variant="outline-dark" checked={following ?? false} value="1"
                                        onChange={toggleFollow}>
                                        {following ? "followed" : "follow"}
                                    </ToggleButton>
                                </div>
                                <div style={{
                                    visibility: isOwner ? "visible" : "hidden"
                                }}>
                                    <Button
                                        variant="danger"
                                        id={styles.edit}
                                        onClick={() => setEditOpen(true)}
                                    >
                                        Edit Restaurant
                                    </Button>
                                    <EditRestaurantForm
                                        editOpen={editOpen}
                                        setEditOpen={setEditOpen}
                                        restaurant={restaurant}
                                        setRestaurant={setRestaurant}
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{
                            display: "flex",
                            gap: "15px"
                        }}>
                            <div style={{
                                display: "flex",
                                gap: "5px",
                                alignItems: "center"
                            }}>
                                <PhoneIcon />
                                <span>{restaurant.phone_num}</span>
                            </div>
                            <div style={{
                                display: "flex",
                                gap: "5px",
                                alignItems: "center"
                            }}>
                                <MapIcon />
                                <span>{restaurant.address}</span>
                            </div>
                        </div>
                        <div><span>{restaurant.description}</span></div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default RestaurantBanner;