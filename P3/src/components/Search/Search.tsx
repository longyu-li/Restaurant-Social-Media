import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./Search.module.css";
import { ReactComponent as SearchIcon } from "bootstrap-icons/icons/search.svg";
import { useNavigate } from "react-router-dom";

export enum Kind {
    food = "Food", address = "Address", name = "Name"
}

const Kinds = Object.values(Kind);

interface Props {
    kind_: Kind | null,
    search_: string | null
}

const Search: React.VFC<Props> = ({ kind_, search_ }) => {
    const [kind, setKind] = useState(kind_ ?? Kind.name);
    const [search, setSearch] = useState(search_ ?? "");

    const navigate = useNavigate();

    const doSearch = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!search)
            return;
        navigate("/search", {
            state: { search, kind }
        })
    };

    return <Form id={styles.search}>
        <Form.Group className="d-flex flex-row align-items-center justify-content-center">
            <Form.Select id={styles.select} value={kind} onChange={ev => setKind(ev.target.value as Kind)}>
                {Kinds.map(k => <option key={k} value={k}>{k}</option>)}
            </Form.Select>
            <Form.Control
                id={styles.text}
                type="text"
                required
                value={search}
                onChange={ev => setSearch(ev.target.value)}
                placeholder={`Search Restaurants by ${kind.toLowerCase()}`}
            />
            <Button id={styles.btn} type="submit" variant="" onClick={doSearch}>
                <SearchIcon />
            </Button>
        </Form.Group>
    </Form>
}

export default Search;