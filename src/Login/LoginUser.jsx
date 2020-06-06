import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/User_Context/UserContext";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
//import GoogleLogin from "react-google-login";

const LoginUser = () => {
	const userContext = useContext(UserContext);
	const [userState, setUserState] = useState("");
	// eslint-disable-next-line
	const [cookies, setCookie] = useCookies("");
	const history = useHistory();
	const [alert, setAlert] = useState("");
	const [loader, setloader] = useState(false);

	const onChange = (e) => {
		const { name, value } = e.target;
		setUserState((prevState) => ({ ...prevState, [name]: value }));
	};

	const forgot = (e) => {
		history.push("/forgotPassword");
	};

	useEffect(() => {
		if (cookies.token !== "") {
			history.push("/");
		}
	}, []);

	const onSubmit = (e) => {
		setloader(true);
		e.preventDefault();
		userContext
			.login(userState)
			.then((res) => {
				//console.log(res.data.token);
				if (res.data.token === "user dont exists") {
					setAlert("Please make sure you enter valid Email Id !!!");
				} else if (res.data.token === "Incorrect creditional") {
					setAlert("Please make sure you enter a valid password !!!");
				} else {
					userContext.setToken(res.data.token);
					setCookie("token", res.data.token, { path: "/" });
					history.push("/");
				}
				// eslint-disable-next-line
				const timer = setTimeout(() => {
					setAlert("");
				}, 2000);
				setloader(false);
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

			<h1 className='text-dark display-1 font-weight-normal paddingHeader'>
				Login{" "}
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
							placeholder='Enter'
							onChange={onChange}
							required
						/>
					</div>
					<div className='form-group'>
						<label>
							<h4 className='font-weight-bold text-secondary'>Password</h4>
						</label>
						<input
							type='password'
							className='form-control'
							name='password'
							placeholder='Password'
							onChange={onChange}
							required
						/>
					</div>

					<button type='submit' className='btn btn-primary'>
						Submit
					</button>

					<div className='container'>
						<button
							disabled={loader}
							type='submit'
							className='btn text-primary btn-outline-light'
							onClick={forgot}
						>
							Forgot Password ?
						</button>
					</div>
				</form>
			</div>
			{/* <div style={{ marginTop: "10px" }}>
				<GoogleLogin
					clientId='658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
					buttonText='Login with google'
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					cookiePolicy={"single_host_origin"}
				/>
			</div> */}
		</div>
	);
};

export default LoginUser;
