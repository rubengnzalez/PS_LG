
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


