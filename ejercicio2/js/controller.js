
// Define target URL's. Ideally, they would be taken from a configuration/properties file.
var DATA1_URL = "http://s3.amazonaws.com/logtrust-static/test/test/data1.json";
var DATA2_URL = "http://s3.amazonaws.com/logtrust-static/test/test/data2.json";
var DATA3_URL = "http://s3.amazonaws.com/logtrust-static/test/test/data3.json";

var controller = {
	// Define the data sources (URLs) from which we are going to obtain the categories
	catDatasources: [DATA1_URL, DATA2_URL, DATA3_URL],
	catResponded: 0,
	// Categories normalized
	normCategories: {},
	getCategoriesData: function(){
		// reset value
		this.catResponded = 0;
		if(this.catDatasources.length > 0){
			for(var i=0; i<this.catDatasources.length; i++){
				connectionMngr.requestCategoriesData(this.catDatasources[i]);
			}
		}else{
			console.log("ERROR - There are not data sources defined for Categories");
			alert("Data could not be retrieved. No data sources available. Please, contact admin.");
		}
	},
	manageCategoriesData: function(result){
		// New response
		this.catResponded++;
		// Check data format to know how to normalize
		if (result[0].hasOwnProperty("d")){
			this.normalizeCatData1(result);
		}else if(result[0].hasOwnProperty("myDate")){
			this.normalizeCatData2(result);
		}else if(result[0].hasOwnProperty("raw")){
			this.normalizeCatDataRaw(result);
		}
		// Verify if all datasources responded.
		if(this.catResponded == this.catDatasources.length){
			// All incoming data was normalized. Draw charts:
			this.prepareDrawing();

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
		console.log("Normalized Data1: " + this.normCategories);
	},
	normalizeCatData2: function(result){
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
		console.log("Normalized Data2: " + this.normCategories);
	},
	normalizeCatDataRaw: function(result){
		for(var i=0; i<result.length; i++){
			var catObj = {};
			if(result[i].raw.length > 0){
				// Apply regex to find a date in format: yyyy-MM-dd or yyyy/MM/dd
				var dateMatch = result[i].raw.match(/\d{4}([\-/.])(0[1-9]|1[1-2])\1(3[01]|[12][0-9]|0[1-9])/g);
				var catMatch = result[i].raw.match(/\#cat \d+\#/gi);
				// Check if raw field contains a date and a category. ONLY ONE DATE AND ONE CATEGORY ARE EXPECTED
				if(dateMatch.length == 1 && catMatch.length == 1){
					// Remove hash from the match, because catMatch will contain something like: #CAT 2#
					var catClean = catMatch[0].substring(1, (catMatch[0].length-1));
					if(this.normCategories.hasOwnProperty(catClean.toUpperCase())){
						// get normalized Category object to add current data
						catObj = this.normCategories[catClean.toUpperCase()];
						// Add current value to totalValue property
						catObj.totalValue += result[i].val;
						// Add current value to accumulator by date (in millis)
						if(catObj.hasOwnProperty(Date.parse(dateMatch[0]))){
							// Use Date.parse to store the date as Date / millis
							catObj[Date.parse(dateMatch[0])] += result[i].val;
						}else{
							catObj[Date.parse(dateMatch[0])] = result[i].val;
						}						
					} else{
						catObj = {totalValue: result[i].val};
						catObj[Date.parse(dateMatch[0])] = result[i].val;
					}
					// Update category data
					this.normCategories[catClean.toUpperCase()] = catObj;
				}
			}
		}
		console.log("Normalized Raw Data: " + this.normCategories);
	},
	prepareDrawing: function(){
		// Collect and format data as expected so that the charts can be drawn
		// Prepare dataset for CATEGORIES SUMMARY - PIE:
		var data = {};
		for(var propertyName in this.normCategories) {
			data[propertyName] = this.normCategories[propertyName].totalValue;
		}
		// Send data and draw it
		drawCategoriesPie(data);

		// Prepare dataset for CATEGORIES BY DATE - LINE:
	}
}
