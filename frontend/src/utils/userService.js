function setToken(token) {
    if (token) {
        localStorage.setItem("token", token);
    } else {
        localStorage.removeItem("token")
    }
}

function login(user) {
    return fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        mode: "cors",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(user),
    })
        .then((res) => {
            if (res.ok) return res.json();
            throw new Error("bad credentials");
        })
        .then(({ token }) => setToken(token));
}