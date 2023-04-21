import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthProvider";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
	const { fetcher, setAsLogged } = useAuth();

	const {
		register,
		handleSubmit,
		setValue,
		setError,
		formState: { errors },
	} = useForm({ mode: "all" });

	const onSubmit = (data) => {
		fetcher(`${BACKEND_URL}/login`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				email: "mario.rossi@outlook.it",
				password: "20111996",
			}),
		})
			.then((response) => response.json())
			.then((data) => setAsLogged(data.user, data["access_token"]))
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="max-w-xl p-12 bg-gray-100 rounded-xl w-full flex flex-col">
			<h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
				Login
			</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-3">
					<label
						htmlFor="email"
						className={`block mb-2 text-sm font-medium ${
							errors.email ? "text-red-700" : "text-gray-900"
						}`}
					>
						Email
					</label>
					<input
						{...register("email", { required: 'Field "Email" is required' })}
						type="email"
						className={`${
							errors.email
								? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
								: "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
						} block w-full p-2.5 text-sm rounded-lg`}
					/>
					{errors.email && (
						<p className="mt-2 text-sm text-red-600 dark:text-red-500">
							{errors.email.message}
						</p>
					)}
				</div>

				<div className="mb-6">
					<label
						htmlFor="password"
						className={`block mb-2 text-sm font-medium ${
							errors.password ? "text-red-700" : "text-gray-900"
						}`}
					>
						Password
					</label>
					<input
						{...register("password", {
							required: 'Field "Password" is required',
						})}
						type="password"
						className={`${
							errors.password
								? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500"
								: "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
						} block w-full p-2.5 text-sm rounded-lg`}
					/>
					{errors.password && (
						<p className="mt-2 text-sm text-red-600 dark:text-red-500">
							{errors.password.message}
						</p>
					)}
				</div>

				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
