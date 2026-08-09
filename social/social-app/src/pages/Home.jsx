import { useQuery, useQueryClient } from "@tanstack/react-query";
import PostCard from "../components/PostCard";
import { Typography, Box, OutlinedInput, Button } from "@mui/material";
import { useRef } from "react";
import { useApp } from "../AppProvider";

async function fetchPosts() {
	const res = await fetch("http://localhost:8800/posts");
	return res.json();
}

export default function Home() {
	const contentRef = useRef();
	const queryClient = useQueryClient();
	const { auth } = useApp();

	const {
		data: posts,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: fetchPosts,
	});

	const addPost = async content => {
		const token = localStorage.getItem("token");

		const res = await fetch("http://localhost:8800/posts", {
			method: "POST",
			body: JSON.stringify({ content }),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.ok) {
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
		} else {
            alert("Unable to add post");
        }
	};

	if (error) {
		return <Typography>{error.message}</Typography>;
	}

	if (isLoading) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<div>
			{auth && (
				<Box sx={{ mb: 4 }}>
					<form
						onSubmit={e => {
							e.preventDefault();
							addPost(contentRef.current.value);
							e.currentTarget.reset();
						}}>
						<Box sx={{ textAlign: "right" }}>
							<Button type="submit" sx={{ mb: 1 }}>Add Post</Button>
						</Box>
						<OutlinedInput
							inputRef={contentRef}
							fullWidth
							placeholder="What's on your mind..."
							required
						/>
					</form>
				</Box>
			)}

			{posts.map(post => (
				<PostCard
					key={post.id}
					post={post}
				/>
			))}
		</div>
	);
}
