import { ChangeEvent, useEffect, memo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Input } from '@material-ui/core';
import Posts from './components/Posts/Posts';
import { State } from './redux/store';
import { getPostsWithUsers, setSearchValueAndFilterPosts } from './App.actions';

const App = () => {
    const { searchValue } = useSelector((state: State) => state, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostsWithUsers());
    }, []);

    const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchValueAndFilterPosts(event.target.value));
    };

    return (
        <Container style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
            <Input autoFocus placeholder="Search posts..." value={searchValue} onChange={handleSearchValueChange} />
            <Posts />
        </Container>
    );
};

export default memo(App);
