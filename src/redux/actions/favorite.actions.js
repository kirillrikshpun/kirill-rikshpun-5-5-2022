export const ADD_TO_FAVOURITE = "ADD_TO_FAVOURITE";
export const IS_FAVOURITE = "IS_FAVOURITE";
export const REMOVE_FROM_FAVORITE = "REMOVE_FROM_FAVORITE";
export const SELECT_FAVOURITE = "SELECT_FAVOURITE";

export function addToFavourite(payload){
    return {
        type: ADD_TO_FAVOURITE,
        payload: payload
    }
}

export function isFavourite(payload){
    return {
        type: IS_FAVOURITE,
        payload: payload
    }
}

export function removeFromFavorite(payload){
    return{
        type: REMOVE_FROM_FAVORITE,
        payload: payload
    }
}

export function selectFavourite(payload){
    return{
        type: SELECT_FAVOURITE,
        payload: payload
    }
}