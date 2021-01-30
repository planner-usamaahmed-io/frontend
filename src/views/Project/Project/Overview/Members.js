import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	colors,
} from "@material-ui/core";
import AddEmployeeModal from "./AddEmployeeModal";

const useStyles = makeStyles(() => ({
	root: {},
	header: {
		paddingBottom: 0,
	},
	content: {
		paddingTop: 0,
	},
	actions: {
		backgroundColor: colors.grey[700],
	},
}));

function Employees({ project, employees, ...rest }) {
	const classes = useStyles();
	const [openUserModal, setOpenUsersModal] = useState(false);

	const handleViewModalOpen = (event) => {
		setOpenUsersModal(true);
		console.log("Open modal");
	};

	const handleViewModalClose = () => {
		setOpenUsersModal(false);
	};

	return (
		<Card {...rest} className={clsx(classes.root)}>
			<CardHeader
				className={classes.header}
				title="Assigned Users"
				titleTypographyProps={{
					variant: "overline",
				}}
			/>
			<CardContent className={classes.content}>
				<List>
					{employees.map((employee) => (
						<ListItem disableGutters key={employee.id}>
							<ListItemAvatar>
								<Avatar
									alt="employeeAvatar"
									className={classes.avatar}
									src={"/images/avatars/" + employee.avatar}
								/>
							</ListItemAvatar>
							<ListItemText
								primary={
									employee.user.firstName +
									" " +
									employee.user.lastName
								}
								primaryTypographyProps={{ variant: "h6" }}
								secondary={employee.employeeCode}
							/>
						</ListItem>
					))}
				</List>
			</CardContent>
			<CardActions className={classes.actions}>
				<Button
					onClick={handleViewModalOpen}
					color="primary"
					variant="contained"
					fullWidth
				>
					Manage Users
				</Button>
			</CardActions>
			<AddEmployeeModal
				projectId={project.id}
				companyId={project.companyId}
				open={openUserModal}
				onClose={handleViewModalClose}
			/>
		</Card>
	);
}

Employees.propTypes = {
	employees: PropTypes.array.isRequired,
	project: PropTypes.object.isRequired,
};

export default Employees;
