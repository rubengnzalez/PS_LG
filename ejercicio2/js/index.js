// Create connection manager object that compiles all connection operations like AJAX requests.
var connectionMngr = {
	requestCategoriesData: function(){
		// Check if url is defined so that request can be sent
		if (this.url.length == 0){
			console.log("requestCategoriesData - Target URL is empty");
			return false;
		}
		// Send AJAX Request to the previously specified URL and call controller.manageCategoriesData to manage the returned data
		$.getJSON(this.url, function(result){
			controller.manageCategoriesData(result);
		})
		// Set done function, which runs if request is successful
		.done(function(){
			console.log("requestCategoriesData - AJAX Request Success: " + this.url);
		})
		// Set fail function, which runs if request fails 
		.fail(function(){
			console.log("requestCategoriesData - AJAX Request Failed: " + this.url);
		});
	}
};

var controller = {
	getCategoriesData: function(){
		connectionMngr.url = "http://s3.amazonaws.com/logtrust-static/test/test/data1.json";
		connectionMngr.requestCategoriesData();
	},
	manageCategoriesData: function(result){
		//$("#loading").hide();
		//alert("manageCategoriesData was called!!. Data size: " + result.length);

		// Check data format to know how to normalize

	}	
}



$(document).ready(function(){
	//connectionMngr.url = "http://s3.amazonaws.com/logtrust-static/test/test/data1.json";
	//connectionMngr.requestCategoriesData();
	$("#butCategories").click(function(){
		$("#loading").show();
		controller.getCategoriesData();
	});
});



