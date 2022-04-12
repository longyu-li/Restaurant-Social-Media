import React, {createContext, useCallback, useEffect, useState} from "react";
import {Restaurant} from "../responses/restaurant";
import {useLocation} from "react-router-dom";


interface RestaurantContextType {
    restaurant: Restaurant | null;
    loadRestaurant: (id: String) => void;
    getIDFromURL: () => String;
}

export const RestaurantContext = createContext<RestaurantContextType>(null!);

export const RestaurantProvider: React.FC = ({ children }) => {
    const [restaurant, setRestaurant] = useState<Restaurant | null>();
    const location = useLocation();

    const loadRestaurant = useCallback(async (id) => {
        const res = await fetch(`/restaurants/${id}/`);

        if (res.ok) {
            setRestaurant(await res.json());
        } else {
            console.log(await res.json());
        }
    }, []);

    const getIDFromURL = () => {
        let path = location.pathname;
        if (path.endsWith("/")){
            path = path.substring(0, path.length - 1)
        }
        return path.substring(path.lastIndexOf('/') + 1)
        // return "1";
    }

    useEffect(() => {
        loadRestaurant(getIDFromURL());
    }, [loadRestaurant, getIDFromURL])

    return (restaurant !== undefined) ?
        <RestaurantContext.Provider value={{ restaurant, loadRestaurant, getIDFromURL }}>
            {children}
        </RestaurantContext.Provider> : <></>

}