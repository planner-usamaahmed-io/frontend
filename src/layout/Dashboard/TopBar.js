/* eslint-disable no-unused-vars */
import React from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import {
	AppBar,
	Button,
	Toolbar,
	Hidden,
	colors,
	Typography,
	IconButton,
} from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";
import MenuIcon from "@material-ui/icons/Menu";
import * as actions from "../../store/actions/";

const useStyles = makeStyles((theme) => ({
	root: {
		boxShadow: "none",
		backgroundColor: colors.grey[800],
	},
	flexGrow: {
		flexGrow: 1,
	},
	logoutButton: {
		color: "white",
		marginLeft: theme.spacing(1),
	},
	logoutIcon: {
		marginRight: theme.spacing(1),
	},
	typo: {
		color: "white",
		fontSize: "28px",
		fontFamily: "calibri",
	},
}));

function TopBar({ onOpenNavBarMobile, className, ...rest }) {
	const classes = useStyles();
	const history = useHistory();
	const dispatch = useDispatch();

	const handleLogout = async () => {
		await dispatch(actions.logout());
		history.push("/auth/login");
	};

	return (
		<AppBar {...rest} className={clsx(classes.root, className)}>
			<Toolbar>
				<Hidden lgUp>
					{/* Will show when we are in mobile mode */}
					<IconButton
						className={classes.menuButton}
						color="inherit"
						onClick={onOpenNavBarMobile}
					>
						<MenuIcon />
					</IconButton>
				</Hidden>
				<Typography className={classes.typo}>Planner</Typography>
				<div className={classes.flexGrow} />

				<Hidden xsDown>
					{/* Will show when we are in desktop mode */}
					<Button
						className={classes.logoutButton}
						onClick={handleLogout}
					>
						<InputIcon className={classes.logoutIcon} />
						Sign out
					</Button>
				</Hidden>
				<Hidden smUp>
					<Button
						className={classes.logoutButton}
						onClick={handleLogout}
					>
						<InputIcon className={classes.logoutIcon} />
					</Button>
				</Hidden>
			</Toolbar>
		</AppBar>
	);
}

TopBar.propTypes = {
	className: PropTypes.string,
	onOpenNavBarMobile: PropTypes.func,
};

export default TopBar;
