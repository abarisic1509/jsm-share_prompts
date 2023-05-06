"use client";

import Image from "next/image";
import Link from "next/link";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const Nav = () => {
	const isLoggedIn = true;

	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		const setProvider = async () => {
			const res = await getProviders();
			setProviders(res);
		};

		setProvider();
	}, []);

	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href="/" className="flex gap-2 flex-center">
				<Image
					src="/assets/images/logo.svg"
					alt="Promptopia"
					width={32}
					height={32}
					className="object-contain"
				/>
				<p className="logo_text">Promptopia</p>
			</Link>

			{/* Desktop nav */}
			<div className="sm:flex hidden">
				{isLoggedIn ? (
					<div className="flex gap-3 md:gap-5">
						<Link href="/create-prompt" className="black_btn">
							Create prompt
						</Link>
						<button type="button" onClick={signOut} className="outline_btn">
							Sign out
						</button>
						<Link href="/profile">
							<Image
								src="/assets/images/logo.svg"
								width={40}
								height={40}
								alt="profile"
								className="rounded-full"
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									Sign in
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile nav */}
			<div className="sm:hidden flex relative">
				{isLoggedIn ? (
					<div className="flex">
						<Image
							src="/assets/images/logo.svg"
							width={40}
							height={40}
							alt="profile"
							className="rounded-full cursor-pointer"
							onClick={() => setToggleDropdown((prev) => !prev)}
						/>

						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									Profile
								</Link>
								<Link
									href="/create-prompt"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									Create prompt
								</Link>
								<button
									type="button"
									onClick={() => {
										setToggleDropdown(false);
										signOut;
									}}
									className="mt-5 black_btn w-full"
								>
									Sign out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{/* {providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id)}
									className="black_btn"
								>
									Sign in
								</button>
							))} */}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
