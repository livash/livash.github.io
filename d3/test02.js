App = {
	Functions: {}
}

App.Functions = {
	makeSvg: function(rootEl, color) {
		return d3.select(rootEl).append('svg').attr('width', 200).attr('height', 200).style('background', color);
	},
	drawLine: function(svg, lineData) {
		var lineFunction = d3.svg.line()
												.x(function(d) { return d.x; })
												.y(function(d) { return d.y; })
												.interpolate('linear');
		var lineGraph = svg.append('path')
												.attr('d', lineFunction(lineData))
												.attr('stroke', 'blue')
												.attr('stroke-width', 2)
												.attr('fill', 'none');
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
$(document).ready(function(){
	// overlapping circles
	var circleRadii = [65, 40, 25, 10];
	var colors = {65: 'grey', 40: 'green', 25: 'purple', 10: 'red'};
	
	var bodySelection = d3.select("body");
	var svgSelection = App.Functions.makeSvg('body', "#F6E3CE");
	
	var circles = svgSelection.selectAll('circle')
								.data(circleRadii)
								.enter()
								.append('circle');
	var circleAttributes = circles
												.attr('cx', 100)
												.attr('cy', 100)
												.attr('r', function(d) { return d; })
												.style('fill', function(d) { return colors[d]; });
	var text1 = svgSelection.append('text').attr('x', 65).attr('y', 20).attr('font-family', 'sans-serif').attr('font-size', '20px');
	text1.text('Target');	
 // draw another svg with three non-overlapping circles
 var svg2 = App.Functions.makeSvg('body', "#A9F5A9");
 var circleCentersX = [50, 100, 150]
 var circles2 = svg2.selectAll('circles')
 										.data(circleCentersX)
										.enter()
										.append('circle');
 var circleAttributes2 = circles2
 												.attr('cx', function(d) { return d; })
												.attr('cy', function(d) { return d; })
												.attr('r', function(d) { return d / 5; })
												.style("fill", function(d) {
													if (d < 60) {
														return "red";
													} else if (d > 60 && d < 101) {
														return "blue";
													} else {
														return "green";
													}
												});
 // draw another svg with threee circles,use JSON data
 var jsonCircles = [
 {
	 "cx": 150,
	 "cy": 50,
	 "color": "red"
 },
 {
	 "cx": 100,
	 "cy":100,
	 "color": "blue"
 },
 {
	 "cx": 50,
	 "cy": 150,
	 "color": "green"
 }];
 var svg3 = App.Functions.makeSvg('body', "#81BEF7");
var circles3 = svg3.selectAll('circle')
										 .data(jsonCircles)
										 .enter()
										 .append('circle');
var circleAttributes3 = circles3
													.attr('cx', function(d) { return d.cx; })
													.attr('cy', function(d) { return d.cy; })
													.attr('r', 25)
													.style('fill', function(d) { return d.color; });
 // draw a bar graph
 var jsonBarGraph = [];
 var colors = ["red", "green", "blue", "yellow", "orange", "purple"];
 for (var i = 0; i < 200; i += 5) {
	 var color = colors[Math.floor(Math.random() * 5)];
	 jsonBarGraph.push({"h": i * 2, "color": color});
 };
 
 var svg4 = App.Functions.makeSvg('body', "#E6E6E6");
 var text4 = svg4.append('text').attr('x', 45).attr('y', 20).attr('font-family', 'sans-serif').attr('font-size', '20px');
 text4.text('Bar graph');
 												
 // draw a line
 svg4.append('line')
 		.attr('x1', 0)
 		.attr('y1', 100)
 		.attr('x2', 200)
 		.attr('y2', 100)
 		.style('stroke-width', 3)
 		.style('stroke', 'grey');
 //draw bar graph
 var bars = svg4.selectAll('rect').data(jsonBarGraph).enter().append('rect');
 
 var barStyles = bars.attr('x', function(d, i) { return i * 10; })
 										 .attr('y', function(d) { return 200 - d.h })
										 .attr('height', function(d) { return d.h; })
										 .attr('width', 7)
										 .style('fill', function(d) { return d.color; });
// Draw line path
var svg5 = App.Functions.makeSvg('body', '#81DAF5');
var text5 = svg5.append('text').attr('x', 75).attr('y', 20).attr('font-family', 'sans-serif').attr('font-size', '20px');
text5.text('Lines');

var lineData1 = [];
var lineData2 = [];
var lineData3 = [];
for (var i = 0; i < 200; i++) {
	lineData1[i] = {'x': i, 'y': i };
	lineData2[i] = {'x': i, 'y': i * 0.5 };
	lineData3[i] = {'x': i, 'y': i * 2 };
}
App.Functions.drawLine(svg5, lineData1);
App.Functions.drawLine(svg5, lineData2);
App.Functions.drawLine(svg5, lineData3);


// draw zigzag path
var svg6 = App.Functions.makeSvg('body', '#AC58FA');
var text6 = svg6.append('text').attr('x', 45).attr('y', 20).attr('font-family', 'sans-serif').attr('font-size', '20px');
text6.text('y = sin( x )');

var zigZagLineData = [];
for (var i = 0; i < 200; i++ ) {
	zigZagLineData[i] = {'x': i, 'y': (75 * Math.sin(i * 0.1) + 100) }; //(75 * Math.sin(i) + 100)
};

App.Functions.drawLine(svg6, zigZagLineData);

// draw y = x^2
var svg7 = App.Functions.makeSvg('body', '#A9F5BC');
var text7 = svg7.append('text').attr('x', 5).attr('y', 150).attr('font-family', 'sans-serif').attr('font-size', '20px');
text7.text('y = x^2');

var x2Data = [];
for (var i = 0; i < 200; i++) {
	x2Data[i] = {'x': i, 'y': 200 - 0.1 * (i - 100) * (i - 100)}
}
App.Functions.drawLine(svg7, x2Data);

// three rectangles
var svg8 = App.Functions.makeSvg('body', "#F5A9F2");
var rectData = [
  { "x_axis": 10, "y_axis": 10, "height": 20, "width":20, "color" : "green" },
  { "x_axis": 40, "y_axis": 40, "height": 20, "width":20, "color" : "purple" },
  { "x_axis": 70, "y_axis": 70, "height": 20, "width":20, "color" : "red" }];
	
var rectangles = svg8.selectAll('rect')
										.data(rectData)
										.enter()
										.append('rect')
										.attr('x', function(d) { return d.x_axis; })
										.attr('y', function(d) { return d.y_axis; })
										.attr('height', function(d) { return d.height; })
										.attr('width', function(d) { return d.width; })
										.style('fill', function(d) { return d.color; })

// draw 20 random circles
var svg9 = App.Functions.makeSvg('body', '#A9F5F2');

var circleData = [];

for(var i = 0; i < 20; i++) {
	circleData[i] = {
		'cx': 200 * Math.random(),
		'cy': 200 * Math.random(),
		'r': 30 * Math.random(),
		'color': App.Functions.getRandomColor()
	  };
};

var circles20 = svg9.append('g')
										.attr('transform', 'rotate(50, [20, 20])')
                    .selectAll('circle')
										.data(circleData)
										.enter()
										.append('circle')
										.attr('cx', function(d) { return d.cx; })
										.attr('cy', function(d) { return d.cy; })
										.attr('r', function(d) { return d.r; })
										.style('fill', function(d) { return d.color; });
	var text9 = svg9.append('text').attr('x', 20).attr('y', 20).attr('font-family', 'sans-serif').attr('font-size', '20px');
	text9.text('20 Random Circles');						
});




