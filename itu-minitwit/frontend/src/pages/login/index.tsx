import DefaultLayout from "@/layouts/DefaultLayout";
import { postLogin } from "@/server/postLogin";
import useUserStore from "@/store/userStore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

export default function LoginPage() {
	const [, setUserIdCookie] = useCookies(["user_id"]);
	const setUserId = useUserStore((state) => state.setUserId);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	return (
		<DefaultLayout>
			<div className="mt-10 bg-gray-300 w-96 rounded-md mx-auto">
				<form
					className="flex flex-col m-2 p-2"
					onSubmit={(e) => handleLogin(e)}
				>
					<input
						className="px-2 py-1 my-4 shadow-md rounded-md"
						placeholder="Username"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						className="px-2 py-1 my-4 shadow-md rounded-md"
						placeholder="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						className="border bg-white rounded-md shadow-md my-4"
						type="submit"
					>
						Login
					</button>
				</form>
			</div>
		</DefaultLayout>
	);

	async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		try {
			const res = await postLogin({ username, password });

			if (res.error) return alert(res.error);

			setUserIdCookie("user_id", res["user_id"]);
			setUserId(res["user_id"]);

			router.push("/");
		} catch (e) {
			// @eslint-ignore
			console.error(e);
		}
	}
}
