//************************************************************************************************
// Prüft, ob das erste übergene Objekt mit dem zweiten in Berührung kommt.

function check_collision(obj1, obj2) {
	// Rechte Seite des Spielers mit linker Seite des Objektes. && Linke Seite des Spielers mit rechter Seite des Objektes.
	if (obj1.getX() + obj1.width() >= obj2.getX() && obj1.getX() <= obj2.getX() + obj2.width()) {
		// Untere Seite des Spielers mit oberer Seite des Objektes. && Obere Seite des Spielers mit linker Seite des Objektes.
		if (obj1.getY() + obj1.height() >= obj2.getY() && obj1.getY() <= obj2.getY() + obj2.height()) {
			return true;
		}
	}
	return false;
}

function check_collision_wall(obj) {
	var player = layer.children[0];

	// Rechte Seite des Spielers mit linker Seite des Objektes. && Linke Seite des Spielers mit rechter Seite des Objektes.
	if (player.getX() + player.width() > obj.getX() && player.getX() < obj.getX() + obj.width()) {
		// Untere Seite des Spielers mit oberer Seite des Objektes. && Obere Seite des Spielers mit unterer Seite des Objektes.
		if (player.getY() + player.height() >= obj.getY() && player.getY() <= obj.getY() + obj.height()) {
			// Obere Seite des Spielers mit unterer Seite des Objektes. && Untere Seite des Spielers mit unterer Seite des Objektes und ob hoch gedrückt wird.
			if (player.getY() <= obj.getY() + obj.height() && player.getY() + player.height() > obj.getY() + obj.height() && map[options.key_up] == true)
				return true;
			// Ansonsten wenn hoch gedrückt wird.
			else if (map[options.key_up] == true)
				return false;
			else
				return true;
		}
		// Untere Seite des Spielers mit oberer Seite des Objektes. && Obere Seite des Spielers mit unterer Seite des Objektes.
		else if (player.getY() + player.height() > obj.getY() && player.getY() < obj.getY() + obj.height())
			return true;
	}
	return false;
}

