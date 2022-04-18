import React, {useContext, useEffect, useState} from "react";
import {Badge, Button, ListGroup} from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import {BlogPost} from "../../responses/blogPost";
import styles from "./Blog.module.css";
import {AuthContext} from "../../contexts/AuthContext";
import {Restaurant} from "../../responses/restaurant";

interface Props {
    blog: BlogPost [];
    fetchBlog: () => {};
    hasBlog: boolean;
    restaurant: Restaurant;
}
const Blog: React.VFC<Props> = (data) => {
    const user = useContext(AuthContext).user;
    const [liked, setLiked] = useState(new Map<Number, boolean>());
    const access  = useContext(AuthContext).tokens!;
    const updateLiked = (k:Number,v:boolean) => {
        setLiked(liked.set(k,v));
    }

    useEffect(() => {
        if (user !== null && data.restaurant.id !== user.id){
            data.blog.map(item => {
                fetch(`/restaurants/blog/${item.id}/like/`, {headers: {'Authorization': `Bearer ${access.access}`}})
                    .then(res => {
                        if (res.ok) {
                            res.json().then(res => {
                                updateLiked(item.id, res);
                                console.log(item.id, res);
                            })

                        }})
            })

        }
        else {
            data.blog.map(item => {
                updateLiked(item.id, false);
            })
        }
    });

    const toggleLike = async (id: Number) => {
        if (user !== null && data.restaurant.id !== user.id) {
            fetch(`/restaurants/blog/${id}/like/`, {
                method: "POST",
                headers: {'Authorization': `Bearer ${access.access}`}
            })
                .then(res => {
                        if (res.ok) {
                            res.json().then(res => {
                                updateLiked(id, res);
                            })
                        }
                    }
                )
        }
    }

    return (
        <div className="d-grid gap-2">
            {(user !== null && data.restaurant.id === user.id) ?
                <Button variant="dark" size="lg">
                    Add Blog Post
                </Button> : <></>}

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
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.title}</div>
                        <p className={"mb-1"}>{item.content}</p>
                        <small className={styles.vote}> <a id={styles.like} type="checkbox"
                                                           onClick={() => toggleLike(item.id)}>{liked.get(item.id) ? <>❤</> : <>🤍</>}</a> {item.likes}
                        </small> {(user !== null && data.restaurant.id === user.id) ? <Badge bg="danger" pill>
                        Delete
                    </Badge> : <></>}
                    </div>
                    {new Date(item.date).toLocaleString()}
                </ListGroup.Item>;
            })}  </ListGroup>
        </InfiniteScroll></div>);


}
export default Blog;
