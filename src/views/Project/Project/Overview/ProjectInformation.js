import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	Table,
	TableBody,
	TableRow,
	TableCell
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {},
	content: {
		padding: 0
	},
	buttonIcon: {
		marginRight: theme.spacing(1)
	}
}));

function ProjectInfo({ project, className, ...rest }) {
	const classes = useStyles();

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardHeader title="Project info" />
			<Divider />
			<CardContent className={classes.content}>
				<Table size="small">
					<TableBody>
						<TableRow>
							<TableCell>ID (Primary Key)</TableCell>
							<TableCell>{project.id}</TableCell>
						</TableRow>
						<TableRow selected>
							<TableCell>Project ID</TableCell>
							<TableCell>{project.projectId}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Assigned to</TableCell>
							<TableCell>{project.userEmployeeCode}</TableCell>
						</TableRow>
						<TableRow selected>
							<TableCell>Responsible</TableCell>
							<TableCell>{project.responsible}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Urgent</TableCell>
							<TableCell>
								{project.urgent ? 'True' : 'False'}
							</TableCell>
						</TableRow>
						<TableRow selected>
							<TableCell>Start time</TableCell>
							<TableCell>
								{project.startTime
									? project.startTime
									: 'Not started'}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>End time</TableCell>
							<TableCell>
								{project.endTime
									? project.endTime
									: 'Not ended'}
							</TableCell>
						</TableRow>
						<TableRow selected>
							<TableCell>Status</TableCell>
							<TableCell>{project.status}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Company ID</TableCell>
							<TableCell>{project.companyId}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

ProjectInfo.propTypes = {
	className: PropTypes.string,
	project: PropTypes.object.isRequired
};

export default ProjectInfo;
