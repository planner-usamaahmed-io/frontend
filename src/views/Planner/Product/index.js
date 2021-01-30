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
	title: {
		presence: { allowEmpty: false, message: "is required" },
		length: {
			minimum: 3,
			maximum: 155,
			message: "has to be between 1 and 155 charactors long",
		},
	},
	weight: {
		presence: { allowEmpty: false, message: "is required" },
	},
	price: {
		presence: { allowEmpty: false, message: "is required" },
	},
	buyingPrice: {
		presence: { allowEmpty: false, message: "is required" },
	},
	itemNumber: {
		presence: { allowEmpty: false, message: "is required" },
	},
	stock: {
		presence: { allowEmpty: false, message: "is required" },
		numericality: {
			onlyInteger: true,
			message: "can only contain whole numbers",
		},
	},
	companyId: {
		presence: { allowEmpty: false, message: "is required" },
		numericality: {
			onlyInteger: true,
			message: "can only contain whole numbers",
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
	touched: {},
	errors: {},
};

const ProductCreate = ({ match }) => {
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
		// if the id isset then the project type already exist and we want to view/update it
		if (id) {
			setIsUpdate(true);
			axios
				.get(`/api/product/${id}`)
				.then((res) => {
					console.log(res.data);
					setDeleteButtonDisabled(
						res.data.product.projects.length > !0
					);
					setFormState((prevState) => ({
						...prevState,
						values: {
							title: res.data.product.title,
							weight: res.data.product.weight,
							price: res.data.product.price,
							buyingPrice: res.data.product.buyingPrice,
							itemNumber: res.data.product.itemNumber,
							stock: res.data.product.stock,
							active: res.data.product.active,
							companyId: res.data.product.companyId,
						},
						touched: {
							...prevState.touched,
							title: true,
							weight: true,
							price: true,
							buyingPrice: true,
							itemNumber: true,
							stock: true,
							active: true,
							companyId: true,
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

	const onCreate = async () => {
		console.log(formState.values);
		setLoading(true);

		try {
			if (isUpdate) {
				await axios.put(
					`/api/company/${companyId}/products/${id}`,
					formState.values
				);

				handleSnackbarClick(
					"Product has successfully been updated.",
					"success"
				);
			} else {
				await axios.post("/api/product/create", formState.values);

				handleSnackbarClick(
					"Product has successfully been created.",
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
				const validationErrors = error.response.data.errors.map(
					(error) => {
						return error.message;
					}
				);
				handleSnackbarClick(validationErrors, "error");
			} else {
				console.log("There was an error creating the product");
				if (error.response.status)
					handleSnackbarClick(
						"Something went wrong creating product",
						"error"
					);
			}
		}
		setLoading(false);
	};

	const onDelete = async () => {
		try {
			await axios.delete(`/api/company/${companyId}/products/${id}`);
			handleSnackbarClick("Thing has been deleted", "success");
		} catch (error) {
			console.log(error);
			handleSnackbarClick(error.response.data.message, "error");
		}
	};

	return (
		<Page className={classes.root} title="Product Create">
			<Container maxWidth="lg">
				<Header
					onDelete={onDelete}
					deleteButtonDisabled={deleteButtonDisabled}
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

ProductCreate.propTypes = {
	match: PropTypes.object.isRequired,
};

export default ProductCreate;
