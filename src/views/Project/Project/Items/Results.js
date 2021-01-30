import React, { useState } from "react";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import AddProductModal from "./AddProductModal";
import { makeStyles } from "@material-ui/styles";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Checkbox,
	Divider,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	colors,
} from "@material-ui/core";
import GenericMoreButton from "../../../../components/GenericMoreButton";
import TableEditBar from "../../../../components/TableEditBar";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "../../../../axios";
import Snackbar from "../../../../components/Snackbar";

const useStyles = makeStyles((theme) => ({
	root: {},
	filterButton: {
		marginRight: theme.spacing(2),
	},
	content: {
		padding: 0,
	},
	inner: {
		minWidth: 1150,
	},
	actions: {
		padding: theme.spacing(0, 1),
		justifyContent: "flex-end",
	},
	deleteButton: {
		color: theme.palette.common.white,
		backgroundColor: colors.red[600],
		marginRight: "10px",
		"&:hover": {
			backgroundColor: colors.red[900],
		},
	},
	deleteIcon: {
		marginRight: theme.spacing(0),
	},
}));

function Results({
	onAddProductModalClose,
	openAddProductModal,
	className,
	items,
	companyId,
	projectId,
	...rest
}) {
	const classes = useStyles();
	const [selectedItems, setSelectedItems] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [projectItems, setProjectItems] = useState(items);

	const handleSelectAll = (event) => {
		const newSelectedItems = event.target.checked
			? projectItems.map((item) => item.id)
			: [];

		setSelectedItems(newSelectedItems);
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

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
	};

	const removeProduct = async (e, projectId, productId) => {
		try {
			const removeProduct = await axios.delete(
				`http://localhost:3001/api/projectproduct/${projectId}/${productId}`
			);

			if (!removeProduct) {
				setSnackbarMessage(
					"Could not remove product. Please try again"
				);
			} else {
				// We want to remove the product we just deleted from the array
				setProjectItems(
					projectItems.filter((item) => {
						// If the id === productId the return empty
						if (item.id === productId) {
							return false;
						}
						return item;
					})
				);
				setSnackbarMessage(
					"Product has been removed from the project."
				);
			}
			setSnackbarOpen(true);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setSnackbarOpen(false);
	};

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<Typography color="textSecondary" gutterBottom variant="body2">
				{projectItems.length} Records found. Page {page + 1} of{" "}
				{Math.ceil(projectItems.length / rowsPerPage)}
			</Typography>
			<Card>
				<CardHeader action={<GenericMoreButton />} title="Items" />
				<Divider />
				<CardContent className={classes.content}>
					<PerfectScrollbar>
						<div className={classes.inner}>
							<Table size="small">
								<TableHead>
									<TableRow>
										<TableCell padding="checkbox">
											<Checkbox
												checked={
													selectedItems.length ===
													projectItems.length
												}
												color="primary"
												indeterminate={
													selectedItems.length > 0 &&
													selectedItems.length <
														projectItems.length
												}
												onChange={handleSelectAll}
											/>
										</TableCell>
										<TableCell>Title</TableCell>
										<TableCell>Amount</TableCell>
										<TableCell>Price</TableCell>
										<TableCell>ItemNumber</TableCell>
										<TableCell align="right">
											Actions
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{console.log(projectItems)}
									{projectItems.map((item) => (
										<TableRow
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
												{item.title}
												<Typography variant="body2">
													{moment(
														item.createdAt
													).format(
														"DD MMM YYYY | hh:mm"
													)}
												</Typography>
											</TableCell>

											<TableCell>
												{item.projectproduct.amount}
											</TableCell>
											<TableCell>
												{item.projectproduct.price}
											</TableCell>
											<TableCell>
												{item.itemNumber}
											</TableCell>
											<TableCell align="right">
												<Button
													size="small"
													className={
														classes.deleteButton
													}
													color="primary"
													onClick={(e) =>
														removeProduct(
															e,
															projectId,
															item.id
														)
													}
												>
													<DeleteIcon
														className={
															classes.deleteIcon
														}
													/>
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</PerfectScrollbar>
				</CardContent>
				<Snackbar
					open={snackbarOpen}
					message={snackbarMessage}
					onClose={handleSnackbarClose}
				/>
				<AddProductModal
					projectId={projectId}
					companyId={companyId}
					open={openAddProductModal}
					onClose={onAddProductModalClose}
				/>
				<CardActions className={classes.actions}>
					<TablePagination
						component="div"
						count={projectItems.length}
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
	onAddProductModalClose: PropTypes.func,
	openAddProductModal: PropTypes.bool,
	companyId: PropTypes.number,
	projectId: PropTypes.number,
};

Results.defaultProps = {
	items: [],
};

export default Results;
