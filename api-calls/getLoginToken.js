import * as noteFetch from "node-fetch"

export const getLoginToken = async (username, password) => {
    const response = await noteFetch("http://localhost:2221/api/login", {
    method: "Post",
    body: JSON.stringify({username: username, password: password}),
    })
    if (response.status !==200) { 
        throw new Error("An error occured trying to retrieve the login token.")
    }
    const body = await response.json()
    return body.token

}   