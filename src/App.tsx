import { ChangeEvent, useEffect, memo, useState } from 'react';
import { Container, Input } from '@material-ui/core';
import Posts from './components/Posts/Posts';
import getPosts from './api/posts/getPosts';
import getUser from './api/users/getUser';
import { Posts as IPosts } from './api/posts/posts.types';

const App = () => {
    const [posts, setPosts] = useState<IPosts>([]);
    const [filteredPosts, setFilteredPosts] = useState<IPosts>([]);
    const [searchValue, setSearchValue] = useState('');

    const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const getPostsWithUsers = async () => {
        const newPosts = await getPosts();
        if (newPosts) {
            setPosts(newPosts);

            // Так как посты возвращаются с апишки без пользователей, ..
            // а нам надо их выводить - самым оптимальным вариантом будет ..
            // получить нужных и прицепить к постам

            // Массив постов с полученными пользователями
            let postsWithUsers = [...newPosts];
            // Map формата [id пользователя, [индексы постов которые написаны от этого пользователя]]
            const idIndexes: Map<number, Array<number>> = new Map();
            // Проходимся по каждому посту и заполняем наш idIndexes
            newPosts.forEach((post, index) => {
                const id = post.userId;
                const indexes = idIndexes.get(id);
                idIndexes.set(id, indexes === undefined ? [index] : [...indexes, index]);
            });

            // Затем идем по этой карте
            idIndexes.forEach(async (indexes, id) => {
                // Получаем пользователя по айдишнику
                const user = await getUser(id);
                if (user) {
                    Promise.all(
                        // Заполняем все посты этого пользователя его данными
                        indexes.map((index) => {
                            postsWithUsers = [...postsWithUsers];
                            postsWithUsers[index] = {
                                ...newPosts[index],
                                user
                            };
                            return index;
                        })
                    ).then(() => {
                        // На каждую итерцию обновляем посты (вдруг у пользователя медленный интернет)
                        setPosts(postsWithUsers);
                    });
                }
            });
        }
    };

    useEffect(() => {
        setFilteredPosts(posts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase())));
    }, [searchValue, posts]);

    useEffect(() => {
        getPostsWithUsers();
    }, []);

    return (
        <Container style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
            <Input autoFocus placeholder="Search posts..." value={searchValue} onChange={handleSearchValueChange} />
            <Posts posts={filteredPosts} />
        </Container>
    );
};

export default memo(App);
