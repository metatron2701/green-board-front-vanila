function isLoggedIn() {
    return Boolean(localStorage.getItem("accessToken"));
}

function requireLogin() {
    if (isLoggedIn()) {
        return true;
    }
    location.replace("login.html");
    return false;
}

function getAuthHeaders() {
    const accessToken = localStorage.getItem("accessToken");
    return {
        Authorization: `Bearer ${accessToken}`
    };
}

function setupNavigation() {
    document.querySelector(".login-link").hidden = isLoggedIn();
    document.querySelector(".logout-button").hidden = !isLoggedIn();

    document.querySelector(".write-link").hidden = !isLoggedIn();

    document.querySelector("nav > a[href='index.html']").hidden = !isLoggedIn();
}

setupNavigation();