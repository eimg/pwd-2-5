import { Alert, Button, OutlinedInput, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { useNavigate } from "react-router";

export default function Register() {
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

    const create = async data => {
        const res = await fetch("http://localhost:8800/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if(res.ok) {
            navigate("/login");
        } else {
            setError(true);
        }
    }

	return (
		<div>
			<Typography variant="h3">Register</Typography>

			{error && <Alert sx={{ mt: 2 }} severity="warning">Unable to create user</Alert>}

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
