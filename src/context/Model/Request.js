import axios from "axios";
const url="https://pollvoiceservice.herokuapp.com";
//const url = "http://localhost:8080";

class Request {
	///registerUser
	async registerUser({ firstName, lastName, email, password }) {
		return await axios.post(url + "/registerUser", {
			firstName,
			lastName,
			email,
			password,
		});
	}

	async loginUser({ email, password }) {
		//console.log("h="+email+password);
		return await axios.post(url + "/loginUser", {
			email,
			password,
		});
	}

	async createPoll(
		{ question, yesQuestion, noQuestion, secret, radio },
		token
	) {
		return await axios.post(
			url + "/postQuestion",
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
			url + "/getAll",

			{
				headers: {
					Authorization: "Bearer " + token,
					//	"Access-Control-Allow-Origin": "*",
				},
			}
		);
	}

	async AnswerPoll(token, val, pid) {
		return await axios.post(url + "/postQuestion/updateYes",{}, {
			headers: {
				Authorization: "Bearer " + token,
				questionId: pid,
				response: val,
			},
		});
	}

	async getAnsweredPoll(token) {
		return await axios.get(
			url + "/answeredQuestion/getAll",

			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);
	}
	async getCreatedPoll(token) {
		return await axios.get(
			url + "/createdQuestion/getAll",

			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		);
	}
	async getOnePoll(token, pId) {
		return await axios.get(
			url + `/postQuestion/${pId}/getOne`,

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
			url + "/postQuestion/delete",
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
			url + "/updateSecret",
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
			url + "/answered/delete",
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

		return await axios.post(url + "/updatePasswordMail", {
			email,
		});
	}
	async updatePassword(token, password) {
		//console.log(token + " " + pid.toString());
		return await axios.post(
			url + "/updatePassword",
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
