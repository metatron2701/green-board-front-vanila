// Spring board API 응답 규칙
// { success, message, data}

const API_SERVER = "http://127.0.0.1:8080/api"
// API 요청 보내는 코드 분리
async function apiRequest(path, method = "GET", body = null) {
    const headers = {};

    if (path !== "/user/login") {
        Object.assign(headers, getAuthHeaders());
    }

    if (body !== null) {
        headers["Content-Type"] = "application/json";
    }

    let response;
    try {
        response = await fetch(`${API_SERVER}${path}`, {
            method,
            headers,
            body: body === null ? undefined : JSON.stringify(body)
        });
    } catch(error) {
        throw new Error("서버에 연결할 수 없습니다.");
    }

    const result = await response.json().catch((error) => {
        console.error(error);
        return null;
    });

    if (!response.ok || !result?.success) {
        if (response.status === 401 && path !== "/user/login") {
            localStorage.removeItem("accessToken");
            requireLogin();
            throw new Error("로그인 정보가 만료되었거나 유효하지 않습니다. 다시 로그인해 주세요.");
        }
        throw new Error(result?.message || `요청 실패 (${response.status})`);
    }

    return result.data;
}