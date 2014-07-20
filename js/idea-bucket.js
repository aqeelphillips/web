var app = app || {};

(function() {
	//This should eventually be contained in the IdeaBucket view 
	//(which is inside the Sidebar in side the HomeView view)
	//Specifically in the Render method
	app.IdeaBucket = {
		jawnsInBucket : [],
		addSpark : function(id) { 
			this.jawnsInBucket.push(id);
			console.log(this.jawnsInBucket);
		}
	};
})();