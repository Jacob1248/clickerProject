export const API_POST = async (data) =>{
    try{
    let result = await fetch(data.url, {
        method:'post',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data.payload)
    });
    return result;
    }
    catch(error){
        return {status:401};
    }
}



export const API_GET = async (url) =>{
    try{
    let result = await fetch(url, {
        method:'get',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
    });
    return result;
    }
    catch(error){
        return {status:401};
    }
}