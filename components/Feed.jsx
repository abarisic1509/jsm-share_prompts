"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [prompts, setPrompts] = useState([]);

	useEffect(() => {
		let isDataFetched = false;

		const fetchPrompts = async () => {
			const res = await fetch("/api/prompt");
			const data = await res.json();

			setPrompts(data);
		};

		if (!isDataFetched) {
			fetchPrompts();
		}

		return () => {
			isDataFetched = true;
		};
	}, []);

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleTagClick = () => {};
	const handleEdit = () => {};
	const handleDelete = () => {};

	return (
		<section className="feed">
			{/* SEARCH */}
			<form className="relative, w-full flex-center">
				<input
					type="text"
					placeholder="Search..."
					value={searchTerm}
					onChange={handleSearch}
					required
					className="search_input peer"
				/>
			</form>

			{/* PROMPT LIST */}
			<div className="mt-16 prompt_layout">
				{prompts.map((prompt) => (
					<PromptCard
						key={prompt._id}
						data={prompt}
						handleTagClick={handleTagClick}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
				))}
			</div>
		</section>
	);
};

export default Feed;
