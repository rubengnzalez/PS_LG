
$(document).ready(function(){
	// Request data as soon as the document is ready
	controller.getCategoriesData();

	$("#butCategories").click(function(){
		$("#loading").show();
		controller.getCategoriesData();
	});
});

// Cold colors design
var chartBackgroundColors = ["#6db7f3", "#7f59da", "#969ba0", "#53d175", "#1d93c7", "#9cd150", "#2c8738", "#44408e"];
var chartHoverBorderColors = ["#1e74b9", "#45268e", "#474849", "#378e4f", "#157098", "#85a852", "#1b5222", "#2e2c56"];
var chartHoverBorderWidth = [3, 3, 3, 3, 3, 3, 3, 3];

function drawCategoriesPie(data) {

	var ctx = document.getElementById("categoriesPie");
  	var names = [];
  	var values = [];
  	for(var name in data){
  		names[names.length] = name;
  		values[values.length] = data[name];
  	}
  	if (names.length == values.length && names.length > 0){
	  	var chartJsPie = new Chart(ctx, {
	    	type: 'pie',
	    	data: {
	      		labels: names,
	      		datasets: [{
	        		data: values,
	        		// Slice background colors array and take as many colors as it needs
	        		backgroundColor: chartBackgroundColors.slice(0, values.length),
	        		hoverBorderColor: chartHoverBorderColors.slice(0, values.length)
	      		}]
	    	},
	    	options: {
	    		/*cutoutPercentage:1,*/
				title: {
	            	display: true,
	            	text: 'CATEGORIES SUMMARY',
	            	fontSize: 16
        		}
	    	}
	  	});
	  	$('.chart_area').show();
	  	$("#loading").hide();
  	}else{
  		console.log("ERROR - names.length is not equal to values.length: drawCategoriesPie is not possible");
  	}
}

function drawCategoriesByDateLine(data){
	var ctx = document.getElementById("categoriesByDateLine");
	// Get dates array to use them as values/labels in X-axis
	var dates = data.dates;
	// Get datasets (categories data)
	var datasets = data.datasets;
	// format date as: 25.Apr.1992
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	for(var x=0; x<dates.length; x++){
		var auxDate = new Date(Number(dates[x]));
		dates[x] = auxDate.getDate() + "." + months[auxDate.getMonth()] + "." + auxDate.getFullYear();
	}
	// Datasets customization
	for(var i=0; i<datasets.length; i++){
		// Apply background color by using array of colors defined above
		datasets[i].backgroundColor = chartBackgroundColors[i];
		datasets[i].borderColor = chartBackgroundColors[i];
		datasets[i].pointBorderWidth = 1;
		datasets[i].pointBorderColor = chartHoverBorderColors[i];
		datasets[i].fill = false;
		datasets[i].lineTension = 0;
	}
	// DRAW
	if(datasets.length > 0){
		var chartJsLine = new Chart(ctx, {
			type: 'line',
			data: {
				labels: dates,
				datasets: datasets			
			},
	    	options: {
				title: {
	            	display: true,
	            	text: 'CATEGORIES - VALUES BY DATE',
	            	fontSize: 16,
	            	bezierCurve: false
	    		}
	    	}
		});
		$('.chart_area').show();
		$("#loading").hide();
	}else{
		console.log("ERROR - drawCategoriesByDateLine: no datasets to draw")
	}
}


