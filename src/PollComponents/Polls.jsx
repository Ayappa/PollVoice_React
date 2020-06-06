import React, { useEffect, useContext,useState } from "react";
import Poll from "./Poll";
import PollContext from "../context/Poll_Context/PollContext";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const Polls = () => {
	
	const pollContext = useContext(PollContext);
	const { allPolls } = pollContext;
	const history = useHistory();
	// eslint-disable-next-line
	const [cookies, setCookie] = useCookies(['token']);
	const [loader, setloader] = useState(false);

	useEffect(() => {
		setloader(true)
		pollContext.createTextFunction(false);
		///here
		if (cookies.token === "" ) {
			history.push("/login");
		}
		var status = pollContext.getAllPoll(cookies.token);
		status.then((r) => {
			if (r === "err") {
				setCookie("token", "");
				///here
				//userContext.setToken("");
				history.push("/login");
			}
		});
		setloader(false)
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
			{allPolls.length === 0 && (
				<h1 className='display-1 font-weight-bold text-dark'>
					post poll and get opnion from world !!!
				</h1>
			)}
			{allPolls.length !== 0 &&
				allPolls.map((poll) => (
					<li key={poll.pid}>
						<Poll poll={poll} />
					</li>
				))}
		</div>
	);
};

export default Polls;
