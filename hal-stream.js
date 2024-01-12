const { default: axios } = require("axios");

const url =
	"https://api.hal.xyz/v1/streams/a52a3d6c-a5d9-45ae-a856-09d789b45f1f/events";
const options = {
	method: "GET",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		"X-Api-Key": "UluX9VGKO0lh4MfjiHHypqBW0atQ1oDECRCaHYBSnio=",
	},
};

axios(url, options)
	.then((res) => console.log(res.data))
	.catch((err) => console.error("error:" + err));
