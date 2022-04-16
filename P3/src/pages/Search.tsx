import { useCallback, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Search from "../components/Search";
import { AuthContext } from "../contexts/AuthContext";

const Home: React.VFC = () => {
  const auth = useContext(AuthContext);
  const {state: { search, kind }} = useLocation() as any;

  useEffect(() => {
    document.title = "Restify - Search"
  }, []);

  const onSearch = useCallback((search, kind) => {

  }, []);

  return <main className="d-flex flex-column align-items-stretch flex-grow-1 justify-content-around">
    <Search search_={search} kind_={kind} onSearch={onSearch} />
    <div id="results" className="d-flex flex-grow-1 flex-column gap-3 justify-content-around align-items-stretch">

    </div>
  </main>
}

export default Home;
