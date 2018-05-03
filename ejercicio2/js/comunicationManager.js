// Create connection manager object that compiles all connection operations like AJAX requests.
var connectionMngr = {
	// Generic function that receives URL as parameter and calls controller when response is received
	requestCategoriesData: function(url){
		// Check if url is defined so that request can be sent
		if (url.length == 0){
			console.log("requestCategoriesData - Target URL is empty");
			return false;
		}
		// Send AJAX Request to the previously specified URL and call controller.manageCategoriesData to manage the returned data
		$.getJSON(url, function(result){
			controller.manageCategoriesData(result);
		})
		// Set done function, which runs if request is successful
		.done(function(){
			console.log("requestCategoriesData - AJAX Request Success: " + url);
		})
		// Set fail function, which runs if request fails 
		.fail(function(){
			console.log("requestCategoriesData - AJAX Request Failed: " + url);
		});
	}
};