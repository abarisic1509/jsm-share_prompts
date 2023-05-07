"use client";

import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdatePrompt = () => {
	const router = useRouter();
	const params = useSearchParams();
	const promptId = params.get("id");
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: "",
		tag: "",
	});

	useEffect(() => {
		const getPromptDetails = async () => {
			const res = await fetch(`/api/prompt/${promptId}`, { method: "GET" });
			const data = await res.json();

			setPost({
				prompt: data.prompt,
				tag: data.tag,
			});
		};

		if (promptId) getPromptDetails();
	}, [promptId]);

	const updatePrompt = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (!promptId) return alert("Prompt ID not found");

		try {
			const res = await fetch(`/api/prompt/${promptId}`, {
				method: "PATCH",
				body: JSON.stringify({
					...post,
				}),
			});

			if (res.ok) {
				router.push("/profile");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Form
			type="Edit"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSumbit={updatePrompt}
		/>
	);
};

export default UpdatePrompt;
