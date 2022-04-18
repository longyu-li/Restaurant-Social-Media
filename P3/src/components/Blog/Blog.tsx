import React, {useContext, useEffect, useState} from "react";
import {Badge, ListGroup} from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import {BlogPost} from "../../responses/blogPost";
import styles from "./Blog.module.css";
import {AuthContext} from "../../contexts/AuthContext";
import {Restaurant} from "../../responses/restaurant";
import { timeSince } from "../..";
import AddBlogPostForm from "../Forms/AddBlogPostForm";

interface Props {
    blog: BlogPost [];
    setBlog: React.Dispatch<React.SetStateAction<BlogPost[]>>;
    fetchBlog: () => {};
    hasBlog: boolean;
    restaurant: Restaurant;
}

const Blog: React.VFC<Props> = (data) => {
    const {user, header} = useContext(AuthContext);
    const [liked, setLiked] = useState(new Map<Number, boolean>());
    const updateLiked = (k: number, v: boolean) => {
        setLiked(prevLiked => new Map(prevLiked.set(k,v)));
    }

    const [blogIds] = useState(() => data.blog.map(blog => blog.id));

    useEffect(() => {
        if (!header)
            return;
        blogIds.forEach(blogId => {
            fetch(`/restaurants/blog/${blogId}/like/`, {
                headers: header
            }).then(res => res.json())
              .then(res => updateLiked(blogId, res));
        })
    }, [header, blogIds]);

    const toggleLike = async (id: number) => {
        if (!header)
            return;
        if (data.restaurant.user.id === user!.id)
            return;

        fetch(`/restaurants/blog/${id}/like/`, {
            method: "POST",
            headers: header
        }).then(res => res.json() as Promise<boolean>)
            .then(res => updateLiked(id, res))
            .then(_ => fetch(`/restaurants/blogs/${id}/`))
            .then(res => res.json() as Promise<BlogPost>)
            .then(post => {
                data.setBlog(prev => prev.map(bp => bp.id === post.id ? post : bp));
            });
    }

    const deleteBlogPost = async(id: number) => {
        if (!header)
            return;

        fetch(`/restaurants/blog/${id}`, {
            method: "DELETE",
            headers: header
        }).then(_ => {
            data.setBlog(prev => prev.filter(item => item.id !== id));
        });
    }

    return (
        <div className="d-grid gap-2">
            {(user !== null && data.restaurant.id === user.id) ?
                <AddBlogPostForm  blog={data.blog} setBlog={data.setBlog}/> : <></>}

            <InfiniteScroll
            dataLength={data.blog.length} //This is important field to render the next data
            next={data.fetchBlog}
            hasMore={data.hasBlog}
            loader={<></>}
            endMessage={<></>}
        >
            <ListGroup as="ul">
                {data.blog.map(item => {
                    return <ListGroup.Item
                        as="li" key={item.id}
                        className="d-flex justify-content-between align-items-start gap-4"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.title}</div>
                            <p className={"mb-1"}>{item.content}</p>
                             <small className={styles.vote}>
                                 <a id={styles.like} type="checkbox" onClick={() => toggleLike(item.id)}>
                                     {liked.get(item.id) ? "❤" : "🤍"}
                                 </a> {item.likes}
                             </small> {(user !== null && data.restaurant.id === user.id) ? <Badge bg="danger" pill onClick={() => deleteBlogPost(item.id)} className={styles.delete}>
                                 Delete
                            </Badge> : <></>}
                        </div>
                        <span style={{flexShrink: "0"}}>{timeSince(new Date(item.date))}</span>
                    </ListGroup.Item>;
                })}
            </ListGroup>
        </InfiniteScroll></div>);


}
export default Blog;
