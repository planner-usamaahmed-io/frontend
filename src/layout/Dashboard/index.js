import React, { Suspense, useState, useEffect } from "react";
import { renderRoutes } from "react-router-config";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { LinearProgress } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import * as actions from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
	container: {
		minHeight: "100vh",
		display: "flex",
		"@media all and (-ms-high-contrast:none)": {
			height: 0, // IE11 fix
		},
	},
	content: {
		paddingTop: 64,
		flexGrow: 1,
		maxWidth: "100%",
		overflowX: "hidden",
		[theme.breakpoints.up("lg")]: {
			paddingLeft: 256,
		},
		[theme.breakpoints.down("xs")]: {
			paddingTop: 56,
		},
	},
}));

function Dashboard({ route }) {
	const classes = useStyles();
	const auth = useSelector((state) => state.auth);
	const history = useHistory();
	const dispatch = useDispatch();
	const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

	useEffect(() => {
		const expirationDate = new Date(auth.expirationDate * 1000);

		if (!auth.loggedIn || !auth.token) {
			history.push("/auth/login");
			return;
		} else if (expirationDate <= new Date()) {
			dispatch(actions.logout());
		}
	}, [
		history,
		auth.loggedIn,
		auth.user,
		auth.token,
		auth.expirationDate,
		dispatch,
	]);

	return (
		<>
			<TopBar onOpenNavBarMobile={() => setOpenNavBarMobile(true)} />
			<NavBar
				onMobileClose={() => setOpenNavBarMobile(false)}
				openMobile={openNavBarMobile}
			/>
			<div className={classes.container}>
				<div className={classes.content}>
					<Suspense fallback={<LinearProgress />}>
						{renderRoutes(route.routes)}
					</Suspense>
				</div>
			</div>
		</>
	);
}

Dashboard.propTypes = {
	route: PropTypes.object,
};

export default Dashboard;
