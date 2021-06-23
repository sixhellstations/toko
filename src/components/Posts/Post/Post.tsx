import { memo } from 'react';
import { Card, Divider, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { PostProps } from './Post.types';

const Post = ({ post }: PostProps) => (
    <>
        <Card style={{ marginTop: '20px', marginBottom: '20px', padding: '20px' }} raised>
            <Typography variant="h4" gutterBottom>
                {post.title}
            </Typography>
            <Typography variant="subtitle2" gutterBottom style={{ display: 'flex' }}>
                {post.user ? (
                    <>Author: {`${post.user.name} | ${post.user.username}`}</>
                ) : (
                    <>
                        Author: <Skeleton style={{ marginLeft: '5px' }} variant="text" width={100} />
                    </>
                )}
            </Typography>
            <br />
            <Typography variant="body1" gutterBottom>
                {post.body}
            </Typography>
        </Card>
        <Divider />
    </>
);

export default memo(Post);
