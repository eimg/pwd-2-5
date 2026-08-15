import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PostCard() {
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
						A
					</Text>
				</View>
				<View style={{ flexShrink: 1 }}>
					<Text style={{ fontSize: 18 }}>Alice</Text>
					<Text style={{ color: "teal" }}>a few seonds ago</Text>
					<Text style={{ marginTop: 8, fontSize: 16 }}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Voluptate modi voluptates ratione iste molestiae
						voluptas quia ipsa? Corrupti numquam sint unde beatae
						velit esse consequuntur id nam, labore aut perspiciatis?
					</Text>
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
					<Text style={{ fontSize: 16 }}>3</Text>
				</View>
			</View>
		</View>
	);
}
