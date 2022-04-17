import React, {useEffect, useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import RestaurantBanner from "../../components/RestaurantBanner";
import {useParams} from "react-router-dom";
import styles from "./Restaurant.module.css";
import {Tab, Tabs} from "react-bootstrap";
import Menu from "../../components/Menu";
import {MenuItem} from "../../responses/menuItem";
import Blog from "../../components/Blog";
import {BlogPost} from "../../responses/blogPost";
import Comments from "../../components/Comments";
import {Comment} from "../../responses/comment";

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

  return ((restaurant !== undefined) ?
      <Container fluid>
          <Row>
              <Col xs={{ span: 8, offset: 2 }}>
                  <RestaurantBanner restaurant={restaurant}/>
                  <Tabs
                      variant="tabs"
                      className={styles.tabs}
                      activeKey={tab}
                      onSelect={(k) => setTab(k || "menu")}
                  >
                      <Tab eventKey="menu" tabClassName={styles.tab} title="Menu">
                          {tab === "menu" && <Menu menu={menu} fetchMenu={fetchMenu} hasMenu={hasMenu}/>}
                      </Tab>
                      <Tab eventKey="blogs" tabClassName={styles.tab} title="Blog Posts">
                          {tab === "blogs" && <Blog blog={blog} fetchBlog={fetchBlog} hasBlog={hasBlog}/>}
                      </Tab>
                      <Tab eventKey="comments" tabClassName={styles.tab} title="Comments">
                          {tab === "comments" && <Comments comments={comment} fetchComment={fetchComment} hasComment={hasComment}/>}
                      </Tab>
                      <Tab eventKey="images" tabClassName={styles.tab} title="Images">
                      </Tab>
                  </Tabs>
              </Col>
          </Row>
      </Container> : <h1>Restaurant Does Not Exist</h1>
  );
}

export default Restaurant;