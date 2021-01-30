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
								label="Title"
								name="title"
								error={hasError("title")}
								helperText={
									hasError("title")
										? formState.errors.title[0]
										: null
								}
								value={formState.values.title || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
						<Grid item xs>
							<TextField
								fullWidth
								label="Itemnumber"
								name="itemNumber"
								error={hasError("itemNumber")}
								helperText={
									hasError("itemNumber")
										? formState.errors.itemNumber[0]
										: null
								}
								value={formState.values.itemNumber || ""}
								onChange={handleChange}
								variant="outlined"
							/>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs>
							<TextField
								fullWidth
								label="Price"
								name="price"
								error={hasError("price")}
								helperText={
									hasError("price")
										? formState.errors.price[0]
										: null
								}
								value={formState.values.price || ""}
								onChange={handleChange}
								variant="outlined"
								type="number"
							/>
						</Grid>
						<Grid item xs>
							<TextField
								fullWidth
								label="Buying Price"
								name="buyingPrice"
								error={hasError("buyingPrice")}
								helperText={
									hasError("buyingPrice")
										? formState.errors.buyingPrice[0]
										: null
								}
								value={formState.values.buyingPrice || ""}
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
								label="Weight"
								name="weight"
								error={hasError("weight")}
								helperText={
									hasError("weight")
										? formState.errors.weight[0]
										: null
								}
								value={formState.values.weight || ""}
								onChange={handleChange}
								variant="outlined"
								type="number"
							/>
						</Grid>
						<Grid item xs>
							<TextField
								fullWidth
								label="Stock"
								name="stock"
								error={hasError("stock")}
								helperText={
									hasError("stock")
										? formState.errors.stock[0]
										: null
								}
								value={formState.values.stock || ""}
								onChange={handleChange}
								variant="outlined"
								type="number"
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
							label="Activate Product"
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
