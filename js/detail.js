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