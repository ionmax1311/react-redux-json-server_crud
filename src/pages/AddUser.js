import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import Stack from "@mui/material/Stack";
import Cancel from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/actions";

const AddUser = () => {
	const [state, setState] = useState({
		name: "",
		email: "",
		contact: "",
		address: "",
	});
	const { name, email, contact, address } = state;
	const [error, setError] = useState("");
	let navigate = useNavigate();
	let dispatch = useDispatch();

	const handleInputChange = (e) => {
		let { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("address--", address);
		if (!name || !email || !contact || !address) {
			setError("Please input all input field");
		} else {
			dispatch(addUser(state));
			navigate("/");
			setError("");
		}
	};

	return (
		<div style={{ marginTop: 100 }}>
			<h1>Add user</h1>
			{error && <h3 style={{ color: "red" }}>{error}</h3>}
			<Box
				component='form'
				sx={{
					"& > :not(style)": { width: "45ch" },
				}}
				noValidate
				autoComplete='off'
				onSubmit={handleSubmit}>
				<TextField
					id='standard-basic'
					label='Name'
					variant='standard'
					type='text'
					value={name}
					name='name'
					onChange={handleInputChange}
					sx={{ m: 2 }}
				/>
				<br />
				<TextField
					id='standard-basic'
					label='Email'
					variant='standard'
					type='email'
					value={email}
					name='email'
					onChange={handleInputChange}
					sx={{ m: 2 }}
				/>
				<br />
				<TextField
					id='standard-basic'
					label='Contact'
					variant='standard'
					type='number'
					value={contact}
					name='contact'
					onChange={handleInputChange}
					sx={{ m: 2 }}
				/>
				<br />
				<TextField
					id='standard-basic'
					label='Address'
					variant='standard'
					type='text'
					value={address}
					name='address'
					onChange={handleInputChange}
					sx={{ m: 2 }}
				/>
				<br />
				<Stack
					sx={{ mx: "auto", mt: 3 }}
					direction='row'
					justifyContent='center'
					spacing={2}>
					<Button
						variant='contained'
						type='submit'
						endIcon={<AddCircleOutline />}>
						Submit
					</Button>
					<Button
						variant='contained'
						color='error'
						endIcon={<Cancel />}
						onClick={() => navigate("/")}>
						Cancel
					</Button>
				</Stack>
			</Box>
		</div>
	);
};

export default AddUser;
