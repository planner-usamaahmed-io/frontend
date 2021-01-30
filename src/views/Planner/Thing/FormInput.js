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
import moment from "moment";

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
								label="Thing Name"
								name="thingName"
								error={hasError("thingName")}
								helperText={
									hasError("thingName")
										? formState.errors.thingName[0]
										: null
								}
								value={formState.values.thingName || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
						<Grid item xs>
							<TextField
								fullWidth
								label="Thing ID"
								name="thingId"
								error={hasError("thingId")}
								helperText={
									hasError("thingId")
										? formState.errors.thingId[0]
										: null
								}
								value={formState.values.thingId || ""}
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
									<MenuItem value="BUSINESS">
										<em>Business</em>
									</MenuItem>
									<MenuItem value="PRIVATE">
										<em>Private</em>
									</MenuItem>
								</Select>
							</FormControl>
						</div>
					</Grid>
					<Grid container spacing={6}>
						<Grid item xs>
							<TextField
								fullWidth
								label="Thing installation Date"
								name="thingInstallationDate"
								error={hasError("thingInstallationDate")}
								helperText={
									hasError("thingInstallationDate")
										? formState.errors
												.thingInstallationDate[0]
										: null
								}
								value={
									formState.values.thingInstallationDate ||
									moment().format("YYYY-MM-DD HH:mm:ss")
								}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
						<Grid item xs>
							<TextField
								fullWidth
								label="Thing Serial"
								name="thingSerialNumber"
								error={hasError("thingSerialNumber")}
								helperText={
									hasError("thingSerialNumber")
										? formState.errors.thingSerialNumber[0]
										: null
								}
								value={formState.values.thingSerialNumber || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
					</Grid>
					<Grid>
						<div className={classes.formGroup}>
							<TextField
								fullWidth
								label="Description"
								name="thingDescription"
								error={hasError("thingDescription")}
								helperText={
									hasError("thingDescription")
										? formState.errors.thingDescription[0]
										: null
								}
								value={formState.values.thingDescription || ""}
								onChange={handleChange}
								variant="outlined"
								multiline
								rows={4}
								rowsMax={4}
							/>
						</div>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							<TextField
								fullWidth
								label="EAN"
								name="locationEAN"
								error={hasError("locationEAN")}
								helperText={
									hasError("locationEAN")
										? formState.errors.locationEAN[0]
										: null
								}
								value={formState.values.locationEAN || ""}
								onChange={handleChange}
								variant="outlined"
								type="number"
							/>
						</Grid>
						<Grid item xs>
							<TextField
								fullWidth
								label="CVR"
								name="locationCVR"
								error={hasError("locationCVR")}
								helperText={
									hasError("locationCVR")
										? formState.errors.locationCVR[0]
										: null
								}
								value={formState.values.locationCVR || ""}
								onChange={handleChange}
								variant="outlined"
								type="number"
							/>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							<TextField
								fullWidth
								label="Phone"
								name="locationPhone"
								error={hasError("locationPhone")}
								helperText={
									hasError("locationPhone")
										? formState.errors.locationPhone[0]
										: null
								}
								value={formState.values.locationPhone || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
						<Grid item xs>
							<TextField
								fullWidth
								label="Email"
								name="locationEmail"
								error={hasError("locationEmail")}
								helperText={
									hasError("locationEmail")
										? formState.errors.locationEmail[0]
										: null
								}
								value={formState.values.locationEmail || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
					</Grid>
					<Grid>
						<div className={classes.formGroup}>
							<TextField
								fullWidth
								label="Address"
								name="locationAddress"
								error={hasError("locationAddress")}
								helperText={
									hasError("locationAddress")
										? formState.errors.locationAddress[0]
										: null
								}
								value={formState.values.locationAddress || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</div>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							<TextField
								fullWidth
								label="Country"
								name="locationCountry"
								error={hasError("locationCountry")}
								helperText={
									hasError("locationCountry")
										? formState.errors.locationCountry[0]
										: null
								}
								value={formState.values.locationCountry || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
						<Grid item xs>
							<TextField
								fullWidth
								label="City"
								name="locationCity"
								error={hasError("locationCity")}
								helperText={
									hasError("locationCity")
										? formState.errors.locationCity[0]
										: null
								}
								value={formState.values.locationCity || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
						<Grid item xs>
							<TextField
								fullWidth
								label="Postcode"
								name="locationPostcode"
								error={hasError("locationPostcode")}
								helperText={
									hasError("locationPostcode")
										? formState.errors.locationPostcode[0]
										: null
								}
								value={formState.values.locationPostcode || ""}
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
							label="Activate Thing"
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
