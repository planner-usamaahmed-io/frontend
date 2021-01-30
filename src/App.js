import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { renderRoutes } from "react-router-config";
import { Provider as StoreProvider } from "react-redux";
import { configureStore } from "./store";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./theme";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import routes from "./routes";
import axios from "axios";

import "./App.css";

const AuthState = JSON.parse(localStorage.getItem("AUTH_STATE")) || null;
let store;
if (AuthState) {
	axios.defaults.headers.common["Authorization"] = AuthState.token;
	store = configureStore({ auth: AuthState });
} else {
	store = configureStore();
}

// localStorage.removeItem("JWT_TOKEN");
// localStorage.removeItem("USER_ID");
// localStorage.removeItem("EXPIRATION_DATE");
// localStorage.removeItem("AUTH_STATE");
// localStorage.removeItem("PERMISSION_LEVEL");

const history = createBrowserHistory();

function App() {
	return (
		<StoreProvider store={store}>
			<ThemeProvider theme={theme}>
				<MuiPickersUtilsProvider utils={MomentUtils}>
					<Router history={history}>{renderRoutes(routes)}</Router>
				</MuiPickersUtilsProvider>
			</ThemeProvider>
		</StoreProvider>
	);
}

export default App;
