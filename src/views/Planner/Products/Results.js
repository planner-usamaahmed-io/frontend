import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Checkbox,
	Divider,
	Button,
	Link,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
	TableContainer,
} from "@material-ui/core";
import GenericMoreButton from "../../../components/GenericMoreButton";
import TableEditBar from "../../../components/TableEditBar";

const useStyles = makeStyles((theme) => ({
	root: {},
	content: {
		padding: 0,
	},
	inner: {
		minWidth: 700,
	},
	nameCell: {
		display: "flex",
		alignItems: "center",
	},
	avatar: {
		height: 42,
		width: 42,
		marginRight: theme.spacing(1),
	},
	actions: {
		padding: theme.spacing(1),
		justifyContent: "flex-end",
	},
}));

function Results({
	page,
	setPage,
	totalPages,
	totalProducts,
	rowsPerPage,
	setRowsPerPage,
	className,
	products,
	onSearch,
	...rest
}) {
	const classes = useStyles();
	const [selectedProducts, setSelectedProducts] = useState([]);

	const handleSelectAll = (event) => {
		const selectedProducts = event.target.checked
			? products.map((product) => product.id)
			: [];

		setSelectedProducts(selectedProducts);
	};

	const handleSelectOne = (event, id) => {
		const selectedIndex = selectedProducts.indexOf(id);
		let newSelectedProducts = [];

		if (selectedIndex === -1) {
			newSelectedProducts = newSelectedProducts.concat(
				selectedProducts,
				id
			);
		} else if (selectedIndex === 0) {
			newSelectedProducts = newSelectedProducts.concat(
				selectedProducts.slice(1)
			);
		} else if (selectedIndex === selectedProducts.length - 1) {
			newSelectedProducts = newSelectedProducts.concat(
				selectedProducts.slice(0, -1)
			);
		} else if (selectedIndex > 0) {
			newSelectedProducts = newSelectedProducts.concat(
				selectedProducts.slice(0, selectedIndex),
				selectedProducts.slice(selectedIndex + 1)
			);
		}

		setSelectedProducts(newSelectedProducts);
	};

	const handleChangePage = (event, page) => {
		console.log("change page: " + page);
		setPage(page);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
	};

	const onExportAsCSV = () => {
		console.log(products);
	};

	useEffect(() => {
		console.log(selectedProducts);
	}, [selectedProducts]);

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<Typography color="textSecondary" gutterBottom variant="body2">
				{products.length} Records found. Page {page + 1} of {totalPages}
			</Typography>
			<Card>
				<CardHeader
					action={
						<GenericMoreButton
							onExportAsCSV={onExportAsCSV}
							exportCSVData={products}
						/>
					}
					title="All products"
				/>
				<Divider />
				<CardContent className={classes.content}>
					<PerfectScrollbar>
						<TableContainer className={classes.inner}>
							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell padding="checkbox">
											<Checkbox
												checked={
													selectedProducts.length ===
													products.length
												}
												color="primary"
												indeterminate={
													selectedProducts.length >
														0 &&
													selectedProducts.length <
														products.length
												}
												onChange={handleSelectAll}
											/>
										</TableCell>
										<TableCell>Title</TableCell>
										<TableCell>Itemnumber</TableCell>
										<TableCell>Weight</TableCell>
										<TableCell>Price</TableCell>
										<TableCell>Stock</TableCell>
										<TableCell>Active</TableCell>
										<TableCell align="right">
											Actions
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{products
										.slice(0, rowsPerPage)
										.map((product) => (
											<TableRow
												hover
												key={product.id}
												selected={
													selectedProducts.indexOf(
														product.id
													) !== -1
												}
											>
												<TableCell padding="checkbox">
													<Checkbox
														checked={
															selectedProducts.indexOf(
																product.id
															) !== -1
														}
														color="primary"
														onChange={(event) =>
															handleSelectOne(
																event,
																product.id
															)
														}
														value={
															selectedProducts.indexOf(
																product.id
															) !== -1
														}
													/>
												</TableCell>
												<TableCell>
													<div
														className={
															classes.nameCell
														}
													>
														<div>
															<Link
																color="inherit"
																component={
																	RouterLink
																}
																to={
																	"/planner/products/" +
																	product.id
																}
																variant="h6"
															>
																{product.title}
															</Link>
														</div>
													</div>
												</TableCell>
												<TableCell>
													{product.itemNumber}
												</TableCell>
												<TableCell>
													{product.weight}
												</TableCell>
												<TableCell>
													{product.price}
												</TableCell>
												<TableCell>
													{product.stock}
												</TableCell>
												<TableCell>
													{product.active === true
														? "Yes"
														: "No"}
												</TableCell>
												<TableCell align="right">
													<Button
														color="primary"
														component={RouterLink}
														size="small"
														to={
															"/planner/products/" +
															product.id
														}
														variant="outlined"
													>
														View
													</Button>
												</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</TableContainer>
					</PerfectScrollbar>
				</CardContent>
				<CardActions className={classes.actions}>
					<TablePagination
						component="div"
						count={totalProducts}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
						page={page}
						rowsPerPage={rowsPerPage}
						rowsPerPageOptions={[5, 10, 25]}
					/>
				</CardActions>
			</Card>
			<TableEditBar selected={selectedProducts} />
		</div>
	);
}

Results.propTypes = {
	className: PropTypes.string,
	products: PropTypes.array,
	page: PropTypes.number,
	per: PropTypes.number,
	setRowsPerPage: PropTypes.func,
	setPage: PropTypes.func,
	totalPages: PropTypes.number,
	totalProducts: PropTypes.number,
	onSearch: PropTypes.func,
};

Results.defaultProps = {
	products: [],
};

export default Results;
