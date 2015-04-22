//************************************************************************************************
// Sounds setzen

function set_sounds() {
	// Die Effekte definieren.
	if (document.getElementById("options_sounds_effekte").checked) {
		user.sounds_effekte = "X";
	} else {
		user.sounds_effekte = "";
		document.getElementById("audio_sounds_1").pause();
		document.getElementById("audio_sounds_2").pause();
		document.getElementById("audio_sounds_3").pause();
		document.getElementById("audio_sounds_4").pause();
		document.getElementById("audio_sounds_5").pause();
	}

	// Die Hintergrundmusik definieren.
	if (document.getElementById("options_sounds_bg").checked) {
		user.sounds_bg = "X";
		spiele_sound("audio_bg", "theme");
	} else {
		user.sounds_bg = "";
		document.getElementById("audio_bg").pause();
	}	
}

//************************************************************************************************
// Sounds abspielen

function spiele_sound(id, filename) {
	// Wenn die Hintergrundmusik (theme)
	if (id == "audio_bg" && user.sounds_bg == "") {
		return;
	} else if (id != "audio_bg" && user.sounds_effekte == "") {
		return;
	}
	
	// Nur wenn die Sounds aktiviert wurden.
	var audio_datei = "";
	var audio_endung = "";
	var audio = document.getElementById(id);

	// Nur im Opera gehen keine .mp3-Dateien
	audio_endung = browser == 'opera' ? '.ogg' : '.mp3';
	audio_datei = 'sounds/' + filename + audio_endung;
	audio.src = audio_datei;

	// Nicht alle Browser spielen Sounds ab, daher wird das hier abgefangen.
	try {
		audio.play();
	} catch (ex) {
		return;
	}
}
