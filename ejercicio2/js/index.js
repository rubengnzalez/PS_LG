
$(document).ready(function(){
	$("#butCategories").click(function(){
		$("#loading").show();
		controller.getCategoriesData();
		//drawCategoriesPie();
	});
});

// Cold colors design
var chartBackgroundColors = ["#6db7f3", "#969ba0", "#53d175", "#7f59da", "#1d93c7", "#9cd150", "#2c8738", "#44408e"];
var chartHoverBorderColors = ["#1e74b9", "#474849", "#378e4f", "#45268e", "#157098", "#85a852", "#1b5222", "#2e2c56"];
var chartHoverBorderWidth = [3, 3, 3, 3, 3, 3, 3, 3];

function drawCategoriesPie(data) {

	var ctx = document.getElementById("categoriesPie");
  	var names = [];
  	var values = [];
  	for(var name in data){
  		names[names.length] = name;
  		values[values.length] = data[name];
  	}
  	if (names.length == values.length){
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
	    	}
	  	});
	  	$("#loading").hide();
  	}else{
  		console.log("ERROR - names.length is not equal to values.length: drawCategoriesPie is not possible");
  	}
}


