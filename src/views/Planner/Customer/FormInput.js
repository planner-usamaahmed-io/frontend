import React from "react";
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
	InputLabel,
	Select,
	MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {},
	formGroup: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	cardContent: {
		paddingTop: theme.spacing(1),
	},
}));

function About({ hasError, formState, handleChange, className, ...rest }) {
	const classes = useStyles();

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardHeader title="About" />
			<CardContent className={classes.cardContent}>
				<form>
					<Grid container spacing={3}>
						<Grid item xs>
							<TextField
								autoFocus
								fullWidth
								label="Customer Name"
								name="customerName"
								error={hasError("customerName")}
								helperText={
									hasError("customerName")
										? formState.errors.customerName[0]
										: null
								}
								value={formState.values.customerName || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
						<Grid item xs>
							<TextField
								fullWidth
								label="Customer ID"
								name="customerId"
								error={hasError("customerId")}
								helperText={
									hasError("customerId")
										? formState.errors.customerId[0]
										: null
								}
								value={formState.values.customerId || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
					</Grid>
					<Grid>
						<div className={classes.formGroup}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel id="customerTypeId">
									Customer Type
								</InputLabel>
								<Select
									labelId="customerTypeId"
									value={
										formState.values.customerTypeId || ""
									}
									onChange={handleChange}
									name="customerTypeId"
									label="Customer Type"
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									<MenuItem value="Business">
										<em>Business</em>
									</MenuItem>
									<MenuItem value="Private">
										<em>Private</em>
									</MenuItem>
								</Select>
							</FormControl>
						</div>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							<TextField
								fullWidth
								label="EAN"
								name="customerEAN"
								error={hasError("customerEAN")}
								helperText={
									hasError("customerEAN")
										? formState.errors.customerEAN[0]
										: null
								}
								value={formState.values.customerEAN || ""}
								onChange={handleChange}
								variant="outlined"
								type="number"
							/>
						</Grid>
						<Grid item xs>
							<TextField
								fullWidth
								label="CVR"
								name="customerCVR"
								error={hasError("customerCVR")}
								helperText={
									hasError("customerCVR")
										? formState.errors.customerCVR[0]
										: null
								}
								value={formState.values.customerCVR || ""}
								onChange={handleChange}
								variant="outlined"
								type="number"
							/>
						</Grid>
					</Grid>

					<Grid>
						<div className={classes.formGroup}>
							<TextField
								fullWidth
								label="Contact Name"
								name="contactName"
								error={hasError("contactName")}
								helperText={
									hasError("contactName")
										? formState.errors.contactName[0]
										: null
								}
								value={formState.values.contactName || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</div>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							<TextField
								fullWidth
								label="Phone"
								name="contactPhone"
								error={hasError("contactPhone")}
								helperText={
									hasError("contactPhone")
										? formState.errors.contactPhone[0]
										: null
								}
								value={formState.values.contactPhone || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
						<Grid item xs>
							<TextField
								fullWidth
								label="Email"
								name="contactEmail"
								error={hasError("contactEmail")}
								helperText={
									hasError("contactEmail")
										? formState.errors.contactEmail[0]
										: null
								}
								value={formState.values.contactEmail || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
					</Grid>
					<Grid container>
						<FormControlLabel
							control={
								<Checkbox
									name="active"
									onChange={handleChange}
									checked={formState.values.active || false}
								/>
							}
							label="Activate Customer"
						/>
					</Grid>
				</form>
			</CardContent>
		</Card>
	);
}

About.propTypes = {
	className: PropTypes.string,
	hasError: PropTypes.func,
	formState: PropTypes.object,
	handleChange: PropTypes.func,
};

export default About;
