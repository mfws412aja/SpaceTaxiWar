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

		// Die aktuelle Stage laden und ggf. das Spiel starten.
		game.active = !game.active;
		change_stage(user.current_stage, game.active);
	}
}).keyup(function (evt) {
	// Prüfen, ob das Spielfeld aktiv ist (dieses muss sichtbar sein);
	if (!$('#index').is(":visible"))
		return;

	if (evt.which in map) {
		map[evt.keyCode] = false;
		if (map[options.key_up] == false && map[options.key_down] == false)
			player.move_up_or_down = false;
	}
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
	if (map[options.key_left]) {
		// Die Schussrichtung nach links.
		player.left_or_right = "l";
		obj.setX(obj.getX() - offsetx);
		if (obj.getX() < 0)
			obj.setX(0);
	}

	// Nur rechts
	if (map[options.key_right]) {
		// Die Schussrichtung nach rechts.
		player.left_or_right = "r";
		obj.setX(obj.getX() + offsetx);
		if (obj.getX() > (options.width - obj.width()))
			obj.setX(options.width - obj.width());
	}

	// Nur hoch
	if (map[options.key_up]) {
		player.move_up_or_down = true;
		obj.setY(obj.getY() - offsety);
		if (obj.getY() < 0)
			obj.setY(0);
	}

	// Nur runter
	if (map[options.key_down]) {
		player.move_up_or_down = true;
		obj.setY(obj.getY() + offsety);
		if (obj.getY() + obj.height() > options.height)
			obj.setY(options.height - obj.width());
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

	// Den Sound für den Schub, sofern eine Richtungstaste gedrückt wurde. 
	if (map[options.key_up] || map[options.key_down] || map[options.key_left] || map[options.key_right]) spiele_sound("audio_sounds_5", "schub");
	
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
