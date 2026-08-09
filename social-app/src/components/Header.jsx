import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import { useApp } from "../AppProvider";

import {
	Menu as MenuIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
	ArrowBack as BackIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";

export default function Header({ count }) {
	const { mode, setMode, setOpenDrawer } = useApp();

	const { pathname } = useLocation();
	const navigate = useNavigate();

	return (
		<AppBar position="static">
			<Toolbar>
				{pathname == "/" ? (
					<IconButton
						color="inherit"
						onClick={() => setOpenDrawer(true)}>
						<MenuIcon />
					</IconButton>
				) : (
					<IconButton
						color="inherit"
						onClick={() => navigate("/")}>
						<BackIcon />
					</IconButton>
				)}

				<Typography sx={{ ml: 2, flexGrow: 1 }}>
					<Badge
						badgeContent={count}
						color="error">
						Social
					</Badge>
				</Typography>
				{mode == "dark" ? (
					<IconButton
						color="inherit"
						onClick={() => setMode("light")}>
						<LightModeIcon />
					</IconButton>
				) : (
					<IconButton
						color="inherit"
						onClick={() => setMode("dark")}>
						<DarkModeIcon />
					</IconButton>
				)}
			</Toolbar>
		</AppBar>
	);
}
