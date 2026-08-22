import { Text, View, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PostType } from "@/types/global";
import { queryClient, useApp } from "@/components/app-provider";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { router, usePathname } from "expo-router";

export default function PostCard({ post }: { post: PostType }) {
	const { auth } = useApp();
	const pathname = usePathname();

	const liked = Boolean(auth && post.likes?.some(like => like.userId === auth.id));

	const toggleLike = async () => {
		if (!auth) {
			return;
		}

		const token = await AsyncStorage.getItem("token");
		const res = await fetch(`http://localhost:8800/posts/${post.id}/like`, {
			method: liked ? "DELETE" : "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.ok) {
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
		} else {
			alert(liked ? "Unable to unlike" : "Unable to like");
		}
	};

	const deletePost = async () => {
		const token = await AsyncStorage.getItem("token");

		const res = await fetch(`http://localhost:8800/posts/${post.id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.ok) {
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
			if (pathname.includes("view-post")) {
				if (router.canGoBack()) {
					router.back();
				} else {
					router.replace("/");
				}
			}
		} else {
			alert("Unable to delete post");
		}
	};

	return (
		<View
			style={{
				padding: 24,
				backgroundColor: "white",
				borderBottomWidth: 1,
				borderBottomColor: "#cccccc",
			}}>
			<View style={{ flexDirection: "row", gap: 16 }}>
				<View
					style={{
						width: 64,
						height: 64,
						borderRadius: 64,
						backgroundColor: "teal",
						alignItems: "center",
						justifyContent: "center",
					}}>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "bold",
							color: "white",
						}}>
						{post.user.name[0].toUpperCase()}
					</Text>
				</View>
				<View style={{ flexShrink: 1, flex: 1 }}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "flex-start",
						}}>
						<View style={{ flexShrink: 1 }}>
							<Text style={{ fontSize: 18 }}>{post.user.name}</Text>
							<Text style={{ color: "teal" }}>{post.created}</Text>
						</View>
						{auth && auth.id === post.userId && (
							<TouchableOpacity onPress={deletePost}>
								<Ionicons
									size={22}
									name="trash-outline"
									color="#666666"
								/>
							</TouchableOpacity>
						)}
					</View>
					<TouchableOpacity
						onPress={() => {
							if (pathname === `/view-post/${post.id}`) {
								return;
							}
							router.push(`/view-post/${post.id}`);
						}}>
						<Text style={{ marginTop: 8, fontSize: 16 }}>
							{post.content}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View
				style={{
					marginTop: 20,
					flexDirection: "row",
					justifyContent: "space-around",
				}}>
				<View
					style={{
						gap: 5,
						flexDirection: "row",
						alignItems: "center",
					}}>
					<TouchableOpacity onPress={toggleLike}>
						<Ionicons
							size={28}
							name={liked ? "heart" : "heart-outline"}
							color="red"
						/>
					</TouchableOpacity>
					<Text style={{ fontSize: 16 }}>
						{post.likes ? post.likes.length : 0}
					</Text>
				</View>
				<View
					style={{
						gap: 5,
						flexDirection: "row",
						alignItems: "center",
					}}>
					<TouchableOpacity>
						<Ionicons
							size={28}
							name="chatbubble-outline"
							color="#666666"
						/>
					</TouchableOpacity>
					<Text style={{ fontSize: 16 }}>{post.comments.length}</Text>
				</View>
			</View>
		</View>
	);
}
