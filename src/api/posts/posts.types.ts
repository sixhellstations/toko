import { User } from '../users/users.types';

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    user?: User;
}

export type Posts = Array<Post>;
