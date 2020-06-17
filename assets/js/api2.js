const fetch = require("node-fetch")

const api_url = "https://api.exchangeratesapi.io/latest"
async function myAPI() {
	const response = await fetch(api_url)
	const data = await response.json();
    const {rates} = data;
    
    document.getElementById("currAPI").textContent = rates
}
myAPI();
