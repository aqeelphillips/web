var app = app || {};

$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
	options.url = 'http://steamnet.herokuapp.com/api/v1' + options.url;
});

var cachedFiles = {};
app.getTemplate = function(file, handler) {
	if (cachedFiles[file]) {
		handler(cachedFiles[file]);
	} else {
		$.ajax({
			url: "/js/templates/" + file + ".html",
			method: "GET",
			ignorePrefilter: true,
		}).done(function(data) {
			cachedFiles[file] = data;
			handler(data);
		});
	}
}

$(function() {

});