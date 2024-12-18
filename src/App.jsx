import { useState, useEffect } from "react";
import Card from "./components/Card";

const App = () => {
	const [fullData, setFullData] = useState(null);
	const [lands, setLands] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);

	// Fetch lands from API
	const fetchLands = async (page) => {
		setLoading(true);
		const response = await fetch(
			`https://prod-be.1acre.in/lands/?division=24&page_size=10&page=${page}&ordering=-updated_at`
		);
		const data = await response.json();
		setFullData(data);
		setLands((prevLands) => [...prevLands, ...data.results]);
		setHasMore(data.results.length > 0); // Stop if no more data
		setLoading(false);
		// console.log(data);
	};

	// Handle scroll event
	const handleScroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop >=
			document.documentElement.offsetHeight - 10
		) {
			if (!loading && hasMore) {
				setPage((prevPage) => prevPage + 1);
			}
		}
	};

	// Initial fetch and scroll listener
	useEffect(() => {
		fetchLands(page);
	}, [page]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [loading, hasMore]);

	return (
		<div className="m-4 ">
			<h1>{fullData?.count} Lands 🡮</h1>
			<div className="flex flex-wrap justify-center gap-3 m-5">
				{lands.map((land, index) => (
					<Card key={index} data={land} />
				))}
			</div>
			{loading && (
				<div className="gap-3 flex flex-col items-center">
					<p className="animate-spin border-4 border-solid border-yellow-400 rounded-full border-l-transparent w-[36px] h-[36px]"></p>
					<span>Loading...</span>
				</div>
			)}
			{!hasMore && <p>No more lands to display</p>}
		</div>
	);
};

export default App;
