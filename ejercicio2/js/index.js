// Create connection manager object that compiles all connection operations like AJAX requests.
var ConnectionMngr = {
	getCategoriesData: function(){
		// Check if url is defined so that request can be sent
		if (this.url.length == 0){
			console.log("getCategoriesData - Target URL is empty");
			return false;
		}
		// Send AJAX Request to the previously specified URL and sets normalizeCategoriesData as function to be called when response is received
		$.getJSON(this.url, normalizeCategoriesData)
		// Set done function, which runs if request is successful
		.done(function(){
			console.log("getCategoriesData - AJAX Request Success");
		})
		// Set fail function, which runs if request fails 
		.fail(function(){
			console.log("getCategoriesData - AJAX Request Failed")
		});
	}
};

function normalizeCategoriesData(result){
	alert("normalizeCategoriesData was called!!. Data size: " + result.length);

}

$(document).ready(function(){
	ConnectionMngr.url = "http://s3.amazonaws.com/logtrust-static/test/test/data1.json";
	ConnectionMngr.getCategoriesData();
	alert("HELLOOOOO");
});
