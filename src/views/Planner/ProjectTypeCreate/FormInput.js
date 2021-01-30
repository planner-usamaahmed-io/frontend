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

function Form({ hasError, formState, handleChange, className, ...rest }) {
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
								label="Type name"
								name="type"
								error={hasError("type")}
								helperText={
									hasError("type")
										? formState.errors.type[0]
										: null
								}
								value={formState.values.type || ""}
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
					<Grid container>
						<FormControlLabel
							control={
								<Checkbox
									name="active"
									onChange={handleChange}
									checked={formState.values.active || false}
								/>
							}
							label="Activate Project Type"
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
};

export default Form;
