var app = app || {};

(function() {
	app.IdeaBucket = {
		jawnsInBucket : [],
		addSpark : function(id) { 
			this.jawnsInBucket.push(id);
			console.log(this.jawnsInBucket);
		}
	};
})();