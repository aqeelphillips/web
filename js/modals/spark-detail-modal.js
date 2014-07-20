var app = app || {};

(function() {
	/*** Current problem: Modal is appearing at a static location.
	Suspect that this is due to the layout of the HTML,
	it should lay over everything no matter what ***/

	app.SparkDetailModal = Backbone.Modal.extend({
		initialize: function(content) {
			this.template = content;
		},
		cancelEl: '.quit-detail'
	});
})();