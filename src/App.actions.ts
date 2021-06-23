import { Dispatch } from 'react';
import getPosts from './api/posts/getPosts';
import getUser from './api/users/getUser';
import { Posts } from './api/posts/posts.types';
import store from './redux/store';
import { AppActions, SET_FILTERED_POSTS, SET_POSTS, SET_SEARCH_VALUE } from './App.types';

export const setPosts = (posts: Posts): AppActions => ({
    type: SET_POSTS,
    payload: posts
});

export const setFilteredPosts = (posts: Posts): AppActions => ({
    type: SET_FILTERED_POSTS,
    payload: posts
});

export const setSearchValue = (value: string): AppActions => ({
    type: SET_SEARCH_VALUE,
    payload: value
});

export const filterPosts = (value: string) => async (dispatch: Dispatch<AppActions>) => {
    dispatch(setFilteredPosts(store.getState().posts.filter((post) => post.title.toLowerCase().includes(value.toLowerCase()))));
};

export const setSearchValueAndFilterPosts = (value: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setSearchValue(value));
    dispatch(filterPosts(value));
};

export const getPostsWithUsers = () => async (dispatch: Dispatch<any>) => {
    // Получаем посты
    const posts = await getPosts();
    if (posts) {
        // Закидываем их в стор
        dispatch(setPosts(posts));
        dispatch(setFilteredPosts(posts));

        // Так как они возвращаются с апишки без пользователей, ..
        // а нам надо их выводить - самым оптимальным вариантом будет ..
        // получить нужных и прицепить к постам

        // Массив постов с полученными пользователями
        const postsWithUsers: Posts = [...posts];
        // Map формата [id пользователя, [индексы постов которые написаны от этого пользователя]]
        const idIndexes: Map<number, Array<number>> = new Map();
        // Проходимся по каждому посту и заполняем наш idIndexes
        posts.forEach((post, index) => {
            const id = post.userId;
            const indexes = idIndexes.get(id);
            idIndexes.set(id, indexes === undefined ? [index] : [...indexes, index]);
        });

        // Затем идем по этой карте
        idIndexes.forEach(async (indexes, id) => {
            // Получаем пользователя по айдишнику
            const user = await getUser(id);
            if (user) {
                // Заполняем все посты этого пользователя его данными
                Promise.all(
                    indexes.map((index) => {
                        postsWithUsers[index] = {
                            ...posts[index],
                            user
                        };
                        return index;
                    })
                    // Затем обновляем стор и не забываем отфильтровать на случай того если в инпуте что-то есть
                ).then(() => {
                    dispatch(setPosts(postsWithUsers));
                    dispatch(filterPosts(store.getState().searchValue));
                });
            }
        });
    }
};
