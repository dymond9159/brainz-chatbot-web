const API_URL = "";

const token = "";

export const postCreateParam: RequestInit = {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
};

export const post = async (
    url: string,
    body: FormData | any | undefined,
    protect: boolean = true,
) => {
    postCreateParam.body = body;
    console.log("fetch", `${API_URL}${url}`, postCreateParam);
    return fetch(`${API_URL}${url}`, postCreateParam)
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const get = (
    url: string,
    body: FormData | any | undefined,
    protect: boolean = true,
) => {
    return fetch(`${API_URL}${url}`, { ...postCreateParam, method: "GET" })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
};
