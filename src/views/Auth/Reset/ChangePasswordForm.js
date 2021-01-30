/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import validate from "validate.js";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Button, TextField } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "../../../components/Snackbar";
import axios from "../../../axios";

const schema = {
	password: {
		presence: { allowEmpty: false, message: "is required" },
	},
	confirmpassword: {
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

function LoginForm({ token, className, ...rest }) {
	const classes = useStyles();
	const history = useHistory();
	const authError = useSelector((state) => state.auth.error);
	const loader = useSelector((state) => state.auth.loading);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [formState, setFormState] = useState({
		isValid: false,
		values: {},
		touched: {},
		errors: {},
	});

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

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = {
			password: formState.values.password,
			confirmpassword: formState.values.confirmpassword,
			token,
		};

		try {
			const passwordReset = await axios.put(
				"http://localhost:3001/api/auth/resetpassword",
				formData
			);

			if (!passwordReset) {
				handleSnackbarClick(
					"There was an error changing the password. Please try again later"
				);
			} else {
				console.log("successfully resetted password");
				history.push("/auth/login", {
					msg: "Password has been changed.",
				});
			}
		} catch (error) {
			console.log(error, error.response);
			handleSnackbarClick(
				"There was an error when trying to change the password. Please try again later"
			);
		}
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

	return (
		<form
			{...rest}
			className={clsx(classes.root, className)}
			onSubmit={handleSubmit}
		>
			<div className={classes.fields}>
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
				<TextField
					error={hasError("confirmpassword")}
					fullWidth
					helperText={
						hasError("confirmpassword")
							? formState.errors.confirmpassword[0]
							: null
					}
					label="Confirm password"
					name="confirmpassword"
					onChange={handleChange}
					type="password"
					value={formState.values.confirmpassword || ""}
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
					onClose={handleSnackbarClose}
				/>
			) : null}
		</form>
	);
}

LoginForm.propTypes = {
	className: PropTypes.string,
	token: PropTypes.any.isRequired,
};

export default LoginForm;
