import React from "react";

const NewsCard = ({ article }) => {
	return (
		<div className="bg-white rounded shadow p-4 flex flex-col">
			{article.image && (
				<img
					src={article.image}
					alt={article.title}
					className="w-full h-48 object-cover mb-4 rounded"
				/>
			)}
			<h2 className="font-bold text-lg">{article.title}</h2>
			<p className="text-gray-700 text-sm mb-2">{article.description}</p>
			<p className="text-sm text-gray-500">
				By: {article.author || "Unknown"} | {article.source}
			</p>
			<p className="text-sm text-gray-400">
				{new Date(article.published_at).toLocaleString()} |{" "}
				{article.category}
			</p>
			<a
				href={article.url}
				target="_blank"
				rel="noopener noreferrer"
				className="text-blue-600 mt-auto hover:underline"
			>
				Read more
			</a>
		</div>
	);
};

export default NewsCard;
