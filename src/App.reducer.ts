import { AppActions, AppState, SET_FILTERED_POSTS, SET_POSTS, SET_SEARCH_VALUE } from './App.types';

export const initialState: AppState = {
    posts: [],
    filteredPosts: [],
    searchValue: ''
};

const appReducer = (state = initialState, action: AppActions): AppState => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload
            };
        case SET_FILTERED_POSTS:
            return {
                ...state,
                filteredPosts: action.payload
            };
        case SET_SEARCH_VALUE:
            return {
                ...state,
                searchValue: action.payload
            };
        default:
            return state;
    }
};

export default appReducer;
