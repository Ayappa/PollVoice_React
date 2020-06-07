import React, { useContext, useState } from "react";
import UserContext from "../context/User_Context/UserContext";
import { useCookies } from "react-cookie";
//import GoogleLogin from "react-google-login";

const ForgotPassword = () => {
	const userContext = useContext(UserContext);
	const [userState, setUserState] = useState("");
	// eslint-disable-next-line
	const [cookies, setCookie] = useCookies("");
	const [alert, setAlert] = useState("");
	const [status, setStatus] = useState("");
	const [loader, setloader] = useState(false);
	const onChange = (e) => {
		setUserState(e.target.value);
	};

	const onSubmit = (e) => {
        setloader(true);
		e.preventDefault();
		userContext
			.sendMail(userState)
			.then((res) => {
				console.log(res.data);
				if (res.data === "email sent") {
                    setloader(false);
					setStatus("Please check your mail , link is valid for 10minutes !!!");
					// eslint-disable-next-line
					const timer = setTimeout(() => {
						setStatus("");
					}, 2000);
				} else {
                    	setloader(false);
					setAlert("User dont exist !!!");
					// eslint-disable-next-line
					const timer = setTimeout(() => {
						setAlert("");
					}, 2000);
				}
				// eslint-disable-next-line
			})
			.catch((err) => {});
	
		//console.log(token);
	};
	return (
		<div className='container'>
			{loader && (
				<div class=''>
					<div class='spinner-border' role='status'>
						<span class='sr-only'>Loading...</span>
					</div>
				</div>
			)}
			{alert !== "" && (
				<div className='alert alert-danger' role='alert'>
					{alert}
				</div>
			)}
			{status !== "" && (
				<div className='alert alert-success' role='alert'>
					{status}
				</div>
			)}

			<h1 className='text-dark display-1 font-weight-normal paddingHeader'>
				Forgot Password
			</h1>
			<div className='pollLogin card w-50 bg-light rounded border-secondary mb-10'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<label>
							<h4 className='font-weight-bold text-secondary'>Email address</h4>
						</label>
						<input
							type='email'
							className='form-control'
							name='email'
							aria-describedby='emailHelp'
							placeholder='Email'
							onChange={onChange}
							required
						/>
					</div>

					<button type='submit' className='btn btn-primary'>
						send verification link
					</button>
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;
