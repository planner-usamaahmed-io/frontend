import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	root: {}
}));

function Header({ onAddProductModalClick, className, ...rest }) {
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
					<Typography component="h1" variant="h3">
						Project Items
					</Typography>
				</Grid>
				<Grid item>
					<Button
						onClick={onAddProductModalClick}
						color="primary"
						variant="contained"
					>
						Add item
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}

Header.propTypes = {
	className: PropTypes.string,
	onAddProductModalClick: PropTypes.any
};

export default Header;
