import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/User_Context/UserContext";
import { useHistory } from "react-router-dom";

const RedirectForgetPassword = (props) => {
	const userContext = useContext(UserContext);
	const [userState, setUserState] = useState("");
	const [passwordErr, setPasswordErr] = useState(false);
	const history = useHistory();
	const [alert, setAlert] = useState("");
	const [status, setStatus] = useState("");
	const [loader, setloader] = useState(false);

	const onChange = (e) => {
		const { name, value } = e.target;
		setUserState((prevState) => ({ ...prevState, [name]: value }));
		if (name === "confirmPassword") {
			if (userState.password !== value) {
				setPasswordErr(true);
			} else {
				setPasswordErr(false);
			}
		}
	};

	const onSubmit = (e) => {
		setloader(true);
		e.preventDefault();
		console.log(userState.password);
		userContext
			.updatePassword(props.match.params.token, userState.password)
			.then((res) => {
                setloader(false);
				console.log(res.data);
				if (res.data === "true") {
					setStatus("Password Updated !!!");
					setTimeout(() => {
						history.push("/");
					}, 2000);
				} else {
                    setloader(false);
					setAlert("Invalid Link !!!");
					setTimeout(() => {
						history.push("/");
					}, 2000);
				}
				setloader(false);
				// eslint-disable-next-line
			})
            .catch((err) => {});
          
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
			{passwordErr && (
				<div className='alert alert-danger' role='alert'>
					make sure passwords match
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
				Reset Password{" "}
			</h1>
			<div className='pollLogin card w-50 bg-light rounded border-secondary mb-10'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<label>
							<h4 className='font-weight-bold text-secondary'>Password</h4>
						</label>
						<input
							type='password'
							className='form-control'
							name='password'
							aria-describedby='emailHelp'
							placeholder='password'
							onChange={onChange}
							required
						/>
					</div>
					<div className='form-group'>
						<label>
							<h4 className='font-weight-bold text-secondary'>
								Confirm Password
							</h4>
						</label>
						<input
							type='password'
							className='form-control'
							name='confirmPassword'
							aria-describedby='emailHelp'
							placeholder='Confirm Password'
							onChange={onChange}
							required
						/>
					</div>

					{!passwordErr && (
						<button type='submit' disabled={loader} className='btn btn-primary'>
							Change
						</button>
					)}
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
export default RedirectForgetPassword;
