
"use client";

import { createContext, useContext } from "react";
interface Post {
    creator: string
    title: string;
    description: string;
}

interface FollowUser {
    accessToken: string,
    refreshToken: string,
    user: {
        _id: string,
        username: string,
        password: string,
        follwers: [
            {
                id: string,
                username: string
            }
        ]
        following: [
            {
                id: string,
                username: string
            }
        ]
    }
}
export type UserContextType = {
    fetching_user: () => Promise<void>;
    follow_request: (id: string) => Promise<void>;
    fetch_all_Follow_request: () => Promise<void>;
    getAllpsot: () => Promise<void>;
    fetching_post: () => Promise<{ data: Post[] | undefined }>;
    accept_follow: (id: string) => Promise<void>;
    unfollow: (id: string) => Promise<void>;
    find_to_follow: () => Promise<{ data: [] | undefined }>;
    create_post: (title: string, description: string) => Promise<{ data: Post | undefined }>;
    fetch_user_post: () => Promise<void>;

    user: Record<string, unknown>;
    post: Post[];
    people: Record<string, unknown>[],
    requests: [];
    userPost: Post[];
    followers: FollowUser[],
    following: FollowUser[]
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserState provider");
    return context;
};

export default UserContext;
