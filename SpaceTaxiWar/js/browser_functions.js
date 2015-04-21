//************************************************************************************************
// Den verwendeten Browser ermitteln

function ermittle_browser() {
	var treffer = 0;

	// Den Browser ermitteln
	if (navigator.userAgent.search("MSIE") >= 0 || navigator.systemLanguage) {
		browser = 'ie';
		treffer += 1;
	}

	if (navigator.userAgent.search("Chrome") >= 0 && navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("OPR") < 0) {
		browser = 'chrome';
		treffer += 1;
	}
	if (navigator.userAgent.search("Firefox") >= 0) {
		browser = 'firefox';
		treffer += 1;
	}
	if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0 && navigator.userAgent.search("OPR") < 0) {
		browser = 'safari';
		treffer += 1;
	}
	if (navigator.userAgent.search("Chrome") >= 0 && navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("OPR") >= 0) {
		browser = 'opera';
		treffer += 1;
	}
	if (treffer != 1) {
		window.parent.document.body.style.zoom = 1;
		browser = 'andere';
	}
}



//************************************************************************************************
// Wechselt die Seite (DIV).

function change_page(last_page, new_page) {
	// Die Angaben last und new-Page jeweils mit Klassen- und ID-Angaben.
	$(last_page).hide(index_effect.hide_effect, index_effect.hide_duration, function () {
		// Alle anderen Elemente erst anzeigen, wenn das Fenster da ist.
		$(new_page).show(index_effect.show_effect, index_effect.show_duration);
	});
}



function scroll_window() {
	window.scrollTo(0, 0);
}
