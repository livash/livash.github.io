
$(function () {
	
  $('button#start').on('click', function(event){
		
		$('.empty-game-window').remove();
		$('canvas').remove();
		var canvas = $("<canvas width='" + 500 +
	  "' height='" + 500 + "'" +
	  "style=\"border:1px solid #000000;\"></canvas>");
	  $('div.game-window').append(canvas);

	  // `canvas.get(0)` unwraps the jQuery DOM element;
	  new Game(500, 500, 5).start(canvas.get(0));
		
  });
	
});









