import axios from "axios";

class Request {
	///registerUser
	async registerUser({ firstName, lastName, email, password }) {
		return await axios.post("http://localhost:8080/registerUser", {
			firstName,
			lastName,
			email,
			password,
		});
	}

	async loginUser({ email, password }) {
		//console.log("h="+email+password);
		return await axios.post("http://localhost:8080/loginUser", {
			email,
			password,
		});
	}

	async createPoll(
		{ question, yesQuestion, noQuestion, secret, radio },
		token
	) {
		return await axios.post(
			"http://localhost:8080/postQuestion",
			{
				question,
				yes: 0,
				no: 0,
				yesQuestion,
				noQuestion,
				secret: secret.toString(),
				radio,
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);
	}

	async getAllPoll(token) {
		return await axios.get(
			"http://localhost:8080/getAll",

			{
				headers: {
					Authorization: "Bearer " + token,
					//	"Access-Control-Allow-Origin": "*",
				},
			}
		);
	}

	async AnswerPoll(token, val, pid) {
		return await axios.post(
			"http://localhost:8080/postQuestion/updateYes",
			{
				questionId: pid,
				response: val,
			},
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);
	}

	async getAnsweredPoll(token) {
		return await axios.get(
			"http://localhost:8080/answeredQuestion/getAll",

			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);
	}
	async getCreatedPoll(token) {
		return await axios.get(
			"http://localhost:8080/createdQuestion/getAll",

			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);
	}
	async getOnePoll(token, pId) {
		return await axios.get(
			`http://localhost:8080/postQuestion/${pId}/getOne`,

			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);
	}

	async deletePoll(token, pid) {
		console.log(token + " " + pid.toString());

		return await axios.post(
			"http://localhost:8080/postQuestion/delete",
			{},

			{
				headers: {
					pollId: pid,
					Authorization: "Bearer " + token,
				},
			}
		);
	}

	async updateSecret(token, pid, secret) {
		//console.log(token + " " + pid.toString());

		return await axios.post(
			"http://localhost:8080/updateSecret",
			{},

			{
				headers: {
					pollId: pid,
					Authorization: "Bearer " + token,
					secret: secret,
				},
			}
		);
	}

	async deleteAnsweredPoll(token, pid) {
		//console.log(token + " " + pid.toString());

		return await axios.post(
			"http://localhost:8080/answered/delete",
			{},

			{
				headers: {
					pollId: pid,
					Authorization: "Bearer " + token,
				},
			}
		);
	}

	async sendMail(email) {
		//console.log(token + " " + pid.toString());

		return await axios.post("http://localhost:8080/updatePasswordMail", {
			email,
		});
	}
	async updatePassword(token, password) {
		//console.log(token + " " + pid.toString());
		return await axios.post(
			"http://localhost:8080/updatePassword",
			{
				password,
			},
			{
				headers: {
					Authorization: token,
				},
			}
		);
	}
}

export default new Request();
