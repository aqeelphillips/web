var app = app || {};

(function() {
	app.HomeView = Backbone.View.extend({
		events: {
			"click div.item.spark": "showDetail"
		}

		el: '#page',
		render: function() {
			var jawns = new app.Jawns();
			jawns.fetch({
				success: function(jawns) {
					var template = _.template($("#home-view-template").html(), { jawns: jawns.models });
					this.$el.html(template);

					$(this.$el).imagesLoaded(function() {
						$(this.$el).masonry({
							gutter: '.gutter-sizer',
							itemSelector: '.item'
						});
						new app.SparkDataFiller(jawns);
					}.bind(this));
				}.bind(this)
			});
		},

		//Spark Data should pretty much exclusively go in here:
		showDetail: function() {

		}
	});
})();