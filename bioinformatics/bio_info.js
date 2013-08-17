window.Bioinformatics = {
	Functions: {},
	UI: {},
	Store: {},
};

window.Bioinformatics.Functions = {
	calculateBaseContent: function(seq) {
		basesArray = seq.split('');
		results_hash = {'A': 0, 'T': 0, 'G': 0, 'C': 0};
		for (var i = 0; i < basesArray.length; i++){
			results_hash[basesArray[i]]++;
		}
		resultsJson = [
			{'base': 'Total', 'count': seq.length, 'percent': 100, 'color': 'blue'},
			{'base': 'A', 'count': results_hash['A'], 'percent': (results_hash['A']/basesArray.length * 100).toFixed(1), 'color': '#FF0000'},
			{'base': 'T', 'count': results_hash['T'], 'percent': (results_hash['T']/basesArray.length * 100).toFixed(1), 'color': '#D7DF01'},
			{'base': 'G', 'count': results_hash['G'], 'percent': (results_hash['G']/basesArray.length * 100).toFixed(1), 'color': '#01DF3A'},
			{'base': 'C', 'count': results_hash['C'], 'percent': (results_hash['C']/basesArray.length * 100).toFixed(1), 'color': '#FF00FF'}
		];
		
		return resultsJson;
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
	},
	processSequence: function(seq) {
		var result = '';
		//Make all sumbitted letters uppercase;
		//Make sure there are only ATGC in the string
		//in the case of erroneous input putput to the screen..
		return result;
	},
};



$(document).ready(function(){
	Bioinformatics.UI.submitForCount();
});