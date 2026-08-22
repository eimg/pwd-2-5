import { Stack, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useQuery } from "@tanstack/react-query";
import { PostType } from "@/types/global";
import { queryClient, useApp } from "@/components/app-provider";
import { Field, PrimaryButton } from "@/components/form";

import PostCard from "@/components/post-card";

async function fetchPost(id: string): Promise<PostType> {
	const res = await fetch(`http://localhost:8800/posts/${id}`);
	return res.json();
}

export default function ViewPost() {
	const { id } = useLocalSearchParams();
	const { auth } = useApp();
	const [content, setContent] = useState("");

	const {
		data: post,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["posts", id],
		queryFn: () => fetchPost(id as string),
	});

	const addComment = async () => {
		if (!content.trim()) {
			return;
		}

		const token = await AsyncStorage.getItem("token");

		const res = await fetch(`http://localhost:8800/posts/${id}/comments`, {
			method: "POST",
			body: JSON.stringify({ content }),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.ok) {
			setContent("");
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
		} else {
			alert("Unable to add comment");
		}
	};

	const deleteComment = async (commentId: number) => {
		const token = await AsyncStorage.getItem("token");

		const res = await fetch(`http://localhost:8800/comments/${commentId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.ok) {
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
		} else {
			alert("Unable to delete comment");
		}
	};

	const goBack = () => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.replace("/");
		}
	};

	const headerOptions = {
		title: "View Post",
		headerLeft: () => (
			<TouchableOpacity
				onPress={goBack}
				hitSlop={12}
				style={{ paddingRight: 8 }}>
				<Ionicons
					name="chevron-back"
					size={28}
				/>
			</TouchableOpacity>
		),
	};

	if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Stack.Screen options={headerOptions} />
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
				<Stack.Screen options={headerOptions} />
				<Text>{error.message}</Text>
			</View>
		);
	}

	return (
		<ScrollView>
			<Stack.Screen options={headerOptions} />
			{post && (
				<>
					<PostCard post={post} />
					{auth && (
						<View
							style={{
								paddingBottom: 12,
								paddingHorizontal: 20,
								paddingTop: 16,
								gap: 12,
							}}>
							<Field
								value={content}
								onChangeText={setContent}
								placeholder="Your reply..."
							/>
							<PrimaryButton title="Add Comment" onPress={addComment} />
						</View>
					)}

					<View>
						{post.comments?.map(comment => {
							return (
								<View
									key={comment.id}
									style={{
										padding: 20,
										borderBottomWidth: 1,
										borderColor: "#66666666",
										flexDirection: "row",
										justifyContent: "space-between",
										alignItems: "flex-start",
										gap: 12,
									}}>
									<View style={{ flex: 1 }}>
										{comment.user && (
											<Text style={{ fontWeight: "bold", fontSize: 16 }}>
												{comment.user.name}
											</Text>
										)}
										<Text style={{ fontSize: 16, marginTop: 4 }}>
											{comment.content}
										</Text>
									</View>
									{auth && auth.id === comment.userId && (
										<TouchableOpacity
											onPress={() => deleteComment(comment.id)}>
											<Ionicons
												size={20}
												name="trash-outline"
												color="#666666"
											/>
										</TouchableOpacity>
									)}
								</View>
							);
						})}
					</View>
				</>
			)}
		</ScrollView>
	);
}
