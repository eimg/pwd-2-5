import { queryClient } from "@/components/app-provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";

export default function AddPost() {
    const [content, setContent] = useState("");

    const postPost = async () => {
        const token = await AsyncStorage.getItem("token");

        const res = await fetch("http://localhost:8800/posts", {
            method: "POST",
            body: JSON.stringify({ content }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });

        if(res.ok) {
            await queryClient.invalidateQueries({ queryKey: ["posts"] });
            router.dismiss();
        } else {
            alert("Unable to add post");
            router.dismiss();
        }
    }

	return (
		<View>
			<View style={{ paddingBottom: 12, paddingHorizontal: 20 }}>
				<TextInput
                    value={content}
                    onChangeText={setContent}
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
                    onPress={postPost}
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
						Add Post
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
