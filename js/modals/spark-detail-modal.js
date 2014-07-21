var app = app || {};

(function() {
	/*** Current problem: Modal is appearing at a static location.
	Suspect that this is due to the layout of the HTML,
	it should lay over everything no matter what ***/

	app.SparkDetailModal = Backbone.Modal.extend({
		//Attempting some initial generic template:
		template: _.template($("#modal-template").html()),
		initialize: function(s) {
			//Attempting to dynamically change the template:
			this.template = _.template($('#spark-detail-template').html(), {spark: s});
		},
		cancelEl: '.quit-detail'
	});
})();