import { Alert, Button, OutlinedInput, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useApp } from "../AppProvider";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
    const { auth, setAuth } = useApp();
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

    const login = async data => {
        const res = await fetch("http://localhost:8800/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if(res.ok) {
           const { user, token } = await res.json(); 
           setAuth(user);
           localStorage.setItem("token", token);
           navigate("/");
        } else {
            setError(true);
        }
    }

	return (
		<div>
			<Typography variant="h3">Login</Typography>

			{error && <Alert severity="warning" sx={{ mt: 2 }}>Unable to login</Alert>}

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
