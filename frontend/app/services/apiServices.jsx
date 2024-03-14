import { getAccessToken } from "../lib/actions";


const postProperty = async (url, data) => {
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
const getProperties = async () => {
    const data = await fetch("http://127.0.0.1:8000/api/properties/", {
        next: {
            revalidate: 60 * 15,
        }
    });
    return await data.json();
}


export { postProperty, getProperties };