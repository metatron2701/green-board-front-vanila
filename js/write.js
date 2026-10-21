// 게시글 작성 화면 JS

// 로그인 안 되어 있을 시 로그인 페이지로 리다이렉트
requireLogin();

const form = document.querySelector("#post-form")

async function savePost(event) {
    event.preventDefault();
    const title = form.elements.title.value.trim();
    const content = form.elements.content.value.trim();

    const button = form.querySelector("button[type='submit']");

    const formMessage = document.querySelector("#form-message");

    if (title.length < 10 || title.length > 50 || content.length < 10) {
        formMessage.textContent = "제목은 10~50자, 본문은 10자 이상 입력하세요.";
        return;
    }

    if (button.disable) {
        return;
    }

    button.disabled = true;
    button.textContent = "저장 중...";

    try {
        await apiRequest("/board", "POST", {title, content})
        // index.html 경로로 이동
        location.replace("index.html");
    } catch(error) {
        formMessage.textContent = error.message;
    } finally {
        button.disabled = false;
    }
}

form.addEventListener("submit", savePost);