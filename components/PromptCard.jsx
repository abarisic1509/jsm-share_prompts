"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const PromptCard = ({ data, handleTagClick, handleEdit, handleDelete }) => {
	const [copy, setCopy] = useState("");
	const handleCopy = () => {
		setCopy(data.prompt);
		navigator.clipboard.writeText(data.prompt);

		setTimeout(() => {
			setCopy("");
		}, 1000);
	};
	return (
		<article className="prompt_card">
			<div className="flex justify-between items-start gap-5">
				<div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
					<Image
						src={data.creator.image}
						alt="user image"
						width={40}
						height={40}
						className="rounded-full object-contain"
					/>
					<div className="flex flex-col">
						<h3 className="font-satoshi font-semibold text-gray-900">
							{data.creator.username}
						</h3>
						<p className="font-inter text-sm text-gray-500">
							{data.creator.email}
						</p>
					</div>
				</div>
				<div className="copy_btn" onClick={handleCopy}>
					<Image
						src={
							copy === data.prompt
								? "/assets/icons/tick.svg"
								: "/assets/icons/copy.svg"
						}
						width={12}
						height={12}
						alt=""
					/>
				</div>
			</div>

			<p className="my-4 font-satoshi text-sm text-gray-700">{data.prompt}</p>

			<p
				className="font-inter text-sm blue_gradient cursor-pointer"
				onClick={() => handleTagClick && handleTagClick(data.tag)}
			>
				{data.tag}
			</p>
		</article>
	);
};

export default PromptCard;
