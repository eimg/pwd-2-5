import { ScrollView } from "react-native";
import PostCard from "@/components/post-card";

export default function Index() {
	return (
		<ScrollView>
			<PostCard />
			<PostCard />
			<PostCard />
			<PostCard />
			<PostCard />
		</ScrollView>
	);
}
