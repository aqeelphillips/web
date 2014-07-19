var app = app || {};

(function() {
	app.SparkDataFiller = function() {
		$("div.item.spark.I").click(function() {
			var ind = $(this).index() - 1;
			alert(ind);
		});
	};
})();