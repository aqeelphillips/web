var app = app || {};

(function() {
	app.HomeSideBar = Backbone.View.extend({
		el: '#sidebar-contents',
		render: function() {
			var template = _.template($("#home-sidebar-template").html());
			this.$el.html(template);
		}
})();