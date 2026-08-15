import { router, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useApp } from "@/components/app-provider";

export default function HomeLayout() {
	const { auth } = useApp();

	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => {
						return (
							<Ionicons
								size={24}
								name="home"
								color={color}
							/>
						);
					},
					headerRight: () => {
						if (auth) {
							<TouchableOpacity
								style={{ marginRight: 20 }}
								onPress={() => router.push("/add-post")}>
								<Ionicons
									size={24}
									name="add"
								/>
							</TouchableOpacity>;
						} else {
							return <></>;
						}
					},
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => {
						return (
							<Ionicons
								size={24}
								name="person"
								color={color}
							/>
						);
					},
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color }) => {
						return (
							<Ionicons
								size={24}
								name="settings"
								color={color}
							/>
						);
					},
				}}
			/>
		</Tabs>
	);
}
