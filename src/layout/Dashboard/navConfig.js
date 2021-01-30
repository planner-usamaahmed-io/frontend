// import React from "react";
import BarChartIcon from "@material-ui/icons/BarChart";
import FolderIcon from "@material-ui/icons/FolderOutlined";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import SettingsIcon from "@material-ui/icons/SettingsOutlined";

export default [
	{
		items: [
			// {
			// 	title: "Overview",
			// 	href: "/overview",
			// 	icon: HomeIcon,
			// },
			// {
			// 	title: "Dashboards",
			// 	href: "/dashboards",
			// 	icon: DashboardIcon,
			// 	items: [
			// 		{
			// 			title: "Default",
			// 			href: "/dashboards/default",
			// 		},
			// 		{
			// 			title: "Analytics",
			// 			href: "/dashboards/analytics",
			// 		},
			// 	],
			// },
			{
				title: "Planner",
				href: "/planner",
				icon: BarChartIcon,
				items: [
					{
						title: "Customers",
						href: "/planner/customers",
					},
					{
						title: "Things",
						href: "/planner/things",
					},
					{
						title: "Products",
						href: "/planner/products",
					},
					{
						title: "Project Types",
						href: "/planner/projecttypes",
					},
				],
			},
			{
				title: "Project",
				href: "/project",
				icon: FolderIcon,
				items: [
					{
						title: "Projects",
						href: "/project/projects",
					},
					{
						title: "Create",
						href: "/project/projects/create",
					},
					{
						title: "Overview",
						href: "/project/projects/1/overview",
					},
				],
			},
			{
				title: "Calendar",
				href: "/calendar",
				icon: CalendarTodayIcon,
			},
			{
				title: "Settings",
				href: "/settings",
				icon: SettingsIcon,
				items: [
					{
						title: "Users",
						href: "/settings/users",
					},
				],
			},
		],
	},
];
