import React, { useEffect, useContext, useState } from "react";
import Poll from "./Poll";
import PollContext from "../context/Poll_Context/PollContext";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const GetPoll = (props) => {
	const pollContext = useContext(PollContext);
	// eslint-disable-next-line
	const [cookies, setCookie] = useCookies("");
	const history = useHistory();
	var [poll, setPoll] = useState("");
	var [alert, setAlert] = useState("");
    var [pollPassword, setPollPassword] = useState("");
    const [loader, setloader] = useState(false);

	useEffect(() => {
        setloader(true)
        pollContext.createTextFunction(true);
		if (cookies.token === "" && cookies.token === "") {
			history.push("/login");
		}

		pollContext.getOnePoll(cookies.token, props.match.params.id).then((res) => {
			if (res.data === "") {
				setAlert("invalid");
				// eslint-disable-next-line
				const timer = setTimeout(() => {
					setAlert("");
					//	history.push("/");
				}, 2000);
			} else {
				setPoll( res.data);
				if (res.data.radio === "#3") {
					setAlert("passCode");
				}else{
                    setAlert("passCodeTrue"); 
                }
                setloader(false)
			}
		});
	}, []);

	return (
		<div style={{ paddingBottom: "35px" }}>
            {loader && (
				<div class=''>
					<div class='spinner-border' role='status'>
						<span class='sr-only'>Loading...</span>
					</div>
				</div>
			)}
			{alert !== "" && alert === "invalid" && (
				<div class='container alert alert-danger' role='alert'>
					<h1> Question is no longer avaliable or Invalid request !!!</h1>
				</div>
			)}

			{alert !== "" && alert === "passCodeFalse" && (
				<div class='container alert alert-danger' role='alert'>
					<h1> Invalid passcode!!!</h1>
				</div>
			)}

			{alert !== "" && (alert === "passCode" || alert === "passCodeFalse") && (
				<div className='container alert alert-success' role='alert'>
					<h4 className='alert-heading'>Please enter the poll passcode</h4>
					<input
						type='text'
						class='form-control'
						aria-describedby='emailHelp'
						placeholder='passcode'
						style={{
							width: "150px",
							margin: "auto",
							marginBottom: "10px",
							textAlign: "center",
						}}
						onChange={(e) => {
							setPollPassword(e.target.value);
							//console.log(pollPassword);
						}}
					/>

					<button
						type='button'
						// onClick={() => setDeleteAlert("")}
						className='btn btn-primary'
						style={{ float: "centre", marginLeft: "10px" }}
						onClick={(e) => {
						//	console.log(pollPassword);
							if (pollPassword === poll.secret) {
                                setAlert("passCodeTrue");
                               // console.log("true")
							} else {
                                setAlert("passCodeFalse");
                               // console.log("false")
							}
						}}
					>
						submit
					</button>
				</div>
			)}

			{alert === "passCodeTrue" && (
				<>
					<li key={poll.pid}>
						<Poll poll={poll} />
					</li>
				</>
			)}
		</div>
	);
};

export default GetPoll;
