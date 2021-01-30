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
import moment from "moment";
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
	thingId: {
		presence: { allowEmpty: false, message: "is required" },
		length: {
			minimum: 1,
			maximum: 155,
			message: "has to be between 1 and 155 charactors long",
		},
	},
	thingDescription: {},
	thingName: {
		presence: { allowEmpty: false, message: "is required" },
		length: {
			minimum: 1,
			maximum: 155,
			message: "has to be between 1 and 155 charactors long",
		},
	},
	thingSerialNumber: {},
	thingInstallationDate: {},
	locationCVR: {},
	locationEAN: {},
	locationAddress: {
		presence: { allowEmpty: false, message: "is required" },
		length: {
			minimum: 1,
			maximum: 155,
			message: "has to be between 1 and 155 charactors long",
		},
	},
	locationPostcode: {
		presence: { allowEmpty: false, message: "is required" },
		length: {
			minimum: 1,
			maximum: 155,
			message: "has to be between 1 and 155 charactors long",
		},
	},
	locationCity: {
		presence: { allowEmpty: false, message: "is required" },
		length: {
			minimum: 1,
			maximum: 155,
			message: "has to be between 1 and 155 charactors long",
		},
	},
	locationCountry: {
		presence: { allowEmpty: false, message: "is required" },
		length: {
			minimum: 1,
			maximum: 155,
			message: "has to be between 1 and 155 charactors long",
		},
	},
	locationPhone: {
		presence: { allowEmpty: false, message: "is required" },
		length: {
			minimum: 1,
			maximum: 155,
			message: "has to be between 1 and 155 charactors long",
		},
	},
	locationEmail: {
		email: true,
	},
	customerTypeId: {
		inclusion: {
			within: {
				BUSINESS: "BUSINESS",
				PRIVATE: "PRIVATE",
			},
			message: "Value is not valid",
		},
	},
	companyId: {},
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

const Thing = ({ match }) => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const companyId = useSelector((state) => state.auth.companyId);
	const { id } = match.params;
	const [isUpdate, setIsUpdate] = useState(false);
	const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("");
	const [formState, setFormState] = useState(initialState);

	useEffect(() => {
		// if the id isset then the thing already exist and we want to view/update it
		if (id) {
			setIsUpdate(true);
			axios
				.get(`/api/thing/${id}`)
				.then((res) => {
					console.log(res);
					setDeleteButtonDisabled(res.data.thing.projects.length > 0);
					setFormState((prevState) => ({
						...prevState,
						values: {
							thingId: res.data.thing.thingId,
							thingDescription: res.data.thing.thingDescription,
							thingName: res.data.thing.thingName,
							thingSerialNumber: res.data.thing.thingSerialNumber,
							thingInstallationDate: moment(
								res.data.thing.thingInstallationDate
							).format("YYYY-MM-DD HH:mm:ss"),
							locationCVR: res.data.thing.locationCVR,
							locationEAN: res.data.thing.locationEAN,
							active: res.data.thing.active,
							companyId: res.data.thing.companyId,
							locationAddress: res.data.thing.locationAddress,
							locationPostcode: res.data.thing.locationPostcode,
							locationPhone: res.data.thing.locationPhone,
							locationCity: res.data.thing.locationCity,
							locationCountry: res.data.thing.locationCountry,
							locationEmail: res.data.thing.locationEmail,
							customerTypeId: res.data.thing.customerTypeId,
						},
						touched: {
							...prevState.touched,
							thingId: true,
							thindDescription: true,
							thingName: true,
							thingSerialNumber: true,
							thingInstallationDate: true,
							locationCVR: true,
							locationEAN: true,
							active: true,
							companyId: true,
							locationAddress: true,
							locationPostcode: true,
							locationPhone: true,
							locationCity: true,
							locationCountry: true,
							locationEmail: true,
							customerTypeId: true,
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

	const onDelete = async () => {
		try {
			await axios.delete(`/api/company/${companyId}/things/${id}`);
			handleSnackbarClick("Thing has been deleted", "success");
		} catch (error) {
			console.log(error);
			handleSnackbarClick(error.response.data.message, "error");
		}
	};

	const onCreate = async () => {
		console.log(formState.values);
		setLoading(true);

		try {
			if (isUpdate) {
				const updateThing = await axios.put(
					`/api/company/${companyId}/things/${id}`,
					formState.values
				);
				console.log(updateThing);
				handleSnackbarClick(
					"Thing has successfully been updated.",
					"success"
				);
			} else {
				await axios.post("/api/thing", formState.values);

				handleSnackbarClick(
					"Thing has successfully been created.",
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
					handleSnackbarClick(
						"Something went wrong. Try again",
						"error"
					);
				}
			} else {
				console.log("There was an error creating the thing");
				if (error.response.status)
					handleSnackbarClick(
						"Something went wrong creating thing",
						"error"
					);
			}
		}
		setLoading(false);
	};

	return (
		<Page
			className={classes.root}
			title={isUpdate ? "Update Thing" : "Create Thing"}
		>
			<Container maxWidth="lg">
				<Header
					deleteButtonDisabled={deleteButtonDisabled}
					onDelete={onDelete}
					isUpdate={isUpdate}
				/>
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

Thing.propTypes = {
	match: PropTypes.object.isRequired,
};

export default Thing;
