import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserType } from "@/types/global";

type AuthContextType = {
	auth: UserType | null;
	setAuth: React.Dispatch<React.SetStateAction<UserType | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useApp() {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
}
