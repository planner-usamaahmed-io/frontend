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
	actions: {
		flexDirection: 'column',
		alignItems: 'flex-start',
		'& > * + *': {
			marginLeft: 0
		}
	},
	buttonIcon: {
		marginRight: theme.spacing(1)
	}
}));

function CustomerInfo({ customer, className, ...rest }) {
	const classes = useStyles();

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardHeader title="Customer info" />
			<Divider />
			<CardContent className={classes.content}>
				<Table size="small">
					<TableBody>
						<TableRow selected>
							<TableCell>Name</TableCell>
							<TableCell>{customer.customerName}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Email</TableCell>
							<TableCell>{customer.contactEmail}</TableCell>
						</TableRow>
						<TableRow selected>
							<TableCell>Phone</TableCell>
							<TableCell>{customer.contactPhone}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Customer ID</TableCell>
							<TableCell>{customer.customerId}</TableCell>
						</TableRow>
						<TableRow selected>
							<TableCell>Customer type</TableCell>
							<TableCell>{customer.customerTypeId}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>CVR</TableCell>
							<TableCell>{customer.customerCVR}</TableCell>
						</TableRow>
						<TableRow selected>
							<TableCell>EAN</TableCell>
							<TableCell>{customer.customerCVR}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Created</TableCell>
							<TableCell>{customer.createdAt}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

CustomerInfo.propTypes = {
	className: PropTypes.string,
	customer: PropTypes.object.isRequired
};

export default CustomerInfo;
