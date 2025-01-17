import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Typography, Divider } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import Page from "../../../components/Page";
import gradients from "../../../utils/gradients";
import LoginForm from "./ResetPasswordForm";

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

function Login() {
	const classes = useStyles();

	return (
		<Page className={classes.root} title="Reset Password">
			<Card className={classes.card}>
				<CardContent className={classes.content}>
					<LockIcon className={classes.icon} />
					<Typography gutterBottom variant="h3">
						Reset Password
					</Typography>
					<Typography gutterBottom variant="h6">
						Type your password and your will receive a email with a
						link to reset your password
					</Typography>
					<LoginForm className={classes.loginForm} />
					<Divider className={classes.divider} />
				</CardContent>
			</Card>
		</Page>
	);
}

export default Login;
