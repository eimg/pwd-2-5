import {
	Avatar,
	Box,
	IconButton,
	OutlinedInput,
	Typography,
} from "@mui/material";
import PostCard from "../components/PostCard";

import {
	Send as ReplyIcon,
	Delete as DeleteIcon,
} from "@mui/icons-material";
import { grey } from "@mui/material/colors";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useRef } from "react";
import { useApp } from "../AppProvider";

async function fetchPost(id) {
	const res = await fetch(`http://localhost:8800/posts/${id}`);
	return res.json();
}

export default function ViewPost() {
	const { id } = useParams();
	const contentRef = useRef();
	const queryClient = useQueryClient();
	const { auth } = useApp();

	const {
		data: post,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["post", id],
		queryFn: () => fetchPost(id),
	});

	const addComment = async content => {
		const token = localStorage.getItem("token");

		const res = await fetch(`http://localhost:8800/posts/${id}/comments`, {
			method: "POST",
			body: JSON.stringify({ content }),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.ok) {
			await queryClient.invalidateQueries({ queryKey: ["post", id] });
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
		} else {
			alert("Unable to add comment");
		}
	};

	const deleteComment = async commentId => {
		const token = localStorage.getItem("token");

		const res = await fetch(
			`http://localhost:8800/comments/${commentId}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		if (res.ok) {
			await queryClient.invalidateQueries({ queryKey: ["post", id] });
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
		} else {
			alert("Unable to delete comment");
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
			<PostCard post={post} />

			{auth && (
				<form
					onSubmit={e => {
						e.preventDefault();
						addComment(contentRef.current.value);
						e.currentTarget.reset();
					}}>
					<OutlinedInput
						inputRef={contentRef}
						fullWidth
						placeholder="Your reply..."
						required
						endAdornment={
							<IconButton type="submit">
								<ReplyIcon />
							</IconButton>
						}
					/>
				</form>
			)}

			<Box sx={{ pb: 8 }}>
				{post.comments.map(comment => {
					return (
						<Box
							key={comment.id}
							sx={{
								mt: 2,
								p: 3,
								border: "1px solid #66666666",
								display: "flex",
								gap: 2,
							}}>
							<Avatar
								sx={{
									width: 42,
									height: 42,
									background: grey[500],
								}}
							/>
							<Box sx={{ flexGrow: 1 }}>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "flex-start",
									}}>
									<Box>
										<Typography sx={{ fontWeight: "bold" }}>
											{comment.user.name}
										</Typography>
										<Typography>{comment.created}</Typography>
									</Box>
									{auth && auth.id === comment.userId && (
										<IconButton
											size="small"
											onClick={() =>
												deleteComment(comment.id)
											}>
											<DeleteIcon fontSize="small" />
										</IconButton>
									)}
								</Box>
								<Typography>{comment.content}</Typography>
							</Box>
						</Box>
					);
				})}
			</Box>
		</div>
	);
}
