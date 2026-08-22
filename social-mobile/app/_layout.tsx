import AppProvider from "@/components/app-provider";
import { Stack } from "expo-router";

export const unstable_settings = {
	initialRouteName: "(home)",
};

export default function RootLayout() {
	return (
		<AppProvider>
			<Stack>
				<Stack.Screen
					name="(home)"
					options={{ title: "Home", headerShown: false }}
				/>
				<Stack.Screen
					name="add-post"
					options={{ title: "Add Post", presentation: "modal" }}
				/>
				<Stack.Screen
					name="view-post/[id]"
					options={{ title: "View Post", headerBackTitle: "Back" }}
				/>
			</Stack>
		</AppProvider>
	);
}
