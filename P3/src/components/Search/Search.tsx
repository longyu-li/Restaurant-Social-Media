import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "./Search.module.css";
import { ReactComponent as SearchIcon } from "bootstrap-icons/icons/search.svg";
import { useNavigate } from "react-router-dom";

export enum Kind {
    food = "Food", address = "Address", name = "Name"
}

const Kinds = Object.values(Kind);

interface Props {
    kind_?: Kind,
    search_?: string,
    onSearch: (search: string, kind: Kind) => void,
}

const Search: React.VFC<Props> = ({ kind_, search_, onSearch }) => {
    const [kind, setKind] = useState(kind_ ?? Kind.name);
    const [search, setSearch] = useState(search_ ?? "");
    const [err, setErr] = useState(false);

    const doSearch = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!search) {
            setErr(true);
            return;
        }
        onSearch(search, kind);
    };

    const onText = (val: string) => {
        if (val)
            setErr(false);

        setSearch(val);
    }

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
                isInvalid={err}
                onChange={ev => onText(ev.target.value)}
                placeholder={`Search Restaurants by ${kind.toLowerCase()}`}
            />
            <Button id={styles.btn} type="submit" variant="" onClick={doSearch}>
                <SearchIcon />
            </Button>
        </Form.Group>
        <b style={{color: 'red', visibility: err ? 'visible' : 'hidden'}}>Search field cannot be empty.</b>
    </Form>
}

export default Search;