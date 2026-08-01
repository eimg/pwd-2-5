import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import { useApp } from "../AppProvider";

import {
	Menu as MenuIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
} from "@mui/icons-material";

export default function Header({ count }) {
	const { mode, setMode, setOpenDrawer } = useApp();

	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton
					color="inherit"
					onClick={() => setOpenDrawer(true)}>
					<MenuIcon />
				</IconButton>
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
