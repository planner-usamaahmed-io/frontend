import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Container, Tabs, Tab, Divider, colors } from "@material-ui/core";
import axios from "../../../axios";
import Page from "../../../components/Page";
import Header from "./Header";
import Overview from "./Overview";
import Items from "./Items";

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
	tabs: {
		marginTop: theme.spacing(3),
	},
	tab: {
		color: colors.grey[400],
		fontWeight: "bold",
	},
	divider: {
		backgroundColor: colors.grey[300],
	},
	alert: {
		marginTop: theme.spacing(3),
	},
	content: {
		marginTop: theme.spacing(3),
	},
}));

function Project({ match, history }) {
	const classes = useStyles();
	const { id, tab } = match.params;
	const [project, setProject] = useState(null);
	const tabs = [
		{ value: "overview", label: "Overview" },
		{ value: "items", label: "Items" },
		{ value: "thing", label: "Thing" },
		{ value: "customer", label: "Customer" },
	];

	const handleTabsChange = (event, value) => {
		history.push(value);
	};

	useEffect(() => {
		let mounted = true;

		const fetchProject = () => {
			axios
				.get(`/api/project/${id}`)
				.then((res) => {
					if (mounted) {
						setProject(res.data.project);
						console.log(res.data.project);
					}
				})
				.catch((error) => console.log(error));
		};

		fetchProject();
		return () => {
			mounted = false;
		};
	}, [id]);

	if (!tab) {
		return <Redirect to={`/project/projects/${id}/overview`} />;
	}

	if (!tabs.find((t) => t.value === tab)) {
		return <Redirect to="/errors/errors-404" />;
	}

	if (!project) {
		return null;
	}

	return (
		<Page className={classes.root} title="Project Details">
			<Container maxWidth="lg">
				<Header project={project} />
				<Tabs
					className={classes.tabs}
					onChange={handleTabsChange}
					scrollButtons="auto"
					value={tab}
					variant="scrollable"
				>
					{tabs.map((tab) => (
						<Tab
							key={tab.value}
							label={tab.label}
							value={tab.value}
							className={classes.tab}
						/>
					))}
				</Tabs>
				<Divider className={classes.divider} />
				<div className={classes.content}>
					{tab === "overview" && <Overview project={project} />}
					{tab === "items" && (
						<Items
							projectId={project.id}
							companyId={project.companyId}
							items={project.products}
						/>
					)}
					{tab === "thing" && (
						<Redirect to={`/planner/things/${project.thing.id}`} />
					)}
					{tab === "customer" && (
						<Redirect
							to={`/planner/customers/${project.customer.id}`}
						/>
					)}
				</div>
			</Container>
		</Page>
	);
}

Project.propTypes = {
	history: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
};

export default Project;
