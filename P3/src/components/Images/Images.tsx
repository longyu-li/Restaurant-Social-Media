import React, {useContext} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import {Image} from "../../responses/image";
import InfiniteScroll from "react-infinite-scroll-component";
import {AuthContext} from "../../contexts/AuthContext";
import {Restaurant} from "../../responses/restaurant";

interface Props {
    images: Image [];
    fetchImage: () => {};
    hasImage: boolean;
    restaurant: Restaurant
}
const Images: React.VFC<Props> = (data) => {
    const user = useContext(AuthContext).user;
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

        >
        <Row xs={1} md={4} className="g-4">
                {data.images.map((item) => {
                    return <Col key={item.id}><Card >
                        <Card.Img variant="top" src={item.image}/>
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                {item.description}
                            </Card.Text>
                        </Card.Body>
                    </Card></Col>})}
        </Row>

        </InfiniteScroll></div>);


}
export default Images;