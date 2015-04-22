$(document).keydown(function (evt) {
	// Prüfen, ob das Spielfeld aktiv ist (dieses muss sichtbar sein);
	if (!$('#index').is(":visible"))
		return;
	if (evt.which in map) {
		// Wenn eine Taste gedrückt wurde. Dadurch wird das Scrollen per Pfeiltasten und weiteres unterbunden.
		evt.preventDefault();
		map[evt.which] = true;
	}

	// Enter
	if (map[13]) {
		// Wenn der Dialog gerade geöffnet ist, hier abbrechen.
		if ($('#dialog').is(":visible"))
			return;

		// Prüft, ob das Spielfeld gerade aufgebaut wird. 
		if (!game.ready_state) return;
		game.ready_state = false;
		
		// Den Sound für den Schub definieren. 
		spiele_sound("audio_sounds_5", "schub");

		// Die aktuelle Stage laden und ggf. das Spiel starten.
		game.active = !game.active;
		change_stage(user.current_stage, game.active);
	}
	
	// Den Sound für den Schub aktivieren, sofern eine Richtungstasten gedrückt wurde. 
	if ((map[options.key_up] || map[options.key_down] || map[options.key_left] || map[options.key_right]) && game.active) document.getElementById("audio_sounds_5").volume = 0.2;

}).keyup(function (evt) {
	// Prüfen, ob das Spielfeld aktiv ist (dieses muss sichtbar sein);
	if (!$('#index').is(":visible"))
		return;

	if (evt.which in map) {
		map[evt.keyCode] = false;
		// Wenn eine Taste losgelassen wurde prüfen, ob keine Hoch- oder Runtertaste mehr gedrückt wurde und der Hoch- Runterfaktor = 0 ist. 
		var inter = setInterval(function() {
			if (map[options.key_up] == false && map[options.key_down] == false && player.offset_u_faktor <= 0 && player.offset_d_faktor <= 0) {
				player.move_up_or_down = false;
				clearInterval(inter);
			}
		}, 10);
	}
	
	// Den Sound für den Schub deaktivieren, sofern keine Richtungstasten mehr gedrückt sind. 
	if (!map[options.key_up] && !map[options.key_down] && !map[options.key_left] && !map[options.key_right]) document.getElementById("audio_sounds_5").volume = 0;

});

function player_move() {
	// Den Spieler bewegen.
	var obj = layer.children[0];
	var old_posx = obj.getX();
	var old_posy = obj.getY();
	var offsetx = player.offsetx;
	var offsety = player.offsety;
	var bullet_shot;

	if (game.active == false) return;

	// Leertaste. Diese wird hier separat behandelt um Waffen abzufeuern.
	if (map[32] && game.bullet_count < 300) {
		// Ein Timeout für die Geschosse setzen.
		if (game.bullet_timeout <= 0) {
			game.bullet_timeout = 200;
			bullet_shot = shoot_bullet();
		}
	}

	// Wenn die Turbo-Taste gedrückt wird, soll das Schiff mit doppelter Geschwindigkeit fliegen.
	if (map[options.key_turbo]) {
		offsetx *= 3;
		offsety *= 3;
	}

	// Nur links
	if (map[options.key_left] || (player.offset_l_faktor > 0 && player.left_or_right == "l")) {
		// Die Schussrichtung nach links.
		player.left_or_right = "l";
		obj.setX(obj.getX() - (offsetx * (player.offset_l_faktor - player.offset_r_faktor)));
		if (obj.getX() >= (options.width - obj.width())) obj.setX(options.width - obj.width());
		if (obj.getX() <= 0) obj.setX(0);
	}

	// Nur rechts
	if (map[options.key_right] || (player.offset_r_faktor > 0 && player.left_or_right == "r")) {
		// Die Schussrichtung nach rechts.
		player.left_or_right = "r";
		obj.setX(obj.getX() + (offsetx * (player.offset_r_faktor - player.offset_l_faktor)));
		if (obj.getX() >= (options.width - obj.width())) obj.setX(options.width - obj.width());
		if (obj.getX() <= 0) obj.setX(0);
	}

	// Nur hoch
	if (map[options.key_up] || (player.offset_u_faktor > 0 && player.up_or_down == "u")) {
		player.up_or_down = "u";
		player.move_up_or_down = true;
		obj.setY(obj.getY() - (offsety * (player.offset_u_faktor - player.offset_d_faktor)));
		if (obj.getY() + obj.height() >= options.height) obj.setY(options.height - obj.height());
		if (obj.getY() <= 0) obj.setY(0);
	}

	// Nur runter
	if (map[options.key_down] || (player.offset_d_faktor > 0 && player.up_or_down == "d")) {
		// Die Schussrichtung nach rechts.
		player.up_or_down = "d";
		player.move_up_or_down = true;
		obj.setY(obj.getY() + (offsety * (player.offset_d_faktor - player.offset_u_faktor)));
		if (obj.getY() + obj.height() >= options.height) obj.setY(options.height - obj.height());
		if (obj.getY() <= 0) obj.setY(0);
	}

	// Prüfen, ob der Spieler nicht gegen eine Wand läuft.
	for (var i = 2; i < layer.children.length; i++) {
		var bild = layer.children[i].attrs['bild'];
		if (bild == 'wall') {
			if (check_collision_wall(layer.children[i]) == true) {
//				if (obj.getY() < layer.children[i].getY()) obj.setY(layer.children[i].getY() - obj.height());
//				else if (obj.getY() <= layer.children[i].getY() + layer.children[i].width() && obj.getY + obj.width() > layer.children[i].getY() - layer.children[i].height())
//					obj.setY(old_posy);
//					obj.setY(layer.children[i].getY() + layer.children[i].height());
				obj.setY(old_posy);
				obj.setX(old_posx);
			}
		}
	}

	var x = obj.getX() - ($(window).width() / 2);
	window.scrollTo(x, obj.getY());
	
	return bullet_shot;
}

function player_drop() {
	var obj = layer.children[0];

	if ((options.height - obj.height()) <= obj.getY()) {
		obj.setY(options.height - obj.height());
		return;
	}

	// Mit dem Fenster an dem Spieler bleiben.
	//	window.scrollTo(obj.getX(), obj.getY());
	obj.setY(obj.getY() + (player.offset_drop * options.difficulty));

	var x = obj.getX() - ($(window).width() / 2);
	window.scrollTo(x, obj.getY());
}


function set_player_speedup() {
	player.speedup = setInterval(function() {
		// Prüfen, ob die linke Richtungstaste gedrückt wurde, um das Schiff zu beschleunigen. 
		if (map[options.key_left] && player.offset_l_faktor < 1) player.offset_l_faktor += player.offset_faktor_add;
		else if (player.offset_l_faktor > 0) player.offset_l_faktor -= player.offset_faktor_sub;

		// Prüfen, ob die rechte Richtungstaste gedrückt wurde, um das Schiff zu beschleunigen. 
		if (map[options.key_right] && player.offset_r_faktor < 1) player.offset_r_faktor += player.offset_faktor_add;
		else if (player.offset_r_faktor > 0) player.offset_r_faktor -= player.offset_faktor_sub;

		// Prüfen, ob die Richtungstaste hoch gedrückt wurde, um das Schiff zu beschleunigen. 
		if (map[options.key_up] && player.offset_u_faktor < 1) player.offset_u_faktor += player.offset_faktor_add;
		else if (player.offset_u_faktor > 0) player.offset_u_faktor -= player.offset_faktor_sub;

		// Prüfen, ob die Richtungstaste runter gedrückt wurde, um das Schiff zu beschleunigen. 
		if (map[options.key_down] && player.offset_d_faktor < 1) player.offset_d_faktor += player.offset_faktor_add;
		else if (player.offset_d_faktor > 0) player.offset_d_faktor -= player.offset_faktor_sub;

	}, player.offset_faktor_duration);
}

