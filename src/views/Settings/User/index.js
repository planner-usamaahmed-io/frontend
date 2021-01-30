import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Container } from "@material-ui/core";
import PropTypes from "prop-types";
import Page from "../../../components/Page";
import Header from "./Header.js";
import FormInput from "./FormInput";
import CreateButton from "./Button";
import axios from "../../../axios";
import Snackbar from "../../../components/Snackbar";
import validate from "validate.js";

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
	inputContent: {
		marginTop: theme.spacing(1.5),
	},
	button: {
		marginTop: theme.spacing(3),
	},
}));

let schema = {
	employeeCode: {
		presence: { allowEmpty: false, message: "is required" },
	},
	companyId: {
		presence: { allowEmpty: false, message: "is required" },
		numericality: {
			onlyInteger: true,
			message: "can only contain whole numbers",
		},
	},
	areaId: {},
	firstName: {
		presence: { allowEmpty: false, message: "is required" },
	},
	lastName: {},
	email: {
		presence: { allowEmpty: false, message: "is required" },
		email: true,
	},
	password: {
		presence: { allowEmpty: false, message: "is required" },
	},
	confirmpassword: {
		presence: { allowEmpty: false, message: "is required" },
		equality: "password",
	},
	phoneNumber: {},
	active: {
		presence: { allowEmpty: false, message: "is required" },
	},
	bio: {},
	avatar: {},
	roles: {
		presence: { allowEmpty: false, message: "is required" },
		numericality: {
			onlyInteger: true,
			message: "can only contain whole numbers",
		},
	},
};

const initialState = {
	isValid: false,
	values: {
		active: false,
		permissionLevel: "EMPLOYEE",
	},
	touched: {
		active: true,
		permissionLevel: true,
	},
	errors: {},
};

const User = ({ match }) => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const { userid, employeeid } = match.params;
	const [isUpdate, setIsUpdate] = useState(false);
	const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
	const companyId = useSelector((state) => state.auth.companyId);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("");
	const [formState, setFormState] = useState(initialState);

	useEffect(() => {
		// if id isset then we want to fetch the user from the api and fill the text fields
		if (employeeid) {
			console.log("Det her er en update " + employeeid);

			delete schema.password;
			delete schema.confirmpassword;

			console.log(schema);

			setIsUpdate(true);
			axios
				.get(
					`http://localhost:3001/api/company/${companyId}/users/${employeeid}`
				)
				.then((response) => {
					console.log(response);
					setDeleteButtonDisabled(true);

					const employee = response.data.employee;

					setFormState((prevState) => ({
						...prevState,
						values: {
							id: employee.id,
							employeeCode: employee.employeeCode,
							areaId: employee.areaId,
							firstName: employee.user.firstName,
							lastName: employee.user.lastName,
							email: employee.user.email,
							phoneNumber: employee.user.phoneNumber,
							active: employee.user.active,
							bio: employee.user.bio,
							avatar: employee.user.avatar,
							roles: employee.user.roles,
							companyId: employee.companyId,
						},
						touched: {
							...prevState.touched,
							id: true,
							employeeCode: true,
							areaId: true,
							firstName: true,
							lastName: true,
							email: true,
							phoneNumber: true,
							active: true,
							bio: true,
							avatar: true,
							roles: true,
							companyId: true,
						},
					}));
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [employeeid, companyId]);

	const handleChange = (event) => {
		event.persist();

		setFormState((prevFormState) => ({
			...prevFormState,
			values: {
				...prevFormState.values,
				[event.target.name]:
					event.target.type === "checkbox"
						? event.target.checked
						: event.target.value,
			},
			touched: {
				...prevFormState.touched,
				[event.target.name]: true,
			},
		}));
	};

	const addRoles = (value) => {
		setFormState((prevFormState) => ({
			...prevFormState,
			values: {
				...prevFormState.values,
				roles: value,
			},
			touched: {
				...prevFormState.touched,
				roles: true,
			},
		}));
	};

	// Check if input has error
	const hasError = (field) =>
		!!(formState.touched[field] && formState.errors[field]);

	useEffect(() => {
		setFormState((prevFormState) => ({
			...prevFormState,
			values: {
				...prevFormState.values,
				companyId: companyId,
			},
			touched: {
				...prevFormState.touched,
				companyId: true,
			},
		}));
	}, [companyId, setFormState]);

	useEffect(() => {
		const errors = validate(formState.values, schema);

		console.log(errors);

		setFormState((prevFormState) => ({
			...prevFormState,
			isValid: !errors,
			errors: errors || {},
		}));
	}, [formState.values, setFormState]);

	const handleSnackbarClick = (message, severity) => {
		setSnackbarMessage(message);
		setSnackbarSeverity(severity);
		setSnackbarOpen(true);
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === "clickaway") return;
		setSnackbarMessage("");
		setSnackbarSeverity("");
		setSnackbarOpen(false);
	};

	const onCreate = async () => {
		console.log(formState.values);
		setLoading(true);

		try {
			const newUser = await axios.post(
				"/api/auth/register/employee",
				formState.values
			);

			console.log(newUser);
			handleSnackbarClick(
				"User has successfully been created.",
				"success"
			);
			setFormState({
				...initialState,
				values: {
					...initialState.values,
					companyId: companyId,
				},
			});
		} catch (error) {
			console.log(error, error.response);
			if (error.response.status === 422) {
				const validationErrors = error.response.data.errors.map(
					(error) => {
						var errors = "";
						for (var key in error) {
							errors += error[key] + "\n";
						}
						return errors;
					}
				);
				handleSnackbarClick(validationErrors, "error");
			} else if (
				error.response.status === 400 &&
				error.response.data.errors
			) {
				if (error.response.data.errors[0].message) {
					const validationErrors = error.response.data.errors.map(
						(error) => {
							return error.message;
						}
					);
					handleSnackbarClick(validationErrors, "error");
				} else {
					handleSnackbarClick(error.response.data.errors, "error");
				}
			} else {
				console.log("There was an error creating the user");
				if (error.response.status)
					handleSnackbarClick("Something went wrong user", "error");
			}
		}
		setLoading(false);
	};

	return (
		<Page className={classes.root} title="User">
			<Container maxWidth="lg">
				<Header
					deleteButtonDisabled={deleteButtonDisabled}
					isUpdate={isUpdate}
				/>
				<FormInput
					hasError={hasError}
					formState={formState}
					handleChange={handleChange}
					addRoles={addRoles}
					className={classes.inputContent}
					companyId={companyId}
					userId={userid}
				/>
				<CreateButton
					isUpdate={isUpdate}
					formDisabled={!formState.isValid}
					loading={loading}
					onClick={onCreate}
					className={classes.button}
				/>
			</Container>
			{snackbarMessage && snackbarOpen && snackbarSeverity ? (
				<Snackbar
					open={snackbarOpen}
					autoHideDuration={6000}
					message={snackbarMessage}
					onClose={handleSnackbarClose}
					severity={snackbarSeverity}
				/>
			) : null}
		</Page>
	);
};

User.propTypes = {
	match: PropTypes.object.isRequired,
};

export default User;
