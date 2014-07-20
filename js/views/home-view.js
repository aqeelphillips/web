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
							itemSelector: '.item'
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
					console.log(spark);

					var content = spark.get('content');
					var content_type = "Text";
					var body = '<p>'+content+'</p>';
					var overlay_col = 'rgba(255, 255, 255, 0.4)';
					switch (spark.get('content_type')) {
						case 'P':
							content_type = "Picture";
							var file = spark.get('file');
							body = '<img src="'+file+'" height="600px" width="600px"/>';
							overlay_col = 'rgba(204, 255, 204, 0.3)';
							break;
						case 'V':
							content_type = "Video";
							//Assuming the content is a youtube video:
							body = '<iframe class="youtube-player" type="text/html" width="600" height="400" src="http://www.youtube.com/v/'
								+content.split('http://www.youtube.com/watch?v=')[1]
								+'&autoplay=1" allowfullscreen frameborder="0"></iframe>';
							overlay_col = 'rgba(255, 204, 204, 0.3)';
							break;
						case 'A':
							content_type = "Audio";
							overlay_col = 'rgba(204, 204, 255, 0.3)';
							break;
						case 'C':
							content_type = "Code Snippet";
							overlay_col = 'rgba(204, 255, 204, 0.3)';
							break;
						case 'L':
							content_type = "Link";
							overlay_col = 'rgba(204, 204, 255, 0.3)';
							break;
					}
					var created_at = spark.get('created_at');

					//Generate the inner html of the lightbox:
					var sparkContent = '<h3>Spark</h3>'
						+'<p>'+content_type+'</p>'
						+'<p>Created on '+created_at+'</p>'
						+'<button id="addToIdeaBucket">Add to Idea Bucket</button>'
						+'<hr>'
						+body
						+'<hr>'
						+'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>';

					//Create FancyBox of Spark Details:
					/*** Eventually the Spark Details will be its own view, but FancyBox is easy for now ***/
					$.fancybox({
						type: 'iframe',
						helpers: {
							overlay: {
								css: {
									'background' : overlay_col
								}
							}
						},
						content: sparkContent
					});

					$("#addToIdeaBucket").click(function(){
						app.IdeaBucket.addSpark(id);	
					});
				}.bind(this)
			});
		}
	});
})();