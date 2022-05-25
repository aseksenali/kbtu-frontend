import {Dispatch, SetStateAction} from "react";

export type Authentication = {
    username: string,
    role: string,
    profilePicture: string,
}

export type AuthenticationContext = {
    auth?: Authentication,
    setAuth: Dispatch<SetStateAction<Authentication | undefined>>
}
