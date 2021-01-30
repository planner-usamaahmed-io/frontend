import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import axios from "../../../../axios";
import {
	Modal,
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Divider,
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import Snackbar from "../../../../components/Snackbar";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		outline: "none",
		boxShadow: theme.shadows[20],
		width: 700,
		maxHeight: "90%",
		overflowY: "auto",
		maxWidth: "100%",
	},
	actions: {
		justifyContent: "flex-end",
	},
}));

function AddEmployeeModal({
	open,
	onClose,
	product,
	companyId,
	className,
	projectId,
	...rest
}) {
	const classes = useStyles();
	const [users, setUsers] = useState([]);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	useEffect(() => {
		axios
			.get(`/api/company/${companyId}/users`)
			.then((response) => {
				console.log(response);
				setUsers(
					response.data.employees.map((user) => {
						user.amount = 1;
						return user;
					})
				);
			})
			.catch((error) => console.log(error));
	}, [companyId]);

	const onAddUser = async (e, userid) => {
		console.log("Add User");
		const projectEmployee = {
			employeeId: userid,
			projectId: projectId,
		};

		console.log(projectEmployee);

		try {
			const addProjectEmployee = await axios.post(
				"http://localhost:3001/api/projectemployee/assignprojectuser",
				projectEmployee
			);

			console.log(addProjectEmployee.response);

			if (!addProjectEmployee) {
				handleSnackbarClick("Could not add user to project");
			} else {
				handleSnackbarClick(
					"User has successfully been added to project"
				);
			}
		} catch (error) {
			console.log(error.response);
			handleSnackbarClick(
				"Could not add user to project. Please try again later"
			);
		}
	};

	const handleSnackbarClick = (message) => {
		setSnackbarMessage(message);
		setSnackbarOpen(true);
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setSnackbarOpen(false);
	};

	return (
		<Modal onClose={onClose} open={open}>
			<Card {...rest} className={clsx(classes.root, className)}>
				<form>
					<CardHeader title="Add Product" />
					<Divider />
					<CardContent>
						<PerfectScrollbar>
							<div className={classes.inner}>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>ID</TableCell>
											<TableCell>Name</TableCell>
											<TableCell>Employee code</TableCell>
											<TableCell>Mail</TableCell>
											<TableCell align="right">
												Add
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{users.map((user) => (
											<TableRow key={user.id}>
												<TableCell>{user.id}</TableCell>

												<TableCell>
													{user.user.firstName +
														" " +
														user.user.lastName}
												</TableCell>
												<TableCell>
													{user.employeeCode}
												</TableCell>
												<TableCell>
													{user.user.email}
												</TableCell>
												<TableCell align="right">
													<Button
														color="primary"
														size="small"
														variant="outlined"
														onClick={(event) =>
															onAddUser(
																event,
																user.id
															)
														}
													>
														Add
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</PerfectScrollbar>
					</CardContent>
					<Divider />
					<Snackbar
						open={snackbarOpen}
						message={snackbarMessage}
						onClose={handleSnackbarClose}
					/>
					<CardActions className={classes.actions}>
						<Button onClick={onClose}>Close</Button>
					</CardActions>
				</form>
			</Card>
		</Modal>
	);
}

AddEmployeeModal.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object,
	onClose: PropTypes.func,
	open: PropTypes.bool,
	companyId: PropTypes.any,
	projectId: PropTypes.number,
};

AddEmployeeModal.defaultProps = {
	open: false,
	onClose: () => {},
};

export default AddEmployeeModal;
