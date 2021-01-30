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
import PropTypes from "prop-types";

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
	type: {
		presence: { allowEmpty: false, message: "is required" },
		length: {
			minimum: 1,
			maximum: 155,
			message: "has to be between 1 and 155 charactors long",
		},
	},
	description: {},
	active: {
		presence: { allowEmpty: false, message: "is required" },
	},
};

const initialState = {
	isValid: false,
	values: {
		active: false,
	},
	touched: {},
	errors: {},
};

const ProjectTypeCreate = ({ match }) => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const { id } = match.params;
	const [isUpdate, setIsUpdate] = useState(false);
	const companyId = useSelector((state) => state.auth.companyId);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("");
	const [formState, setFormState] = useState(initialState);

	useEffect(() => {
		// if the id isset the the project type already exist and we want to view/update it
		if (id) {
			setIsUpdate(true);
			axios
				.get(`/api/projecttype/${id}`)
				.then((res) => {
					setFormState((prevState) => ({
						...prevState,
						values: {
							id: res.data.projectType.id,
							active: res.data.projectType.active,
							type: res.data.projectType.type,
							description: res.data.projectType.description,
							companyId: res.data.projectType.companyId,
						},
						touched: {
							...prevState.touched,
							active: true,
							companyId: true,
							description: true,
							type: true,
							id: true,
						},
					}));
				})
				.catch((err) => console.log(err));
		}
	}, [id]);

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
	}, [companyId]);

	useEffect(() => {
		const errors = validate(formState.values, schema);

		setFormState((prevFormState) => ({
			...prevFormState,
			isValid: !errors,
			errors: errors || {},
		}));
		console.log(formState.values);
	}, [formState.values]);

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
		console.log(formState.values);

		try {
			if (isUpdate) {
				await axios.put("/api/projecttype/update", formState.values);

				handleSnackbarClick(
					"Project Type has successfully been updated.",
					"success"
				);
			} else {
				await axios.post("/api/projecttype", formState.values);
				handleSnackbarClick(
					"Project Type has successfully been created.",
					"success"
				);
				setFormState({
					...initialState,
					values: {
						...initialState.values,
						companyId: companyId,
					},
				});
			}
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
				console.log("There was an error creating the project type");
				if (error.response.status)
					handleSnackbarClick(
						"Something went wrong creating type",
						"error"
					);
			}
		}
		setLoading(false);
	};

	return (
		<Page className={classes.root} title="Create Project Type">
			<Container maxWidth="lg">
				<Header isUpdate={isUpdate} />
				<FormInput
					hasError={hasError}
					formState={formState}
					handleChange={handleChange}
					className={classes.inputContent}
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

ProjectTypeCreate.propTypes = {
	match: PropTypes.object.isRequired,
};

export default ProjectTypeCreate;
