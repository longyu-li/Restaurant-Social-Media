import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import RestaurantBanner from "../../components/RestaurantBanner";
import {useParams} from "react-router-dom";
import styles from "./Restaurant.module.css";
import {Nav, Tab} from "react-bootstrap";
import Menu from "../../components/Menu";
import {MenuItem} from "../../responses/menuItem";
import Blog from "../../components/Blog";
import {BlogPost} from "../../responses/blogPost";
import Comments from "../../components/Comments";
import {Comment} from "../../responses/comment";
import Images from "../../components/Images";
import {Image} from "../../responses/image";

const Restaurant: React.VFC = () => {

    const params = useParams();

    const [restaurant, setRestaurant] = useState();

    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [menuCursor, setmenuCursor] = useState("");

    const [blog, setBlog] = useState<BlogPost[]>([]);
    const [blogCursor, setblogCursor] = useState("");

    const [comment, setComment] = useState<Comment[]>([]);
    const [commentCursor, setcommentCursor] = useState("");

    const [image, setImage] = useState<Image[]>([]);
    const [imageCursor, setimageCursor] = useState("");

    const [tab, setTab] = useState("menu")

    useEffect(() => {
        fetch(`/restaurants/${params.id}`)
          .then(res => {
             if (res.ok) {

               res.json().then(data => setRestaurant(data));

             }
          });
    }, [params.id]);

    useEffect(() => {
        fetch(`/restaurants/${params.id}/menu?cursor=`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setMenu(data.results);
                        setmenuCursor(data.next);
                    })
                }})
    }, [params.id]);

    const fetchMenu = async () => {
        fetch(menuCursor)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setMenu([...menu, ...data.results]);
                        setmenuCursor(data.next);
                    })
                }})
    };

    useEffect(() => {

        // console.log("initial comments fetch")

        fetch(`/restaurants/${params.id}/blogs?cursor=`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        // console.log(data);
                        setBlog(data.results);
                        setblogCursor(data.next);
                    })
                }})
    }, [params.id]);

    // useEffect(() => {
    //     console.log(blog)
    // }, [blog]);

    const fetchBlog = async () => {

        // console.log("more comments fetch")

        fetch(blogCursor)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setBlog([...blog, ...data.results]);
                        setblogCursor(data.next);
                    })
                }})
    };

    useEffect(() => {
        fetch(`/restaurants/${params.id}/comments?cursor=`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setComment(data.results);
                        setcommentCursor(data.next);
                    })
                }})
    }, [params.id]);

    const fetchComment = async () => {
        fetch(commentCursor)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setComment([...comment, ...data.results]);
                        setcommentCursor(data.next);
                    })
                }})
    };

    useEffect(() => {
        fetch(`/restaurants/${params.id}/images?cursor=`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setImage(data.results);
                        setimageCursor(data.next);
                    })
                }})
    }, [params.id]);

    const fetchImage = async () => {
        fetch(imageCursor)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setImage([...image, ...data.results]);
                        setimageCursor(data.next);
                    })
                }})
    };

  return ((restaurant !== undefined) ?
      <Container fluid>
          <Row>
              <Col xs={{ span: 8, offset: 2 }}>
                  <RestaurantBanner restaurant={restaurant}/>
                  <Tab.Container
                      activeKey={tab}
                      onSelect={(k) => setTab(k || "menu")}
                  >
                      <Nav variant="pills" justify className={`my-3 ${styles.tabsContainer}`}>
                          <Nav.Item>
                              <Nav.Link eventKey="menu" type="button" className={styles.tab}>
                                  Menu
                              </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                              <Nav.Link eventKey="blogs" type="button" className={styles.tab}>
                                  Blog Posts
                              </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                              <Nav.Link eventKey="comments" type="button" className={styles.tab}>
                                  Comments
                              </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                              <Nav.Link eventKey="images" type="button" className={styles.tab}>
                                  Images
                              </Nav.Link>
                          </Nav.Item>
                      </Nav>
                      <Tab.Content>
                          <Tab.Pane eventKey="menu">
                              {tab === "menu" && <Menu menu={menu} setMenu={setMenu} fetchMenu={fetchMenu} hasMenu={!!menuCursor} restaurant={restaurant}/>}
                          </Tab.Pane>
                          <Tab.Pane eventKey="blogs">
                              {tab === "blogs" &&
                                  <Blog blog={blog} fetchBlog={fetchBlog} setBlog={setBlog} hasBlog={!!blogCursor} restaurant={restaurant}/>
                              }
                          </Tab.Pane>
                          <Tab.Pane eventKey="comments">
                              {tab === "comments" && <Comments comments={comment} fetchComment={fetchComment} hasComment={!!commentCursor}/>}
                          </Tab.Pane>
                          <Tab.Pane eventKey="images">
                              {tab === "images" && <Images images={image} fetchImage={fetchImage} hasImage={!!imageCursor} restaurant={restaurant}/>}
                          </Tab.Pane>
                      </Tab.Content>
                  </Tab.Container>
              </Col>
          </Row>
      </Container> : <h1>Restaurant Does Not Exist</h1>
  );
}

export default Restaurant;