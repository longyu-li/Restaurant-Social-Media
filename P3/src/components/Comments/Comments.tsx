import React from "react";
import { ListGroup} from "react-bootstrap";
import {Comment} from "../../responses/comment";
import InfiniteScroll from "react-infinite-scroll-component";
import { timeSince } from "../..";
import AddCommentForm from "../Forms/AddCommentForm";

interface Props {
    id: Number;
    comments: Comment [];
    setComment: React.Dispatch<React.SetStateAction<Comment[]>>;
    fetchComment: () => {};
    hasComment: boolean;
}
const Comments: React.VFC<Props> = (data) => {
    return (
        <div className="d-grid gap-2">
            <AddCommentForm  comment={data.comments} id={data.id} setComment={data.setComment}/>
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
                    className="d-flex justify-content-between align-items-start gap-3"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.owner.first_name}</div>
                        {item.content}
                    </div>
                    <span style={{flexShrink: "0"}}>{timeSince(new Date(item.date))}</span>
                </ListGroup.Item>;
            })}  </ListGroup>
        </InfiniteScroll></div>);


}
export default Comments;