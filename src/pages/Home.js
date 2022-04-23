import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, loadUsers } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

const Home = () => {
	let dispatch = useDispatch();
	const { users, loading } = useSelector((state) => state.data);
	const [searchTerm, setSearchTerm] = useState("");
	let navigate = useNavigate();

	useEffect(() => {
		dispatch(loadUsers());
	}, []);

	const handleDelete = (id) => {
		if (window.confirm("Are you sure wanted to delete the user?")) {
			dispatch(deleteUser(id));
		}
	};

	return (
		<div style={{ marginTop: 100 }}>
			<h1>React Redux-Thunk REST API </h1>
			{!loading ? (
				<TableContainer
					component={Paper}
					style={{ maxWidth: 1200 }}
					sx={{ mx: "auto" }}>
					<Stack
						direction='row'
						justifyContent='space-between'
						spacing={2}
						sx={{ m: 3 }}>
						<TextField
							id='standard-basic'
							label='Search user'
							variant='standard'
							type='text'
							name='name'
							onChange={(e) => {
								setSearchTerm(e.target.value);
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position='start'>
										<SearchIcon />
									</InputAdornment>
								),
							}}
						/>
						<Button
							variant='contained'
							endIcon={<AddCircleOutline />}
							onClick={() => navigate("/addUser")}>
							Add user
						</Button>
					</Stack>

					<Table sx={{ minWidth: 700 }} aria-label='customized table'>
						<TableHead>
							<TableRow>
								<StyledTableCell>Name</StyledTableCell>
								<StyledTableCell align='center'>
									Email
								</StyledTableCell>
								<StyledTableCell align='center'>
									Contact
								</StyledTableCell>
								<StyledTableCell align='center'>
									Address
								</StyledTableCell>
								<StyledTableCell align='center'>
									Action
								</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users &&
								users
									.filter((val) => {
										if (searchTerm === "") {
											return val;
										} else if (
											val.name
												.toLowerCase()
												.includes(
													searchTerm.toLowerCase(),
												) ||
											val.email
												.toLowerCase()
												.includes(
													searchTerm.toLowerCase(),
												) ||
											val.contact
												.toLowerCase()
												.includes(
													searchTerm.toLowerCase(),
												) ||
											val.address
												.toLowerCase()
												.includes(
													searchTerm.toLowerCase(),
												)
										) {
											return val;
										}
									})
									.map((user) => (
										<StyledTableRow key={user.id}>
											<StyledTableCell
												component='th'
												scope='row'>
												{user.name}
											</StyledTableCell>
											<StyledTableCell align='center'>
												{user.email}
											</StyledTableCell>
											<StyledTableCell align='center'>
												{user.contact}
											</StyledTableCell>
											<StyledTableCell align='center'>
												{user.address}
											</StyledTableCell>
											<StyledTableCell align='center'>
												<Stack
													direction='row'
													justifyContent='center'
													spacing={2}>
													<Button
														variant='contained'
														endIcon={<EditIcon />}
														onClick={() =>
															navigate(
																`/editUser/${user.id}`,
															)
														}>
														Edit
													</Button>
													<Button
														variant='contained'
														color='secondary'
														endIcon={
															<AccountBoxIcon />
														}
														onClick={() =>
															navigate(
																`/detailUser/${user.id}`,
															)
														}>
														Details
													</Button>
													<Button
														variant='contained'
														color='error'
														endIcon={<DeleteIcon />}
														onClick={() =>
															handleDelete(
																user.id,
															)
														}>
														Delete
													</Button>
												</Stack>
											</StyledTableCell>
										</StyledTableRow>
									))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<h2>loading....</h2>
			)}
		</div>
	);
};

export default Home;
