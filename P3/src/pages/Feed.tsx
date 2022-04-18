import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { timeSince } from "..";
import { AuthContext } from "../contexts/AuthContext";
import { BlogPost, FeedResponse } from "../responses/blogPost";

const Feed: React.VFC = () => {
    const { header } = useContext(AuthContext);
    const [feed, setFeed] = useState<BlogPost[]>([]);
    const [next, setNext] = useState<string | null>(`/users/feed/`);

    useEffect(() => {
        document.title = "Restify - Feed";
    }, []);

    const more = () => {
        fetch(next!, {
            headers: header!
        }).then(r => r.json())
        .then(d => d as FeedResponse)
        .then(data => {
            console.log(data);
            setNext(data.next);
            setFeed([...feed, ...data.results]);
        })
    };

    useEffect(more, [header]);

    return <main style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        textAlign: "center"
    }}>
        <h2 style={{
            marginTop: "30px"
        }}>Feed</h2>
        <InfiniteScroll
            hasMore={next !== null}
            next={more}
            dataLength={feed.length}
            loader={<h4>Loading...</h4>}
            endMessage={<></>}
            style={{
                "display": "flex",
                "flexWrap": "wrap",
                "alignContent": "top",
                "justifyContent": "center",
                "alignItems": "flex-start",
                "gap": "1rem",
                "padding": "0 150px 30px",
            }}
            scrollThreshold={0.95}
        >
            {
                feed.map(f => {
                    const when = timeSince(new Date(f.date));
                    return <a key={f.id} href="#" className="list-group-item list-group-item-action">
                    <div className="d-flex align-items-center gap-3" style={{padding: "10px"}}>
                        {/* <div> */}
                            <img src={f.restaurant.logo} style={{ width: "100px", height: "100px", objectFit: "cover" }} className="avatar rounded-circle" />
                        {/* </div> */}
                        <div className="d-flex flex-column flex-grow-1" style={{padding: "0 10px"}}>
                            <div className="d-flex w-100 justify-content-between">
                                <h5 style={{ margin: "0" }}>{f.restaurant.name} - {f.title}</h5>
                                <small style={{
                                    flexShrink: "0",
                                    flexGrow: "0"
                                }}>{when}</small>
                            </div>
                            <div className="flex-grow-1" style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    flexDirection: "column"
                            }}>
                                <span style={{textAlign: "left"}}>{f.content}</span>
                            </div>
                        </div>
                    </div>
                </a>
                })
            }
        </InfiniteScroll>
    </main>
}

export default Feed;