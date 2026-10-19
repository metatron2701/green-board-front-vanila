async function login(event) {
    event.preventDefault();
    const form = document.querySelector("#login-form")
    
    const message = document.querySelector("#login-message");

    const username = form.elements.username.value.trim();
    const password = form.elements.password.value;

    const response = await fetch("http://127.0.0.1:8080/api/user/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    });

    try {
        const result = await response.json();
        console.log(result)

        if (!response.ok || !result.success) {
            throw new Error(result.message || "로그인에 실패했습니다.");
        }

        if (!result.data.accessToken) {
            throw new Error("액세스 토큰이 없습니다.");
        }

        localStorage.setItem("accessToken", result.data.accessToken);
    } catch (error) {
        message.textContent = error.message;
    }
}

document.querySelector("#login-form").addEventListener("submit", login);