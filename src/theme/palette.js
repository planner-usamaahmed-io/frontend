import { colors } from "@material-ui/core";

const white = "#FFFFFF";
const grey800 = "#424242";
const grey700 = "#616161";

export default {
	primary: {
		contrastText: white,
		dark: colors.blue[900],
		main: colors.blue[700],
		darkMain: colors.blue[900],
		active: colors.blue[200],
		light: colors.blue[100],
	},
	secondary: {
		contrastText: white,
		dark: colors.blue[900],
		main: colors.blue.A700,
		light: colors.blue.A400,
	},
	warning: {
		contrastText: white,
		dark: colors.red[900],
		main: colors.red[700],
		darkMain: colors.red[900],
		active: colors.red[200],
		light: colors.red[100],
	},
	error: {
		contrastText: white,
		dark: colors.red[900],
		main: colors.red[600],
		light: colors.red[400],
	},
	text: {
		primary: colors.grey[200],
		secondary: colors.grey[400],
		link: colors.blue[600],
	},
	link: colors.blue[800],
	icon: "#808080",
	background: {
		default: grey700,
		hover: grey700,
		paper: grey800,
	},
	divider: colors.grey[700],
};
