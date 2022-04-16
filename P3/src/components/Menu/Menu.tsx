import React from "react";
import {Badge, Col, Image, ListGroup} from "react-bootstrap";
import {MenuItem} from "../../responses/menuItem";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./Menu.module.css";
import logo from "../../assets/logo-cropped.png";
import Restaurant from "../../pages/Restaurant";
interface Props {
    menu: MenuItem [];
    fetchData: () => {};
    hasMenu: boolean;
}
const Menu: React.VFC<Props> = (data) => {

    return (
        <InfiniteScroll
            dataLength={data.menu.length} //This is important field to render the next data
            next={data.fetchData}
            hasMore={data.hasMenu}
            loader={<h1>Loading Menu ...</h1>}
            endMessage={<></>}
        ><ListGroup as="ol" numbered>
        {data.menu.map((item) => {
            return <ListGroup.Item
                as="li" key={item.id}
                className="d-flex justify-content-between align-items-start dank"
            >
                    <Image src={item.image} alt={"logo"} className={styles.menuImage}/>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.name}</div>
                        {item.description}
                    </div>
                    <Badge bg="success" pill>
                        ${item.price}
                    </Badge>
            </ListGroup.Item>;
        })}  </ListGroup>
        </InfiniteScroll>);


}
export default Menu;