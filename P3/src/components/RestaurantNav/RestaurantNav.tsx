import React from "react";
import {Tab, Tabs} from "react-bootstrap";
import styles from "./RestaurantNav.module.css";
import Menu from "../Menu";
import RestaurantBanner from "../RestaurantBanner";


const RestaurantNav: React.VFC = () => {

    return (<Tabs variant="tabs" defaultActiveKey="menu" className={styles.tabs}>
        <Tab eventKey="menu" tabClassName={styles.tab} title="Menu">
            <Menu />
        </Tab>
        <Tab eventKey="blogs" tabClassName={styles.tab} title="Blog Posts">
        </Tab>
        <Tab eventKey="comments" tabClassName={styles.tab} title="Comments">
        </Tab>
        <Tab eventKey="images" tabClassName={styles.tab} title="Images">
        </Tab>
    </Tabs>);
}

export default RestaurantNav;