function confirm_dialog_function(id_text, button_1, button_2, func_1, func_2) {
	// Erst das Fenster ganz nach oben scrollen.
//	scroll_window();

	// Die erste Ausgabe, ob der Energieverbrauch zu hoch ist.
	var dialog_title = label_dialog['title'];
	var button_1 = label_dialog[button_1];
	var button_2 = label_dialog[button_2];
	var button_cancel = label_dialog['button_cancel'];
	var dialog_text = label_dialog[id_text];
	var doc = ($('#index').is(":visible")) ? $("#game_field") : document;

	document.getElementById('dialog_text').innerHTML = dialog_text;

	// Hier wird die Messagebox mit Buttons definiert, die zu Beginn aufgerufen werden soll.
	$dialog = $('#dialog').dialog({
			title : dialog_title,
			autoOpen : false,
			resizable : true,
			// Sodass keine anderen Elemente während der Dialogbox angewählt werden können.
			modal : true,
			// Der Titel des X-Buttons an der oberen rechten Ecke. (Sofern nicht ausgeblendet)
			closeText : button_cancel,
			//		position: {
			// my: 'center',
			// at: 'top',
			// of: doc,
			//			my: 'center',
			//			at: 'center',
			//			of: window,
			//		},
			buttons : [{
					text : button_1,
					class : 'dialog_button',
					click : function () {
						eval(func_1 + ';');
						$dialog.dialog("close");
						return true;
					},
				}, {
					text : button_2,
					class : 'dialog_button',
					click : function () {
						eval(func_2 + ';');
						$dialog.dialog("close");
						return true;
					},
				}
			],
			show : {
				effect : index_effect.show_effect,
				duration : index_effect.show_duration,
			},
			hide : {
				effect : index_effect.hide_effect,
				duration : index_effect.hide_duration,
			}
		});

	return $("#dialog").dialog("open");
}



function basic_dialog(id, arr) {
	// Die erste Ausgabe, ob der Energieverbrauch zu hoch ist.
	var dialog_title = label_dialog['title'];
	var button_ok = label_dialog['button_ok'];
	var button_cancel = label_dialog['button_cancel'];
	var dialog_text = String.format(label_dialog[id], arr);

	document.getElementById('dialog_text').innerHTML = dialog_text;

	// Die Entertaste abfangen.
	$(document).keydown(function (evt) {
		// Prüfen, ob das Spielfeld aktiv ist (dieses muss sichtbar sein);
		//		if (!$('#index').is(":visible")) return;
		if (evt.which == 13)
			$('#dialog_button_ok').click();
	});

	// Hier wird die Messagebox mit Buttons definiert, die zu Beginn aufgerufen werden soll.
	$dialog = $('#dialog').dialog({
			title : dialog_title,
			autoOpen : false,
			resizable : true,
			// Sodass keine anderen Elemente während der Dialogbox angewählt werden können.
			modal : true,
			// Der Titel des X-Buttons an der oberen rechten Ecke. (Sofern nicht ausgeblendet)
			closeText : button_cancel,
			//		position: 'center',
			//{
			// my: 'center',
			// at: 'center',
			// of: $("#game_field"),
			//			my: 'center',
			//			at: 'center',
			//			of: window,
			//		},
			buttons : [{
					id : "dialog_button_ok",
					text : button_ok,
					class : 'dialog_button',
					click : function () {
						$dialog.dialog("close");
						return;
					},
				}
			],
			show : {
				effect : index_effect.show_effect,
				duration : index_effect.show_duration,
			},
			hide : {
				effect : index_effect.hide_effect,
				duration : index_effect.hide_duration,
			}
		});

	return $("#dialog").dialog("open");
}

function save_stage(decision) {
	var figures = "";
	var stage = Number(user.current_user_stage);
	var new_stage = false;

	// Hier wird abgefragt, ob eine neue Stage erstellt oder die bestehende überschrieben wird.
	// 1 = neue Stage erstellen, 2 = bestehende überschreiben, 3 = abbrechen
	if (decision == 3)
		return;
	else if (decision == 1) {
		// Eine neue Stage anlegen.
		options.anzahl_user_stages += 1;
		stage = options.anzahl_user_stages;
		new_stage = true;
	}

	for (var i = 0; i < layer.children.length; i++) {
		figures += layer.children[i].attrs['bild'] + ";";
		figures += layer.children[i].attrs['x'] + ";";
		figures += layer.children[i].attrs['y'] + ";";
		figures += layer.children[i].attrs['width'] + ";";
		figures += layer.children[i].attrs['height'];

		figures += "_new_figure_";
	}

	// Die Einstellungen für diesen User speichern.
	$.ajax({
		url : 'php/functions.php',
		type : 'POST',
		data : {
			func : 'save_stage',
			stage : stage,
			figures : figures,
			width : options.width,
			height : options.height,
			user : user.name,
			email : user.email,
			passwort : user.pw,
		},
		success : function (data) {
			if (new_stage == true) {
				$('#index_select_user_stage').append('<option value="' + options.anzahl_user_stages + '">' + options.anzahl_user_stages + '</option>');
				user.current_stage = options.anzahl_user_stages;
				user.current_user_stage = options.anzahl_user_stages;
				change_stage(options.anzahl_user_stages, false);
			}
			basic_dialog('successful_save');

			save_game();
		},
	});
}

function delete_stage() {
	// Die Einstellungen für diesen User speichern.
	$.ajax({
		url : 'php/functions.php',
		type : 'POST',
		data : {
			func : 'delete_stage',
			stage : user.current_user_stage,
			user : user.name,
			email : user.email,
			passwort : user.pw,
		},
		success : function (data) {
			// Die Zahl der Stages um 1 verringern.
			options.anzahl_user_stages = Number(data) - 1;
			if (user.current_user_stage > options.anzahl_user_stages)
				user.current_user_stage -= 1;
			user.current_stage = user.current_user_stage;
			$('#index_select_user_stage').empty();
			for (var i = 1; i < options.anzahl_user_stages + 1; i++) {
				$('#index_select_user_stage').append('<option value="' + i + '">' + i + '</option>');
			}

			save_game();

			// Bei den Optionen die aktuellen Werte einsetzen.
			set_dropdown_values();

			basic_dialog('successful_deleted');
			change_stage(user.current_user_stage, false);
		},
	});
}

function delete_user() {
	return;
	// Diesen User löschen.
	$.ajax({
		url : 'php/functions.php',
		type : 'POST',
		data : {
			func : 'delete_user',
			user : user.name,
			email : user.email,
			passwort : user.pw,
		},
		success : function (data) {
			user.name = "";
			change_page('#options', '#login');
		},
	});
}


function dialog_create_or_remove_figure(bild, obj) {
	// Die erste Ausgabe, ob der Energieverbrauch zu hoch ist.
	var dialog_title = label_dialog['title'];
	var button_add = label_dialog['button_create_figure'];
	var button_delete = label_dialog['button_delete_figure'];
	var button_cancel = label_dialog['button_cancel'];
	var dialog_text = label_dialog['create_or_delete_figure'];

	document.getElementById('dialog_text').innerHTML = dialog_text;

	// Hier wird die Messagebox mit Buttons definiert, die zu Beginn aufgerufen werden soll.
	$dialog = $('#dialog').dialog({
			title : dialog_title,
			autoOpen : false,
			resizable : true,
			// Sodass keine anderen Elemente während der Dialogbox angewählt werden können.
			modal : true,
			// Der Titel des X-Buttons an der oberen rechten Ecke. (Sofern nicht ausgeblendet)
			closeText : button_cancel,
			//		position: {
			//			my: 'center',
			//			at: 'center',
			//			of: window,
			//		},
			buttons : [{
					text : button_delete,
					id : 'dialog_add_figure_button',
					class : 'dialog_button',
					click : function () {
						if (remove_figure(bild, obj) == 0) $dialog.dialog("close");
						return true;
					},
				}, {
					text : button_add,
					id : 'dialog_delete_figure_button',
					class : 'dialog_button',
					click : function () {
						create_new_figure(bild, obj);
						$dialog.dialog("close");
						return true;
					},
				}
			],
			show : {
				effect : index_effect.show_effect,
				duration : index_effect.show_duration,
			},
			hide : {
				effect : index_effect.hide_effect,
				duration : index_effect.hide_duration,
			}
		});

	return $("#dialog").dialog("open");
}

