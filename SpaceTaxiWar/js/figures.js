function place_figures() {
	// Die Figuren neu ausrichten, sofern diese außerhalb des Spielfeldes sind (Überlappung).
	for (var i = 0; i < layer.children.length; i++) {
		var obj = layer.children[i];
		// In 10er Schritten positionieren.
		obj.setX(Number(obj.getX() / 10) * 10);
		// X-Position überprüfen.
		if (obj.getX() < 0)
			obj.setX(0);
		if (obj.getX() > options.width - obj.width())
			obj.setX(options.width - obj.width());

		// Y-Position überprüfen.
		// In 10er Schritten positionieren.
		obj.setY(Number(obj.getY() / 10) * 10);
		if (obj.getY() < 0)
			obj.setY(0);
		if (obj.getY() > options.height - obj.height())
			obj.setY(options.height - obj.height());
	}
	layer.draw();
}



function add_figure(figure) {
	var arr_attrs = figure.split(";");
	var bild = arr_attrs[0];
	var new_img;

	if (bild == "wall") {
		options.wall_counter += 1;

		new_img = new Kinetic.Rect({
				bild : bild,
				x : parseFloat(arr_attrs[1]),
				y : parseFloat(arr_attrs[2]),
				width : 50,
				height : 4, 
				strokeWidth : 4,
				stroke : 'green',
				draggable : options.draggable,
			});
	} else {
		var obj = document.getElementById('options_img_' + bild + '_bild');
		var width = obj.width;
		var height = obj.height;
		
		if (bild == "victim")
			options.victim_counter += 1;
		else if (bild == "enemy")
			options.enemy_counter += 1;

		var img = new Image();
		new_img = new Kinetic.Image({
				bild : bild,
				x : parseFloat(arr_attrs[1]),
				y : parseFloat(arr_attrs[2]),
				width : width,
				height : height,
				image : img,
				draggable : options.draggable,
			});
		eval('img.src = user.' + bild + '_bild_src;');
	}

	// Ein Doppelklick-Event.
	new_img.on('dblclick', function (evt) {
		// Nur, wenn das Spiel gerade nicht aktiv ist.
		if ((game.active == true && options.draggable == false) || user.default_run == "X")
			return;

		bild = this.attrs['bild'];

		// Wenn es nicht der Spieler oder das Ziel ist.
		if (bild == 'player' || bild == 'ziel')
			return;

		// Ruft den Dialog mit der Abfrage auf.
		dialog_create_or_remove_figure(bild, this);
	});

	layer.add(new_img);
	// Erst wenn das Bild geladen wurde.
	if (bild != 'wall') {
		img.onload = function () {
			layer.draw();
		};
	}
}



function remove_figure(bild, obj) {
	var anzahl = 0;
	// Erst alle Figuren mit diesem Bild zählen. Es muss von jedem mindestens eine vorhanden sein.
	for (var i = 2; i < layer.children.length; i++) {
		if (layer.children[i].attrs['bild'] == bild)
			anzahl += 1;
	}

	// Nur wenn es mindestens 2 dieser Figuren gibt, kann eine entfernt werden.
	if (anzahl <= 1) {
		basic_dialog('cannot_delete_last_figure');
		return 1;
	} else obj.remove();
	layer.draw();
	return 0;
}



function create_new_figure(bild, obj) {
	// Wenn eine neue Figur erstellt werden soll.
	// Die Position soll ein wenig versetzt sein. 
	var x = (obj.attrs['x'] + obj.attrs['width']) >= options.width ? obj.attrs['x'] - 10 : obj.attrs['x'] + 10;
	var new_figure = bild + ";" + x + ";" + obj.attrs['y'] + ";" + obj.attrs['width'] + ";" + obj.attrs['height'];
	add_figure(new_figure);
	layer.draw();
}