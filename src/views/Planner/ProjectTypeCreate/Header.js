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
				Project Type
			</Typography>
			<Typography component="h1" variant="h3">
				{isUpdate
					? "Update existing Project Type"
					: "Create a new Project Type"}
			</Typography>
		</div>
	);
};

Header.propTypes = {
	className: PropTypes.string,
	isUpdate: PropTypes.bool,
};

export default Header;
