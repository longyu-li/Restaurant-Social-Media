import React, {useContext} from "react";
import {Badge, Image, ListGroup} from "react-bootstrap";
import {MenuItem} from "../../responses/menuItem";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./Menu.module.css";
import {AuthContext} from "../../contexts/AuthContext";
import {Restaurant} from "../../responses/restaurant";
import AddMenuItemForm from "../Forms/AddMenuItemForm";
import EditMenuItemForm from "../Forms/EditMenuItemForm";

interface Props {
    menu: MenuItem [];
    setMenu: React.Dispatch<React.SetStateAction<MenuItem[]>>;
    fetchMenu: () => {};
    hasMenu: boolean;
    restaurant: Restaurant;
}
const Menu: React.VFC<Props> = (data) => {
    const user = useContext(AuthContext).user;
    const access  = useContext(AuthContext).tokens!;

    const deleteMenuItem = async(id: Number) => {
        fetch(`/restaurants/menu/${id}`, {
            method: "DELETE",
            headers: {'Authorization': `Bearer ${access.access}`}
        })
            .then(res => {
                    if (res.ok) {
                        data.setMenu(data.menu.filter(item => item.id !== id));
                    }
                }
            )
    }

    return (
        <div className="d-grid gap-2">
            {(user !== null && data.restaurant.id === user.id) ? <AddMenuItemForm menu={data.menu} setMenu={data.setMenu}/> : <></>}
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
                        <div className="fw-bold">{item.name} {(user !== null && data.restaurant.id === user.id) ? <EditMenuItemForm menuItem={item} menu={data.menu} setMenu={data.setMenu}/>:<></>} </div>
                        <p className={"mb-1"}>{item.description}</p>
                        {(user !== null && data.restaurant.id === user.id) ? <Badge bg="danger" pill onClick={() => deleteMenuItem(item.id)} className={styles.delete}>
                            Delete
                        </Badge> : <></>}
                    </div>
                    <Badge bg="success" pill>
                        ${item.price}
                    </Badge>
            </ListGroup.Item>;
        })}  </ListGroup>
        </InfiniteScroll> </div>);
}
export default Menu;