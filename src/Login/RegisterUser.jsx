import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/User_Context/UserContext";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const RegisterUser = () => {
	const userContext = useContext(UserContext);
	const [userRegisterState, setUserRegisterState] = useState("");
	// eslint-disable-next-line
	const [cookies, setCookie] = useCookies("");
	const history = useHistory();
	const [alert, setAlert] = useState("");
	const [loader, setloader] = useState(false);
	const [alertSuccess, setAlertSuccess] = useState("");

	useEffect(() => {
		if (cookies.token !== "") {
			history.push("/");
		}
	}, []);

	const onSubmit = (e) => {
		setloader(true);
		e.preventDefault();
		userContext
			.register(userRegisterState)
			.then((res) => {
				console.log(res.data.token);
				if (res.data.token === "alreadyExists") {
					setAlert(res.data.token);
					// eslint-disable-next-line
					const timer = setTimeout(() => {
						setAlert("");
					}, 2000);
				} else {
					setAlertSuccess("Please Cheack your mail to login");
					// eslint-disable-next-line
					const timer = setTimeout(() => {
						setAlertSuccess("");
					}, 4000);
					// userContext.setToken(res.data.token);
					// setCookie("token", res.data.token, { path: "/" });
					// history.push("/");
				}
				setloader(false);
			})
			.catch((err) => {});
	};
	const onChange = (e) => {
		const { name, value } = e.target;
		setUserRegisterState((prevState) => ({ ...prevState, [name]: value }));
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
				<div class='alert alert-danger' role='alert'>
					Email Id already Exists !!!
				</div>
			)}
			{alertSuccess !== "" && (
				<div class='alert alert-success' role='alert'>
					check your mail to login !!!
				</div>
			)}
			<h1 className='text-dark display-1 font-weight-normal paddingHeader'>
				Sigin Up{" "}
			</h1>
			<div className='pollLogin card w-75 bg-light rounded border-secondary mb-10'>
				<form className='was-validated' onSubmit={onSubmit}>
					<div className='form-row'>
						<div className='form-group col-md-6'>
							<label>
								<h4 className='font-weight-bold text-secondary'>First Name</h4>
							</label>
							<input
								type='text'
								className='form-control is-invalid'
								id='inputforFirstName'
								placeholder='FirstName'
								name='firstName'
								onChange={onChange}
								required
							></input>
						</div>
						<div className='form-group col-md-6'>
							<label>
								<h4 className='font-weight-bold text-secondary'>Last Name</h4>
							</label>
							<input
								type='text'
								className='form-control is-invalid'
								id='inputforLastName'
								placeholder='LastName'
								name='lastName'
								onChange={onChange}
								required
							></input>
						</div>
						<div className='form-group col-md-12'>
							<label>
								<h4 className='font-weight-bold text-secondary'>Email</h4>
							</label>
							<input
								type='email'
								className='form-control is-invalid'
								id='inputforemail'
								placeholder='Email'
								name='email'
								onChange={onChange}
								required
							></input>
						</div>
						<div className='form-group col-md-6'>
							<label>
								<h4 className='font-weight-bold text-secondary'>Password</h4>
							</label>
							<input
								type='password'
								className='form-control'
								id='inputforFirstName'
								placeholder='Password'
								name='password'
								onChange={onChange}
								required
							></input>
						</div>
						<div className='form-group col-md-6 custom-control'>
							<label>
								<h4 className='font-weight-bold text-secondary'>
									Conform Password
								</h4>
							</label>
							<input
								type='password'
								className='form-control'
								id='inputforpassword'
								placeholder='Conform Password'
								name='conformPasswword'
								onChange={onChange}
								required
							></input>

							{userRegisterState.password !==
								userRegisterState.conformPasswword && (
								<div type='invalid' className='text-danger'>
									Please enter same password.
								</div>
							)}
						</div>
						<div className='form-group col-md-12'>
							{userRegisterState.password !== null &&
								userRegisterState.password ===
									userRegisterState.conformPasswword && (
									<button
										disabled={loader}
										type='submit'
										className='btn btn-primary'
									>
										<h5 className='font-weight-bold '>Sign Up</h5>
									</button>
								)}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterUser;
