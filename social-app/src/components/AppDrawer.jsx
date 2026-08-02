import {
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";

import { grey } from "@mui/material/colors";
import { useApp } from "../AppProvider";

import {
	Home as HomeIcon,
	Person as ProfileIcon,
	PersonAdd as RegisterIcon,
	Login as LoginIcon,
	Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

export default function AppDrawer() {
	const { openDrawer, setOpenDrawer } = useApp();
    const navigate = useNavigate();

	return (
		<Drawer
			open={openDrawer}
			onClose={() => setOpenDrawer(false)}
			onClick={() => setOpenDrawer(false)}>
			<Box sx={{ width: 300, height: 200, bgcolor: grey[500] }}></Box>

			<List>
				<ListItemButton onClick={() => navigate("/")}>
					<ListItem>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItem>
				</ListItemButton>
			</List>

			<Divider />

			<List>
				<ListItemButton>
					<ListItem>
						<ListItemIcon>
							<ProfileIcon />
						</ListItemIcon>
						<ListItemText primary="Profile" />
					</ListItem>
				</ListItemButton>
				<ListItemButton>
					<ListItem>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary="Logout" />
					</ListItem>
				</ListItemButton>
			</List>

			<List>
				<ListItemButton onClick={() => navigate("/login")}>
					<ListItem>
						<ListItemIcon>
							<LoginIcon />
						</ListItemIcon>
						<ListItemText primary="Login" />
					</ListItem>
				</ListItemButton>
				<ListItemButton onClick={() => navigate("register")}>
					<ListItem>
						<ListItemIcon>
							<RegisterIcon />
						</ListItemIcon>
						<ListItemText primary="Register" />
					</ListItem>
				</ListItemButton>
			</List>
		</Drawer>
	);
}
