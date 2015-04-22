var browser = "";
var frame_update = parseFloat(20);
var on_bild_load = 0;
var max_bild_pixel = 50;


var options = 
{
	sprache: "de",
	other_user: "",
	width: 0,
	height: 0,
	difficulty: 5,
	victim_counter: 1,
	enemy_counter: 1,
	wall_counter: 1,
	draggable: true,
	anzahl_user_stages: 0,
	anzahl_default_stages: 0,
	friendly_fire: "X",
	key_up: 38,
	key_down: 40,
	key_left: 37,
	key_right: 39,
	key_turbo: 96,
};


var index_effect = 
{
	// Welche Art von Effekt beim Anzeigen der Elemente verwendet werden soll.
	show_effect:	'blind',
	// Wie lange die Anzeigedauer anhalten soll. 
	show_duration:	100,

	// Welche Art von Effekt beim Ausblenden der Elemente verwendet werden soll.
	hide_effect:	'blind',
	// Wie lange die Ausblendedauer anhalten soll. 
	hide_duration:	100, 
};


String.format = function(arr) {
	var s = arguments[0];
	if (!arguments[1]) return s;
//  for (var i = 0; i < arguments.length - 1; i++) {
	for (var i = 0; i < arguments[1].length ; i++) 
	{
		var reg = new RegExp("\\{" + i + "\\}", "gm");             
	//    s = s.replace(reg, arguments[i + 1]);
		s = s.replace(reg, arguments[1][i]);
	}
//  s = arguments[0]
	return s;
}


var user = 
{
	name: "",
	pw: "X",
	email: "email",
	player_bild_src: "img/player.png",
	ziel_bild_src: "img/ziel.png",
	victim_bild_src: "img/victim.png",
	enemy_bild_src: "img/enemy.png",
	current_stage: parseFloat(1),
	current_user_stage: parseFloat(1),
	current_default_stage: parseFloat(1),
	sounds_effekte: "X",
	sounds_bg: "",
	default_run: "",
};


var player = 
{
	offsetx: parseFloat(3),
	offsety: parseFloat(3),
	offset_drop: parseFloat(0.4),
	offset_l_faktor: 0,
	offset_r_faktor: 0,
	offset_u_faktor: 0,
	offset_d_faktor: 0,
	offset_faktor_add: 0.15,
	offset_faktor_sub: 0.15,
	offset_faktor_duration: 100,
	speedup: "",
	highscore: parseFloat(0),
	move_up_or_down: true,
	left_or_right: "r",
	up_or_down: "d",
};


var game = 
{
	victim_counter: parseFloat(0),
	highscore: parseFloat(0),
	bullet_count: parseFloat(0),
	bullet_timeout: 200,
	active: false,
	player_sprites: 1,
	ziel_sprites: 1,
	victim_sprites: 1,
	enemy_sprites: 1,
	ready_state: true,
};


var $dialog;
var game_field;
var layer;
var client = new XMLHttpRequest();
var map;
