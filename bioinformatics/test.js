window.App = {
	Views: {},
}
App.Views.Sequence = Backbone.View.extend({
	el: $('body'),
	
	initialize: function(rootEl) {
		console.log("inside initialize......");
		_.bindAll(this, 'render');
		this.el = rootEl;
		this.render();
	},
	
	render: function() {
		console.log("inside render ....");
		$(this.el).append("<div>Hello world</div>")
	}
});

$(document).ready(function() {
	// var ListView = Backbone.View.extend({
	// 	el: $('body'),
	// 	
	// 	initialize: function() {
	// 		_.bindAll(this, 'render');
	// 		this.render();
	// 	},
	// 	
	// 	render: function() {
	// 		$(this.el).append("<div>Hello world</div>")
	// 	}
	// });
	var rootEl = $('body');
	var listView = new App.Views.Sequence(rootEl);
})