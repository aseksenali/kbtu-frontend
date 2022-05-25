import {PasswordCredentials, Tokens} from "../redux/interfaces/authentication";
import {FetchBaseQueryArgs} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";

const authorizationServer = 'http://192.168.1.15:8080/auth/realms/kbtu_project/protocol/openid-connect/token'
const client_id = 'react-app'

const getPasswordDetails = ({username, password}: PasswordCredentials) => ({
    grant_type: "password",
    client_id,
    username,
    password
})

const passwordConfig = (credentials: PasswordCredentials): FetchBaseQueryArgs => ({
    method: "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: new URLSearchParams(getPasswordDetails(credentials))
})


const doLogin = async (credentials: PasswordCredentials): Promise<Tokens> => {
    const response = await fetch(authorizationServer, passwordConfig(credentials))
    if (response.ok) {
        return response.json()
    } else if (response.status === 401) {
        throw new NotAuthorizedException("Invalid login or password")
    } else {
        throw new Error()
    }
}

const UserService = {
    doLogin,
}

export default UserService