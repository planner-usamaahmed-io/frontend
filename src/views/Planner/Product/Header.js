import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography, Grid, colors, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
	root: {},
	deleteIcon: {
		marginRight: theme.spacing(1),
	},
	deleteButton: {
		color: theme.palette.common.white,
		backgroundColor: colors.red[600],
		"&:hover": {
			backgroundColor: colors.red[900],
		},
	},
}));

const Header = ({
	deleteButtonDisabled,
	onDelete,
	isUpdate,
	className,
	...rest
}) => {
	const classes = useStyles();

	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<Grid
				container
				justify="space-between"
				spacing={3}
				alignItems="flex-end"
			>
				<Grid item>
					<Typography component="h2" gutterBottom variant="overline">
						Product
					</Typography>
					<Typography component="h1" variant="h3">
						{isUpdate
							? "Update existing Product"
							: "Create a new Product"}
					</Typography>
				</Grid>
				<Grid item>
					{isUpdate ? (
						<Button
							disabled={deleteButtonDisabled}
							className={classes.deleteButton}
							variant="contained"
							onClick={() => {
								if (
									window.confirm(
										"Are you sure you wish to delete this item?"
									)
								)
									onDelete();
							}}
						>
							<DeleteIcon className={classes.deleteIcon} />
							Delete
						</Button>
					) : null}
				</Grid>
			</Grid>
		</div>
	);
};

Header.propTypes = {
	className: PropTypes.string,
	isUpdate: PropTypes.bool,
	onDelete: PropTypes.func,
	deleteButtonDisabled: PropTypes.bool,
};

export default Header;
