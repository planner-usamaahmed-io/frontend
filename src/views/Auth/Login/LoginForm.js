/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import validate from "validate.js";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Button, TextField } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "../../../components/Snackbar";
import * as actions from "../../../store/actions";

const schema = {
	email: {
		presence: { allowEmpty: false, message: "is required" },
		email: true,
	},
	password: {
		presence: { allowEmpty: false, message: "is required" },
	},
};

const useStyles = makeStyles((theme) => ({
	root: {},
	fields: {
		margin: theme.spacing(-1),
		display: "flex",
		flexWrap: "wrap",
		"& > *": {
			flexGrow: 1,
			margin: theme.spacing(1),
		},
	},
	submitButton: {
		marginTop: theme.spacing(2),
		width: "100%",
	},
}));

function LoginForm({ className, ...rest }) {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();
	const onSignIn = (data) => dispatch(actions.authSignIn(data));
	const authError = useSelector((state) => state.auth.errorStatusText);
	const authState = useSelector((state) => state.auth);
	const loader = useSelector((state) => state.auth.loading);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("success");
	const [formState, setFormState] = useState({
		isValid: false,
		values: {},
		touched: {},
		errors: {},
	});

	const handleSnackbarClick = (message, severity = "success") => {
		setSnackbarMessage(message);
		setSnackbarSeverity(severity);
		setSnackbarOpen(true);
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setSnackbarOpen(false);
	};

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

	const handleSubmit = (event) => {
		event.preventDefault();
		onSignIn(formState.values);
	};

	const hasError = (field) =>
		!!(formState.touched[field] && formState.errors[field]);

	useEffect(() => {
		const errors = validate(formState.values, schema);

		setFormState((prevFormState) => ({
			...prevFormState,
			isValid: !errors,
			errors: errors || {},
		}));
	}, [formState.values]);

	// Check if we are already logged in
	if (authState.loggedIn && authState.token) {
		history.push("/");
	}

	// Check if there was any errors logging in
	if (authError) {
		handleSnackbarClick(authError, "error");
		dispatch(actions.clearAuthError());
	}

	return (
		<form
			{...rest}
			className={clsx(classes.root, className)}
			onSubmit={handleSubmit}
		>
			<div className={classes.fields}>
				<TextField
					autoFocus
					error={hasError("email")}
					fullWidth
					helperText={
						hasError("email") ? formState.errors.email[0] : null
					}
					label="Email address"
					name="email"
					onChange={handleChange}
					value={formState.values.email || ""}
					variant="outlined"
				/>
				<TextField
					error={hasError("password")}
					fullWidth
					helperText={
						hasError("password")
							? formState.errors.password[0]
							: null
					}
					label="Password"
					name="password"
					onChange={handleChange}
					type="password"
					value={formState.values.password || ""}
					variant="outlined"
				/>
			</div>
			<Button
				className={classes.submitButton}
				color="secondary"
				disabled={!formState.isValid}
				size="large"
				type="submit"
				variant="contained"
			>
				{loader ? <CircularProgress /> : "Sign in"}
			</Button>
			{snackbarMessage && snackbarOpen ? (
				<Snackbar
					open={snackbarOpen}
					message={snackbarMessage}
					severity={snackbarSeverity}
					onClose={handleSnackbarClose}
				/>
			) : null}
		</form>
	);
}

LoginForm.propTypes = {
	className: PropTypes.string,
};

export default LoginForm;
