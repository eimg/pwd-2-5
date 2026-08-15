import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PostType } from "@/types/global";

import { router } from "expo-router";

export default function PostCard({ post }: { post: PostType }) {
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
				<View style={{ flexShrink: 1 }}>
					<Text style={{ fontSize: 18 }}>{post.user.name}</Text>
					<Text style={{ color: "teal" }}>{post.created}</Text>
					<TouchableOpacity
						onPress={() => router.push(`/view-post/${post.id}`)}>
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
					<TouchableOpacity>
						<Ionicons
							size={28}
							name="heart-outline"
							color="red"
						/>
					</TouchableOpacity>
					<Text style={{ fontSize: 16 }}>5</Text>
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
