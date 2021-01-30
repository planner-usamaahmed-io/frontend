import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Container } from "@material-ui/core";
import Page from "../../../../components/Page";
import Header from "./Header";
import Results from "./Results";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
	root: {},
	container: {
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
	results: {
		marginTop: theme.spacing(3),
	},
}));

function ProjectItemsList({ items, projectId, companyId }) {
	const classes = useStyles();
	const [openAddProductModal, setOpenAddProductModal] = useState(false);

	console.log(items);

	const handleViewModalOpen = (event) => {
		setOpenAddProductModal(true);
		console.log("Open modal");
	};

	const handleViewModalClose = () => {
		setOpenAddProductModal(false);
	};

	return (
		<Page className={classes.root} title="Project Items">
			<Container maxWidth={false} className={classes.container}>
				<Header onAddProductModalClick={handleViewModalOpen} />
				<Results
					projectId={projectId}
					companyId={companyId}
					items={items}
					className={classes.results}
					openAddProductModal={openAddProductModal}
					onAddProductModalClose={handleViewModalClose}
				/>
			</Container>
		</Page>
	);
}

ProjectItemsList.propTypes = {
	items: PropTypes.array.isRequired,
	companyId: PropTypes.number,
	projectId: PropTypes.number,
};

export default ProjectItemsList;
