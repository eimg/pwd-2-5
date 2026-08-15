import { useApp } from "@/components/app-provider";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { auth, setAuth } = useApp();

    const login = async () => {
        const res = await fetch("http://localhost:8800/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if(res.ok) {
            const { user, token } = await res.json();
            setAuth(user);
            await AsyncStorage.setItem("token", token);
        } else {
            alert("Unable to login");
        }
    }

	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			{auth && (
				<>
					<Text style={{ fontWeight: "bold", fontSize: 21 }}>
						Profile
					</Text>

					<TouchableOpacity
						onPress={async () => {
                            setAuth(null);
                            await AsyncStorage.removeItem("token");
                        }}
						style={{
							paddingVertical: 15,
                            paddingHorizontal: 40,
							backgroundColor: "red",
							borderRadius: 20,
							marginTop: 10,
							alignItems: "center",
							justifyContent: "center",
						}}>
						<Text
							style={{
								color: "white",
								fontWeight: "bold",
								fontSize: 16,
							}}>
							Logout
						</Text>
					</TouchableOpacity>
				</>
			)}

			{!auth && (
				<>
					<Text style={{ fontWeight: "bold", fontSize: 21 }}>
						Login
					</Text>
					<TextInput
						value={username}
						onChangeText={setUsername}
						style={{
							width: "80%",
							paddingVertical: 15,
							paddingHorizontal: 18,
							borderWidth: 1,
							borderColor: "#666666",
							borderRadius: 20,
							marginTop: 20,
							fontSize: 16,
						}}
						autoCapitalize="none"
						placeholder="username"
					/>
					<TextInput
						value={password}
						onChangeText={setPassword}
						style={{
							width: "80%",
							paddingVertical: 15,
							paddingHorizontal: 18,
							borderWidth: 1,
							borderColor: "#666666",
							borderRadius: 20,
							marginTop: 10,
							fontSize: 16,
						}}
						secureTextEntry
						placeholder="password"
					/>

					<TouchableOpacity
						onPress={login}
						style={{
							width: "80%",
							paddingVertical: 15,
							backgroundColor: "teal",
							borderRadius: 20,
							marginTop: 10,
							alignItems: "center",
							justifyContent: "center",
						}}>
						<Text
							style={{
								color: "white",
								fontWeight: "bold",
								fontSize: 16,
							}}>
							Login
						</Text>
					</TouchableOpacity>
				</>
			)}
		</View>
	);
}
