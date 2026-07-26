import { IconButton, ListItem, ListItemText } from "@mui/material";
import {
	Delete as DeleteIcon,
	SquareOutlined as CheckIcon,
	Check as UndoIcon,
} from "@mui/icons-material";

export default function Item({ item, del, toggle }) {
	return (
		<ListItem>
			<IconButton
				onClick={() => {
					toggle(item.id);
				}}>
				{item.done ? <UndoIcon color="success" /> : <CheckIcon />}
			</IconButton>

			<ListItemText primary={item.name} />

			<IconButton onClick={() => del(item.id)}>
				<DeleteIcon color="error" />
			</IconButton>
		</ListItem>
	);
}
