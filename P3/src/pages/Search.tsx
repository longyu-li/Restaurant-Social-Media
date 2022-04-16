import React, { useRef } from "react";
import { useCallback, useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";
import Search, { Kind } from "../components/Search";
import { AuthContext } from "../contexts/AuthContext";
import { Restaurant, SearchResult } from "../responses/restaurant";

const fmtUrl = (search: string, kind: Kind) => `/restaurants/search?type=${kind}&search=${search}`;

const Home: React.VFC = () => {
  const auth = useContext(AuthContext);
  const { state } = useLocation() as any;
  const search = state?.search ?? '';
  const kind = state?.kind ?? Kind.name;

  useEffect(() => {
    document.title = "Restify - Search"
  }, []);

  const [next, setNext] = useState<string | null>(fmtUrl(search, kind));
  const [data, setData] = useState<Restaurant[]>([]);
  const [refresh, setRefresh] = useState(true);

  const more = () => {
    // if (!next)
    //   return;
    console.log(next);
    fetch(next!, {
      headers: auth.header
    }).then(resp => resp.json() as Promise<SearchResult>)
    .then(resp => {
      console.log(resp.next);
      setNext(resp.next);
      setData([...data, ...resp.results]);
    });
  };

  const onSearch = (search: string, kind: Kind) => {
    setNext(fmtUrl(search, kind));
    setData([]);
    setRefresh(true);
  }

  // ?
  useEffect(() => {
    if (!refresh)
      return;
    setRefresh(false);
    more()
  }, [refresh]);

  return <main id="main" className="d-flex flex-column align-items-stretch flex-grow-1 justify-content-around">
    <div style={{paddingTop: "110px"}}>
      <Search search_={search} kind_={kind} onSearch={onSearch} />
    </div>
    <div id="results" className="d-flex flex-column align-items-center gap-2">
      <h3>Results</h3>
      <InfiniteScroll
        dataLength={data.length}
        next={more}
        hasMore={next !== null}
        loader={<h4>Loading...</h4>}
        endMessage={<h5>You reached the end.</h5>}
        // :'(
        // scrollableTarget="results"
        style={{
          "display": "flex",
          "flexWrap": "wrap",
          "alignContent": "top",
          "justifyContent": "center",
          "alignItems": "flex-start",
          "gap": "1rem"
        }}
      >
        {data.map(rst => <RestaurantCard key={rst.id} data={rst} />)}
      </InfiniteScroll>
    </div>
  </main>
}

export default Home;
