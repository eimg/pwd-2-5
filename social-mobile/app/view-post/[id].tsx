import { useLocalSearchParams } from "expo-router";
import {
	Text,
	View,
	ScrollView,
	TextInput,
	TouchableOpacity,
} from "react-native";

import { useQuery } from "@tanstack/react-query";
import { PostType } from "@/types/global";

import PostCard from "@/components/post-card";

async function fetchPost(id: string): Promise<PostType> {
	const res = await fetch(`http://localhost:8800/posts/${id}`);
	return res.json();
}

export default function ViewPost() {
	const { id } = useLocalSearchParams();

	const {
		data: post,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["posts", id],
		queryFn: () => fetchPost(id as string),
	});

	if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Text>Loading...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Text>{error.message}</Text>
			</View>
		);
	}

	return (
		<ScrollView>
			{post && (
				<>
					<PostCard post={post} />
					<View style={{ paddingBottom: 12, paddingHorizontal: 20 }}>
						<TextInput
							style={{
								width: "100%",
								paddingVertical: 15,
								paddingHorizontal: 18,
								borderWidth: 1,
								borderColor: "#666666",
								borderRadius: 20,
								marginTop: 20,
								fontSize: 16,
							}}
						/>
						<TouchableOpacity
							style={{
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
								Add Comment
							</Text>
						</TouchableOpacity>
					</View>

                    <View>
                        {post.comments?.map(comment => {
                            return (
								<View key={comment.id} style={{ padding: 20, borderBottomWidth: 1, borderColor: "#66666666" }}>
									<Text style={{ fontSize: 16 }}>{comment.content}</Text>
								</View>
							);
                        })}
                    </View>
				</>
			)}
		</ScrollView>
	);
}
