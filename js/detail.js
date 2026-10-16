const params = new URLSearchParams(location.search);
const postId = Number(params.get("id"));

let post = undefined;

if (Number.isSafeInteger(postId) && postId > 0) {
    post = posts.find(item => item.id === postId);

    renderPost(post);

    let filterdComments = comments.filter(comment => comment.boardId === postId);
    renderComments(filterdComments);
}

if (post === undefined) {
    document.querySelector("#post-title").textContent = "게시물 조회 실패";
    document.querySelector("#post-content").textContent = "";
    document.querySelector("#comments-section").hidden = true;
}