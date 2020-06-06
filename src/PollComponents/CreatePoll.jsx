import React, { useState, useContext, useEffect } from "react";
import PollContext from "../../src/context/Poll_Context/PollContext";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const CreatePoll = () => {
	const pollContext = useContext(PollContext);
	const [pollState, setPollState] = useState({ radio: "#1" });
	// eslint-disable-next-line
	const [cookies, setCookie] = useCookies("");
	const history = useHistory();
    const [loader, setloader] = useState(false);

	useEffect(() => {
		pollContext.createTextFunction(true);
		if (cookies.token === "") {
			history.push("/login");
		}
	}, []);

	const onSubmit = (e) => {
		e.preventDefault();
		setloader(false)
		//console.log(pollState);
		pollContext
			.createPoll(pollState, cookies.token)
			.then((res) => {
				if (res.data === "invalid") {
					console.log(res.data);
					setCookie("token", "");
					history.push("/login");
				} else {
					history.push("/my_polls");
				}
				setloader(true)
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const random = () => {
		const val = Math.floor(Math.random() * 90000) + 10000;
		setPollState((prevState) => ({ ...prevState, secret: val }));
	};
	const onChange = (e) => {
		const { value, name } = e.target;

		setPollState((prevState) => ({ ...prevState, [name]: value }));

		random();
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
			<form onSubmit={onSubmit}>
				<div className='form-row'>
					<div className='form-group col-md-12'>
						<label>
							<h3 className='display-3 text-dark font-weight-normal'>
								Your Question
							</h3>
						</label>
						<textarea
							className='form-control'
							type='text'
							name='question'
							rows='2'
							required
							onChange={onChange}
						></textarea>
					</div>
					<div className='form-group col-md-6'>
						<label>
							<h3 className='display-4 text-dark font-weight-normal'>
								Option Green
							</h3>
						</label>
						<textarea
							className='form-control'
							name='yesQuestion'
							rows='2'
							required
							onChange={onChange}
						></textarea>
					</div>
					<div className='form-group col-md-6'>
						<label>
							<h3 className='display-4 text-dark font-weight-normal'>
								Option Red
							</h3>
						</label>
						<textarea
							className='form-control'
							name='noQuestion'
							rows='2'
							required
							onChange={onChange}
						></textarea>
					</div>
					<div className='form-group col-md-12'>
						<div className='custom-control custom-radio custom-control-inline'>
							<input
								type='radio'
								id='customRadioInline1'
								name='radio'
								className='custom-control-input'
								onChange={onChange}
								value='#1'
								defaultChecked
							/>
							<label
								className='custom-control-label'
								htmlFor='customRadioInline1'
							>
								<h4 className=' text-dark '>Public</h4>
							</label>
						</div>
						<div className='custom-control custom-radio custom-control-inline'>
							<input
								type='radio'
								id='customRadioInline2'
								name='radio'
								className='custom-control-input'
								onChange={onChange}
								value='#2'
							/>
							<label
								className='custom-control-label'
								htmlFor='customRadioInline2'
							>
								<h4 className=' text-dark '>Private with Public</h4>
							</label>
						</div>
						<div className='custom-control custom-radio custom-control-inline'>
							<input
								type='radio'
								id='customRadioInline3'
								name='radio'
								className='custom-control-input'
								onChange={onChange}
								value='#3'
							/>
							<label
								className='custom-control-label'
								htmlFor='customRadioInline3'
							>
								<h4 className=' text-dark '>Private with Passcode</h4>
							</label>
						</div>
						{pollState.radio === "#3" && (
							<div>
								<p>your poll passcode</p>
								<h3
									className=' text-white bg-danger'
									style={{ width: "100px", margin: "auto" }}
								>
									{" "}
									{pollState.secret}
								</h3>
							</div>
						)}
					</div>
				</div>
				<div className='form-group col-md-12'>
					<button disabled={loader} type='submit' className='btn btn-primary'>
						<h4>Create Poll</h4>
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreatePoll;
