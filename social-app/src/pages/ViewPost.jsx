import {
	Avatar,
	Box,
	IconButton,
	OutlinedInput,
	Typography,
} from "@mui/material";
import PostCard from "../components/PostCard";

import { Send as ReplyIcon } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

async function fetchPost(id) {
	const res = await fetch(`http://localhost:8800/posts/${id}`);
	return res.json();
}

export default function ViewPost() {
	const { id } = useParams();

	const {
		data: post,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["post", id],
		queryFn: () => fetchPost(id),
	});

	if (error) {
		return <Typography>{error.message}</Typography>;
	}

	if (isLoading) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<div>
			<PostCard post={post} />

			<form>
				<OutlinedInput
					fullWidth
					placeholder="Your reply..."
					endAdornment={
						<IconButton>
							<ReplyIcon />
						</IconButton>
					}
				/>
			</form>

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
							<Box>
								<Typography sx={{ fontWeight: "bold" }}>
									{comment.user.name}
								</Typography>
								<Typography>{comment.created}</Typography>
								<Typography>{comment.content}</Typography>
							</Box>
						</Box>
					);
				})}
			</Box>
		</div>
	);
}
