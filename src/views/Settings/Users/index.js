import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Container } from "@material-ui/core";
import axios from "../../../axios";
import Page from "../../../components/Page";
import SearchBar from "../../../components/SearchBar";
import Header from "./Header";
import Results from "./Results";

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
	results: {
		marginTop: theme.spacing(3),
	},
}));

function ProjectManagementList() {
	const classes = useStyles();
	const companyId = useSelector((state) => state.auth.companyId);
	const [users, setUsers] = useState([]);
	const [searchString, setSearchString] = useState("");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [totalPages, setTotalPages] = useState(0);
	const [totalUsers, setTotalUsers] = useState(0);

	const handleFilter = (values) => {
		console.log("Handle Filter");
		console.log(values);
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const searchResults = await axios.get(
				`/api/company/${companyId}/users?page=${page}&per=${rowsPerPage}&searchstring=${searchString}`
			);

			if (!searchResults) {
				console.log("Searching failed");
			}

			setTotalUsers(searchResults.data.totalEmployees);
			setTotalPages(searchResults.data.totalPages);
			setUsers(searchResults.data.employees);
		} catch (error) {
			console.log(error);
			console.log(error.response);
		}
	};

	useEffect(() => {
		let mounted = true;

		const fetchList = () => {
			axios
				.get(
					`/api/company/${companyId}/users?page=${page}&per=${rowsPerPage}&searchstring=${searchString}`
				)
				.then((response) => {
					console.log(response);
					if (mounted) {
						setTotalUsers(response.data.totalEmployees);
						setTotalPages(response.data.totalPages);
						setUsers(response.data.employees);
					}
				});
		};

		fetchList();

		return () => {
			mounted = false;
		};
	}, [page, rowsPerPage, companyId, searchString]);

	return (
		<Page className={classes.root} title="Customer Management List">
			<Container maxWidth={false}>
				<Header />
				<form onSubmit={handleSearch}>
					<SearchBar
						searchString={searchString}
						setSearchString={setSearchString}
						onFilter={handleFilter}
						onSearch={handleSearch}
					/>
				</form>
				{users && (
					<Results
						onSearch={handleSearch}
						totalItems={totalUsers}
						totalPages={totalPages}
						page={page}
						rowsPerPage={rowsPerPage}
						setPage={setPage}
						setRowsPerPage={setRowsPerPage}
						className={classes.results}
						items={users}
					/>
				)}
			</Container>
		</Page>
	);
}

export default ProjectManagementList;
