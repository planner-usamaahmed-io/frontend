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

function CustomerManagementList() {
	const classes = useStyles();
	const companyId = useSelector((state) => state.auth.companyId);
	const [customers, setCustomers] = useState([]);
	const [searchString, setSearchString] = useState("");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [totalPages, setTotalPages] = useState(0);
	const [totalCustomers, setTotalCustomers] = useState(0);
	const [customerTypeId, setCustomerTypeId] = useState("");
	const [active, setActive] = useState("");

	const handleFilter = (values) => {
		console.log("Handle Filter");
		console.log(values);

		if (values.customerTypeId) {
			setCustomerTypeId(values.customerTypeId);
		}
		if (values.active !== "" || values.active !== undefined) {
			console.log("set active");
			setActive(values.active ? 1 : 0);
		}
	};

	const handleSearch = async (e) => {
		e.preventDefault();
	};

	useEffect(() => {
		let mounted = true;

		const fetchCustomers = () => {
			axios
				.get(
					`/api/company/${companyId}/customers?page=${page}&per=${rowsPerPage}&searchstring=${searchString}&customertypeid=${customerTypeId}&active=${active}`
				)
				.then((response) => {
					console.log(response);
					if (mounted) {
						setTotalCustomers(response.data.totalCustomers);
						setTotalPages(response.data.totalPages);
						setCustomers(response.data.customers);
					}
				});
		};

		fetchCustomers();

		return () => {
			mounted = false;
		};
	}, [page, rowsPerPage, companyId, searchString, customerTypeId, active]);

	return (
		<Page className={classes.root} title="Customers List">
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
				{customers && (
					<Results
						onSearch={handleSearch}
						totalCustomers={totalCustomers}
						totalPages={totalPages}
						page={page}
						rowsPerPage={rowsPerPage}
						setPage={setPage}
						setRowsPerPage={setRowsPerPage}
						className={classes.results}
						customers={customers}
					/>
				)}
			</Container>
		</Page>
	);
}

export default CustomerManagementList;
