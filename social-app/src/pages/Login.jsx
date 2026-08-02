import { Button, OutlinedInput, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

export default function Login() {
    const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

    const login = async data => {
        console.log(data);
    }

	return (
		<div>
			<Typography variant="h3">Login</Typography>
			<form onSubmit={handleSubmit(login)}>
				<OutlinedInput
					sx={{ mt: 2 }}
					placeholder="username"
					fullWidth
					{...register("username", { required: true })}
					error={errors.username}
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
					Login
				</Button>
			</form>
		</div>
	);
}
