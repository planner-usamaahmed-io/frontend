import axios from "../../axios";

import * as actionTypes from "./actionTypes";

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, user, userId, expirationDate, companyId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token,
		user,
		userId,
		expirationDate,
		permissionLevel: user.permissionLevel,
		errorMessage: null,
		errorStatus: null,
		errorStatusText: null,
		companyId,
		loading: false,
	};
};

export const authFail = (errorMessage, errorStatus, errorStatusText) => {
	return {
		type: actionTypes.AUTH_FAIL,
		errorMessage,
		errorStatus,
		errorStatusText,
	};
};

export const logout = () => {
	localStorage.removeItem("JWT_TOKEN");
	localStorage.removeItem("USER_ID");
	localStorage.removeItem("EXPIRATION_DATE");
	localStorage.removeItem("AUTH_STATE");
	localStorage.removeItem("PERMISSION_LEVEL");

	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const clearAuthError = () => {
	return {
		type: actionTypes.AUTH_ERROR_CLEAR,
	};
};

export const authSignIn = (data) => {
	return async (dispatch) => {
		try {
			dispatch(authStart());
			const res = await axios.post("/api/auth/client/login", data);
			dispatch(
				authSuccess(
					res.data.token,
					res.data.user,
					res.data.userId,
					res.data.expirationDate,
					res.data.user.employee.companyId
				)
			);

			localStorage.setItem("JWT_TOKEN", res.data.token);
			localStorage.setItem("USER_ID", res.data.userId);
			localStorage.setItem("EXPIRATION_DATE", res.data.expirationDate);
			localStorage.setItem(
				"PERMISSION_LEVEL",
				res.data.user.permissionLevel
			);

			axios.defaults.headers.common["Authorization"] = res.data.token;
		} catch (error) {
			if (error.response.status === 422) {
				const validationErrors = error.response.data.errors.map(
					(error) => {
						var errors = "";
						for (var key in error) {
							errors += error[key] + "\n";
						}
						return errors;
					}
				);
				dispatch(
					authFail(validationErrors, 422, error.response.statusText)
				);
			} else if (
				error.response.status === 400 &&
				error.response.data.errors[0].message
			) {
				const validationErrors = error.response.data.errors.map(
					(error) => {
						return error.response.message;
					}
				);
				dispatch(
					authFail(validationErrors, 400, error.response.statusText)
				);
			} else if (error.response.status === 401) {
				dispatch(
					authFail("You are not authorized", 401, "Unauthorized")
				);
			} else {
				dispatch(
					authFail("Error logging in", 500, "Internal Server Error")
				);
			}
		}
	};
};
