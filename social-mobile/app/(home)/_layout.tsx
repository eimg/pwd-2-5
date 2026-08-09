import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function HomeLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => {
						return (
							<Ionicons size={24} name="home" color={color} />
						);
					},
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => {
						return (
							<Ionicons size={24} name="person" color={color} />
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
							<Ionicons size={24} name="settings" color={color} />
						);
					},
				}}
			/>
		</Tabs>
	);
}
