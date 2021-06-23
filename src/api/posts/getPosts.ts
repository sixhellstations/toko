import { Posts } from './posts.types';
import get from '../api.utils';
import config from '../api.config';
import { ErrorCallback } from '../api.types';

const getPosts = (errorCallback?: ErrorCallback) => get<Posts>(config.API_DEFAULT_POSTS_URL, errorCallback);

export default getPosts;
