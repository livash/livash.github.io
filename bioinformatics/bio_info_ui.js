window.Bioinformatics.UI = {
	submitForCount: function(){
		console.log("in the UI class");
		$("#count-bases-form-id").submit(function(event) {
			event.preventDefault();
			$(".error-counts").remove();
			$(".svg-counts").remove();
			var dnaSeq = $('#count-bases-textarea-id').val();
			//check whether input is a correct string with only A,T,G, or C present
			if (Bioinformatics.Functions.isValidSequence(dnaSeq)) {
				var baseCountsJson = Bioinformatics.Functions.calculateBaseContent(dnaSeq);
				var barGraph = Bioinformatics.UI.drawBaseCountsGraph(baseCountsJson, '.dna-sequence-content');
			} else {
				//generate error message
				var error = Bioinformatics.UI.showError('.dna-sequence-content');
			}
		});
	},
	
	showError: function(rootEl) {
		var svg = Bioinformatics.UI.makeSvg(rootEl, '#D8D8D8');
		svg.attr('class', 'error-counts');
		var messageLine1 = svg.append('text').attr('x', 10).attr('y', 40).attr('font-size', '14px').style('fill', 'red');
		messageLine1.text("DNA sequence should contain only A, a, T, t, G, g, C, or c. ")
		var messageLine2 = svg.append('text').attr('x', 10).attr('y', 80).attr('font-size', '14px').style('fill', 'red');
		messageLine2.text("Try inputting your DNA sequence again.")
	},
	
	drawBaseCountsGraph: function(jsonData, rootEl) {
		//preprocess data for drawing
		var data = jsonData.map(function(d) { return d.count; })
		var linearScale = d3.scale.linear().domain([0, d3.max(data)]).range([0, 280]);
		for (var i = 0; i < jsonData.length; i++) {
			jsonData[i]['count'] = linearScale(jsonData[i]['count']);
		};
		//draw data on a graph
		var svg = Bioinformatics.UI.makeSvg(rootEl, '#D8D8D8');
		svg.attr('class', 'svg-counts');
		var barGraph = svg.selectAll('rect').data(jsonData).enter().append('rect');
		var barGraphStyles = barGraph.attr('x', 100)
			 .attr('y', function(d, i) { return i * 20 + 10; })
			 .attr('height', 15)
			 .attr('width', function(d, i) { return d.count; })
			 .style('fill', function(d) { return d.color; });
		var barGraphText = svg.selectAll('text').data(jsonData).enter().append('text')
			.attr('x', 10)
			.attr('y', function(d, i) { return i * 19 + 23; })
			.attr('font-family', 'sans-serif')
			.attr('font-size', '12px')
			.text(function(d){ return d.base + ": " + d.percent + "%"; });
	},
	
	makeSvg: function(rootEl, color) {
		return d3.select(rootEl)
		.append('svg')
		.attr('width', 400)
		.attr('height', 120)
		.style('background', color);
	},
	getRandomColor: function() {
		var letters = '0123456789ABCDEF'.split('');
		    var color = '#';
		    for (var i = 0; i < 6; i++ ) {
		        color += letters[Math.round(Math.random() * 15)];
		    }
		return color;
	}
}