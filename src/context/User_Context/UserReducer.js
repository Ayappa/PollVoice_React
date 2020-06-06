export default (state, action) => {
	switch (action.type) {
		case "login":
			return {
				...state,
				userName: action.userName,
			};
		case "register":
			return {
				...state,
				userName: action.email,
				token: action.token,
			};

		case "getAllPoll":
			return {
				...state,
				polls: action.payload,
			};
		case "getOnePoll":
			return {
				...state,
				poll: state.payload,
			};
		case "setToken":
			return {
				...state,
				token: action.payload,
			};
		default:
			return state;
	}
};
