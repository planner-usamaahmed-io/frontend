import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import {
	Card,
	CardContent,
	Typography,
	Divider,
	Link,
	Grid,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import Page from "../../../components/Page";
import gradients from "../../../utils/gradients";
import LoginForm from "./LoginForm";
import PropTypes from "prop-types";
import Snackbar from "../../../components/Snackbar";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: theme.spacing(6, 2),
	},
	card: {
		width: theme.breakpoints.values.md,
		maxWidth: "100%",
		overflow: "visible",
		display: "flex",
		position: "relative",
		"& > *": {
			flexGrow: 1,
			flexBasis: "50%",
			width: "50%",
		},
	},
	content: {
		padding: theme.spacing(8, 4, 3, 4),
	},
	media: {
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4,
		padding: theme.spacing(3),
		color: theme.palette.common.white,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end",
		[theme.breakpoints.down("md")]: {
			display: "none",
		},
	},
	icon: {
		backgroundImage: gradients.green,
		color: theme.palette.common.white,
		borderRadius: theme.shape.borderRadius,
		padding: theme.spacing(1),
		position: "absolute",
		top: -32,
		left: theme.spacing(3),
		height: 64,
		width: 64,
		fontSize: 32,
	},
	loginForm: {
		marginTop: theme.spacing(3),
	},
	divider: {
		margin: theme.spacing(2, 0),
	},
	person: {
		marginTop: theme.spacing(2),
		display: "flex",
	},
	avatar: {
		marginRight: theme.spacing(2),
	},
}));

function Login({ history }) {
	const classes = useStyles();
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	useEffect(() => {
		if (history.location.state && "msg" in history.location.state) {
			handleSnackbarClick(history.location.state.msg);
		}
	}, [history]);

	const handleSnackbarClick = (message) => {
		setSnackbarMessage(message);
		setSnackbarOpen(true);
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setSnackbarOpen(false);
	};

	return (
		<Page className={classes.root} title="Login">
			<Card className={classes.card}>
				<CardContent className={classes.content}>
					<LockIcon className={classes.icon} />
					<Typography gutterBottom variant="h3">
						Sign in
					</Typography>
					<LoginForm className={classes.loginForm} />
					<Divider className={classes.divider} />
					<Grid container>
						<Grid item={true} xs={6}>
							<Link
								color="secondary"
								component={RouterLink}
								to="/auth/register"
								underline="always"
								variant="subtitle2"
							>
								Don&apos;t have an account?
							</Link>
						</Grid>
						<Grid item={true} xs={6}>
							<Link
								style={{
									textAlign: "right",
									float: "right",
								}}
								color="secondary"
								component={RouterLink}
								to="/auth/resetpassword"
								underline="always"
							>
								Forgot password?
							</Link>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			{snackbarMessage && snackbarOpen ? (
				<Snackbar
					open={snackbarOpen}
					message={snackbarMessage}
					onClose={handleSnackbarClose}
				/>
			) : null}
		</Page>
	);
}

Login.propTypes = {
	history: PropTypes.object.isRequired,
};

export default Login;
