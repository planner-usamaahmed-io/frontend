import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import {
	Card,
	CardContent,
	Typography,
	Divider,
	Link,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import Page from "../../../components/Page";
import gradients from "../../../utils/gradients";
import ChangePasswordForm from "./ChangePasswordForm";
import PropTypes from "prop-types";
import axios from "../../../axios";

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
	changePasswordForm: {
		marginTop: theme.spacing(3),
	},
	divider: {
		margin: theme.spacing(2, 0),
	},
}));

function Reset({ match, history }) {
	const classes = useStyles();
	const { token } = match.params;
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		console.log(token);
		const checkToken = async () => {
			try {
				const tokenResponse = await axios.get(
					`/api/auth/validatetoken?token=${token}`
				);

				console.log(tokenResponse);
			} catch (error) {
				console.log(error, error.response);
				setErrors((oldErrors) => [
					...oldErrors,
					error.response.data.msg,
				]);
			}
		};

		checkToken();
	}, [token]);

	return (
		<Page className={classes.root} title="Reset Password">
			<Card className={classes.card}>
				{errors.length === 0 ? (
					<CardContent className={classes.content}>
						<LockIcon className={classes.icon} />
						<Typography gutterBottom variant="h3">
							Reset Password
						</Typography>
						<ChangePasswordForm
							token={token}
							className={classes.loginForm}
						/>
						<Divider className={classes.changePasswordForm} />
						<Link
							align="center"
							color="secondary"
							component={RouterLink}
							to="/auth/login"
							underline="always"
							variant="subtitle2"
						>
							Already know your password?
						</Link>
					</CardContent>
				) : (
					<CardContent className={classes.content}>
						<LockIcon className={classes.icon} />
						<Typography gutterBottom variant="h3">
							Token is invalid or has been expired
						</Typography>
						<Link
							align="center"
							color="secondary"
							component={RouterLink}
							to="/auth/resetpassword"
							underline="always"
							variant="subtitle2"
						>
							Send new reset link?
						</Link>
						<Divider className={classes.divider} />
						<Link
							align="center"
							color="secondary"
							component={RouterLink}
							to="/auth/login"
							underline="always"
							variant="subtitle2"
						>
							Already know your password?
						</Link>
					</CardContent>
				)}
			</Card>
		</Page>
	);
}

Reset.propTypes = {
	history: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
};

export default Reset;
