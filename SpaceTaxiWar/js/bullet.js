function shoot_bullet() {
	// Erst prüfen, ob bereits 3 Geschosse unterwegs sind.
	game.bullet_count += 1;

	spiele_sound('audio_sounds_1', 'schuss');

	var obj = layer.children[0];
	var width = 15;
	var height = 2;
	var pos_x = parseFloat(obj.getX() - width);
	var pos_y = parseFloat(obj.getY() + (obj.height() / 2));

	if (player.left_or_right == "r")
		pos_x += (obj.width() + width);

	var bullet = new Kinetic.Rect({
			bild : 'bullet',
			x : pos_x,
			y : pos_y,
			width : width,
			height : height,
			fill : 'blue',
			stroke : 'blue',
			strokeWidth : height,
			direction : player.left_or_right,
		});

	layer.add(bullet);

	return bullet;
}

function bullet_move(obj) {
	var offset = 15;
	var direction = obj.attrs['direction'];

	if (direction == "r") {
		obj.setX(obj.getX() + offset);
		if (obj.getX() >= options.width) {
			obj.remove();
			game.bullet_count -= 1;
			return ['+', 0];
		}
	} else {
		obj.setX(obj.getX() - offset);
		if ((obj.getX() + obj.width()) <= 0) {
			obj.remove();
			game.bullet_count -= 1;
			return ['+', 0];
		}
	}

	// Alle Figuren auf dem Spielfeld durchlaufen.
	for (var j = 2; j < layer.children.length; j++) {
		if (check_collision(obj, layer.children[j]) == true) {
			// Prüfen, ob das Geschoss eine Wand getroffen hat.
			if (layer.children[j].attrs['bild'] == "wall") {
				spiele_sound('audio_sounds_2', 'explosion');
				game.bullet_count -= 1;
				obj.remove();
				return ['+', 0];
			}
			// Prüfen, ob das Geschoss einen Gegner getroffen hat.
			else if (layer.children[j].attrs['bild'] == "enemy") {
				spiele_sound('audio_sounds_2', 'explosion');
				layer.children[j].remove();
				game.bullet_count -= 1;
				//					highscore = change_game_highscore("+", parseFloat(5), highscore);
				obj.remove();
				return ['+', 5];
			}
			// Prüfen, ob das Geschoss ein Victim getroffen hat und Friendly Fire aktiviert ist.
			else if (layer.children[j].attrs['bild'] == "victim" && options.friendly_fire == "X") {
				spiele_sound('audio_sounds_2', 'victim_kill');
				layer.children[j].remove();
				game.victim_counter += 1;
				game.bullet_count -= 1;
				//					highscore = change_game_highscore("-", parseFloat(15), highscore);
				obj.remove();
				return ['-', 15];
			}
		}
	}

	return "";
}
