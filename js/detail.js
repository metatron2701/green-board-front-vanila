const params = new URLSearchParams(location.search);
const postId = Number(params.get("id"));

let post = posts.find(item => item.id === postId);

if (post != undefined) {
    renderPost(post);

    let filteredComments = comments.filter(comment => comment.boardId === postId);
    renderComments(filteredComments);
} else {
    document.querySelector("#post-title").textContent = "게시물 조회 실패";
    document.querySelector("#post-content").textContent = "";
    document.querySelector("#comments-section").hidden = true;
}

document.querySelector("#comment-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const content = document.querySelector("#comment-content").value.trim();

    if (!post || !content || !content.leagth > 255) {
        document.querySelector("#comment-message").textContent =
        "댓글은 1 ~ 255자로 입력하세요."
        return;
    }

    comments.push({
        id: getCommentNetxId(),
        boardId: postId,
        content: content,
        author: "실습 사용자"
    });

    saveLocal();

    document.querySelector("#comment-content").value = "";
    renderComments(comments.filter(comment => comment.boardId === postId));
})