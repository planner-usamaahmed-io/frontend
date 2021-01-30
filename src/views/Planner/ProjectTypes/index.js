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

function ProjectTypesManagementList() {
	const classes = useStyles();
	const companyId = useSelector((state) => state.auth.companyId);
	const [projecttypes, setProjectTypes] = useState([]);
	const [searchString, setSearchString] = useState("");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [totalPages, setTotalPages] = useState(0);
	const [totalProjectTypes, setTotalProjectTypes] = useState(0);

	const handleFilter = (values) => {
		console.log("Handle Filter");
		console.log(values);
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const searchResults = await axios.get(
				`/api/company/${companyId}/projecttypes?page=${page}&per=${rowsPerPage}&searchstring=${searchString}`
			);

			if (!searchResults) {
				console.log("Searching failed");
			}

			setTotalProjectTypes(searchResults.data.totalProjectTypes);
			setTotalPages(searchResults.data.totalPages);
			setProjectTypes(searchResults.data.projecttypes);
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
					`/api/company/${companyId}/projecttypes?page=${page}&per=${rowsPerPage}&searchstring=${searchString}`
				)
				.then((response) => {
					console.log(response);
					if (mounted) {
						setTotalProjectTypes(response.data.totalProjectTypes);
						setTotalPages(response.data.totalPages);
						setProjectTypes(response.data.projecttypes);
					}
				});
		};

		fetchList();

		return () => {
			mounted = false;
		};
	}, [page, rowsPerPage, companyId, searchString]);

	return (
		<Page className={classes.root} title="Project Type List">
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
				{projecttypes && (
					<Results
						onSearch={handleSearch}
						totalItems={totalProjectTypes}
						totalPages={totalPages}
						page={page}
						rowsPerPage={rowsPerPage}
						setPage={setPage}
						setRowsPerPage={setRowsPerPage}
						className={classes.results}
						items={projecttypes}
					/>
				)}
			</Container>
		</Page>
	);
}

export default ProjectTypesManagementList;
