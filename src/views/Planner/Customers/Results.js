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
	totalCustomers,
	rowsPerPage,
	setRowsPerPage,
	className,
	customers,
	onSearch,
	...rest
}) {
	const classes = useStyles();
	const [selectedCustomers, setSelectedCustomers] = useState([]);

	const handleSelectAll = (event) => {
		const selectedCustomers = event.target.checked
			? customers.map((customer) => customer.id)
			: [];

		setSelectedCustomers(selectedCustomers);
	};

	const handleSelectOne = (event, id) => {
		const selectedIndex = selectedCustomers.indexOf(id);
		let newSelectedCustomers = [];

		if (selectedIndex === -1) {
			newSelectedCustomers = newSelectedCustomers.concat(
				selectedCustomers,
				id
			);
		} else if (selectedIndex === 0) {
			newSelectedCustomers = newSelectedCustomers.concat(
				selectedCustomers.slice(1)
			);
		} else if (selectedIndex === selectedCustomers.length - 1) {
			newSelectedCustomers = newSelectedCustomers.concat(
				selectedCustomers.slice(0, -1)
			);
		} else if (selectedIndex > 0) {
			newSelectedCustomers = newSelectedCustomers.concat(
				selectedCustomers.slice(0, selectedIndex),
				selectedCustomers.slice(selectedIndex + 1)
			);
		}

		setSelectedCustomers(newSelectedCustomers);
	};

	const handleChangePage = (event, page) => {
		console.log("change page: " + page);
		setPage(page);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
	};

	const onExportAsCSV = () => {
		console.log(customers);
	};

	useEffect(() => {
		console.log(selectedCustomers);
	}, [selectedCustomers]);

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<Typography color="textSecondary" gutterBottom variant="body2">
				{customers.length} Records found. Page {page + 1} of{" "}
				{totalPages}
			</Typography>
			<Card>
				<CardHeader
					action={
						<GenericMoreButton
							onExportAsCSV={onExportAsCSV}
							exportCSVData={customers}
						/>
					}
					title="All customers"
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
													selectedCustomers.length ===
													customers.length
												}
												color="primary"
												indeterminate={
													selectedCustomers.length >
														0 &&
													selectedCustomers.length <
														customers.length
												}
												onChange={handleSelectAll}
											/>
										</TableCell>
										<TableCell>Name</TableCell>
										<TableCell>Customer Type</TableCell>
										<TableCell>Phone</TableCell>
										<TableCell>Customer ID</TableCell>
										<TableCell>Active</TableCell>
										<TableCell align="right">
											Actions
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{customers
										.slice(0, rowsPerPage)
										.map((customer) => (
											<TableRow
												hover
												key={customer.id}
												selected={
													selectedCustomers.indexOf(
														customer.id
													) !== -1
												}
											>
												<TableCell padding="checkbox">
													<Checkbox
														checked={
															selectedCustomers.indexOf(
																customer.id
															) !== -1
														}
														color="primary"
														onChange={(event) =>
															handleSelectOne(
																event,
																customer.id
															)
														}
														value={
															selectedCustomers.indexOf(
																customer.id
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
																	"/planner/customers/" +
																	customer.id
																}
																variant="h6"
															>
																{
																	customer.customerName
																}
															</Link>
														</div>
													</div>
												</TableCell>
												<TableCell>
													{customer.customerTypeId}
												</TableCell>
												<TableCell>
													{customer.contactPhone}
												</TableCell>
												<TableCell>
													{customer.customerId}
												</TableCell>
												<TableCell>
													{customer.active === true
														? "Yes"
														: "No"}
												</TableCell>
												<TableCell align="right">
													<Button
														color="primary"
														component={RouterLink}
														size="small"
														to={
															"/planner/customers/" +
															customer.id
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
						count={totalCustomers}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
						page={page}
						rowsPerPage={rowsPerPage}
						rowsPerPageOptions={[5, 10, 25]}
					/>
				</CardActions>
			</Card>
			<TableEditBar selected={selectedCustomers} />
		</div>
	);
}

Results.propTypes = {
	className: PropTypes.string,
	customers: PropTypes.array,
	page: PropTypes.number,
	per: PropTypes.number,
	setRowsPerPage: PropTypes.func,
	setPage: PropTypes.func,
	totalPages: PropTypes.number,
	totalCustomers: PropTypes.number,
	onSearch: PropTypes.func,
};

Results.defaultProps = {
	customers: [],
};

export default Results;
