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

function ProductManagementList() {
	const classes = useStyles();
	const companyId = useSelector((state) => state.auth.companyId);
	const [products, setProducts] = useState([]);
	const [searchString, setSearchString] = useState("");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [totalPages, setTotalPages] = useState(0);
	const [totalProducts, setTotalProducts] = useState(0);

	const handleFilter = (values) => {
		console.log("Handle Filter");
		console.log(values);
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const searchResults = await axios.get(
				`/api/company/${companyId}/products?page=${page}&per=${rowsPerPage}&searchstring=${searchString}`
			);

			if (!searchResults) {
				console.log("Searching failed");
			}

			setTotalProducts(searchResults.data.totalProducts);
			setTotalPages(searchResults.data.totalPages);
			setProducts(searchResults.data.products);
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
					`/api/company/${companyId}/products?page=${page}&per=${rowsPerPage}&searchstring=${searchString}`
				)
				.then((response) => {
					console.log(response);
					if (mounted) {
						setTotalProducts(response.data.totalProducts);
						setTotalPages(response.data.totalPages);
						setProducts(response.data.products);
					}
				});
		};

		fetchList();

		return () => {
			mounted = false;
		};
	}, [page, rowsPerPage, companyId, searchString]);

	return (
		<Page className={classes.root} title="Products List">
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
				{products && (
					<Results
						onSearch={handleSearch}
						totalProducts={totalProducts}
						totalPages={totalPages}
						page={page}
						rowsPerPage={rowsPerPage}
						setPage={setPage}
						setRowsPerPage={setRowsPerPage}
						className={classes.results}
						products={products}
					/>
				)}
			</Container>
		</Page>
	);
}

export default ProductManagementList;