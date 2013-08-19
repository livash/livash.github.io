window.Bio = {
	Functions: {},
	UI: {},
	Store: {},
};

window.Bio.Functions = {
	calculateBaseContent: function(seq) {
		basesArray = seq.toUpperCase().split('');
		results_hash = {'A': 0, 'T': 0, 'G': 0, 'C': 0};
		for (var i = 0; i < basesArray.length; i++){
			results_hash[basesArray[i]]++;
		}
		resultsJson = [
			{'base': 'A', 'count': results_hash['A'], 'percent': (results_hash['A']/basesArray.length * 100).toFixed(1), 'color': '#FF0000'},
			{'base': 'T', 'count': results_hash['T'], 'percent': (results_hash['T']/basesArray.length * 100).toFixed(1), 'color': '#D7DF01'},
			{'base': 'G', 'count': results_hash['G'], 'percent': (results_hash['G']/basesArray.length * 100).toFixed(1), 'color': '#01DF3A'},
			{'base': 'C', 'count': results_hash['C'], 'percent': (results_hash['C']/basesArray.length * 100).toFixed(1), 'color': '#FF00FF'},
			{'base': 'Total', 'count': seq.length, 'percent': 100, 'color': 'grey'}
		];
		
		return resultsJson;
	},
	translateDnaToProtein: function(seq) {
		seq = seq.toUpperCase();
		for (var i = 0; i < seq.length; i++) {
			seq = seq.replace(/\s+/, '');
			seq = seq.replace(/\d+/, '');
		}
		
		console.log(seq);
		dnaProteinHash = {"TCA": "S", "TCC": "S", "TCG": "S", "TCT": "S", "TTC": "F", "TTT": "F", "TTA": "L", "TTG": "L", "TAC": "Y", "TAT": "Y", "TAA": "_", "TAG": "_", "TGC": "C", "TGT": "C", "TGA": "_", "TGG": "W", "CTA": "L", "CTC": "L", "CTG": "L", "CTT": "L", "CCA": "P", "CCC": "P", "CCG": "P", "CCT": "P", "CAC": "H", "CAT": "H", "CAA": "Q", "CAG": "Q", "CGA": "R", "CGC": "R", "CGG": "R", "CGT": "R", "ATA": "I", "ATC": "I", "ATT": "I", "ATG": "M", "ACA": "T", "ACC": "T", "ACG": "T", "ACT": "T", "AAC": "N", "AAT": "N", "AAA": "K", "AAG": "K", "AGC": "S", "AGT": "S", "AGA": "R", "AGG": "R", "GTA": "V", "GTC": "V", "GTG": "V", "GTT": "V", "GCA": "A", "GCC": "A", "GCG": "A", "GCT": "A", "GAC": "D", "GAT": "D", "GAA": "E", "GAG": "E", "GGA": "G", "GGC": "G", "GGG": "G", "GGT": "G"}; 
		result = '';
	
		for (var i = 0; i < seq.length - 2; i++) {
			if (i === 0 ) {
				result += dnaProteinHash[seq[i] + seq[i + 1] + seq[i + 2]];
			} else if ((i) % 3 > 0){
			}	else {
				result += dnaProteinHash[seq[i] + seq[i + 1] + seq[i + 2]];
			}	
		}
		return result;
	},
	isValidSequence: function(seq) {
		var counter = 0;
		for (var i = 0; i < seq.length; i++) {
			seq = seq.replace(/\s+/, '');
			seq = seq.replace(/\d+/, '');
		}
		_(seq.toUpperCase().split('')).each(function(letter){
			switch (letter) {
				case "A": 
					counter++;
					break;
				case "T": 
					counter++;
					break;
				case "G": 
					counter++;
					break;
				case "C": 
					counter++;
					break;
				case " ":
					counter++;
					break;
				default:
			}
		});
		return (counter === seq.length);
	},
};

$(document).ready(function(){
	Bio.UI.submitForCount();
	Bio.UI.submitForTranslation();
});