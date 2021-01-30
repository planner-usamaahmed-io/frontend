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
	totalItems,
	rowsPerPage,
	setRowsPerPage,
	className,
	items,
	onSearch,
	...rest
}) {
	const classes = useStyles();
	const [selectedItems, setSelectedItems] = useState([]);

	const handleSelectAll = (event) => {
		const selectedItems = event.target.checked
			? items.map((product) => product.type)
			: [];

		setSelectedItems(selectedItems);
	};

	const handleSelectOne = (event, id) => {
		const selectedIndex = selectedItems.indexOf(id);
		let newSelectedItems = [];

		if (selectedIndex === -1) {
			newSelectedItems = newSelectedItems.concat(selectedItems, id);
		} else if (selectedIndex === 0) {
			newSelectedItems = newSelectedItems.concat(selectedItems.slice(1));
		} else if (selectedIndex === selectedItems.length - 1) {
			newSelectedItems = newSelectedItems.concat(
				selectedItems.slice(0, -1)
			);
		} else if (selectedIndex > 0) {
			newSelectedItems = newSelectedItems.concat(
				selectedItems.slice(0, selectedIndex),
				selectedItems.slice(selectedIndex + 1)
			);
		}

		setSelectedItems(newSelectedItems);
	};

	const handleChangePage = (event, page) => {
		console.log("change page: " + page);
		setPage(page);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
	};

	const onExportAsCSV = () => {
		console.log(items);
	};

	useEffect(() => {
		console.log(selectedItems);
	}, [selectedItems]);

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<Typography color="textSecondary" gutterBottom variant="body2">
				{items.length} Records found. Page {page + 1} of {totalPages}
			</Typography>
			<Card>
				<CardHeader
					action={
						<GenericMoreButton
							onExportAsCSV={onExportAsCSV}
							exportCSVData={items}
						/>
					}
					title="All items"
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
													selectedItems.length ===
													items.length
												}
												color="primary"
												indeterminate={
													selectedItems.length > 0 &&
													selectedItems.length <
														items.length
												}
												onChange={handleSelectAll}
											/>
										</TableCell>
										<TableCell>Id</TableCell>
										<TableCell>Name</TableCell>
										<TableCell>Employee Code</TableCell>
										<TableCell>Email</TableCell>
										<TableCell align="right">
											Actions
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{items.slice(0, rowsPerPage).map((item) => (
										<TableRow
											hover
											key={item.id}
											selected={
												selectedItems.indexOf(
													item.id
												) !== -1
											}
										>
											<TableCell padding="checkbox">
												<Checkbox
													checked={
														selectedItems.indexOf(
															item.id
														) !== -1
													}
													color="primary"
													onChange={(event) =>
														handleSelectOne(
															event,
															item.id
														)
													}
													value={
														selectedItems.indexOf(
															item.id
														) !== -1
													}
												/>
											</TableCell>
											<TableCell>
												<div
													className={classes.nameCell}
												>
													<div>
														<Link
															color="inherit"
															component={
																RouterLink
															}
															to={
																"/settings/users/" +
																item.id +
																"/" +
																item.user.id
															}
															variant="h6"
														>
															{item.id}
														</Link>
													</div>
												</div>
											</TableCell>
											<TableCell>
												{item.user.firstName +
													" " +
													item.user.lastName}
											</TableCell>
											<TableCell>
												{item.employeeCode}
											</TableCell>
											<TableCell>
												{item.user.email}
											</TableCell>
											<TableCell align="right">
												<Button
													color="primary"
													component={RouterLink}
													size="small"
													to={
														"/settings/users/" +
														item.id +
														"/" +
														item.user.id
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
						count={totalItems}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
						page={page}
						rowsPerPage={rowsPerPage}
						rowsPerPageOptions={[5, 10, 25]}
					/>
				</CardActions>
			</Card>
			<TableEditBar selected={selectedItems} />
		</div>
	);
}

Results.propTypes = {
	className: PropTypes.string,
	items: PropTypes.array,
	page: PropTypes.number,
	per: PropTypes.number,
	setRowsPerPage: PropTypes.func,
	setPage: PropTypes.func,
	totalPages: PropTypes.number,
	totalItems: PropTypes.number,
	onSearch: PropTypes.func,
};

Results.defaultProps = {
	items: [],
};

export default Results;
