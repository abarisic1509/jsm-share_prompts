import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSumbit }) => {
	return (
		<section className="w-full max-w-full flex-start flex-col">
			<h1 className="head_text text-left">
				<span className="blue_gradient">{type}</span> Post
			</h1>
			<p className="desc text-left max-w-md">
				{type} and share amazing prompts with the world
			</p>

			<form
				onSubmit={handleSumbit}
				className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
			>
				<label htmlFor="prompt">
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Your AI prompt
					</span>

					<textarea
						name="prompt"
						id="prompt"
						placeholder="Write your prompt here..."
						value={post.prompt}
						required
						onChange={(e) => setPost({ ...post, prompt: e.target.value })}
						className="form_textarea"
					></textarea>
				</label>
				<label htmlFor="tag">
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Tag
						<span className="font-normal"> (#product, #webdev, #idea)</span>
					</span>

					<input
						id="tag"
						placeholder="#tag"
						value={post.tag}
						required
						onChange={(e) => setPost({ ...post, tag: e.target.value })}
						className="form_input"
					/>
				</label>

				<div className="flex-end mx-3 mb-5 gap-4">
					<Link href="/" className="text-gray-500 text-sm">
						Cancel
					</Link>
					<button
						type="submit"
						disabled={submitting}
						className="px-5 py-1.5 text-sm text-white bg-primary-orange rounded-full"
					>
						{submitting ? `${type}...` : `${type}`}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
