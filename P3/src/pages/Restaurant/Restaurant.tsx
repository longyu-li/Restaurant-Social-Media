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
    const [hasMenu, sethasMenu] = useState(true);
    const [menuCursor, setmenuCursor] = useState("");

    const [blog, setBlog] = useState<BlogPost[]>([]);
    const [hasBlog, sethasBlog] = useState(true);
    const [blogCursor, setblogCursor] = useState("");

    const [comment, setComment] = useState<Comment[]>([]);
    const [hasComment, sethasComment] = useState(true);
    const [commentCursor, setcommentCursor] = useState("");

    const [image, setImage] = useState<Image[]>([]);
    const [hasImage, sethasImage] = useState(true);
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
        fetch(`/restaurants/${params.id}/menu?cursor=${menuCursor}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setMenu(data.results);
                        let cursorURL = data.next;
                        setmenuCursor(cursorURL.substring(cursorURL.lastIndexOf("=")+1));
                    })
                }})
    }, [params.id]);

    const fetchMenu = async () => {
        fetch(`/restaurants/${params.id}/menu?cursor=${menuCursor}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setMenu([...menu, ...data.results]);
                        (data.next)? setmenuCursor(data.next.substring(data.next.lastIndexOf("=")+1)) : sethasMenu(false);
                    })
                }})
    };

    useEffect(() => {
        fetch(`/restaurants/${params.id}/blogs?cursor=${blogCursor}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setBlog(data.results);
                        let blogURL = data.next;
                        setblogCursor(blogURL.substring(blogURL.lastIndexOf("=")+1));
                    })
                }})
    }, [params.id]);

    const fetchBlog = async () => {
        fetch(`/restaurants/${params.id}/blogs?cursor=${blogCursor}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setBlog([...blog, ...data.results]);
                        (data.next)? setblogCursor(data.next.substring(data.next.lastIndexOf("=")+1)) : sethasBlog(false);
                    })
                }})
    };

    useEffect(() => {
        fetch(`/restaurants/${params.id}/comments?cursor=${commentCursor}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setComment(data.results);
                        let commentURL = data.next;
                        setcommentCursor(commentURL.substring(commentURL.lastIndexOf("=")+1));
                    })
                }})
    }, [params.id]);

    const fetchComment = async () => {
        fetch(`/restaurants/${params.id}/comments?cursor=${commentCursor}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setComment([...comment, ...data.results]);
                        (data.next)? setcommentCursor(data.next.substring(data.next.lastIndexOf("=")+1)) : sethasComment(false);
                    })
                }})
    };

    useEffect(() => {
        fetch(`/restaurants/${params.id}/images?cursor=${imageCursor}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setImage(data.results);
                        let imageURL = data.next;
                        setimageCursor(imageURL.substring(imageURL.lastIndexOf("=")+1));
                    })
                }})
    }, [params.id]);

    const fetchImage = async () => {
        fetch(`/restaurants/${params.id}/images?cursor=${imageCursor}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setImage([...image, ...data.results]);
                        (data.next)? setimageCursor(data.next.substring(data.next.lastIndexOf("=")+1)) : sethasImage(false);
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
                              {tab === "menu" && <Menu menu={menu} fetchMenu={fetchMenu} hasMenu={hasMenu} restaurant={restaurant}/>}
                          </Tab.Pane>
                          <Tab.Pane eventKey="blogs">
                              {tab === "blogs" && <Blog blog={blog} fetchBlog={fetchBlog} hasBlog={hasBlog}/>}
                          </Tab.Pane>
                          <Tab.Pane eventKey="comments">
                              {tab === "comments" && <Comments comments={comment} fetchComment={fetchComment} hasComment={hasComment}/>}
                          </Tab.Pane>
                          <Tab.Pane eventKey="images">
                              <Images images={image} fetchImage={fetchImage} hasImage={hasImage}/>
                          </Tab.Pane>
                      </Tab.Content>
                  </Tab.Container>
              </Col>
          </Row>
      </Container> : <h1>Restaurant Does Not Exist</h1>
  );
}

export default Restaurant;