import React, { useEffect, useContext, useState } from "react";
import Poll from "./Poll";
import PollContext from "../../src/context/Poll_Context/PollContext";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const MyPolls = () => {
	const pollContext = useContext(PollContext);
	const { createdPoll } = pollContext;
	// eslint-disable-next-line
	const [cookies, setCookie] = useCookies("");
	const history = useHistory();
	const [loader, setloader] = useState(false);

	useEffect(() => {
		setloader(true);
		pollContext.createTextFunction(false);
		if (cookies.token === "") {
			history.push("/login");
		}
		var status = pollContext.getCreatedPoll(cookies.token);
		status.then((r) => {
			if (r === "err") {
				setCookie("token", "");
				history.push("/login");
			}
		});
		setloader(false);
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
			{createdPoll.length === 0 && (
				<h1 className='display-1 font-weight-bold text-dark'>
					You Haven't created anything !!!
				</h1>
			)}

			{createdPoll.length !== 0 &&
				createdPoll.map((poll) => (
					<li key={poll.pid}>
						<Poll poll={poll} myPoll={1} />
					</li>
				))}
		</div>
	);
};

export default MyPolls;
