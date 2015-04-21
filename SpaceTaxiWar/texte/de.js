var label_login = {
	login_label_username : "Username: ",
	login_login_button : "Login",
};

var label_index = {
	index_impressung : "Impressum",
	index_save_stage_button : "Speichern",
	index_delete_stage_button : "Stage löschen",
	index_options_button : "Optionen",
	index_reset_button : "Reset",
	index_start_game_button : "Start Game",
	index_end_game_button : "Stage-Builder",
	index_label_spacetaxi_header : "SpaceTaxiWar",
	index_label_highscore_text : "Highscore: ",
	index_label_highscore_actual_text : "Aktuell: ",
	index_label_time_text : "Time: ",
}

var label_options = {
	options_label_sprache : "Sprache ändern",
	options_label_sounds_effekte : "Töne",
	options_label_sounds_bg : "Hintergrundmusik",
	options_label_friendly_fire : "Friendly Fire",
	options_label_other_user : "User besuchen: ",
	options_label_width : "Breite: ",
	options_label_height : "Höhe: ",
	options_label_stage : "Stage: ",
	options_label_difficulty : "Schwierigkeitsgrad",
	options_label_key_up : "Hoch: ",
	options_label_key_down : "Runter: ",
	options_label_key_left : "Links: ",
	options_label_key_right : "Rechts: ",
	options_label_key_turbo : "Turbo: ",
	options_back_button : "Zurück",

	options_label_player_bild : "Spieler-Bild ändern",
	options_label_ziel_bild : "Ziel-Bild ändern",
	options_label_victim_bild : "Passagier-Bild ändern",
	options_label_enemy_bild : "Alien-Bild ändern",

	options_delete_user_button : "User löschen",
	options_save_options_button : "Änderungen speichern",
}

var label_dialog = {
	// Aus dialog.js
	title : "SpaceTaxiWar",
	button_ja : "Ja",
	button_nein : "Nein",
	button_cancel : "Abbrechen",
	button_ok : "OK",

	// Die Texte für ein Tutorial bei einem neuen User.
	new_user_1 : "Willkommen Rekrut,<br /><br />wir haben schon auf dich gewartet!<br /><br />Wir können immer fähige Taxifahrer gebrauchen!",
	new_user_2 : "Wir erhalten dutzende Anrufe von Gästen, die eingesammelt werden wollen.<br />Ziel jeder Fahrt ist es also, alle Passagiere einzusammeln und anschließend zur Basis zu fliegen.<br />Vergisst du nur einen Passagier, gibt es keine Punkte auf dein Konto!",
	new_user_3 : "Die Steuerung deines Schiffs ist folgendermaßen vorbelegt:<br /><br />Hoch: W<br />Runter: S<br />Links: A<br />Rechts: D<br />Turbo-Boost: 0<br />Schuss: Leertaste<br /><br />Mit der Enter-Taste kann deine Fahrt gestartet oder resettet werden.",
	new_user_4 : "In den Optionen kann die Steuerung des Schiffs geändert werden. Die Feuertaste für den Schuss und das Starten ist allerdings fest definiert.",
	new_user_5 : "Die Konkurrenz schläft nicht, also knall sie alle ab!<br />Diese auszuschalten ist zwar optional, gibt aber einen Extrabonus!",
	new_user_6 : "Wenn du Passagiere abschießt, gibt es einen Punkteabzug.<br />Auch hier kannst du in den Optionen unter 'Friendly Fire' einen Softbeam einstellen, was dir am Ende allerdings einen Punktenachteil verschafft.",
	new_user_7 : "Na dann flieg mal los Frischling und zeig uns was du kannst!",

	// Wenn auf save_stage geklickt wird.
	button_create_new_stage : "Neue Erstellen",
	button_overwrite_stage : "Diese überschreiben",
	save_stage_text : "Diese Stage speichern?",

	// Wenn eine Figur hinzugefügt oder gelöscht werden soll.
	create_or_delete_figure : "Diese Figur: ",
	button_delete_figure : "Entfernen",
	button_create_figure : "Neue erstellen",

	new_highscore : "New Highscore!<br /><br />Zeit-Bonus: x {0}<br />Friendly-Fire-Bonus: x {1}<br /><br />Gesamt: {2}",
	stage_clear : "Stage clear!<br /><br />Zeit-Bonus: x {0}<br />Friendly-Fire-Bonus: x {1}<br /><br />Gesamt: {2}",
	would_be_a_new_highscore : "This would be a new Highscore!<br /><br />Zeit-Bonus: x {0}<br />Friendly-Fire-Bonus: x {1}<br /><br />Gesamt: {2}",
	no_more_levels : "Keine weiteren Level vorhanden.",
	time_up : "Zeit abgelaufen!",
	game_over : "Game Over",
	rescue_all_victims : "Game Over!<br />Sammle alle Passagiere ein! {0} / {1}",

	// Aus dem login-Formular
	falsche_zeichen : "Bitte nur folgende Zeichen eingeben: {0}",

	// Aus den events
	successful_save : "Erfolgreich gespeichert",
	delete_stage : "Möchten Sie diese Stage wirklich löschen?",
	delete_user : "Möchten Sie diesen User unwiderruflich löschen?",
	cannot_delete_last_stage : "Sie können Ihre letzte Stage nicht löschen",
	successful_deleted : "Erfolgreich gelöscht",
	picture_successful_changed : "Bild erfolgreich geändert. Gegebenenfalls müssen Sie die Seite aktualisieren.",
	error_during_picture_uploading : "Es ist ein Fehler beim Hochladen aufgetreten: {0}",
	picture_upload_size_error : "Datei ist zu groß. Maximal {0} KB",

	// Aus game_field
	cannot_delete_last_figure : "Sie können Ihre letzte Figur dieser Art nicht löschen",
};
