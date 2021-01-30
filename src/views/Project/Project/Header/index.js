import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid, colors } from "@material-ui/core";
import Label from "../../../../components/Label";

const useStyles = makeStyles((theme) => ({
	root: {},
	label: {
		marginTop: theme.spacing(1),
	},
	shareButton: {
		backgroundColor: theme.palette.common.white,
		marginRight: theme.spacing(2),
	},
	shareIcon: {
		marginRight: theme.spacing(1),
	},
	applyButton: {
		color: theme.palette.common.white,
		backgroundColor: colors.green[600],
		"&:hover": {
			backgroundColor: colors.green[900],
		},
	},
}));

function Header({ project, className, ...rest }) {
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
						Project Details
					</Typography>
					<Typography component="h1" gutterBottom variant="h3">
						{project.projectId}
					</Typography>
					<Label
						className={classes.label}
						color={colors.green[600]}
						variant="outlined"
					>
						{project.status}
					</Label>
				</Grid>
			</Grid>
		</div>
	);
}

Header.propTypes = {
	className: PropTypes.string,
	project: PropTypes.object.isRequired,
};

Header.defaultProps = {};

export default Header;
