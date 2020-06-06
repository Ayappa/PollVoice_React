import React, { useReducer, useState } from "react";
import PollContext from "./PollContext";
import pollReducer from "./PollReducer";
import Request from "../Model/Request";
//import axios from "axios";

const PollState = (props) => {
	var initialState = {
		allPolls: [],
		pollStatus: {},
		answeredPoll: [],
		createdPoll: [],
		searchText: "",
		CreateText: false,
	};

	const [state, dispatch] = useReducer(pollReducer, initialState);
	// eslint-disable-next-line
	///create poll
	const [constPoll, setconstPoll] = useState("");
	const [constAnsweredPoll, setConstAnsweredPoll] = useState("");
	const [constCreatedPoll, setConstCreatedPoll] = useState("");

	const searchTextFunction = (text) => {
		dispatch({ type: "searchTextFunction", payload: text });
		if (text === "") {
			dispatch({ type: "getAllPoll", payload: constPoll });
			dispatch({ type: "getAnsweredPoll", payload: constAnsweredPoll });
			dispatch({ type: "getCreatedPoll", payload: constCreatedPoll });
		} else {
			if (constPoll.length !== 0) {
				var filteredPolls = constPoll.filter((poll) =>
					poll.question.includes(text)
				);
				dispatch({ type: "getAllPoll", payload: filteredPolls });
			}
			if (constAnsweredPoll.length !== 0) {
				var filteredAnsweredPolls = constAnsweredPoll.filter((poll) =>
					poll.question.includes(text)
				);
				dispatch({ type: "getAnsweredPoll", payload: filteredAnsweredPolls });
			}
			if (constCreatedPoll.length !== 0) {
				var filteredCreatedPolls = constCreatedPoll.filter((poll) =>
					poll.question.includes(text)
				);
				dispatch({ type: "getCreatedPoll", payload: filteredCreatedPolls });
			}
		}
	};
	///create poll
	const createTextFunction = (state) => {
		dispatch({ type: "createTextFunction", payload: state });
	};

	///create poll
	const createPoll = (poll, token) => {
		const tokenBearer = "Bearer " + token;
		return Request.createPoll(poll, tokenBearer);
	};

	//answer poll
	const AnswerPoll = (token, val, pid) => {
		return Request.AnswerPoll(token, val, pid);
	};

	///getAnswered Poll
	const getAnsweredPoll = (token) => {
		return Request.getAnsweredPoll(token)
			.then((res) => {
				if (res.data === "invalid") {
					return "err";
				} else {
					dispatch({ type: "getAnsweredPoll", payload: res.data });
					setConstAnsweredPoll(res.data);
				}
			})
			.catch((err) => {});
	};
	///delete poll
	const deletePoll = (token, pid) => {
		dispatch({ type: "deletePoll", payload: pid });
		return Request.deletePoll(token, pid);
	};
	///deleteAnsweredPoll
	const deleteAnsweredPoll = (token, pid) => {
		dispatch({ type: "deleteAnsweredPoll", payload: pid });
		return Request.deleteAnsweredPoll(token, pid);
	};

	///updateSecret
	const updateSecret = (token, pid, secret) => {
		const res = state.createdPoll.findIndex((p) => p.pid === pid);
		const temparr = state.createdPoll;
		temparr[res].secret = secret;
		dispatch({ type: "updateSecret", payload: temparr });
		return Request.updateSecret(token, pid, secret);
	};
	///getAll poll
	const getAllPoll = (token) => {
		return Request.getAllPoll(token)
			.then((res) => {
				//console.log(res);
				if (res.data === "invalid") {
					return "err";
				} else {
					dispatch({ type: "getAllPoll", payload: res.data });
					setconstPoll(res.data);
				}
			})
			.catch((err) => {
				console.log(err.status);
			});
	};

	///get one poll
	const getOnePoll = (token, pId) => {
		return Request.getOnePoll(token, pId);
	};

	///get created poll
	const getCreatedPoll = (token) => {
		return Request.getCreatedPoll(token)
			.then((res) => {
				if (res.data === "invalid") {
					return "err";
				} else {
					dispatch({ type: "getCreatedPoll", payload: res.data });
					setConstCreatedPoll(res.data);
				}
			})
			.catch((err) => {});
	};
	return (
		<PollContext.Provider
			value={{
				pollStatus: state.pollStatus,
				allPolls: state.allPolls,
				answeredPoll: state.answeredPoll,
				createdPoll: state.createdPoll,
				searchText: state.searchText,
				CreateText: state.CreateText,
				createPoll,
				getAnsweredPoll,
				getAllPoll,
				getOnePoll,
				getCreatedPoll,
				deletePoll,
				AnswerPoll,
				deleteAnsweredPoll,
				updateSecret,
				searchTextFunction,
				createTextFunction,
			}}
		>
			{props.children}
		</PollContext.Provider>
	);
};

export default PollState;
