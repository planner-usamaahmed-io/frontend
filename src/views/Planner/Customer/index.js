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
// import { red } from "@material-ui/core/colors";
// import { ContactsOutlined } from "@material-ui/icons";

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
	customerName: {
		presence: { allowEmpty: false, message: "is required" },
		length: {
			minimum: 3,
			maximum: 155,
			message: "has to be between 3 and 155 charactors long",
		},
	},
	customerId: {
		presence: { allowEmpty: false, message: "is required" },
	},
	customerCVR: {},
	customerEAN: {},
	contactName: {},
	contactPhone: {},
	contactEmail: {
		email: true,
	},
	customerTypeId: {
		inclusion: {
			within: {
				Business: "Business",
				Private: "Private",
			},
			message: "Value is not valid",
		},
	},
	active: {
		presence: { allowEmpty: false, message: "is required" },
	},
};

const initialState = {
	isValid: false,
	values: {
		active: false,
	},
	touched: {
		active: true,
	},
	errors: {},
};

const Customer = ({ match }) => {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const { id } = match.params;
	const [isUpdate, setIsUpdate] = useState(false);
	const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
	const companyId = useSelector((state) => state.auth.companyId);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarSeverity, setSnackbarSeverity] = useState("");
	const [formState, setFormState] = useState(initialState);

	useEffect(() => {
		// if the id isset then the thing already exist and we want to view/update it
		if (id) {
			setIsUpdate(true);
			axios
				.get(`/api/customer/${id}`)
				.then((res) => {
					console.log(res);
					setDeleteButtonDisabled(true);
					let mailPresent = false;
					if (
						res.data.customer.contactEmail != null &&
						res.data.customer.contactEmail.length > 0
					) {
						mailPresent = true;
					}
					setFormState((prevState) => ({
						...prevState,
						values: {
							id: res.data.customer.id,
							active: res.data.customer.active,
							contactEmail: res.data.customer.contactEmail,
							contactName: res.data.customer.contactName,
							contactPhone: res.data.customer.contactPhone,
							customerCVR: res.data.customer.customerCVR,
							customerEAN: res.data.customer.customerEAN,
							customerId: res.data.customer.customerId,
							customerName: res.data.customer.customerName,
							customerTypeId: res.data.customer.customerTypeId,
						},
						touched: {
							...prevState.touched,
							active: true,
							id: true,
							contactEmail: mailPresent,
							contactName: true,
							contactPhone: true,
							customerCVR: true,
							customerEAN: true,
							customerId: true,
							customerName: true,
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

		try {
			if (isUpdate) {
				const updatedCustomer = await axios.put(
					`/api/company/${companyId}/customers/${id}`,
					formState.values
				);

				console.log(updatedCustomer);
				handleSnackbarClick(
					"Customer has successfully been updated",
					"success"
				);
			} else {
				await axios.post(
					`/api/company/${companyId}/customers`,
					formState.values
				);

				handleSnackbarClick(
					"Customer has successfully been created.",
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
					handleSnackbarClick("Theres was an error.", "error");
				}
			} else {
				console.log("There was an error creating the customer");
				if (error.response.status)
					handleSnackbarClick(
						"Something went wrong creating customer",
						"error"
					);
			}
		}
		setLoading(false);
	};

	const onDelete = async () => {
		try {
			await axios.delete(`/api/company/${companyId}/customers/${id}`);
			handleSnackbarClick("Customer has been deleted", "success");
		} catch (error) {
			console.log(error);
			handleSnackbarClick(error.response.data.message, "error");
		}
	};

	return (
		<Page className={classes.root} title="Customer Create">
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

Customer.propTypes = {
	match: PropTypes.object.isRequired,
};

export default Customer;
