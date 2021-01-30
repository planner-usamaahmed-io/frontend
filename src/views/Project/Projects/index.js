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
	const [projects, setProjects] = useState([]);
	const [searchString, setSearchString] = useState("");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [totalPages, setTotalPages] = useState(0);
	const [totalProjects, setTotalProjects] = useState(0);

	const handleFilter = (values) => {
		console.log("Handle Filter");
		console.log(values);
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const searchResults = await axios.get(
				`/api/company/${companyId}/projects?page=${page}&per=${rowsPerPage}&searchstring=${searchString}`
			);

			if (!searchResults) {
				console.log("Searching failed");
			}

			setTotalProjects(searchResults.data.totalProjects);
			setTotalPages(searchResults.data.totalPages);
			setProjects(searchResults.data.projects);
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
					`/api/company/${companyId}/projects?page=${page}&per=${rowsPerPage}&searchstring=${searchString}`
				)
				.then((response) => {
					console.log(response);
					if (mounted) {
						setTotalProjects(response.data.totalProjects);
						setTotalPages(response.data.totalPages);
						setProjects(response.data.projects);
					}
				});
		};

		fetchList();

		return () => {
			mounted = false;
		};
	}, [
		page,
		rowsPerPage,
		companyId,
		searchString,
		setTotalPages,
		setTotalProjects,
		setProjects,
	]);

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
				{projects && (
					<Results
						onSearch={handleSearch}
						totalItems={totalProjects}
						totalPages={totalPages}
						page={page}
						rowsPerPage={rowsPerPage}
						setPage={setPage}
						setRowsPerPage={setRowsPerPage}
						className={classes.results}
						items={projects}
					/>
				)}
			</Container>
		</Page>
	);
}

export default ProjectManagementList;
