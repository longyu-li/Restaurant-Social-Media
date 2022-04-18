import React, {useContext} from "react";
import {Badge, Button, Card, Col, Row} from "react-bootstrap";
import {Image} from "../../responses/image";
import InfiniteScroll from "react-infinite-scroll-component";
import {AuthContext} from "../../contexts/AuthContext";
import {Restaurant} from "../../responses/restaurant";
import styles from "./Images.module.css";

interface Props {
    images: Image [];
    setImage:  React.Dispatch<React.SetStateAction<Image[]>>;
    fetchImage: () => {};
    hasImage: boolean;
    restaurant: Restaurant;
}
const Images: React.VFC<Props> = (data) => {
    const user = useContext(AuthContext).user;
    const access  = useContext(AuthContext).tokens!;

    const deleteImages = async(id: Number) => {
        fetch(`/restaurants/images/${id}`, {
            method: "DELETE",
            headers: {'Authorization': `Bearer ${access.access}`}
        })
            .then(res => {
                    if (res.ok) {
                        data.setImage(data.images.filter(item => item.id !== id));
                    }
                }
            )
    }

    return (
        <div className="d-grid gap-2">
            {(user !== null && data.restaurant.id === user.id) ?
                <Button variant="dark" size="lg">
                    Add Image
                </Button> : <></>}
        <InfiniteScroll
            dataLength={data.images.length} //This is important field to render the next data
            next={data.fetchImage}
            hasMore={data.hasImage}
            loader={<h1>Loading Images ...</h1>}
            endMessage={<></>}
            style={{
                overflow: "hidden"
            }}
        >
        <Row xs={1} md={4} className="g-4">
                {data.images.map((item) => {
                    return <Col key={item.id}><Card style={{
                        borderColor: "black",
                        borderRadius: "6px"
                    }}>
                        <Card.Img variant="top" src={item.image}/>
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                {item.description}
                            </Card.Text>
                            {(user !== null && data.restaurant.id === user.id) ? <Badge bg="danger" pill onClick={() => deleteImages(item.id)} className={styles.delete}>
                                Delete
                            </Badge> : <></>}
                        </Card.Body>
                    </Card></Col>})}
        </Row>

        </InfiniteScroll></div>);


}
export default Images;