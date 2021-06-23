import { User } from './users.types';
import get from '../api.utils';
import config from '../api.config';
import { ErrorCallback } from '../api.types';

const getUser = (id: number, errorCallback?: ErrorCallback) => get<User>(`${config.API_DEFAULT_USERS_URL}/${id}`, errorCallback);

export default getUser;
