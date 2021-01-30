import React, { useState } from "react";
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
	colors,
} from "@material-ui/core";
import GenericMoreButton from "../../../components/GenericMoreButton";
import TableEditBar from "../../../components/TableEditBar";
import { RateReview } from "@material-ui/icons";

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
	deleteButton: {
		color: theme.palette.common.white,
		backgroundColor: colors.red[600],
		marginRight: "10px",
		"&:hover": {
			backgroundColor: colors.red[900],
		},
	},
}));

function Results({
	page,
	setPage,
	totalPages,
	totalThings,
	rowsPerPage,
	setRowsPerPage,
	className,
	things,
	onSearch,
	...rest
}) {
	const classes = useStyles();
	const [selectedThings, setSelectedThings] = useState([]);

	const handleSelectAll = (event) => {
		const selectedThings = event.target.checked
			? things.map((thing) => thing.id)
			: [];

		setSelectedThings(selectedThings);
	};

	const handleSelectOne = (event, id) => {
		const selectedIndex = selectedThings.indexOf(id);
		let newSelectedThings = [];

		if (selectedIndex === -1) {
			newSelectedThings = newSelectedThings.concat(selectedThings, id);
		} else if (selectedIndex === 0) {
			newSelectedThings = newSelectedThings.concat(
				selectedThings.slice(1)
			);
		} else if (selectedIndex === selectedThings.length - 1) {
			newSelectedThings = newSelectedThings.concat(
				selectedThings.slice(0, -1)
			);
		} else if (selectedIndex > 0) {
			newSelectedThings = newSelectedThings.concat(
				selectedThings.slice(0, selectedIndex),
				selectedThings.slice(selectedIndex + 1)
			);
		}

		setSelectedThings(newSelectedThings);
	};

	const handleChangePage = (event, page) => {
		console.log("change page: " + page);
		setPage(page);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(event.target.value);
	};

	const onExportAsCSV = () => {
		console.log(things);
	};

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<Typography color="textSecondary" gutterBottom variant="body2">
				{things.length} Records found. Page {page + 1} of {totalPages}
			</Typography>
			<Card>
				<CardHeader
					action={
						<GenericMoreButton
							onExportAsCSV={onExportAsCSV}
							exportCSVData={things}
						/>
					}
					title="All things"
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
													selectedThings.length ===
													things.length
												}
												color="primary"
												indeterminate={
													selectedThings.length > 0 &&
													selectedThings.length <
														things.length
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
									{things
										.slice(0, rowsPerPage)
										.map((thing) => (
											<TableRow
												hover
												key={thing.id}
												selected={
													selectedThings.indexOf(
														thing.id
													) !== -1
												}
											>
												<TableCell padding="checkbox">
													<Checkbox
														checked={
															selectedThings.indexOf(
																thing.id
															) !== -1
														}
														color="primary"
														onChange={(event) =>
															handleSelectOne(
																event,
																thing.id
															)
														}
														value={
															selectedThings.indexOf(
																thing.id
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
																	"/planner/things/" +
																	thing.id
																}
																variant="h6"
															>
																{
																	thing.thingName
																}
															</Link>
														</div>
													</div>
												</TableCell>
												<TableCell>
													{thing.thingId}
												</TableCell>
												<TableCell>
													{thing.locationPhone}
												</TableCell>
												<TableCell>
													{thing.id}
												</TableCell>
												<TableCell>
													{thing.active === true
														? "Yes"
														: "No"}
												</TableCell>
												<TableCell align="right">
													<Button
														component={RouterLink}
														size="small"
														to={
															"/planner/things/" +
															thing.id
														}
													>
														<RateReview color="primary" />
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
						count={totalThings}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
						page={page}
						rowsPerPage={rowsPerPage}
						rowsPerPageOptions={[5, 10, 25]}
					/>
				</CardActions>
			</Card>
			<TableEditBar selected={selectedThings} />
		</div>
	);
}

Results.propTypes = {
	className: PropTypes.string,
	things: PropTypes.array,
	page: PropTypes.number,
	per: PropTypes.number,
	setRowsPerPage: PropTypes.func,
	setPage: PropTypes.func,
	totalPages: PropTypes.number,
	totalThings: PropTypes.number,
	onSearch: PropTypes.func,
};

Results.defaultProps = {
	things: [],
};

export default Results;
