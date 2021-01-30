import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
	Card,
	CardHeader,
	CardContent,
	TextField,
	Grid,
	Checkbox,
	FormControlLabel,
	FormControl,
	MenuItem,
	Select,
	InputLabel,
} from "@material-ui/core";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from "../../../axios";

const useStyles = makeStyles((theme) => ({
	root: {},
	formGroup: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	cardContent: {
		paddingTop: theme.spacing(1),
	},
	textField: {
		width: "100%",
	},
}));

function Form({ hasError, formState, handleChange, className, ...rest }) {
	const classes = useStyles();
	const companyId = useSelector((state) => state.auth.companyId);
	const [projectTypes, setProjectTypes] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [things, setThings] = useState([]);

	useEffect(() => {
		axios
			.get(`/api/company/${companyId}/projecttypes`)
			.then((res) => {
				console.log(res);
				setProjectTypes(res.data.projecttypes);
			})
			.catch((error) => console.log(error));
		axios
			.get(`/api/company/${companyId}/customers`)
			.then((res) => {
				console.log(res);
				setCustomers(res.data.customers);
			})
			.catch((error) => console.log(error));
		axios
			.get(`/api/company/${companyId}/things`)
			.then((res) => {
				console.log(res);
				setThings(res.data.things);
			})
			.catch((error) => console.log(error));
	}, [companyId]);

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardHeader title="Project Type Form" />
			<CardContent className={classes.cardContent}>
				<form>
					<Grid container spacing={3}>
						<Grid item xs>
							<FormControl variant="outlined" fullWidth>
								<InputLabel id="projectTypeId">
									Project Type
								</InputLabel>
								<Select
									autoFocus
									labelId="projectTypeId"
									value={formState.values.projectTypeId || ""}
									onChange={handleChange}
									name="projectTypeId"
									label="Customer Type"
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{projectTypes.map((projectType) => {
										return (
											<MenuItem value={projectType.id}>
												<em>{projectType.type}</em>
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs>
							<TextField
								autoFocus
								fullWidth
								label="Project Id (internal project id)"
								name="projectId"
								error={hasError("projectId")}
								helperText={
									hasError("projectId")
										? formState.errors.projectId[0]
										: null
								}
								value={formState.values.projectId || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							<TextField
								fullWidth
								label="Responsible"
								name="responsible"
								error={hasError("responsible")}
								helperText={
									hasError("responsible")
										? formState.errors.responsible[0]
										: null
								}
								value={formState.values.responsible || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							<TextField
								fullWidth
								label="Description"
								name="description"
								error={hasError("description")}
								helperText={
									hasError("description")
										? formState.errors.description[0]
										: null
								}
								value={formState.values.description || ""}
								onChange={handleChange}
								variant="outlined"
								multiline
								rows={4}
								rowsMax={6}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							<FormControl variant="outlined" fullWidth>
								<InputLabel id="thingId">Thing</InputLabel>
								<Select
									labelId="thingId"
									value={formState.values.thingId || ""}
									onChange={handleChange}
									name="thingId"
									label="Customer Type"
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{things.map((thing) => {
										return (
											<MenuItem value={thing.id}>
												<em>
													{thing.thingName} -{" "}
													{thing.thingId}
												</em>
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs>
							<FormControl variant="outlined" fullWidth>
								<InputLabel id="customerId">
									Customer (billing)
								</InputLabel>
								<Select
									labelId="customerId"
									value={formState.values.customerId || ""}
									onChange={handleChange}
									name="customerId"
									label="Customer Type"
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{customers.map((customer) => {
										return (
											<MenuItem value={customer.id}>
												<em>
													{customer.customerName} -{" "}
													{customer.customerId}
												</em>
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</Grid>
					</Grid>
					<Grid>
						<div className={classes.formGroup}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel id="status">Status</InputLabel>
								<Select
									labelId="status"
									value={formState.values.status || ""}
									onChange={handleChange}
									name="status"
									label="Customer Type"
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									<MenuItem value="ACCEPTED">
										<em>Accepted</em>
									</MenuItem>
									<MenuItem value="ACTIVE">
										<em>Active</em>
									</MenuItem>
									<MenuItem value="APPROVED">
										<em>Approved</em>
									</MenuItem>
									<MenuItem value="FINISHED">
										<em>Finished</em>
									</MenuItem>
									<MenuItem value="INACTIVE">
										<em>Inactive</em>
									</MenuItem>
									<MenuItem value="INPROGRESS">
										<em>Inprogress</em>
									</MenuItem>
									<MenuItem value="POSTPONED">
										<em>Postponed</em>
									</MenuItem>
								</Select>
							</FormControl>
						</div>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							<TextField
								id="datetime-local"
								label="Start time"
								type="datetime-local"
								name="startTime"
								onChange={handleChange}
								value={formState.values.startTime}
								className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Grid>
						<Grid item xs>
							<TextField
								id="datetime-local"
								label="End time"
								type="datetime-local"
								name="endTime"
								onChange={handleChange}
								value={formState.values.endTime}
								className={classes.textField}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</Grid>
					</Grid>
					<Grid container>
						<Grid>
							<FormControlLabel
								control={
									<Checkbox
										name="urgent"
										onChange={handleChange}
										checked={
											formState.values.urgent || false
										}
									/>
								}
								label="Urgent?"
							/>
						</Grid>
					</Grid>
				</form>
			</CardContent>
		</Card>
	);
}

Form.propTypes = {
	className: PropTypes.string,
	hasError: PropTypes.func,
	formState: PropTypes.object,
	handleChange: PropTypes.func,
};

export default Form;
