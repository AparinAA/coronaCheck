import axios from 'axios';

interface User {
    username: string;
    password: string;
}

export const loginRequest = async (user : User) => {
    const data = {
        username: user.username,
        password: user.password
    };

    const JSONdata = JSON.stringify(data);
    
    const endpoint = "api/login";

    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSONdata
    }

    const respose = await fetch(endpoint, option);
    const result = await respose.json();

    console.info("LOGINrequest", respose.status);
}