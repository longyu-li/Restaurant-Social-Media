import React from "react";
import {ListGroup} from "react-bootstrap";
import {Comment} from "../../responses/comment";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
    comments: Comment [];
    fetchComment: () => {};
    hasComment: boolean;
}
const Comments: React.VFC<Props> = (data) => {

    return (
        <InfiniteScroll
            dataLength={data.comments.length} //This is important field to render the next data
            next={data.fetchComment}
            hasMore={data.hasComment}
            loader={<h1>Loading Comments ...</h1>}
            endMessage={<></>}
        ><ListGroup as="ul">
            {data.comments.map((item) => {
                return <ListGroup.Item
                    as="li" key={item.id}
                    className="d-flex justify-content-between align-items-start dank"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.owner.first_name}</div>
                        {item.content}
                    </div>
                    {new Date(item.date).toLocaleString()}
                </ListGroup.Item>;
            })}  </ListGroup>
        </InfiniteScroll>);


}
export default Comments;