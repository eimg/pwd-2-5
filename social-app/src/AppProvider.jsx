import { createContext, useContext, useMemo, useState } from "react";
import App from "./App";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import AppRouter from "./AppRouter";

const AppContext = createContext();

export default function AppProvider() {
	const [mode, setMode] = useState("dark");
    const [openDrawer, setOpenDrawer] = useState(false);

	const theme = useMemo(() => {
		return createTheme({
			palette: { mode },
		});
	}, [mode]);

	return (
		<AppContext.Provider value={{ mode, setMode, openDrawer, setOpenDrawer }}>
			<ThemeProvider theme={theme}>
				<AppRouter />
				<CssBaseline />
			</ThemeProvider>
		</AppContext.Provider>
	);
}

export function useApp() {
	return useContext(AppContext);
}
