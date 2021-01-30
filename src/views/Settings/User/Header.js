import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
	root: {},
}));

const Header = ({ isUpdate, className, ...rest }) => {
	const classes = useStyles();

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<Typography component="h2" gutterBottom variant="overline">
				User
			</Typography>
			<Typography component="h1" variant="h3">
				{isUpdate ? "Update User" : "Create a new User"}
			</Typography>
		</div>
	);
};

Header.propTypes = {
	className: PropTypes.string,
	isUpdate: PropTypes.bool.isRequired,
};

export default Header;
