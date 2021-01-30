import React, { Component } from "react";
// import { connect } from "react-redux";

import Aux from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
// import * as actions from "../../store/actions/index";

class Layout extends Component {
	render() {
		return (
			<Aux>
				{/* <Toolbar
					isAuth={this.props.isAuthenticated}
					logout={this.props.onLogout}
					isAdmin={this.props.isAdministrator}
				/> */}
				<Toolbar
					isAuth={true}
					logout={() => console.log("test")}
					isAdmin={true}
				/>
				<div>
					<main>{this.props.children}</main>
				</div>
			</Aux>
		);
	}
}

// const mapStateToProps = state => {
// 	return {
// 		isAuthenticated: state.auth.token !== null,
// 		isAdministrator: state.auth.permissionLevel === "ADMINISTRATOR"
// 	};
// };

// const mapDispatchToProps = dispatch => {
// 	return {
// 		onLogout: () => dispatch(actions.logout)
// 	};
// };

export default Layout;
