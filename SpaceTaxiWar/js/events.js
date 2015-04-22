$(document).ready(function () {
	$('#options_save_options_button').click(function () {
		save_game();
	});

	$('#index_save_stage_button').click(function () {
		if (options.other_user != user.name)
			return;
		// Korrigiert die Positionen der Figuren falls diese außerhalb des Spielfeldes liegen.
		place_figures();

		confirm_dialog_function('save_stage_text', 'button_create_new_stage', 'button_overwrite_stage', 'save_stage(1)', 'save_stage(2)');
	});

	$('#index_delete_stage_button').click(function () {
		if (options.other_user != user.name)
			return;
		// Prüfen, ob das die letzte Stage von diesem User ist.
		if (options.anzahl_user_stages <= 1) {
			basic_dialog('cannot_delete_last_stage');
			return;
		}

		confirm_dialog_function('delete_stage', 'button_nein', 'button_ja', '', 'delete_stage()');
	});

	$('#index_start_game_button').click(function () {
		// Den aktuellen Spielernamen auf den eingeloggten setzen.
		options.other_user = user.name;

		// Erst die gesamte Seite verbergen. Wenn alles verborgen wurde, die nicht mehr änderbaren Elemente ausblenden.
		$('#index').hide(index_effect.hide_effect, index_effect.hide_duration, function () {
			// Den End-Button und die Default-Stage-Auswahl einblenden.
			$('#index_end_game_button').show();
			$('#index_select_default_stage').show();

			// Alle Elemente ausblenden
			$('#index_options').hide();
			$('#index_save_stage_button').hide();
			$('#index_delete_stage_button').hide();
			$('#index_select_user_stage').hide();
			$('#index_start_game_button').hide();

			// Den Wert default_run auf X setzen. Damit werden die Default-Stages geladen.
			user.default_run = "X";

			// Hier wird die aktuelle Stage übernommen. Abhängig davon, ob die User- oder die Default-Stages durchlaufen werden.
			user.current_stage = user.current_default_stage;

			// Die erste Default-Stage aufrufen.
			if (on_bild_load >= 4) change_stage(user.current_stage, false);

			// Wenn alles weg ist, index wieder einblenden.
			$('#index').show(index_effect.show_effect, index_effect.show_duration);
		});
	});

	$('#index_end_game_button').click(function () {
		// Erst die gesamte Seite verbergen. Wenn alles verborgen wurde, die nicht mehr änderbaren Elemente ausblenden.
		$('#index').hide(index_effect.hide_effect, index_effect.hide_duration, function () {
			// Den End-Button und die Default-Stage-Auswahl ausblenden.
			$('#index_end_game_button').hide();
			$('#index_select_default_stage').hide();

			// Setzt das Feld in dem die Level anderer User gespielt werden können.
			set_other_user_dropdown();

			// Den Wert default_run auf "" setzen. Damit werden die User-Stages geladen.
			user.default_run = "";

			// Hier wird die aktuelle Stage übernommen. Abhängig davon, ob die User- oder die Default-Stages durchlaufen werden.
			user.current_stage = user.current_user_stage;

			get_saved_stages_count(false);

			// Die erste Default-Stage aufrufen.
			change_stage(user.current_stage, false);

			// Alle Elemente ausblenden
			$('#index_options').show();
			$('#index_save_stage_button').show();
			$('#index_delete_stage_button').show();
			$('#index_select_user_stage').show();
			$('#index_start_game_button').show();

			// Wenn wieder da ist, index wieder einblenden.
			$('#index').show(index_effect.show_effect, index_effect.show_duration);
		});
	});

	// Erst die DropDown-Klasse.
	$('.options_dropdown').change(function () {
		var options_art = this.getAttribute('options_art');
		if (options_art == "other_user") {
			options.other_user = this.value.trim();
			user.current_stage = 1;
			get_saved_stages_count(false);
//			set_player_pictures();
//			change_stage(1, false);
			if (options.other_user == user.name) {
				$('#index_save_stage_button').show();
				$('#index_delete_stage_button').show();
				$('.options_field_size').show();
			} else {
				$('#index_save_stage_button').hide();
				$('#index_delete_stage_button').hide();
				$('.options_field_size').hide();
			}
		} else if (options_art == "width") {
			options.width = parseFloat(this.value);
			game_field.setWidth(parseFloat(this.value));
		} else if (options_art == "height") {
			options.height = parseFloat(this.value);
			game_field.setHeight(parseFloat(this.value));
		} else if (options_art == "current_stage") {
			user.current_stage = parseFloat(this.value);
			if (user.default_run == "")
				user.current_user_stage = user.current_stage;
			else
				user.current_default_stage = user.current_stage;

			change_stage(user.current_stage, false);
		}

		if (options_art == "sprache") {
			options.sprache = this.value;
			// Alle Beschriftungen neu laden.
			load_label(options.sprache);
		} else if (options_art == "difficulty") {
			options.difficulty = parseFloat(this.value);
		} else {
			save_game();
		}
		place_figures();
	});


	$('.options_sprite_count').change(function () {
		if (this.value <= 0 || this.value > 100) this.value = 1;
	});

	$('#index_reset_button').click(function () {
		reset_game();

		// Das Spielfeld neu laden. Das Spiel selber nicht starten.
		change_stage(user.current_stage, false);
	});

	// Mit einem Klick auf das Label für die Sounds soll das Ändern der Checkbox simuliert werden.
	$('#options_label_sounds_effekte').click(function () {
		$('#options_sounds_effekte').click();
	});

	// Mit einem Klick auf das Label für die Sounds soll das Ändern der Checkbox simuliert werden.
	$('#options_label_sounds_bg').click(function () {
		$('#options_sounds_bg').click();
	});

	// Mit einem Klick auf das Label für die Sounds soll das Ändern der Checkbox simuliert werden.
	$('#options_label_friendly_fire').click(function () {
		$('#options_friendly_fire').click();
	});

	// Mit einem Klick auf das Label für die Sounds soll das Ändern der Checkbox simuliert werden.
	$('#options_delete_user_button').click(function () {
		return;
		confirm_dialog_function('delete_user', 'button_nein', 'button_ja', '', 'delete_user()');
	});

	// Nachdem die Taste geändert wird, den Wert speichern.
	$('.game_key').keydown(function (evt) {
		// Mögliche andere Events unterbinden.
		evt.preventDefault();
		this.value = String.fromCharCode(evt.which);
		var direction = this.getAttribute('direction');
		var label_id = 'options_label_keycode_' + direction;
		eval('options.key_' + direction + ' = parseFloat(evt.which);');
		eval('document.getElementById(label_id).innerHTML = evt.which;');
		// Die Tasten für das Spielfeld setzen.
		set_keyboard();
	});


	
	$('.options_bild_input').change(function () {	
		// Prüfen, ob der jeweilige User seine eigenen Bilder ändert oder die eines besuchten Users.
		if (options.other_user != user.name) {
			basic_dialog('cannot_change_other_user_picture');
			return;
		}

		var id = this.id;
		var bild = this.getAttribute('bild');
		var form_data = new FormData();
		var request = new XMLHttpRequest();
		var file_input = document.getElementById(id);
		var size = file_input.files[0].size;
		var max_size = 1000000;

		// Die Dateigröße prüfen. Diese wird hier in Bytes übergeben.
		if (size > max_size) {
			basic_dialog('picture_upload_size_error', [max_size]);
			return;
		}
		form_data.append(id, file_input.files[0]);
		form_data.append("bild_id", id);
		form_data.append("bild", bild);
		form_data.append("user", user.name);
		form_data.append("passwort", user.pw);
		form_data.append("email", user.email);
		form_data.append("func", "bild_upload");
		request.open("POST", "php/functions.php");
		request.send(form_data);

		request.onreadystatechange = function () {
			if (request.readyState === 4) {
				if (request.status === 200) {
					var new_id = 'options_img_' + bild + '_bild';
					var new_src = request.responseText.trim() + "?" + new Date().getTime();
					var obj = document.getElementById(new_id);
					eval('user.' + bild + '_bild_src = new_src;');
					set_player_pictures();
//					resize_img(new_id, new_src, bild);
					save_game();
					change_stage(user.current_stage, false);
				} else {
					basic_dialog('error_during_picture_uploading', [request.status]);
				}
			}
		};
	});
});
