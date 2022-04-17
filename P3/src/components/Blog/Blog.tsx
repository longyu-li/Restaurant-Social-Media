import React from "react";
import {Badge, ListGroup} from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import {BlogPost} from "../../responses/blogPost";

interface Props {
    blog: BlogPost [];
    fetchBlog: () => {};
    hasBlog: boolean;
}
const Blog: React.VFC<Props> = (data) => {

    return (
        <InfiniteScroll
            dataLength={data.blog.length} //This is important field to render the next data
            next={data.fetchBlog}
            hasMore={data.hasBlog}
            loader={<h1>Loading Blog ...</h1>}
            endMessage={<></>}
        ><ListGroup as="ul">
            {data.blog.map((item) => {
                return <ListGroup.Item
                    as="li" key={item.id}
                    className="d-flex justify-content-between align-items-start dank"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.title}</div>
                        {item.content}
                    </div>
                    ${item.date}
                    <Badge bg="success" pill>

                    </Badge>
                </ListGroup.Item>;
            })}  </ListGroup>
        </InfiniteScroll>);


}
export default Blog;
