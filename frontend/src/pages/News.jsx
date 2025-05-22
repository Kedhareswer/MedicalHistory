import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const News = () => {
	const [news, setNews] = useState([]);
	const [pagination, setPagination] = useState({
		offset: 0,
		total: 0,
		limit: 20,
	});
	const [loading, setLoading] = useState(true);

	const fetchNews = async (offset = 0) => {
		setLoading(true);
		try {
			const response = await axios.get(API_URL, {
				params: {
					access_key: API_KEY,
					countries: "us",
					limit: pagination.limit,
					offset: offset,
				},
			});
			setNews(response.data.data);
			setPagination(response.data.pagination);
		} catch (error) {
			console.error("Error fetching news:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchNews();
	}, []);

	const handlePageChange = (direction) => {
		const newOffset =
			direction === "next"
				? pagination.offset + pagination.limit
				: Math.max(pagination.offset - pagination.limit, 0);
		fetchNews(newOffset);
	};

	return (
		<div className="min-h-screen p-4 bg-gray-100">
			<h1 className="text-3xl font-bold text-center mb-6">Top News</h1>

			{loading ? (
				<p className="text-center text-gray-600">Loading news...</p>
			) : (
				<>
					<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						{news.map((article, index) => (
							<NewsCard key={index} article={article} />
						))}
					</div>

					{/* Pagination */}
					<div className="flex justify-center items-center mt-8 space-x-4">
						<button
							onClick={() => handlePageChange("prev")}
							disabled={pagination.offset === 0}
							className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
						>
							Previous
						</button>
						<span>
							Page {pagination.offset / pagination.limit + 1} of{" "}
							{Math.ceil(pagination.total / pagination.limit)}
						</span>
						<button
							onClick={() => handlePageChange("next")}
							disabled={
								pagination.offset + pagination.limit >=
								pagination.total
							}
							className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
						>
							Next
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default News;
