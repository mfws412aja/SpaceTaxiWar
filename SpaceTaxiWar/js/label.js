function load_label(sprache) {
	var id = "";
	var name = "";
	var page = "";

	options.sprache = sprache;

	$('body').append('<script src="texte/' + sprache + '.js">');

	// Alle Labels aus der aktuellen Sprache laden.
	$.each(label_login, function (key, value) {
		document.getElementById(key).innerHTML = value;
	});

	$.each(label_index, function (key, value) {
		document.getElementById(key).innerHTML = value;
	});

	$.each(label_options, function (key, value) {
		document.getElementById(key).innerHTML = value;
	});

	// Skript wieder entfernen, damit es bei häufigem wechsel nicht überlädt.
	$('script[src="texte/' + sprache + '.js"]').remove();
//	$('<script src="texte/' + sprache + '.js">').remove();

	return;
}
