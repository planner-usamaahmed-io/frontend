import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
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

function AddProductModal({
	open,
	onClose,
	product,
	companyId,
	className,
	projectId,
	...rest
}) {
	const classes = useStyles();
	const [products, setProducts] = useState([]);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	useEffect(() => {
		axios
			.get(`/api/company/${companyId}/products`)
			.then((response) => {
				console.log(response);
				setProducts(
					response.data.products.map((product) => {
						product.amount = 1;
						return product;
					})
				);
			})
			.catch((error) => console.log(error));
	}, [companyId]);

	const changeAmount = (e) => {
		setProducts(
			products.map((product) => {
				if (product.id === parseInt(e.target.id)) {
					product.amount = e.target.value;
				}
				return product;
			})
		);
	};

	const onAddProduct = async (e, productId, amount, price) => {
		const projectProduct = {
			projectId,
			productId: parseInt(productId),
			amount: parseInt(amount),
			price,
		};

		console.log(projectProduct);

		try {
			const addProjectProduct = await axios.post(
				"http://localhost:3001/api/projectproduct",
				projectProduct
			);

			if (!addProjectProduct) {
				console.log(addProjectProduct.response);
				handleSnackbarClick("Could not add product to project");
			} else {
				handleSnackbarClick(
					"Product has been successfully added to project"
				);
			}
		} catch (error) {
			console.log(error.response);
			handleSnackbarClick(
				"Could not add product to project. Please try again later"
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
											<TableCell>Title</TableCell>
											<TableCell>Weight</TableCell>
											<TableCell>Price</TableCell>
											<TableCell>Amount</TableCell>
											<TableCell align="right">
												Add
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{products.map((product) => (
											<TableRow key={product.id}>
												<TableCell>
													{product.id}
												</TableCell>

												<TableCell>
													{product.title}
												</TableCell>
												<TableCell>
													{product.weight}
												</TableCell>
												<TableCell>
													{product.price}
												</TableCell>
												<TableCell>
													<TextField
														onChange={changeAmount}
														id={product.id.toString()}
														label="Numbers"
														type="number"
														value={product.amount}
														InputLabelProps={{
															shrink: true,
														}}
													/>
												</TableCell>
												<TableCell align="right">
													<Button
														color="primary"
														size="small"
														variant="outlined"
														onClick={(event) =>
															onAddProduct(
																event,
																product.id,
																product.amount,
																product.price
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

AddProductModal.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object,
	onClose: PropTypes.func,
	open: PropTypes.bool,
	companyId: PropTypes.any,
	projectId: PropTypes.number,
};

AddProductModal.defaultProps = {
	open: false,
	onClose: () => {},
};

export default AddProductModal;
