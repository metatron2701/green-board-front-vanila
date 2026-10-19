function readLocal(key) {
    const stored = localStorage.getItem(key);

    if (stored === null) {
        return []
    }

    try {
        const value = JSON.parse(stored);
        
        if (Array.isArray(value)) {
            return value;
        } else {
            return [];
        }
    } catch {
        return [];
    }
}

function saveLocal() {
    localStorage.setItem("posts", JSON.stringify(posts));
    localStorage.setItem("comments", JSON.stringify(comments));
}

function getPostNextId() {
    let maxId = 0;
    for (let i = 0; i < posts.length; i++) {
        maxId = posts[i].id;
    }

    return maxId + 1;
}

function getCommentNetxId() {
    let maxId = 0;
    for (let i = 0; i < comments.length; i++) {
        maxId = comments[i].id;
    }

    return maxId + 1;
}

let posts = readLocal("posts");
let comments = readLocal("comments");