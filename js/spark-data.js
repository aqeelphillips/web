var app = app || {};

(function() {
	app.SparkDataFiller = function(jawns) {
		//Create Spark click listener:
		$("div.item.spark").click(function() {
			//Determine index of Jawn from click
			var ind = $(this).index() - 1;
			var litespark = jawns.at(ind);
			var id = litespark.get('id');

			//Get full Spark (orig just lite):
			var spark;
			$.ajax({
		        url: '/sparks/'+id+'.json',
		        success: function(response) {
		            spark = new Backbone.Model(response);

		            //Log of Spark clicked
					console.log(spark);

					//Determine Spark data:
					var content = spark.get('content');

					var spark_type = "";
					var overlay_col = 'rgba(255, 255, 255, 0.4)';
					switch (spark.get('spark_type')) {
						case 'W':
							spark_type = "What If?";
							overlay_col = 'rgba(204, 255, 204, 0.3)';
							break;
						case 'P':
							spark_type = "Problem";
							overlay_col = 'rgba(255, 204, 204, 0.3)';
							break;
						case 'I':
							spark_type = "Inspiration";
							overlay_col = 'rgba(204, 204, 255, 0.3)';
							break;
					}

					var content_type = "Text";
					var body = '<p>'+content+'</p>';
					switch (spark.get('content_type')) {
						case 'P':
							content_type = "Picture";
							var file = spark.get('file');
							body = '<img src="'+file+'" height="600px" width="600px"/>';
							break;
						case 'V':
							content_type = "Video";
							//Assuming the content is a youtube video:
							body = '<iframe class="youtube-player" type="text/html" width="600" height="400" src="http://www.youtube.com/v/'
								+content.split('http://www.youtube.com/watch?v=')[1]
								+'&autoplay=1" allowfullscreen frameborder="0"></iframe>';
							break;
						case 'A':
							content_type = "Audio";
							break;
						case 'C':
							content_type = "Code Snippet";
							break;
						case 'L':
							content_type = "Link";
							break;
					}
					var created_at = spark.get('created_at');

					//Generate the inner html of the lightbox:
					var sparkContent = '<h3>Spark</h3>'
						+'<p>'+spark_type+' - '+content_type+'</p>'
						+'<p>Created on '+created_at+'</p>'
						+'<button id="addToIdeaBucket">Add to Idea Bucket</button>'
						+'<hr>'
						+body
						+'<hr>'
						+'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>';

					//Create FancyBox of Spark Details:
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
		        }
			});
		});
	};
})();