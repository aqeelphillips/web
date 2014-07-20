var app = app || {};

(function() {
	app.SparkDetailView = Backbone.View.extend({
		el: "#sparkmodal",
		render: function(spark) {
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

			//Concatenate the inner html of the lightbox:
			var sparkContent = '<h3>Spark</h3>'
				+'<p>'+content_type+'</p>'
				+'<p>Created on '+created_at+'</p>'
				+'<button id="addToIdeaBucket">Add to Idea Bucket</button>'
				+'<hr>'
				+body
				+'<hr>'
				+'<button class="quit-detail">Exit</button>';
			this.sparkContent = '<div class="spark-detail">'+sparkContent+'</div>';

			return this;
		}
	});
})();