export type UserType = {
    id: number;
    name: string;
    username: string;
    bio?: string;
    password: string;
}

export type CommentType = {
    id: number;
    content: string;
    created: string;
    userId: number;
    user: UserType;
    postId: number;
    post: PostType;
}

export type PostType = {
    id: number;
    content: string;
    created: string;
    userId: number;
    user: UserType;
    comments: CommentType[];
    likes: [];
}