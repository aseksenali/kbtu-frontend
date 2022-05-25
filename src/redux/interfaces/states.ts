import {Tokens} from "./authentication";
import {CarWasher} from "../../interfaces/CarWasher";

type UserStoreState = {
    tokens?: Tokens,
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

type CarWasherStoreState = {
    activeCarWasher?: CarWasher
    carWashers: Array<CarWasher>
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
}


export type {UserStoreState, CarWasherStoreState}