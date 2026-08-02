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

export default function ViewPost() {
	return (
		<div>
			<PostCard />

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

			<Box>
				<Box
					sx={{
						mt: 2,
						p: 3,
						border: "1px solid #66666666",
						display: "flex",
						gap: 2,
					}}>
					<Avatar
						sx={{ width: 42, height: 42, background: grey[500] }}
					/>
					<Box>
						<Typography sx={{ fontWeight: "bold" }}>Bob</Typography>
						<Typography>A few seconds ago</Typography>
						<Typography>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Repellendus sequi quasi expedita velit
							deleniti
						</Typography>
					</Box>
				</Box>
				<Box
					sx={{
						mt: 2,
						p: 3,
						border: "1px solid #66666666",
						display: "flex",
						gap: 2,
					}}>
					<Avatar
						sx={{ width: 42, height: 42, background: grey[500] }}
					/>
					<Box>
						<Typography sx={{ fontWeight: "bold" }}>Bob</Typography>
						<Typography>A few seconds ago</Typography>
						<Typography>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Repellendus sequi quasi expedita velit
							deleniti
						</Typography>
					</Box>
				</Box>
			</Box>
		</div>
	);
}
