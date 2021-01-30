import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import axios from "../../../axios";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "auto",
	},
	paper: {
		width: 200,
		height: 230,
		overflow: "auto",
		border: "1px solid grey",
	},
	button: {
		margin: theme.spacing(0.5, 0),
	},
}));

function not(a, b) {
	return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
	return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList({ addRoles }) {
	const classes = useStyles();
	const [checked, setChecked] = useState([]);
	const [left, setLeft] = useState([]);
	const [right, setRight] = useState([]);
	const [labels, setLabels] = useState([]);

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	useEffect(() => {
		axios
			.get("/api/permission")
			.then((response) => {
				const bits = response.data.permissions.map((p) => p.bit);
				console.log(bits);
				setLabels(response.data.permissions);
				setLeft(bits);
			})
			.catch((error) => console.log(error));
	}, []);

	// useEffect(() => {
	// 	const total = right.reduce((a, b) => a + b, 0);
	// }, [right]);

	const getLabel = (value) => {
		const label = labels.find((label) => label.bit === value);
		return label;
	};

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleAllRight = () => {
		setRight(right.concat(left));
		addRoles(right.concat(left).reduce((a, b) => a + b, 0));
		setLeft([]);
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		addRoles(right.concat(leftChecked).reduce((a, b) => a + b, 0));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		addRoles(not(right, rightChecked).reduce((a, b) => a + b, 0));
		setChecked(not(checked, rightChecked));
	};

	const handleAllLeft = () => {
		setLeft(left.concat(right));
		setRight([]);
		addRoles([].reduce((a, b) => a + b, 0));
	};

	const customList = (items) => (
		<Paper className={classes.paper}>
			<List dense component="div" role="list">
				{items.map((value) => {
					const labelId = `transfer-list-item-${value}-label`;

					return (
						<ListItem
							key={value}
							role="listitem"
							button
							onClick={handleToggle(value)}
						>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ "aria-labelledby": labelId }}
								/>
							</ListItemIcon>
							<ListItemText
								id={labelId}
								primary={getLabel(value).name}
							/>
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Paper>
	);

	return (
		<Grid
			container
			spacing={2}
			justify="center"
			alignItems="center"
			className={classes.root}
		>
			<Grid item>{customList(left)}</Grid>
			<Grid item>
				<Grid container direction="column" alignItems="center">
					<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={handleAllRight}
						disabled={left.length === 0}
						aria-label="move all right"
					>
						≫
					</Button>
					<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={handleCheckedRight}
						disabled={leftChecked.length === 0}
						aria-label="move selected right"
					>
						&gt;
					</Button>
					<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={handleCheckedLeft}
						disabled={rightChecked.length === 0}
						aria-label="move selected left"
					>
						&lt;
					</Button>
					<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={handleAllLeft}
						disabled={right.length === 0}
						aria-label="move all left"
					>
						≪
					</Button>
				</Grid>
			</Grid>
			<Grid item>{customList(right)}</Grid>
		</Grid>
	);
}
