import { getAccessToken, getUserID } from "../lib/actions";


const paymentApi = async (reservationId) => {
    const token = await getAccessToken();
    return await fetch("http://127.0.0.1:8000/payment/process/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 'id': reservationId }),
    });
}

const apiPost = async (url, data) => {
    const token = await getAccessToken();
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then((json) => {
                resolve(json);
            })
            .catch((error => {
                reject(error);
            }))
    })
}

const apiPostFavorite = async (url) => {
    const token = await getAccessToken();
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json()
}

const apiGet = async (url) => {
    const token = await getAccessToken();
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.json()
}

const getProperties = async (url) => {
    const data = await fetch(url, {
        cache: "no-cache"
    });
    return await data.json();
}

const getUserDetails = async () => {
    const data = await fetch(`http://127.0.0.1:8000/user/auth/user-detail/${getUserID()}/`, {
        method: 'GET',
    });
    return await data.json();
}

export {
    apiPost,
    paymentApi,
    apiGet,
    apiPostFavorite,
    getProperties,
    getUserDetails,
};