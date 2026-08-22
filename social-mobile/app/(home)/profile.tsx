import { useApp } from "@/components/app-provider";
import {
	DangerButton,
	Field,
	ModeSwitch,
	PrimaryButton,
} from "@/components/form";
import PostCard from "@/components/post-card";
import { PostType } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	Text,
	View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function fetchUserPosts(userId: number): Promise<PostType[]> {
	const res = await fetch(`http://localhost:8800/users/${userId}/posts`);
	return res.json();
}

export default function Profile() {
	const [mode, setMode] = useState("login");
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [bio, setBio] = useState("");
	const [password, setPassword] = useState("");

	const { auth, setAuth } = useApp();

	const {
		data: posts,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["posts", "user", auth?.id],
		queryFn: () => fetchUserPosts(auth!.id),
		enabled: !!auth,
	});

	const login = async () => {
		const res = await fetch("http://localhost:8800/login", {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (res.ok) {
			const { user, token } = await res.json();
			setAuth(user);
			await AsyncStorage.setItem("token", token);
		} else {
			alert("Unable to login");
		}
	};

	const register = async () => {
		if (!name.trim() || !username.trim() || !password) {
			alert("Name, username and password are required");
			return;
		}

		const res = await fetch("http://localhost:8800/users", {
			method: "POST",
			body: JSON.stringify({ name, username, bio, password }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (res.ok) {
			await login();
		} else {
			alert("Unable to create user");
		}
	};

	if (!auth) {
		return (
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}>
				<ScrollView
					contentInsetAdjustmentBehavior="automatic"
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={{
						flexGrow: 1,
						justifyContent: "center",
						paddingHorizontal: 24,
						paddingVertical: 32,
					}}>
					<Pressable onPress={Keyboard.dismiss}>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 28,
								textAlign: "center",
								marginBottom: 20,
							}}>
							{mode === "login" ? "Welcome back" : "Create account"}
						</Text>

						<ModeSwitch
							value={mode}
							onChange={setMode}
							options={[
								{ value: "login", label: "Login" },
								{ value: "register", label: "Register" },
							]}
						/>

						<View style={{ gap: 14, marginTop: 24 }}>
							{mode === "register" && (
								<Field
									label="Name"
									value={name}
									onChangeText={setName}
									placeholder="Your name"
									autoCapitalize="words"
								/>
							)}
							<Field
								label="Username"
								value={username}
								onChangeText={setUsername}
								placeholder="username"
								autoCapitalize="none"
								autoCorrect={false}
							/>
							{mode === "register" && (
								<Field
									label="Bio"
									value={bio}
									onChangeText={setBio}
									placeholder="A short bio (optional)"
								/>
							)}
							<Field
								label="Password"
								value={password}
								onChangeText={setPassword}
								placeholder="password"
								secureTextEntry
							/>
							<View style={{ marginTop: 6 }}>
								<PrimaryButton
									title={mode === "login" ? "Login" : "Register"}
									onPress={mode === "login" ? login : register}
								/>
							</View>
						</View>
					</Pressable>
				</ScrollView>
			</KeyboardAvoidingView>
		);
	}

	return (
		<ScrollView>
			<View style={{ height: 140, backgroundColor: "teal" }} />

			<View
				style={{
					alignItems: "center",
					marginTop: -48,
					paddingHorizontal: 24,
				}}>
				<View
					style={{
						width: 96,
						height: 96,
						borderRadius: 96,
						backgroundColor: "teal",
						borderWidth: 4,
						borderColor: "white",
						alignItems: "center",
						justifyContent: "center",
					}}>
					<Text
						style={{
							fontSize: 32,
							fontWeight: "bold",
							color: "white",
						}}>
						{auth.name[0].toUpperCase()}
					</Text>
				</View>

				<Text
					style={{
						fontWeight: "bold",
						fontSize: 21,
						marginTop: 12,
						textAlign: "center",
					}}>
					{auth.name}
				</Text>
				<Text style={{ color: "teal", fontSize: 16, marginTop: 4 }}>
					@{auth.username}
				</Text>
				{auth.bio ? (
					<Text
						style={{
							fontSize: 16,
							color: "#666666",
							marginTop: 8,
							textAlign: "center",
						}}>
						{auth.bio}
					</Text>
				) : null}

				<View style={{ marginTop: 16 }}>
					<DangerButton
						title="Logout"
						onPress={async () => {
							setAuth(null);
							await AsyncStorage.removeItem("token");
						}}
					/>
				</View>
			</View>

			<View style={{ marginTop: 24 }}>
				{isLoading && (
					<Text style={{ textAlign: "center", padding: 20 }}>
						Loading...
					</Text>
				)}
				{error && (
					<Text style={{ textAlign: "center", padding: 20 }}>
						{error.message}
					</Text>
				)}
				{!isLoading && !error && posts?.length === 0 && (
					<Text
						style={{
							textAlign: "center",
							padding: 20,
							color: "#666666",
						}}>
						No posts yet
					</Text>
				)}
				{posts?.map(post => {
					return <PostCard key={post.id} post={post} />;
				})}
			</View>
		</ScrollView>
	);
}
