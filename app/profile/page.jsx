"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { useEffect, useState } from "react";

const ProfilePage = () => {
	const { data: session } = useSession();
	const router = useRouter();

	const [prompts, setPrompts] = useState([]);

	useEffect(() => {
		const fetchPrompts = async () => {
			const res = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await res.json();
			//console.log(res);
			setPrompts(data);
		};

		if (session?.user.id) {
			fetchPrompts();
		}
	}, [session?.user.id]);

	const handleEdit = (prompt) => {
		router.push(`/update-prompt?id=${prompt._id}`);
	};
	const handleDelete = async (prompt) => {
		console.log(prompt);
		const hasConfirmed = confirm(
			"Are you sure you want to DELETE this prompt? This action is PERMANENT!"
		);

		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${prompt._id}`, {
					method: "DELETE",
				});

				const filteredPrompts = prompts.filter(
					(item) => item._id !== prompt._id
				);

				setPrompts(filteredPrompts);
			} catch (error) {
				console.log(error);
			}
		}
	};

	//	console.log(prompts);

	return (
		<Profile
			name="My"
			desc="Welcome to your profile page"
			data={prompts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default ProfilePage;
