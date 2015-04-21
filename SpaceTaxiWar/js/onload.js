function onload() {

	// Bei den Optionen die Höhe und Breite definieren.
	for (var i = 550 ; i < 2050 ; i += 50) {
		$('#options_width').append('<option value="' + i + '">' + i + '</option>');
		$('#options_height').append('<option value="' + i + '">' + i + '</option>');
	}

	// Beim Schwierigkeitsgrad die Werte definieren.
	for (var i = 2 ; i < 21 ; i++) {
		$('#options_difficulty').append('<option value="' + i + '">' + i + '</option>');
	}

	// Die Benutzerdefinierten Optionen laden.
	read_options();

	// Die Bilder bei den Optionen anzeigen.
	set_player_pictures();

	// Ermittelt für den aktuellen User die Anzahl ersteller Stages.
	get_saved_stages_count(true);
}
