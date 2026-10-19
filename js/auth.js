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

async function logout() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/user/logout", {
            method: "POST",
            headers: {...getAuthHeaders(), "Content-Type": "application/json"}
        });

        if (!response.ok) {
            throw new Error("로그아웃에 실패했습니다.")
        }

        localStorage.removeItem("accessToken");
        location.replace("login.html");
    } catch(error) {
        alert(error.message);
    }
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

document.querySelector(".logout-button").addEventListener("click", logout);

setupNavigation();