import { Avatar, Box, Button, ButtonGroup, Card, CardContent, IconButton, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";

import {
    FavoriteBorderOutlined as LikeIcon,
    Favorite as LikedIcon,
    ChatBubbleOutlineOutlined as CommentIcon,
    Delete as DeleteIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useApp } from "../AppProvider";

export default function PostCard({ post }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { auth } = useApp();

    const liked = auth && post.likes?.some(like => like.userId === auth.id);

    const deletePost = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:8800/posts/${post.id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            await queryClient.invalidateQueries({ queryKey: ["posts"] });
            navigate("/");
        } else {
            alert("Unable to delete post");
        }
    };

    const toggleLike = async () => {
        if (!auth) return;

        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:8800/posts/${post.id}/like`, {
            method: liked ? "DELETE" : "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            await queryClient.invalidateQueries({ queryKey: ["posts"] });
            await queryClient.invalidateQueries({ queryKey: ["post", String(post.id)] });
        } else {
            alert(liked ? "Unable to unlike" : "Unable to like");
        }
    };

    return (
		<Card sx={{ mb: 2 }}>
			<CardContent>
				<Box sx={{ display: "flex", gap: 2 }}>
					<Avatar
						sx={{ width: 48, height: 48, background: green[500] }}
					/>
					<Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <Box>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {post.user.name}
                                </Typography>
                                <Typography sx={{ color: green[500] }}>
                                    {post.created}
                                </Typography>
                            </Box>
                            {auth && auth.id === post.userId && (
                                <IconButton size="small" onClick={deletePost}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Box>
						<Typography sx={{ mt: 1 }} onClick={() => navigate(`/view/${post.id}`)}>
							{post.content}
						</Typography>
					</Box>
				</Box>
				<Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
					<ButtonGroup>
						<IconButton size="sm" onClick={toggleLike} disabled={!auth}>
							{liked ? (
								<LikedIcon color="error" />
							) : (
								<LikeIcon color="error" />
							)}
						</IconButton>
						<Button
							size="sm"
							variant="text">
							{post.likes ? post.likes.length : 0}
						</Button>
					</ButtonGroup>
					<ButtonGroup>
						<IconButton size="sm" onClick={() => navigate(`/view/${post.id}`)}>
							<CommentIcon sx={{ color: grey[500] }} />
						</IconButton>
						<Button
							size="sm"
							variant="text">
							{post.comments ? post.comments.length : 0}
						</Button>
					</ButtonGroup>
				</Box>
			</CardContent>
		</Card>
	);
}
