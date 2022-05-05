import {
  ADD_TO_FAVOURITE,
  IS_FAVOURITE,
  REMOVE_FROM_FAVORITE,
  SELECT_FAVOURITE,
} from "../actions/favorite.actions";

const initialState = {
  favorite: [],
  isFourite: false,
  favouriteSelected: [],
};

export default function reducer(state = initialState, { type, payload }) {
  const inArray = (elem) => {
    for (let i = 0; i < state.favorite.length; i++) {
      if (state.favorite[i].key === elem.key) {
        return true;
      }
    }
    return false;
  };
  switch (type) {
    case ADD_TO_FAVOURITE:
      return {
        ...state,
        favorite: inArray(payload)
          ? [...state.favorite]
          : [...state.favorite, payload],
      };

    case IS_FAVOURITE:
      return {
        ...state,
        isFourite: inArray(payload),
      };

    case REMOVE_FROM_FAVORITE:
      return {
        ...state,
        favorite: state.favorite.filter((elem) => elem.key != payload.key),
      };

    case SELECT_FAVOURITE:
      return {
        ...state,
        favouriteSelected: payload,
      };

    default:
      return state;
  }
}
