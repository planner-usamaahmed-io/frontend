import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Container } from "@material-ui/core";
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

const schema = {
	projectId: {
		presence: { allowEmpty: false, message: "is required" },
	},
	responsible: {},
	urgent: {
		presence: { allowEmpty: false, message: "is required" },
	},
	description: {},
	thingId: {
		presence: { allowEmpty: false, message: "is required" },
	},
	customerId: {
		presence: { allowEmpty: false, message: "is required" },
	},
	status: {
		presence: { allowEmpty: false, message: "is required" },
	},
	projectTypeId: {
		presence: { allowEmpty: false, message: "is required" },
	},
	companyId: {
		presence: { allowEmpty: false, message: "is required" },
	},
	startTime: {},
	endTime: {},
};

const initialState = {
	isValid: false,
	values: {
		active: false,
	},
	touched: {},
	errors: {},
};

const ProjectCreate = () => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const companyId = useSelector((state) => state.auth.companyId);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("");
	const [formState, setFormState] = useState(initialState);

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

		setFormState((prevFormState) => ({
			...prevFormState,
			isValid: !errors,
			errors: errors || {},
		}));
		console.log(formState.values);
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
			const newProject = await axios.post(
				"/api/project",
				formState.values
			);

			console.log(newProject);
			handleSnackbarClick(
				"Project has successfully been created.",
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
				console.log("There was an error creating the project");
				if (error.response.status)
					handleSnackbarClick(
						"Something went wrong creating",
						"error"
					);
			}
		}
		setLoading(false);
	};

	return (
		<Page className={classes.root} title="Create Thing">
			<Container maxWidth="lg">
				<Header />
				<FormInput
					hasError={hasError}
					formState={formState}
					handleChange={handleChange}
					className={classes.inputContent}
				/>
				<CreateButton
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

export default ProjectCreate;
