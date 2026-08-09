import { createContext, useContext, useMemo, useState, useEffect } from "react";
import App from "./App";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import AppRouter from "./AppRouter";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const AppContext = createContext();

export default function AppProvider() {
	const [mode, setMode] = useState("dark");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [auth, setAuth] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token) {
            fetch("http://localhost:8800/verify", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then(async res => {
                if(res.ok) {
                    const user = await res.json();
                    setAuth(user);
                } else {
                    localStorage.removeItem("token");
                }
            });
        }
    }, []);

	const theme = useMemo(() => {
		return createTheme({
			palette: { mode },
		});
	}, [mode]);

	return (
		<AppContext.Provider
			value={{ mode, setMode, openDrawer, setOpenDrawer, auth, setAuth }}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<AppRouter />
					<CssBaseline />
				</ThemeProvider>
			</QueryClientProvider>
		</AppContext.Provider>
	);
}

export function useApp() {
	return useContext(AppContext);
}
