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
} from "@material-ui/core";
import RoleTransfer from "./RoleTransferList";

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

function Form({
	addRoles,
	hasError,
	formState,
	handleChange,
	className,
	...rest
}) {
	const classes = useStyles();

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardHeader title="Project Type Form" />
			<CardContent className={classes.cardContent}>
				<form>
					<Grid container spacing={3}>
						<Grid item xs>
							<TextField
								autoFocus
								fullWidth
								label="First name"
								name="firstName"
								error={hasError("firstName")}
								helperText={
									hasError("firstName")
										? formState.errors.firstName[0]
										: null
								}
								value={formState.values.firstName || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
						<Grid item xs>
							<TextField
								fullWidth
								label="Last name"
								name="lastName"
								error={hasError("lastName")}
								helperText={
									hasError("lastName")
										? formState.errors.lastName[0]
										: null
								}
								value={formState.values.lastName || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							<TextField
								fullWidth
								label="User employee Code"
								name="employeeCode"
								error={hasError("employeeCode")}
								helperText={
									hasError("employeeCode")
										? formState.errors.employeeCode[0]
										: null
								}
								value={formState.values.employeeCode || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
						<Grid item xs>
							<TextField
								fullWidth
								label="Phone Number"
								name="phoneNumber"
								error={hasError("phoneNumber")}
								helperText={
									hasError("phoneNumber")
										? formState.errors.phoneNumber[0]
										: null
								}
								value={formState.values.phoneNumber || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
					</Grid>
					<Grid>
						<div className={classes.formGroup}>
							<TextField
								fullWidth
								label="Email"
								name="email"
								error={hasError("email")}
								helperText={
									hasError("email")
										? formState.errors.email[0]
										: null
								}
								value={formState.values.email || ""}
								onChange={handleChange}
								variant="outlined"
								type="email"
							/>
						</div>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							<TextField
								fullWidth
								label="Bio"
								name="bio"
								error={hasError("bio")}
								helperText={
									hasError("bio")
										? formState.errors.bio[0]
										: null
								}
								value={formState.values.bio || ""}
								onChange={handleChange}
								variant="outlined"
								multiline
								rows={2}
								rowsMax={4}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							<TextField
								fullWidth
								label="Password"
								name="password"
								error={hasError("password")}
								helperText={
									hasError("password")
										? formState.errors.password[0]
										: null
								}
								value={formState.values.password || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
						<Grid item xs>
							<TextField
								fullWidth
								label="Confirm password"
								name="confirmpassword"
								error={hasError("confirmpassword")}
								helperText={
									hasError("confirmpassword")
										? formState.errors.confirmpassword[0]
										: null
								}
								value={formState.values.confirmpassword || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							<TextField
								fullWidth
								label="Avatar"
								name="avatar"
								error={hasError("avatar")}
								helperText={
									hasError("avatar")
										? formState.errors.avatar[0]
										: null
								}
								value={formState.values.avatar || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
						<Grid item xs>
							<TextField
								fullWidth
								label="Area"
								name="areaId"
								error={hasError("areaId")}
								helperText={
									hasError("areaId")
										? formState.errors.areaId[0]
										: null
								}
								value={formState.values.areaId || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
					</Grid>
					<RoleTransfer addRoles={addRoles} />
					<Grid container>
						<FormControlLabel
							control={
								<Checkbox
									name="active"
									onChange={handleChange}
									checked={formState.values.active || false}
								/>
							}
							label="Activate Product"
						/>
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
	addRoles: PropTypes.func,
};

export default Form;
