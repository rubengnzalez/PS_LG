
// Define target URL's. Ideally, they would be taken from a configuration/properties file.
var DATA1_URL = "http://s3.amazonaws.com/logtrust-static/test/test/data1.json";
var DATA2_URL = "http://s3.amazonaws.com/logtrust-static/test/test/data2.json";
var DATA3_URL = "http://s3.amazonaws.com/logtrust-static/test/test/data3.json";

var controller = {
	normCategories: {},
	getCategoriesData: function(){
		connectionMngr.requestCategoriesData(DATA3_URL);
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
		for(var i=0; i<result.length; i++){
			var catObj = {};
			if(result[i].raw.length > 0){
				// Apply regex to find a date in format: yyyy-MM-dd or yyyy/MM/dd
				var dateMatch = result[i].raw.match(/\d{4}([\-/.])(0[1-9]|1[1-2])\1(3[01]|[12][0-9]|0[1-9])/g);
				var catMatch = result[i].raw.match(/\#cat \d+\#/gi);
				// Check if raw field contains a date and a category. ONLY ONE DATE AND ONE CATEGORY ARE EXPECTED
				if(dateMatch.length == 1 && catMatch.length == 1){
					if(this.normCategories.hasOwnProperty(catMatch[0].toUpperCase())){
						// get normalized Category object to add current data
						catObj = this.normCategories[catMatch[0].toUpperCase()];
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
					this.normCategories[catMatch[0].toUpperCase()] = catObj;
				}
			}
		}
		console.log(this.normCategories);
	}
}
