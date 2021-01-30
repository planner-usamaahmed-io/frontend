/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import DashboardLayout from "./layout/Dashboard";
import AuthLayout from "./layout/Auth";

export default [
	{
		path: "/",
		exact: true,
		component: () => <Redirect to="/overview" />,
	},
	{
		path: "/auth",
		component: AuthLayout,
		routes: [
			{
				path: "/auth/login",
				exact: true,
				component: lazy(() => import("./views/Auth/Login")),
			},
			{
				path: "/auth/register",
				exact: true,
				component: lazy(() => import("./views/Auth/Register")),
			},
			{
				path: "/auth/reset/:token",
				exact: true,
				component: lazy(() => import("./views/Auth/Reset")),
			},
			{
				path: "/auth/resetpassword",
				exact: true,
				component: lazy(() => import("./views/Auth/ResetPassword")),
			},
			{
				component: () => <Redirect to="/errors/error-404" />,
			},
		],
	},
	// {
	// 	path: '/errors',
	// 	component: ErrorLayout,
	// 	routes: [
	// 		{
	// 			path: '/errors/error-401',
	// 			exact: true,
	// 			component: lazy(() => import('./views/Error401'))
	// 		},
	// 		{
	// 			path: '/errors/error-404',
	// 			exact: true,
	// 			component: lazy(() => import('./views/Error404'))
	// 		},
	// 		{
	// 			path: '/errors/error-500',
	// 			exact: true,
	// 			component: lazy(() => import('./views/Error500'))
	// 		},
	// 		{
	// 			component: () => <Redirect to="/errors/error-404" />
	// 		}
	// 	]
	// },
	{
		route: "*",
		component: DashboardLayout,
		routes: [
			{
				path: "/overview",
				exact: true,
				component: lazy(() => import("./components/Home/Home")),
			},
			{
				path: "/planner/customers",
				exact: true,
				component: lazy(() => import("./views/Planner/Customers")),
			},
			{
				path: "/planner/customers/create",
				exact: true,
				component: lazy(() => import("./views/Planner/Customer")),
			},
			{
				path: "/planner/customers/:id",
				exact: true,
				component: lazy(() => import("./views/Planner/Customer")),
			},
			{
				path: "/planner/things",
				exact: true,
				component: lazy(() => import("./views/Planner/Things")),
			},
			{
				path: "/planner/things/create",
				exact: true,
				component: lazy(() => import("./views/Planner/Thing")),
			},
			{
				path: "/planner/things/:id",
				exact: true,
				component: lazy(() => import("./views/Planner/Thing")),
			},
			{
				path: "/planner/products",
				exact: true,
				component: lazy(() => import("./views/Planner/Products")),
			},
			{
				path: "/planner/products/create",
				exact: true,
				component: lazy(() => import("./views/Planner/Product")),
			},
			{
				path: "/planner/products/:id",
				exact: true,
				component: lazy(() => import("./views/Planner/Product")),
			},
			{
				path: "/planner/projecttypes",
				exact: true,
				component: lazy(() => import("./views/Planner/ProjectTypes")),
			},
			{
				path: "/planner/projecttypes/create",
				exact: true,
				component: lazy(() =>
					import("./views/Planner/ProjectTypeCreate")
				),
			},
			{
				path: "/planner/projecttypes/:id",
				exact: true,
				component: lazy(() =>
					import("./views/Planner/ProjectTypeCreate")
				),
			},
			{
				path: "/project/projects/create",
				exact: true,
				component: lazy(() => import("./views/Project/ProjectCreate")),
			},
			{
				path: "/project/projects/",
				exact: true,
				component: lazy(() => import("./views/Project/Projects")),
			},
			{
				path: "/project/projects/:id",
				exact: true,
				component: lazy(() => import("./views/Project/Project")),
			},
			{
				path: "/project/projects/:id/:tab",
				exact: true,
				component: lazy(() => import("./views/Project/Project")),
			},
			{
				path: "/settings/users/create",
				exact: true,
				component: lazy(() => import("./views/Settings/User")),
			},
			{
				path: "/settings/users",
				exact: true,
				component: lazy(() => import("./views/Settings/Users")),
			},
			{
				path: "/settings/users/:employeeid/:userid",
				exact: true,
				component: lazy(() => import("./views/Settings/User")),
			},
			{
				path: "/calendar",
				exact: true,
				component: lazy(() => import("./views/Calendar")),
			},
		],
	},
];
