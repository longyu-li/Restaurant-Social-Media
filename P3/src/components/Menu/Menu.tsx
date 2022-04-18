import React, {useContext, useState} from "react";
import {Badge, Button, Form, FormControl, Image, InputGroup, ListGroup, Modal} from "react-bootstrap";
import {MenuItem} from "../../responses/menuItem";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./Menu.module.css";
import {AuthContext} from "../../contexts/AuthContext";
import {Restaurant} from "../../responses/restaurant";
import AddMenuItemForm from "../Forms/AddMenuItemForm";

interface Props {
    menu: MenuItem [];
    fetchMenu: () => {};
    hasMenu: boolean;
    restaurant: Restaurant;
}
const Menu: React.VFC<Props> = (data) => {
    const user = useContext(AuthContext).user;

    return (
        <div className="d-grid gap-2">
            {(user !== null && data.restaurant.id === user.id) ? <AddMenuItemForm/> : <></>}
        <InfiniteScroll
            dataLength={data.menu.length} //This is important field to render the next data
            next={data.fetchMenu}
            hasMore={data.hasMenu}
            loader={<h1>Loading Menu ...</h1>}
            endMessage={<></>}
        ><ListGroup as="ol" numbered>
        {data.menu.map((item) => {
            return <ListGroup.Item
                as="li" key={item.id}
                className="d-flex justify-content-between align-items-start dank"
            >
                    <Image src={item.image} className={styles.menuImage}/>
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.name} {(user !== null && data.restaurant.id === user.id) ? <Button variant="outline-info" id={item.id.toString()} className={styles.editMenu}>Edit</Button>:<></>} </div>
                        {item.description}
                    </div>
                    <Badge bg="success" pill>
                        ${item.price}
                    </Badge>
            </ListGroup.Item>;
        })}  </ListGroup>
        </InfiniteScroll> </div>);


}
export default Menu;