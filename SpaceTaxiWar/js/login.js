$(document).ready(function () {
	// Den verwendeten Browser ermitteln.
	ermittle_browser();

	// Alle Beschriftungen laden.
	load_label(options.sprache);

	define_game_field();

	// Die erste Seite anzeigen.
	change_page('#index', '#login');

	// Das Textfeld f�r den User selektieren.
	document.getElementById('login_username').focus();

	// Die Entertaste abfangen.
	var keypress_event = $(document).keydown(function (evt) {
			// Pr�fen, ob das Spielfeld aktiv ist (dieses muss sichtbar sein);
			if (!$('#login').is(":visible"))
				return;

			if (evt.which == 13)
				$('#login_login_button').click();
		});

	$('#login_login_button').click(function () {
		user.name = document.getElementById('login_username').value.trim();
		if (!user.name) {
			document.getElementById('login_username').focus();
			return;
		}
		options.other_user = user.name;

		var regex = new RegExp(/[^a-zA-Z0-9_�������]/);
		if (user.name.match(regex)) {
			basic_dialog('falsche_zeichen', ["[a-zA-Z0-9_�������]"]);
			document.getElementById('login_username').focus();
			return;
		}
		onload();
	});
});
