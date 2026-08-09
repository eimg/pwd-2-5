import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Profile() {
	return (
		<View
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text style={{ fontWeight: "bold", fontSize: 21 }}>Login</Text>
			<TextInput
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
		</View>
	);
}
