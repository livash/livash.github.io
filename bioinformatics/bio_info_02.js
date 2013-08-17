window.Bioinformatics = {
	Functions: {},
	Store: {},
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	
};
window.Bioinformatics.Functions = {
	calculateBaseContent: function(seq) {
		basesArray = seq.split('');
		results_hash = {'A': 0, 'T': 0, 'G': 0, 'C': 0};
		for (var i = 0; i < basesArray.length; i++){
			results_hash[basesArray[i]]++;
		}
		
		return results_hash;
	},
	translateDnaToProtein: function(seq) {
		dnaProteinHash = {'ATC': 'M', 'AGT': 'C'} // get correct hash
		result = '';
		
		for (var i = 0; i < seq.length - 2; i++) {
		
			if (i === 0 ) {
				result += dnaProteinHash[seq[i] + seq[i + 1] + seq[i + 2]];
			} else if ((i) % 3 > 0){
				console.log("seq[i]   " + seq[i]);
			}	else {
				console.log(seq[i] + seq[i + 1] + seq[i + 2]);
				result += dnaProteinHash[seq[i] + seq[i + 1] + seq[i + 2]];
			}
			
		}
		
		return result;
	}
};

Bioinformatics.Views.Sequence = Backbone.View.extend({
	
	initialize: function(rootEl){
		console.log("inside initialize:.....");
		console.log(this.$el);
		_.bindAll(this, 'render');
		this.el = rootEl;
		this.render();
	},
	
	render: function(){
		var form = $('form');
		console.log(form)
		$(this.el).append(form);
		$(this.el).append("<button id='add'>Add list item</button>");
  }
});

// Bioinformatics.Models.Sequence = Backbone.Model.estend({
// defaults: {
// 	sequnce: "",
// 	aCont: 0,
// 	tCont: 0,
// 	gCont: 0,
// 	cCont: 0
// }
// });

$(document).ready(function(){
	
	var rootEl = $('body');
	var seqView = new Bioinformatics.Views.Sequence(rootEl);
	
	//test cases for two funcitons: 
	// seq1 = 'ATGCA';
// 	console.log(Bioinformatics.Functions.calculateBaseContent(seq1));
// 	
// 	seq2 = 'ATCAGT';
// 	console.log(Bioinformatics.Functions.translateDnaToProtein(seq2));
	
});

