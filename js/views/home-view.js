var app = app || {};

(function() {
	app.HomeView = Backbone.View.extend({
		events: {
			"click div.item.spark": "showDetail"
		},

		el: '#page',
		render: function() {
			var jawns = new app.Jawns();
			jawns.fetch({
				success: function(jawns) {
					this.collection = jawns;
					var template = _.template($("#home-view-template").html(), { jawns: jawns.models });
					this.$el.html(template);

					$(this.$el).imagesLoaded(function() {
						$(this.$el).masonry({
							gutter: '.gutter-sizer',
							itemSelector: '.item',
							columnWidth: 230 //This is a huge hack but it appears to be working (in Chrome)
						});
					}.bind(this));

					//Inflate Sidebar view:
					this.sidebar = new app.HomeSideBar();
					this.sidebar.render(function(v) {
						$(this.el).find("#sidebar").html(v.el);

						callback(this);
					}.bind(this));
				}.bind(this)
			});
		},

		beforeClose: function() {
			this.sidebar.close();
		},

		//Spark Data should pretty much exclusively go in here:
		showDetail: function(e) {
			e.preventDefault();
	        var index = ($(e.currentTarget).index()) - 1;
	        var litespark = this.collection.at(index);
			var id = litespark.get('id');

			var spark = new app.Spark();
			spark.url = '/sparks/'+id+'.json';
			spark.fetch({
				success: function() {
					/*** Todo: change box/background color for different content types ***/
					var sparkDetailView = new app.SparkDetailView();
					var sparkDetailModal = new app.SparkDetailModal(_.template(sparkDetailView.render(spark).sparkContent));
        			$('#modal-inflate-area').html(sparkDetailModal.render().el);

					/*** Click listener for adding Spark to Idea Bucket: ***/
					/*$("#addToIdeaBucket").click(function(){
						app.IdeaBucket.addSpark(id);	
					});*/
				}.bind(this)
			});
		}
	});
})();