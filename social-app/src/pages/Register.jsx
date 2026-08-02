import { Button, OutlinedInput, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

export default function Register() {
    const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

    const create = async data => {
        console.log(data);
    }

	return (
		<div>
			<Typography variant="h3">Register</Typography>
			<form onSubmit={handleSubmit(create)}>
				<OutlinedInput
					sx={{ mt: 2 }}
					placeholder="name"
					fullWidth
					{...register("name", { required: true })}
					error={errors.name}
				/>

				<OutlinedInput
					sx={{ mt: 2 }}
					placeholder="username"
					fullWidth
					{...register("username", { required: true })}
					error={errors.username}
				/>

				<OutlinedInput
					sx={{ mt: 2 }}
					placeholder="bio"
					fullWidth
					{...register("bio")}
				/>

				<OutlinedInput
					sx={{ mt: 2 }}
					placeholder="password"
					type="password"
					fullWidth
					{...register("password", { required: true })}
					error={errors.password}
				/>

				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 2 }}>
					Register
				</Button>
			</form>
		</div>
	);
}
