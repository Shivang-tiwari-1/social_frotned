"use client";
import React, { useState } from 'react'
import UserContext, { UserContextType } from './UserContext'
import { axiosPrivate } from '@/Api/Axios';
import { useVerify } from '../Verfiy/verifyContext';

interface Post {
    creator: string
    title: string;
    description: string;
}

interface Auth {
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

const UserState = ({ children }: { children: React.ReactNode }) => {
    const { auth } = useVerify() as { auth: Auth }
    const [ user, setUser ] = useState<Record<string, unknown>>({});
    const [ post, setPost ] = useState<Post[]>([]);
    const [ people, setPeople ] = useState<Record<string, unknown>[]>([]);
    const [ requests, setRequests ] = useState<[]>([]);
    const [ userPost, setUserPost ] = useState<Post[]>([])
    const [ followers, setFollowers ] = useState<FollowUser[]>([]);
    const [ following, setFollowing ] = useState<FollowUser[]>([]);
    const fetching_user: UserContextType[ "fetching_user" ] = async () => {

        const response = await axiosPrivate.get("/user/get_user", {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
            responseType: 'json'
        });
        if (response) {
            console.log(response.data)
            setUser(response.data.data)
            setFollowers(response.data.data.follwers)
            setFollowing(response.data.data.following)
        }
    }

    const fetching_post: UserContextType[ "fetching_post" ] = async () => {
        const response = await axiosPrivate.get<{ data: Post[] }>("/post/userpost", {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
            responseType: 'json',
        });

        if (response?.data?.data) {
            setPost(response.data.data);
            return { data: response.data.data };
        }

        return { data: undefined };
    };

    const find_to_follow: UserContextType[ 'find_to_follow' ] = async () => {
        const response = await axiosPrivate.get<{ data: [] }>("/follow/find_to_follow", {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
            responseType: 'json',
        });

        if (response?.data?.data) {
            console.log("response.data.", response)

            const filter = response.data.data.filter((data: Record<string, unknown>) => data._id !== auth?.user._id).filter((person: Record<string, unknown>) => {
                return !auth?.user?.following.some((data) => {

                    return data.id === person._id;
                });
            });
            setPeople(filter);
            return { data: response.data.data };
        }
        return { data: undefined };
    };

    const follow_request: UserContextType[ 'follow_request' ] = async (id: string) => {
        const response = await axiosPrivate.post<{ data: [] }>(
            "/follow/follow_request",
            {},
            {
                params: { id },
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                responseType: "json",
            }
        );

        if (response?.data?.data) {
            const filter = people.filter((data) => data._id !== id)
            setPeople(filter)
        }
    };

    const fetch_all_Follow_request: UserContextType[ 'fetch_all_Follow_request' ] = async () => {
        const response = await axiosPrivate.get<{ data: [] }>("/follow/fetch_all_Follow_request", {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
            responseType: 'json',
        });

        if (response?.data?.data) {
            console.log("response.data.", response)
            setRequests(response?.data?.data);
        }
    };

    const accept_follow: UserContextType[ 'accept_follow' ] = async (id: string) => {
        try {
            const response = await axiosPrivate.get("/follow/accept_follow", {
                params: { requestid: id },
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                responseType: "json",
            });

            if (response?.data?.data) {
                console.log("Follow accepted:", response.data);
                const filteredRequest = requests.filter((user: Auth) => {
                    console.log(user, id)
                    return user._id !== id
                });

                setRequests(filteredRequest);
            }
        } catch (error) {
            console.error("Error accepting follow request:", error);
        }
    };

    const create_post: UserContextType[ "create_post" ] = async (title: string, description: string) => {
        const response = await axiosPrivate.post<{ data: Post }>("/user/create_post", {
            title,
            description
        }, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
            responseType: 'json',
        });

        if (response?.data?.data) {
            if (userPost.length > 0) {
                setUserPost([]);
                setUserPost(response.data.data)
            } else {
                setUserPost(response.data.data)
            }
            return { data: response.data.data };
        }

        return { data: undefined };
    };


    const getAllpsot = async (): Promise<void> => {
        const response = await axiosPrivate.get<{ data: Post[] }>("/post/getAllpsot", {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
            responseType: 'json',
        });
        console.log('ss', response.data)
        if (response) {
            console.log(response.data)
            if (post.length > 0) {
                setPost([])
                setPost(response?.data.data)
            } else {
                setPost(response?.data.data)

            }

        }
    };

    const unfollow: UserContextType[ 'unfollow' ] = async (id: string): Promise<void> => {
        const response = await axiosPrivate.post<{ data: Post[] }>(
            "/user/unfollow",
            {},
            {
                params: { id: id },
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`,
                },
                responseType: "json",
            }
        );

        if (response) {
            const filter = following.filter((data) => data.id !== id)
            setFollowing(filter)
        }

    };

    const fetch_user_post = async (): Promise<void> => {
        const response = await axiosPrivate.get<{ data: Post[] }>("/user/fetch_user_post", {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
            responseType: 'json',
        });
        if (response) {
            console.log(response.data)
            if (userPost.length > 0) {
                setUserPost([])
                setUserPost(response?.data.data)
            } else {
                setUserPost(response?.data.data)

            }

        }
    };



    return (
        <UserContext.Provider value={{ fetching_user, fetching_post, user, post, find_to_follow, people, follow_request, requests, fetch_all_Follow_request, accept_follow, create_post, userPost, getAllpsot, unfollow, followers, following, fetch_user_post }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState
