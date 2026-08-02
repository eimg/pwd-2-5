import { useQuery } from "@tanstack/react-query";
import PostCard from "../components/PostCard";
import { Typography } from "@mui/material";

async function fetchPosts() {
    const res = await fetch("http://localhost:8800/posts");
    return res.json();
}

export default function Home() {
	const { data: posts, isLoading, error } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    if(error) {
        return <Typography>{error.message}</Typography>
    }

    if(isLoading) {
        return <Typography>Loading...</Typography>
    }

	return (
		<div>
			{posts.map(post => (
				<PostCard key={post.id} post={post} />
			))}
		</div>
	);
}
