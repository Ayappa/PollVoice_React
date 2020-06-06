export default (state, action) => {
	switch (action.type) {
		case "getAllPoll":
			//console.log(state);
			return {
				...state,
				allPolls: action.payload,
				status: 1,
			};
		case "pollStatus":
			//console.log(state);
			return {
				...state,
				pollStatus: action.payload,
			};
		case "getAnsweredPoll":
			//console.log(state);
			return {
				...state,
				answeredPoll: action.payload,
			};
		case "getCreatedPoll":
			//console.log(state);
			return {
				...state,
				createdPoll: action.payload,
			};
		case "deletePoll":
			//console.log(state);
			return {
				...state,
				createdPoll: state.createdPoll.filter((p) => p.pid !== action.payload),
			};
		case "deleteAnsweredPoll":
			return {
				...state,
				answeredPoll: state.answeredPoll.filter(
					(p) => p.pid !== action.payload
				),
			};

		case "updateSecret":
			return {
				...state,
				createdPoll: action.payload,
			};
		case "searchTextFunction":
			return {
				...state,
				searchText: action.payload,
			};
		case "createTextFunction":
			return {
				...state,
				CreateText: action.payload,
			};

		default:
			return state;
	}
};
