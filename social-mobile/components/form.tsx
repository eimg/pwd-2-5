import { useState } from "react";
import {
	Text,
	TextInput,
	TextInputProps,
	TouchableOpacity,
	View,
} from "react-native";

export function Field({
	label,
	style,
	onFocus,
	onBlur,
	...props
}: TextInputProps & { label?: string }) {
	const [focused, setFocused] = useState(false);

	return (
		<View style={{ width: "100%", gap: 6 }}>
			{label ? (
				<Text
					style={{
						fontSize: 13,
						fontWeight: "600",
						color: "#555555",
						marginLeft: 4,
					}}>
					{label}
				</Text>
			) : null}
			<TextInput
				placeholderTextColor="#999999"
				{...props}
				onFocus={e => {
					setFocused(true);
					onFocus?.(e);
				}}
				onBlur={e => {
					setFocused(false);
					onBlur?.(e);
				}}
				style={[
					{
						width: "100%",
						paddingVertical: 14,
						paddingHorizontal: 16,
						borderWidth: 1.5,
						borderColor: focused ? "teal" : "#e0e0e0",
						backgroundColor: focused ? "white" : "#f5f5f5",
						borderRadius: 14,
						fontSize: 16,
					},
					style,
				]}
			/>
		</View>
	);
}

type ButtonProps = {
	title: string;
	onPress: () => void;
	disabled?: boolean;
};

export function PrimaryButton({ title, onPress, disabled }: ButtonProps) {
	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled}
			activeOpacity={0.75}
			style={{
				width: "100%",
				paddingVertical: 16,
				backgroundColor: disabled ? "#9bbbbb" : "teal",
				borderRadius: 14,
				alignItems: "center",
				justifyContent: "center",
				shadowColor: "teal",
				shadowOpacity: disabled ? 0 : 0.25,
				shadowRadius: 8,
				shadowOffset: { width: 0, height: 4 },
				elevation: disabled ? 0 : 3,
			}}>
			<Text
				style={{
					color: "white",
					fontWeight: "bold",
					fontSize: 16,
				}}>
				{title}
			</Text>
		</TouchableOpacity>
	);
}

export function DangerButton({ title, onPress, disabled }: ButtonProps) {
	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled}
			activeOpacity={0.75}
			style={{
				paddingVertical: 12,
				paddingHorizontal: 28,
				backgroundColor: "white",
				borderWidth: 1.5,
				borderColor: "#e53935",
				borderRadius: 14,
				alignItems: "center",
				justifyContent: "center",
			}}>
			<Text
				style={{
					color: "#e53935",
					fontWeight: "bold",
					fontSize: 16,
				}}>
				{title}
			</Text>
		</TouchableOpacity>
	);
}

export function ModeSwitch({
	value,
	onChange,
	options,
}: {
	value: string;
	onChange: (value: string) => void;
	options: { value: string; label: string }[];
}) {
	return (
		<View
			style={{
				flexDirection: "row",
				backgroundColor: "#eeeeee",
				borderRadius: 14,
				padding: 4,
				width: "100%",
			}}>
			{options.map(option => {
				const active = option.value === value;
				return (
					<TouchableOpacity
						key={option.value}
						onPress={() => onChange(option.value)}
						activeOpacity={0.8}
						style={{
							flex: 1,
							paddingVertical: 10,
							borderRadius: 11,
							backgroundColor: active ? "white" : "transparent",
							alignItems: "center",
							shadowColor: "#000",
							shadowOpacity: active ? 0.08 : 0,
							shadowRadius: 4,
							shadowOffset: { width: 0, height: 1 },
							elevation: active ? 1 : 0,
						}}>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 15,
								color: active ? "teal" : "#777777",
							}}>
							{option.label}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}
