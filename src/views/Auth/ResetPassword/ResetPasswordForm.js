/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import validate from "validate.js";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Button, TextField } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "../../../components/Snackbar";
import axios from "../../../axios";

const schema = {
	email: {
		presence: { allowEmpty: false, message: "is required" },
		email: true,
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
	const [loading, setLoading] = useState(false);
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
		setLoading(true);

		const formData = {
			email: formState.values.email,
		};

		try {
			const forgotPasswordRequest = await axios.post(
				"http://localhost:3001/api/auth/forgotpassword",
				formData
			);

			if (!forgotPasswordRequest) {
				console.log("Something went wrong. Please try again");
				console.log(forgotPasswordRequest);
				handleSnackbarClick("Something went wrong. Please try again");
			} else {
				handleSnackbarClick(
					"Link has been sent to your email. Please follow the step to reset your password"
				);
			}
		} catch (error) {
			console.log(error);
			console.log(error.response);
			handleSnackbarClick(
				"There was an error trying to send reset email. Please try again later"
			);
		}
		setLoading(false);
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
			</div>
			<Button
				className={classes.submitButton}
				color="secondary"
				disabled={!formState.isValid}
				size="large"
				type="submit"
				variant="contained"
			>
				{loading ? <CircularProgress /> : "Sign in"}
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
};

export default LoginForm;
