window.Bioinformatics.UI = {
	submitForCount: function(){
		console.log("in the UI class");
		$("#count-bases-form-id").submit(function(event) {
			event.preventDefault();
			var dnaSeq = $('#count-bases-textarea-id').val();
			//check whether input is a correct string with only ATGC present
			var processedDnaSeq = Bioinformatics.Functions.processSequence(dnaSeq);
			// convert DNA seqeunce into hash of counts
			var baseCountsJson = Bioinformatics.Functions.calculateBaseContent(dnaSeq);
			console.log(baseCountsJson);
			var barGraph = Bioinformatics.UI.drawBaseCountsGraph(baseCountsJson, 'body');
		});
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