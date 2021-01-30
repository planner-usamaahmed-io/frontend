import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/styles";
import {
	Card,
	CardHeader,
	CardContent,
	Divider,
	Table,
	TableBody,
	TableRow,
	TableCell,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {},
	content: {
		padding: 0,
	},
	actions: {
		flexDirection: "column",
		alignItems: "flex-start",
		"& > * + *": {
			marginLeft: 0,
		},
	},
	buttonIcon: {
		marginRight: theme.spacing(1),
	},
}));

function OrderInfo({ thing, className, ...rest }) {
	const classes = useStyles();
	const capitalizeFirstChar = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	return (
		<Card {...rest} className={clsx(classes.root, className)}>
			<CardHeader title="Thing information" />
			<Divider />
			<CardContent className={classes.content}>
				<Table size="small">
					<TableBody>
						<TableRow selected>
							<TableCell>Name</TableCell>
							<TableCell>{thing.thingName}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Description</TableCell>
							<TableCell>{thing.thingDescription}</TableCell>
						</TableRow>
						<TableRow selected>
							<TableCell>Location</TableCell>
							<TableCell>
								<div>{thing.locationAddress}</div>
								<div>
									{thing.locationPostcode +
										" " +
										thing.locationCity}
								</div>
								<div>{thing.locationCountry}</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>ID (Primary Key)</TableCell>
							<TableCell>{thing.id}</TableCell>
						</TableRow>
						<TableRow selected>
							<TableCell>Intern ID</TableCell>
							<TableCell>{thing.thingId}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Serial number</TableCell>
							<TableCell>{thing.thingSerialNumber}</TableCell>
						</TableRow>
						<TableRow selected>
							<TableCell>Customer type</TableCell>
							<TableCell>
								{capitalizeFirstChar(
									thing.customerTypeId.toLowerCase()
								)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>CVR</TableCell>
							<TableCell>{thing.locationCVR}</TableCell>
						</TableRow>
						<TableRow selected>
							<TableCell>EAN</TableCell>
							<TableCell>{thing.locationEAN}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Phone</TableCell>
							<TableCell>{thing.locationPhone}</TableCell>
						</TableRow>
						<TableRow selected>
							<TableCell>Email</TableCell>
							<TableCell>{thing.locationEmail}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Status</TableCell>
							<TableCell>
								{thing.active ? "Active" : "Deactive"}
							</TableCell>
						</TableRow>
						<TableRow selected>
							<TableCell>Installation Date</TableCell>
							<TableCell>
								{moment(thing.installationDate).format(
									"DD-MM-YYYY hh:mm"
								)}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

OrderInfo.propTypes = {
	className: PropTypes.string,
	thing: PropTypes.object.isRequired,
};

export default OrderInfo;
