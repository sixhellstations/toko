import { memo } from 'react';
import Post from './Post/Post';
import { PostsProps } from './Posts.types';

const Posts = ({ posts }: PostsProps) => (
    <>
        {posts.map((post) => (
            <Post key={post.id} post={post} />
        ))}
    </>
);

export default memo(Posts);
