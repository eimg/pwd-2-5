import { queryClient } from "@/components/app-provider";
import { Field, PrimaryButton } from "@/components/form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	View,
} from "react-native";

export default function AddPost() {
	const [content, setContent] = useState("");

	const postPost = async () => {
		const token = await AsyncStorage.getItem("token");

		const res = await fetch("http://localhost:8800/posts", {
			method: "POST",
			body: JSON.stringify({ content }),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (res.ok) {
			await queryClient.invalidateQueries({ queryKey: ["posts"] });
			router.dismiss();
		} else {
			alert("Unable to add post");
			router.dismiss();
		}
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}>
			<Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
				<View style={{ padding: 20, gap: 14 }}>
					<Field
						label="What's on your mind?"
						value={content}
						onChangeText={setContent}
						placeholder="Write a post..."
						multiline
						style={{ minHeight: 120, textAlignVertical: "top" }}
					/>
					<PrimaryButton title="Add Post" onPress={postPost} />
				</View>
			</Pressable>
		</KeyboardAvoidingView>
	);
}
