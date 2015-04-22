function load_game_field() {
	game_field.setWidth(options.width);
	game_field.setHeight(options.height);
	layer.removeChildren();

	// Da das Layer neu definiert wird, müssen auch die options der Anazhl an Figuren resettet werden.
	options.victim_counter = 0;
	options.enemy_counter = 0;
	options.wall_counter = 0;
}

function define_game_field() {
	// Das Spielfeld definieren.
	game_field = new Kinetic.Stage({
			container : 'game_field',
			width : 500,
			height : 500,
		});
	// Einen Layer, auf dem die Figuren abgelegt werden.
	layer = new Kinetic.Layer();
	game_field.add(layer);
}


//************************************************************************************************
// Ändert das Spielfeld mit der übergeben Stage und startet das Spiel gegebenenfalls.

function change_stage(stage, run) {
	if (!game.ready_state && !run && game.active) return;
	game.ready_state = false;
	
	// Die Einstellungen für diesen User speichern.
	$.ajax({
		url : 'php/functions.php',
		type : 'POST',
		data : {
			func : 'load_stage',
			default_run : user.default_run,
			stage : stage,
			user : options.other_user,
			email : user.email,
			passwort : user.pw,
			ready_state : game.ready_state,
		},
		success : function (data) {
			var arr_figure = data.split('_new_figure_');
			// Die ersten zwei Parameter ergeben die Breite und Höhe des Spielfeldes.
			options.width = parseFloat(arr_figure[0]);
			options.height = parseFloat(arr_figure[1]);
			
			// Wenn das Spiel ausgeführt werden soll, dürfen die Figuren nicht mehr bewegt werden können.
			if (user.default_run == "X")
				options.draggable = false;
			else if (user.default_run == "" && run == false)
				options.draggable = true;
			else
				options.draggable = false;

			// Den Spielstand zurücksetzen.
			reset_game();
			load_game_field();

			for (var i = 2; i < arr_figure.length; i++) {
				add_figure(arr_figure[i].replace('\r\n', ''));
			}
			layer.draw();

			// Bei den Optionen die aktuellen Werte einsetzen.
			set_dropdown_values();
			// Das Fenster ganz nach oben scrollen.
			var inter = setInterval(function () {
				if (!$('#dialog').is(':visible')) {
					// Erst wenn die Dialogbox weg ist. 
					scroll_window();
					clearInterval(inter);
				}
			}, frame_update);

			// Wenn auch das Spiel gestartet werden soll.
			game.active = run;
			if (run == true)
				game_run();
				
//			setTimeout(function() {
				game.ready_state = true;
//			}, 500);
		},
	});
}

