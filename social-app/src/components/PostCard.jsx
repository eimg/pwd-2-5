import { Avatar, Box, Button, ButtonGroup, Card, CardContent, IconButton, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";

import {
    FavoriteBorderOutlined as LikeIcon,
    Favorite as LikedIcon,
    ChatBubbleOutlineOutlined as CommentIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router";

export default function PostCard() {
    const navigate = useNavigate();

    return (
		<Card sx={{ mb: 2 }}>
			<CardContent>
				<Box sx={{ display: "flex", gap: 2 }}>
					<Avatar
						sx={{ width: 48, height: 48, background: green[500] }}
					/>
					<Box>
						<Typography sx={{ fontWeight: "bold" }}>
							Alice
						</Typography>
						<Typography sx={{ color: green[500] }}>
							a few seconds ago
						</Typography>
						<Typography sx={{ mt: 1 }} onClick={() => navigate("/view/1")}>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Quae modi repellendus eius eum voluptatum
							maxime tenetur odit eligendi sunt! Ipsum veniam
							ipsam beatae, animi odit odio nisi ipsa expedita
							porro!
						</Typography>
					</Box>
				</Box>
				<Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
					<ButtonGroup>
						<IconButton size="sm">
							<LikeIcon color="error" />
						</IconButton>
						<Button
							size="sm"
							variant="text">
							10
						</Button>
					</ButtonGroup>
					<ButtonGroup>
						<IconButton size="sm">
							<CommentIcon sx={{ color: grey[500] }} />
						</IconButton>
						<Button
							size="sm"
							variant="text">
							5
						</Button>
					</ButtonGroup>
				</Box>
			</CardContent>
		</Card>
	);
}