import React, { useContext, useState } from "react";
import PollContext from "../context/Poll_Context/PollContext";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
const Poll = (poll) => {
	const pollContext = useContext(PollContext);

	// eslint-disable-next-line
	const [cookies, setCookie] = useCookies("");
	const [total, setTotal] = useState(poll.poll.yes + poll.poll.no);
	const [alert, setAlert] = useState("");
	const [deleteAlert, setDeleteAlert] = useState("");

	const greenSubmit = () => {
		pollContext
			.AnswerPoll(cookies.token, 1, poll.poll.pid)
			.then((res) => {
				update(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const redSubmit = () => {
		pollContext.AnswerPoll(cookies.token, -1, poll.poll.pid).then((res) => {
			update(res.data);
		});
	};

	const onDelete = () => {
		if (deleteAlert === 1) {
			pollContext.deletePoll(cookies.token, poll.poll.pid).then((res) => {});
		} else {
			pollContext
				.deleteAnsweredPoll(cookies.token, poll.poll.pid)
				.then((res) => {});
		}
		setDeleteAlert(0);
	};
	// eslint-disable-next-line
	const random = () => {
		const val = Math.floor(Math.random() * 90000) + 10000;
		pollContext.updateSecret(cookies.token, poll.poll.pid, val);
	};
	const update = (pollStatus) => {
		if (pollStatus.msg !== "alreadyVoted") {
			setTotal(total + 1);
			poll.poll.yesPercent = pollStatus.yes;
			poll.poll.noPercent = pollStatus.no;
			setAlert("success");
		} else {
			setAlert("no");
		}
		// eslint-disable-next-line
		const timer = setTimeout(() => {
			setAlert("");
		}, 2000);
	};

	return (
		<div className='row pollMain '>
			<div className='  poll card text-black rounded border-secondary bg-light w-75 '>
				{deleteAlert !== "" && (
					<div className='alert alert-danger' role='alert'>
						<h4 className='alert-heading'>Are you sure you want to delete ?</h4>
						<button
							type='button'
							onClick={onDelete}
							className='btn btn-danger'
							style={{ float: "centre", marginRight: "10px" }}
						>
							Yes
						</button>
						<button
							type='button'
							onClick={() => setDeleteAlert("")}
							className='btn btn-success'
							style={{ float: "centre", marginLeft: "10px" }}
						>
							No
						</button>
					</div>
				)}
				<div className='card-header '>
					{poll.myPoll === 1 && (
						<button
							type='button'
							onClick={() => {
								if (poll.myPoll === 1) {
									setDeleteAlert(1);
								} else {
									setDeleteAlert("1");
								}
							}}
							className='btn btn-danger'
							style={{ float: "right" }}
						>
							Delete
						</button>
					)}
					<h3 className='card-title text-secondary'>{poll.poll.question}</h3>
				</div>
				<div className='card-body' style={{ height: "auto" }}>
					<div className='progress' style={{ height: "20px" }}>
						<div
							className='progress-bar progress-bar-striped bg-success progress-bar-animated'
							role='progressbar'
							style={{ width: poll.poll.yesPercent }}
						>
							{poll.poll.yesPercent}
						</div>
						<div
							className='progress-bar progress-bar-striped bg-danger progress-bar-animated'
							role='progressbar'
							style={{ width: poll.poll.noPercent }}
						>
							{poll.poll.noPercent}
						</div>
					</div>
					{poll.answered !== "1" && (
						<div className='row' style={{ paddingTop: "10px" }}>
							<div className='col-sm-6'>
								<button
									type='button'
									className='btn btn-success btn-lg  float-centre'
									onClick={greenSubmit}
								>
									{poll.poll.yesQuestion}
								</button>
							</div>
							<div className='col-sm-6'>
								<button
									type='button'
									className='btn btn-danger btn-lg  float-centre'
									onClick={redSubmit}
								>
									{poll.poll.noQuestion}
								</button>
							</div>
						</div>
					)}
					<p style={{ height: "0px", paddingBottom: "5px" }}>out of {total}</p>
					{poll.poll.radio === "#3" && poll.myPoll === 1 && (
						<div>
							<h2>
								your poll passcode<span> </span>
								<span
									className=' text-white bg-danger'
									style={{ width: "100px", margin: "auto" }}
								>
									{"       "}
									{poll.poll.secret}
								</span>
								<span> </span>
								<span style={{ paddingLeft: "10px" }}>
									<button
										className='icon-retweet btn-sm btn btn-outline-info'
										onClick={random}
									></button>
								</span>
							</h2>
						</div>
					)}

					{(poll.poll.radio === "#2" || poll.poll.radio === "#3") && (
						<div>
							<p>
								share the link with friends :
								<Link to={`/postQuestion/${poll.poll.pid}/getOne`}>
									https://pollvoicefrontend.herokuapp.com/postQuestion/
									{poll.poll.pid}/getOne
								</Link>
							</p>
						</div>
					)}
				</div>
				<div className='card-footer text-muted'>
					Posted by {poll.poll.user.firstName} {poll.poll.user.lastName} on{" "}
					{poll.poll.date}
				</div>
				{alert !== "" && alert === "success" && (
					<div class='alert alert-success' role='alert'>
						Response Noted!!
					</div>
				)}
				{alert !== "" && alert === "no" && (
					<div className='alert alert-danger' role='alert'>
						Already Voted!!!
					</div>
				)}
			</div>
		</div>
	);
};

export default Poll;
