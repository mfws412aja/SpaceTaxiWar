//************************************************************************************************
// Die Optionen speichern.

function save_game() {
	if (options.other_user != user.name)
		return;

	// Die neu gesetzten Variablen entnehmen.
	options.draggable = true;
	options.key_up = options.key_up;
	options.key_down = options.key_down;
	options.key_left = options.key_left;
	options.key_right = options.key_right;
	options.key_turbo = options.key_turbo;
	options.friendly_fire = document.getElementById("options_friendly_fire").checked == true ? "X" : "";
	user.sounds_effekte = document.getElementById("options_sounds_effekte").checked == true ? "X" : "";
	user.sounds_bg = document.getElementById("options_sounds_bg").checked == true ? "X" : "";
	game.player_sprites = parseInt(document.getElementById("options_player_sprites_count").value);
	game.ziel_sprites = parseInt(document.getElementById("options_ziel_sprites_count").value);
	game.victim_sprites = parseInt(document.getElementById("options_victim_sprites_count").value);
	game.enemy_sprites = parseInt(document.getElementById("options_enemy_sprites_count").value);

	// Die Einstellungen für diesen User speichern.
	$.ajax({
		url : 'php/functions.php',
		type : 'POST',
		data : {
			func : 'save_options',
			sprache : options.sprache,
			difficulty : options.difficulty,
			highscore : player.highscore,
			current_user_stage : user.current_user_stage,
			current_default_stage : user.current_default_stage,
			sounds_effekte : user.sounds_effekte,
			sounds_bg : user.sounds_bg,
			friendly_fire : options.friendly_fire,
			key_up : options.key_up,
			key_down : options.key_down,
			key_left : options.key_left,
			key_right : options.key_right,
			key_turbo : options.key_turbo,
			user : user.name,
			email : user.email,
			passwort : user.pw,
			anzahl_player_sprites : game.player_sprites,
			anzahl_ziel_sprites : game.ziel_sprites,
			anzahl_victim_sprites : game.victim_sprites,
			anzahl_enemy_sprites : game.enemy_sprites,
		},
		success : function (data) {
			// Die Beschriftungen für die Labels laden.
			load_label(options.sprache);
	
			// Die Bilder neu laden. 
			set_player_pictures();

			// Die Seite Optionen aus- und das Spielfeld einblenden.
			change_page('#options', '#index');
		},
	});
}



// Liest die eingestellten Optionen für diesen User aus. Wenn es noch keine für diesen User gibt, wird eine Default-Einstellung geladen.
function read_options() {
	// Die Einstellungen für diesen User laden.
	$.ajax({
		url : 'php/functions.php',
		type : 'POST',
		data : {
			func : 'read_options',
			user : user.name,
			email : user.email,
			passwort : user.pw,
		},
		success : function (data) {
			var arr = data.split(";");
			options.sprache = arr[0];
			options.difficulty = parseFloat(arr[1]);
			player.highscore = parseFloat(arr[2]);
			user.current_user_stage = parseFloat(arr[3]);
			user.sounds_effekte = arr[4].replace('\r\n', '');
			user.sounds_bg = arr[5].replace('\r\n', '');
			options.friendly_fire = arr[6].replace('\r\n', '');
			options.key_up = parseFloat(arr[7].replace('\r\n', ''));
			options.key_down = parseFloat(arr[8].replace('\r\n', ''));
			options.key_left = parseFloat(arr[9].replace('\r\n', ''));
			options.key_right = parseFloat(arr[10].replace('\r\n', ''));
			options.key_turbo = parseFloat(arr[11].replace('\r\n', ''));
			user.current_default_stage = parseFloat(arr[12].replace('\r\n', ''));
			user.current_stage = user.current_default_stage;

			game.player_sprites  = parseFloat(arr[14].replace('\r\n', ''));
			game.ziel_sprites  = parseFloat(arr[15].replace('\r\n', ''));
			game.victim_sprites  = parseFloat(arr[16].replace('\r\n', ''));
			game.enemy_sprites  = parseFloat(arr[17].replace('\r\n', ''));
			
			document.getElementById("options_player_sprites_count").value = game.player_sprites;
			document.getElementById("options_ziel_sprites_count").value = game.ziel_sprites;
			document.getElementById("options_victim_sprites_count").value = game.victim_sprites;
			document.getElementById("options_enemy_sprites_count").value = game.enemy_sprites;

			document.getElementById('index_label_highscore').innerHTML = player.highscore;
			document.getElementById('options_sounds_effekte').checked = user.sounds_effekte == "X" ? true : false;
			document.getElementById('options_sounds_bg').checked = user.sounds_bg == "X" ? true : false;
			document.getElementById('options_friendly_fire').checked = options.friendly_fire == "X" ? true : false;
			document.getElementById('options_key_up').value = String.fromCharCode(options.key_up);
			document.getElementById('options_key_down').value = String.fromCharCode(options.key_down);
			document.getElementById('options_key_left').value = String.fromCharCode(options.key_left);
			document.getElementById('options_key_right').value = String.fromCharCode(options.key_right);
			document.getElementById('options_key_turbo').value = String.fromCharCode(options.key_turbo);

			// Alle Beschriftungen neu laden.
			load_label(options.sprache);

			// Die Tasten für das Spielfeld setzen.
			set_keyboard();

			// Die Hintergrundmusik starten.
			spiele_sound('audio_bg', 'theme');

			if (arr[13].replace('\r\n', '') == "X")	play_tutorial();
		}
	});
}


function play_tutorial() {
	var index = 1;
	var anzahl_texte = 7;
	var inter = setInterval(function() {
		if (!$('#dialog').is(':visible')) {
			if (index < anzahl_texte + 1) {
				basic_dialog('new_user_' + index);
				index += 1;
			} else 
				clearInterval(inter);
		}
	}, frame_update);
}