import React from "react";
import {Card, Col, ListGroup, Row} from "react-bootstrap";
import {Image} from "../../responses/image";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
    images: Image [];
    fetchImage: () => {};
    hasImage: boolean;
}
const Images: React.VFC<Props> = (data) => {

    return (
        <InfiniteScroll
            dataLength={data.images.length} //This is important field to render the next data
            next={data.fetchImage}
            hasMore={data.hasImage}
            loader={<h1>Loading Images ...</h1>}
            endMessage={<></>}

        >
        <Row xs={1} md={4} className="g-4">
                {data.images.map((item) => {
                    return <Col><Card key={item.id}>
                        <Card.Img variant="top" src={item.image}/>
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>
                                {item.description}
                            </Card.Text>
                        </Card.Body>
                    </Card></Col>})}
        </Row>

        </InfiniteScroll>);


}
export default Images;