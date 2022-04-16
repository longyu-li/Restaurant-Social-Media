import { features } from "process";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";
import Search, { Kind } from "../components/Search";
import { AuthContext } from "../contexts/AuthContext";
import { Restaurant } from "../responses/restaurant";

// Lol, no
// const shuffle = <T,>(array: T[]) => array.sort((_a, _b) => Math.round(Math.random() * 2 - 1));
// const shuffle = <T,>(array: T[]) => array.reduce((a: T[], b: T) => Math.random() > 0.5 ? [...a, b] : [b, ...a], []);

// Fisher-Yates
const shuffle = <T,>(array: T[]) => {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    const j = Math.round(Math.random()* (n - i - 1)) + i;
    [ array[i], array[j] ] = [ array[j], array[i] ];
  }
  return array;
}

const Home: React.VFC = () => {
  const navigate = useNavigate();
  const [feat, setFeat] = useState(undefined! as Restaurant[]);

  useEffect(() => {
    fetch(`/restaurants/search?type=name&search=`)
      .then(resp => resp.json())
      .then(j => j.results as any[])
      .then(shuffle)
      .then(d => {
        setFeat(d.slice(-3));
      });
  }, []);

  useEffect(() => {
    document.title = "Restify"
  }, []);

  const onSearch = useCallback((search, kind) => {
    navigate(`/search?kind=${kind}&search=${search}`)
  }, []);

  const featured = feat === undefined ?
    <h3 style={{color: "red"}}>Loading featured restaurants...</h3>
    : feat.length === 0 ? <h3>No restaurants.</h3>
      : feat.map(d => <RestaurantCard key={d.id} data={d} />);

  return <main className="d-flex flex-column align-items-stretch flex-grow-1 justify-content-around">
    <div className="d-flex flex-column align-items-center justify-content-center">
      <Search kind_={Kind.name} search_="" onSearch={onSearch} />
    </div>
    <div className="d-flex flex-column align-items-center">
      <h2 className="mb-3" id="featured">Featured</h2>
      <div id="restaurants" className="d-flex flex-grow-1 gap-4 flex-wrap justify-content-center align-items-start align-content-start">
        {featured}
      </div>
    </div>
  </main>;
}

export default Home;
