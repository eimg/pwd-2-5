import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "@/types/global";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

type AppContextType = {
	auth: UserType | null;
	setAuth: React.Dispatch<React.SetStateAction<UserType | null>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({ children }: { children: ReactNode }) {
	const [auth, setAuth] = useState<UserType | null>(null);

    useEffect(() => {
        async function verify() {
            const token = await AsyncStorage.getItem("token");
            if(token) {
                const res = await fetch("http://localhost:8800/verify", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if(res.ok) {
                    const user = await res.json();
                    setAuth(user);
                } else {
                    await AsyncStorage.removeItem("token");
                }
            }
        }

        verify();
    }, []);

	return (
		<QueryClientProvider client={queryClient}>
			<AppContext.Provider value={{ auth, setAuth }}>
				{children}
			</AppContext.Provider>
		</QueryClientProvider>
	);
}

export function useApp() {
	const context = useContext(AppContext);

	if (context === undefined) {
		throw new Error("useApp must be used within an AppProvider");
	}

	return context;
}
