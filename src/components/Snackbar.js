import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert as MuiAlert } from '@material-ui/lab';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
// severity = error, warning, info & success
const snackbar = props => {
	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left'
			}}
			open={props.open}
			autoHideDuration={props.duration ? props.duration : 6000}
			onClose={props.onClose}
			style={{ whiteSpace: 'pre-wrap' }}
		>
			<Alert
				onClose={props.onClose}
				severity={props.severity ? props.severity : 'success'}
			>
				{props.message}
			</Alert>
		</Snackbar>
	);
};

export default snackbar;
