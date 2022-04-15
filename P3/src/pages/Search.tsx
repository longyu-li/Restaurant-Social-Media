import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Search from "../components/Search";
import { AuthContext } from "../contexts/AuthContext";

const Home: React.VFC = () => {
  const auth = useContext(AuthContext);
  const {state: { search, kind }} = useLocation() as any;

  useEffect(() => {
    document.title = "Restify - Search"
  }, []);

  return <main>
    <Search search_={search} kind_={kind} />
  </main>
}

export default Home;
