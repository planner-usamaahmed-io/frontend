import React, { useRef, useState, memo } from 'react';
import PropTypes from 'prop-types';
import {
	ListItemIcon,
	ListItemText,
	Tooltip,
	IconButton,
	Menu,
	MenuItem
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import GetAppIcon from '@material-ui/icons/GetApp';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PrintIcon from '@material-ui/icons/Print';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import AchiveIcon from '@material-ui/icons/ArchiveOutlined';
import ShortTextIcon from '@material-ui/icons/ShortText';
import { CSVLink } from 'react-csv';

function GenericMoreButton({ onExportAsCSV, exportCSVData, exportCSVHeaders }) {
	const moreRef = useRef(null);
	const [openMenu, setOpenMenu] = useState(false);

	const handleMenuOpen = () => {
		setOpenMenu(true);
	};

	const handleMenuClose = () => {
		setOpenMenu(false);
	};

	return (
		<>
			<Tooltip title="More options">
				<IconButton onClick={handleMenuOpen} ref={moreRef} size="small">
					<MoreIcon />
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={moreRef.current}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
				elevation={1}
				onClose={handleMenuClose}
				open={openMenu}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
			>
				<MenuItem>
					<ListItemIcon>
						<GetAppIcon />
					</ListItemIcon>
					<ListItemText primary="Import" />
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<FileCopyIcon />
					</ListItemIcon>
					<ListItemText primary="Copy to clipboard" />
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<PictureAsPdfIcon />
					</ListItemIcon>
					<ListItemText primary="Export as PDF" />
				</MenuItem>
				{exportCSVData ? (
					<CSVLink data={exportCSVData}>
						<MenuItem onClick={onExportAsCSV}>
							<ListItemIcon>
								<ShortTextIcon />
							</ListItemIcon>
							<ListItemText primary="Export as CSV" />
						</MenuItem>
					</CSVLink>
				) : null}
				<MenuItem>
					<ListItemIcon>
						<PrintIcon />
					</ListItemIcon>
					<ListItemText primary="Print" />
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<AchiveIcon />
					</ListItemIcon>
					<ListItemText primary="Achive" />
				</MenuItem>
			</Menu>
		</>
	);
}

GenericMoreButton.propTypes = {
	className: PropTypes.string,
	onExportAsCSV: PropTypes.func,
	exportCSVData: PropTypes.array,
	exportCSVHeaders: PropTypes.array
};

export default memo(GenericMoreButton);