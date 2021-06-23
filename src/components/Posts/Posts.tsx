import { memo } from 'react';
import { useSelector } from 'react-redux';
import Post from './Post/Post';
import { State } from '../../redux/store';

const Posts = () => {
    const { filteredPosts } = useSelector((state: State) => state);

    return (
        <>
            {filteredPosts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </>
    );
};

export default memo(Posts);
