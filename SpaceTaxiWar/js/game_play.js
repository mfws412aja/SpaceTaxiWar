// Startet das Spiel.
function game_run() {
	// Das Spiel auf aktiv setzen.
	game.active = true;

	// Die aktuelle Stage hier als Zahl zwischenspeichern.
	var current_stage = user.current_stage;

	var highscore = 0;

	// Die Anzahl an Stages definieren. diese unterscheidet sich je nachdem, ob User- oder Default-Stages durchlaufen werden.
	var anzahl_stages = user.default_run == "" ? options.anzahl_user_stages : options.anzahl_default_stages;

	// Die Zeit, die der Spieler für dieses Level in Sekunden zur Verfügung hat.
	var time_left = options.width * options.height / 25000;

	// Den Friendly-Fire-Bonus definieren.
	var friendly_fire_bonus = options.friendly_fire == "X" ? 3 : 1;

	// Das Spiel zurücksetzn. Dabei werden auch die Variablen geleert.
	//	reset_game(time_anim, player_anim);

	// Den Interval für die Beschleunigung des Spielers. 
	set_player_speedup();
	
	// Die Zeit stoppen.
	var time_anim = setInterval(function () {
			time_left -= 0.1;
			if (time_left <= 0) {
				clearInterval(player_anim);
				clearInterval(time_anim);
				spiele_sound('audio_sounds_4', 'time_up');
				document.getElementById('index_label_time_actual').innerHTML = "0.0";
				basic_dialog('time_up');
				$("#dialog").dialog("open");
				return;
			}
			time_left = Math.round(time_left * 10) / 10;
			document.getElementById('index_label_time_actual').innerHTML = time_left.toFixed(1);
		}, 100);

	// Die Animation des Spielers.
	var player_anim = setInterval(function () {
			if (!game.active)
				reset_game(time_anim, player_anim);

			var player_collision = false;

			// Den Spieler nach gedrückten Tasten bewegen.
			var bullet_shot = player_move();
			if (bullet_shot) {
				var inter = setInterval(function () {
					var score = bullet_move(bullet_shot);
					if (score != "") {
						highscore = change_game_highscore(score[0], score[1], highscore);
						clearInterval(inter);
					}
				}, frame_update);
			}

			// Alle Elemente durchlaufen.
			// Index 0 ist der Spieler. Index 1 das Ziel.
			for (var i = 1; i < layer.children.length; i++) {
				var obj = layer.children[i];
				var bild = obj.attrs['bild'];

				// Das Geschoss animieren.
				if (bild == "bullet")
					continue;

				// Das erste übergebene Objekt ist der Spieler.
				if (check_collision(layer.children[0], obj) == true) {
					// Die Enemys ermitteln.
					if (bild == 'ziel') {
						// Ein zehntel der Zeit als Faktor verwenden.
						time_left = 1 + time_left * 10 / 100;
						time_left = Math.round(time_left * 100) / 100;

						// Wenn das Ziel erreicht wurde, muss geprüft werden, ob alle Victims eingesammelt wurden.
						if (options.victim_counter == game.victim_counter) {
							highscore = change_game_highscore('*', time_left, highscore);

							// Friendly-Fire Bonus. Dieser wird mit 1 initialisiert.
							highscore = change_game_highscore('*', friendly_fire_bonus, highscore);

							// Den aktuellen Punktestand überprüfen und ggf. speichern.
							if (parseFloat(highscore) > parseFloat(player.highscore)) {
								spiele_sound('audio_sounds_4', 'highscore');

								// Wenn es eine eigene Stage war, wird der neue Highscore nicht gespeichert.
								if (user.default_run == "X") {
									player.highscore = highscore;
									document.getElementById('index_label_highscore').innerHTML = player.highscore;
									basic_dialog('new_highscore', [time_left, friendly_fire_bonus, highscore]);
								} else {
									basic_dialog('would_be_a_new_highscore', [time_left, friendly_fire_bonus, highscore]);
								}
							} else {
								spiele_sound('audio_sounds_4', 'stage_clear');
								basic_dialog('stage_clear', [time_left, friendly_fire_bonus, highscore]);
							}

							// Wenn es weitere Level gibt, soll direkt das nächste geöffnet werden.
							if (anzahl_stages > current_stage) {
								current_stage += 1;
								user.current_stage = current_stage;
								if (user.default_run == "X")
									user.current_default_stage = current_stage;
								else
									user.current_user_stage = current_stage;
								save_game();
								// Prüfen, ob eine Dialogbox bereits geöffnet ist.
								var inter = setInterval(function () {
										if (!$('#dialog').is(':visible')) {
											change_stage(current_stage, false);
											clearInterval(inter);
											return;
										}
									}, frame_update);
							} else {
								// Prüfen, ob eine Dialogbox bereits geöffnet ist.
								var inter = setInterval(function () {
										if (!$('#dialog').is(':visible')) {
											basic_dialog('no_more_levels');
											clearInterval(inter);
											return;
										}
									}, frame_update);
							}
						} else {
							spiele_sound('audio_sounds_4', 'game_over');
							basic_dialog('rescue_all_victims', [game.victim_counter, options.victim_counter]);
						}
						clearInterval(time_anim);
						clearInterval(player_anim);
						//					reset_game(time_anim, player_anim);
						return;
					}
					// Die Wände ermitteln.
					else if (bild == 'wall') {
						player_collision = true;
					}
					// Die Victims ermitteln.
					else if (bild == 'victim') {
						spiele_sound('audio_sounds_3', 'collect_victim');
						game.victim_counter += 1;
						highscore = change_game_highscore("+", options.difficulty, highscore);
						obj.remove();
					}
					// Die Enemys ermitteln.
					else if (bild == 'enemy') {
						clearInterval(player_anim);
						clearInterval(time_anim);
						spiele_sound('audio_sounds_4', 'game_over');
						basic_dialog('game_over');
						// Prüfen, ob eine Dialogbox bereits geöffnet ist.
						var inter = setInterval(function () {
								if (!$('#dialog').is(':visible')) {
//									change_stage(current_stage, false);
									clearInterval(inter);
									return;
								}
							}, frame_update);
					}
				}
			}

			// Den Bullet_Timeout um eins herunter setzen.
			if (game.bullet_timeout > 0)
				game.bullet_timeout -= frame_update;

			// Wenn es keine Kollision mit einem anderen Element gab.
			if (player_collision == false && player.move_up_or_down == false) {
				player_drop();
			}

			layer.draw();
		}, frame_update);

	var delay = 100;
	for (var i = 2; i < layer.children.length; i++) {
		var obj = layer.children[i];
		var bild = obj.attrs['bild'];
		if (bild != 'enemy')
			continue;

		move_enemy(obj, delay);
		delay *= 1.135;
		if (delay > 1000)
			delay -= 1000;
	}

}


//************************************************************************************************
// Die Variablen für das Spiel zurücksetzen und die Animationen stoppen.

function reset_game(time_anim, player_anim) {
	scroll_window();

	// Die Animationen stoppen.
	clearInterval(time_anim);
	clearInterval(player_anim);
	clearInterval(player.speedup);

	// Die Offset-Faktoren auf 0 setzen, um die Beschleunigung zu Beginn herauszunehmen. 
	player.offset_l_faktor = 0;
	player.offset_r_faktor = 0;
	player.offset_u_faktor = 0;
	player.offset_d_faktor = 0;

	// Den Spielfortschritt zurücksetzen.
	game.victim_counter = parseFloat(0);
	game.bullet_count = parseFloat(0);
	game.highscore = parseFloat(0);

	// Die Schussrichtung ist zu Beginn immer nach rechts.
	player.left_or_right = "r";

	// Das Label für den aktuellen Punktestand
	document.getElementById('index_label_highscore_actual').innerHTML = "0";

	// Die Zeit zurücksetzen.
	document.getElementById('index_label_time_actual').innerHTML = "0.0";

	// Die Tasten für das Spielfeld setzen.
	set_keyboard();
}


// Die Tasten für den Spieler definieren.
function set_keyboard() {
	// Das Array map leeren.
	map = [];
	// Das Array map für die Tastenzuweisung.
	eval('map = {13: false, 32: false, ' + options.key_left + ': false, ' + options.key_up + ': false, ' + options.key_right + ': false, ' + options.key_down + ': false, ' + options.key_turbo + ': false, };');
}
