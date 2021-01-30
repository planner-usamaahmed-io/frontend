import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import Members from "./Members";
import CustomerInformation from "./CustomerInformation";
import ThingInformation from "./ThingInformation";
import ProjectInformation from "./ProjectInformation";

const useStyles = makeStyles((theme) => ({
	root: {},
	deliverables: {
		marginTop: theme.spacing(3),
	},
}));

function Overview({ oldProject, project, className, ...rest }) {
	const classes = useStyles();

	return (
		<Grid
			{...rest}
			className={clsx(classes.root, className)}
			container
			spacing={3}
		>
			<Grid item lg={9} xl={9} xs={12}>
				<ProjectInformation project={project} />
			</Grid>
			{/* <Grid item lg={4} xl={4} xs={12}>
				<CustomerInformation customer={project.customer} />
			</Grid>
			<Grid item lg={5} xl={5} xs={12}>
				<ThingInformation thing={project.thing} />
			</Grid> */}
			<Grid item lg={3} xl={3} xs={12}>
				<Members
					employees={project.employees}
					project={project}
					className={classes.members}
				/>
			</Grid>
		</Grid>
	);
}

Overview.propTypes = {
	className: PropTypes.string,
	project: PropTypes.object.isRequired,
};

export default Overview;
