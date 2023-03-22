function setToken(token) {
    if (token) {
        localStorage.setItem("token", token);
    } else {
        localStorage.removeItem("token")
    }
}

function getToken() {
    let token = localStorage.getItem("token");
    if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp < Date.now() / 1000) {
            localStorage.removeItem("token");
            token = null
        }
    }
    return JSON.parse(atob(token.split(".")[1]));
}

function login(user) {
    return fetch("https://project4-wallscrawl.herokuapp.com/login/", {
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

function logout() {
    localStorage.removeItem("token")
}

const exports = {
    setToken,
    getToken,
    login,
    logout,
}

export default exports;