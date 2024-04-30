# unused atm
def check_subset(sub: dict, par: dict) -> bool:
    if sub is None or par is None:
        return False

    for k, v in sub.items():
        if k not in par:
            return False

        p = par[k]

        if isinstance(v, dict):
            if not check_subset(v, p):
                return False
        elif v != p:
            return False
    return True


if __name__ == "__main__":
    a = {"a": 1, "x": {"q": 4}}

    b = {"a": 1, "x": {"q": 4, "y": 6}}

    print("OK" if check_subset(a, b) else "FAIL")
    print("FAIL" if check_subset(b, a) else "OK")
