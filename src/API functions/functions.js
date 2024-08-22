

export const fetchDataFromEndpoint = async(endpoint) => {
    const res = await fetch(endpoint)

    if (!res.ok) {
        throw Error()
    }

    return res.json()
}

export const fetchDataFromEndpointWithId = async(endpoint,id) => {
    const res = await fetch(endpoint+id)

    if (!res.ok){
        throw Error()
    }

    return res.json()
}