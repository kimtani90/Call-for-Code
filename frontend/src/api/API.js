const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080'

const headers = {
    'Accept': 'application/json'
};

export const submit = (payload) =>
    fetch(`${api}/api/upgrade`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {

        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const uploadFile = (payload) =>
    fetch(`${api}/api/upload`, {
        method: 'POST',
        body: payload
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

