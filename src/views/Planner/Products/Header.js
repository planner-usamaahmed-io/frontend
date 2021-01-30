import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {},
}));

function Header({ className, ...rest }) {
	const classes = useStyles();

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<Grid
				alignItems="flex-end"
				container
				justify="space-between"
				spacing={3}
			>
				<Grid item>
					<Typography component="h2" gutterBottom variant="overline">
						Management
					</Typography>
					<Typography component="h1" variant="h3">
						Products
					</Typography>
				</Grid>
				<Grid item>
					<Button
						color="primary"
						className={classes.button}
						variant="contained"
						component={RouterLink}
						to="/planner/products/create"
					>
						Create Product
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}

Header.propTypes = {
	className: PropTypes.string,
};

export default Header;
