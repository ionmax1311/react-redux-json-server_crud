import React, { useState, useEffect } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../redux/actions";

const DetailsUser = () => {
	const [state, setState] = useState({
		name: "",
		email: "",
		contact: "",
		address: "",
	});
	const { name, email, contact, address } = state;

	let { id } = useParams();
	let navigate = useNavigate();
	let dispatch = useDispatch();
	const { user } = useSelector((state) => state.data);

	useEffect(() => {
		dispatch(getSingleUser(id));
	}, []);

	useEffect(() => {
		if (user) {
			setState({ ...user });
		}
	}, [user]);
	return (
		<div style={{ marginTop: 100 }}>
			<h1>Details User</h1>

			<Card sx={{ maxWidth: 345, mx: "auto" }}>
				<CardActionArea>
					<CardContent>
						<List
							component='nav'
							aria-label='secondary mailbox folder'>
							<ListItemButton>
								<Typography
									sx={{ mr: 2 }}
									color='text.secondary'
									gutterBottom
									variant='subtitle1'>
									name:
								</Typography>
								<Typography gutterBottom variant='h5'>
									{name}
								</Typography>
							</ListItemButton>
							<ListItemButton>
								<Typography
									sx={{ mr: 2 }}
									color='text.secondary'
									gutterBottom
									variant='subtitle1'>
									email:
								</Typography>
								<Typography gutterBottom variant='h5'>
									{email}
								</Typography>
							</ListItemButton>
							<ListItemButton>
								<Typography
									sx={{ mr: 2 }}
									color='text.secondary'
									gutterBottom
									variant='subtitle1'>
									contact:
								</Typography>
								<Typography gutterBottom variant='h5'>
									{contact}
								</Typography>
							</ListItemButton>
							<ListItemButton>
								<Typography
									sx={{ mr: 2 }}
									color='text.secondary'
									gutterBottom
									variant='subtitle1'>
									address:
								</Typography>
								<Typography gutterBottom variant='h5'>
									{address}
								</Typography>
							</ListItemButton>
						</List>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button
						variant='contained'
						endIcon={<ArrowBackIcon />}
						onClick={() => navigate("/")}
						color='primary'
						sx={{ mx: "auto", mb: 2 }}>
						Go Back
					</Button>
				</CardActions>
			</Card>
		</div>
	);
};

export default DetailsUser;
