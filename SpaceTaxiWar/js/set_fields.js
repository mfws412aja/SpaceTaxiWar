//************************************************************************************************
// Bereitet die Übernahme der aktuellen Drop-Down-Werte vor.

function set_dropdown_values() {
	get_dropdown_value('options_sprache', options.sprache);
	get_dropdown_value('options_width', options.width);
	get_dropdown_value('options_height', options.height);
	get_dropdown_value('options_difficulty', options.difficulty);
	//	get_dropdown_value('index_select_user_stage', user.current_user_stage);
	get_dropdown_value('index_select_user_stage', user.current_stage);
	get_dropdown_value('index_select_default_stage', user.current_default_stage);
}

//************************************************************************************************
// Legt die Werte bei den Drop-Down Menüs bei den Optionen fest. Diese kommen aus den gespeicherten Useroptionen.

function get_dropdown_value(drop_down_id, value) {
	for (var i = 0; i < document.getElementById(drop_down_id).length; i++) {
		var drop_down_value = document.getElementById(drop_down_id)[i].value;
		if (drop_down_value == value) {
			document.getElementById(drop_down_id)[i].selected = true;
			return;
		}
	}
}

//************************************************************************************************
// Bei dem Objekt user die aktuellen Pfade hinterlegen und das Bild bei den Optionen einbinden.

function set_player_pictures() {
	set_picture('player');
	set_picture('ziel');
	set_picture('victim');
	set_picture('enemy');
}

function set_picture(bild) {
	var id = 'options_img_' + bild + '_bild';
	var src = 'img/' + options.other_user + '/' + bild + '.png';

	// Die Einstellungen für diesen User speichern.
	$.ajax({
		url : 'php/functions.php',
		type : 'POST',
		data : {
			func : 'check_file_exists',
			filename : src,
			user : options.other_user,
			email : user.email,
			passwort : user.pw,
		},
		success : function (data) {
			if (data != 0) {
				src = 'img/' + bild + '.png';
			}
			eval('user.' + bild + '_bild_src = src;');
			resize_img(id, src);
		},
	});
}


function resize_img(id, src) {
	var obj = document.getElementById(id);
	obj.onload = function() {
		// Die Größe der Bilder anpassen. 50 Pixel ist das maximum. 
		var max_pixel = 50;
		var obj_width = parseInt(obj.naturalWidth);
		var obj_height = parseInt(obj.naturalHeight);
		var faktor = 1;
		if (obj_width > max_pixel && obj_width >= obj_height) faktor = obj_width / max_pixel;
		else if (obj_height > max_pixel && obj_height >= obj_width) faktor = obj_height / max_pixel;

		obj.width = obj_width / faktor;
		obj.height = obj_height / faktor;
	};
	obj.src = src;
}


function set_other_user_dropdown() {
	// Setzt das Feld in dem die Level anderer User gespielt werden können.
	$.ajax({
		url : 'php/functions.php',
		type : 'POST',
		data : {
			func : 'read_all_users',
			user : user.name,
			email : user.email,
			passwort : user.pw,
		},
		success : function (data) {
			var arr = data.split(";");
			$('#options_other_user').empty();
			$('#options_other_user').append('<option selected value="' + user.name + '">' + user.name + '</option>');

			var last_user = "";
			for (var i = 0; i < arr.length; i++) {
				if (last_user == arr[i].replace('\r\n', '')) continue;
				last_user = arr[i].replace('\r\n', '');
				$('#options_other_user').append('<option value="' + last_user + '">' + last_user + '</option>');
			}
		}
	});
}

function get_saved_stages_count(hide_login) {
	// Die Anzahl an erstellten Stages für diesen User laden.
	$.ajax({
		url : 'php/functions.php',
		type : 'POST',
		data : {
			func : 'get_saved_stages_count',
			user : options.other_user,
			email : user.email,
			passwort : user.pw,
		},
		success : function (data) {
			// Die Anzahl an Stages speichern.
			var arr = data.split(";");
			options.anzahl_user_stages = Number(arr[0]);
			options.anzahl_default_stages = Number(arr[1]);

			$('#index_select_user_stage').empty();
			$('#index_select_default_stage').empty();

			for (var i = 1; i < options.anzahl_user_stages + 1; i++) {
				$('#index_select_user_stage').append('<option value="' + i + '">' + i + '</option>');
			}

			for (var i = 1; i < options.anzahl_default_stages + 1; i++) {
				$('#index_select_default_stage').append('<option value="' + i + '">' + i + '</option>');
			}

			if (hide_login) {
				$('#login').hide(index_effect.hide_effect, index_effect.hide_duration, function () {
					$('#index_start_game_button').click();
				});
			}
		},
	});
}




// Addiert oder subtrahiert einen Wert auf den aktuellen Punktestand.
function change_game_highscore(operator, value, highscore) {
	eval('highscore ' + operator + '= parseFloat(value);');
	if (highscore < 0)
		highscore = 0; // Der Highscore darf nicht kleiner als 0 sein.
	highscore = Math.round(highscore);
	document.getElementById('index_label_highscore_actual').innerHTML = highscore;
	return highscore;
}


