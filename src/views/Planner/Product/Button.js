import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
	Card,
	CardContent,
	Grid,
	Button,
	CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {},
	alert: {
		marginBottom: theme.spacing(1),
	},
	formGroup: {
		marginBottom: theme.spacing(1),
		marginTop: theme.spacing(3),
	},
	cardContent: {
		paddingTop: theme.spacing(1),
	},
}));

function About({
	isUpdate,
	formDisabled,
	loading,
	onClick,
	className,
	...rest
}) {
	const classes = useStyles();

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardContent className={classes.cardContent}>
				<form>
					<Grid container spacing={10}>
						<Grid item xs>
							<div className={classes.formGroup} align="center">
								{loading ? (
									<CircularProgress />
								) : (
									<Button
										disabled={formDisabled}
										onClick={onClick}
										variant="contained"
										color="primary"
									>
										{isUpdate
											? "Update Product"
											: "Create Product"}
									</Button>
								)}
							</div>
						</Grid>
					</Grid>
				</form>
			</CardContent>
		</Card>
	);
}

About.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func,
	loading: PropTypes.bool,
	formDisabled: PropTypes.bool,
	isUpdate: PropTypes.bool,
};

export default About;
