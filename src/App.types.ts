import { Posts } from './api/posts/posts.types';

export interface AppState {
    posts: Posts;
    filteredPosts: Posts;
    searchValue: string;
}

export const SET_POSTS = 'SET_POSTS';
export const SET_FILTERED_POSTS = 'SET_FILTERED_POSTS';
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';

interface SetPosts {
    type: typeof SET_POSTS;
    payload: Posts;
}

interface SetFilteredPosts {
    type: typeof SET_FILTERED_POSTS;
    payload: Posts;
}

interface SetSearchValue {
    type: typeof SET_SEARCH_VALUE;
    payload: string;
}

export type AppActions = SetPosts | SetFilteredPosts | SetSearchValue;
