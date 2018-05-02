// Create connection manager object that compiles all connection operations like AJAX requests.
var connectionMngr = {
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

// Define target URL's. Ideally, they would be taken from a configuration/properties file.
var DATA1_URL = "http://s3.amazonaws.com/logtrust-static/test/test/data1.json";
var DATA2_URL = "http://s3.amazonaws.com/logtrust-static/test/test/data2.json";
var DATA3_URL = "http://s3.amazonaws.com/logtrust-static/test/test/data3.json";

var controller = {
	normCategories: {},
	getCategoriesData: function(){
		connectionMngr.requestCategoriesData(DATA2_URL);
	},
	manageCategoriesData: function(result){
		// Check data format to know how to normalize
		if (result[0].hasOwnProperty("d")){
			this.normalizeCatData1(result);
		}else if(result[0].hasOwnProperty("myDate")){
			this.normalizeCatData2(result);
		}else if(result[0].hasOwnProperty("raw")){
			this.normalizeCatDataRaw(result);
		}

	},
	normalizeCatData1: function(result){
		for(var i=0; i<result.length; i++){
			var catObj = {};
			if(this.normCategories.hasOwnProperty(result[i].cat.toUpperCase())){
				catObj = this.normCategories[result[i].cat.toUpperCase()];
				// Add current value to totalValue property
				catObj.totalValue += result[i].value;
				// Add current value to accumulator by date (in millis)
				if(catObj.hasOwnProperty(result[i].d)){
					catObj[result[i].d] += result[i].value;
				}else{
					catObj[result[i].d] = result[i].value;
				}
			} else{
				catObj = {totalValue: result[i].value};
				catObj[result[i].d] = result[i].value;
			}
			// Update category data
			this.normCategories[result[i].cat.toUpperCase()] = catObj;
		}
		console.log(this.normCategories);
	},
	normalizeCatData2: function(result){
		console.log("NORMALIZANDO Data2");
		for(var i=0; i<result.length; i++){
			var catObj = {};
			if(this.normCategories.hasOwnProperty(result[i].categ.toUpperCase())){
				catObj = this.normCategories[result[i].categ.toUpperCase()];
				// Add current value to totalValue property
				catObj.totalValue += result[i].val;
				// Add current value to accumulator by date (in millis)
				if(catObj.hasOwnProperty(Date.parse(result[i].myDate))){
					// Use Date.parse to store the date as Date / millis
					catObj[Date.parse(result[i].myDate)] += result[i].val;
				}else{
					catObj[Date.parse(result[i].myDate)] = result[i].val;
				}
			} else{
				catObj = {totalValue: result[i].val};
				catObj[Date.parse(result[i].myDate)] = result[i].val;
			}
			// Update category data
			this.normCategories[result[i].categ.toUpperCase()] = catObj;
		}
		console.log(this.normCategories);
	},
	normalizeCatDataRaw: function(result){
		console.log("NORMALIZANDO DataRaw");
		
		console.log(this.normCategories);
	}
}



$(document).ready(function(){
	$("#butCategories").click(function(){
		$("#loading").show();
		controller.getCategoriesData();
		//drawCategoriesPie();
	});
});


function drawCategoriesPie() {
  var ctx = document.getElementById("categoriesPie");
  var chartJsPie = new Chart(ctx, {
    type: 'pie',
    data: {
      	labels: ["CAT 1", "CAT 2", "CAT 3", "CAT 4"],
      	datasets: [{
        	data: [16400.56839216775, 15535.630675525977, 13573.094224498793, 5353.257812387358],
        	backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#AA6384"],
        	hoverBorderColor: ["#333", "#333", "#333", "#333"],
        	hoverBorderWidth: [3, 3, 3, 3]
      	}]
    },
    options: {
    	cutoutPercentage:1,
    }
  });
}


