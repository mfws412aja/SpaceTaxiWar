var label_login = {
	login_label_username : "Username: ",
	login_login_button : "Login",
};

var label_index = {
	index_impressung : "Impressum",
	index_save_stage_button : "Save",
	index_delete_stage_button : "Delete stage",
	index_options_button : "Options",
	index_reset_button : "Reset",
	index_start_game_button : "Start Game",
	index_end_game_button : "Stage-Builder",
	index_label_spacetaxi_header : "SpaceTaxiWar",
	index_label_highscore_text : "Highscore: ",
	index_label_highscore_actual_text : "Actual: ",
	index_label_time_text : "Time: ",
}

var label_options = {
	options_label_sprache : "Change language",
	options_label_sounds_effekte : "Sounds",
	options_label_sounds_bg : "Background music",
	options_label_friendly_fire : "Friendly Fire",
	options_label_other_user : "Visit user: ",
	options_label_width : "Width: ",
	options_label_height : "Height: ",
	options_label_stage : "Stage: ",
	options_label_difficulty : "Difficulty",
	options_label_key_up : "Up: ",
	options_label_key_down : "Down: ",
	options_label_key_left : "Left: ",
	options_label_key_right : "Right: ",
	options_label_key_turbo : "Turbo: ",
	options_back_button : "Back",

	options_label_player_bild : "Change Player-picture",
	options_label_ziel_bild : "Change Aim-picture",
	options_label_victim_bild : "Change Passenger-picture",
	options_label_enemy_bild : "Change Alien-picture",
	options_label_anzahl_player_sprites : "Sprites count",
	options_label_anzahl_ziel_sprites : "Sprites count",
	options_label_anzahl_victim_sprites : "Sprites count",
	options_label_anzahl_enemy_sprites : "Sprites count",

	options_delete_user_button : "Delete user",
	options_save_options_button : "Save changes",
}

var label_dialog = {
	// Aus dialog.js
	title : "SpaceTaxiWar",
	button_ja : "Yes",
	button_nein : "No",
	button_cancel : "Cancel",
	button_ok : "OK",

	// Die Texte für ein Tutorial bei einem neuen User.
	new_user_1 : "Welcome Recruit,<br /><br /> We have been waiting for you!<br /><br />We can always use capable taxi driver!",
	new_user_2 : "We receive dozens of calls from guests who want to be collected.<br />The goal of every journey, then, is to collect all the passengers and then fly to the base.<br />Do you forget only one passenger, there are no points to your account !",
	new_user_3 : "The control your ship is preset as follows:<br /><br />Up: W<br />Down: S<br />Left: A<br />Right: D<br />Turbo Boost: 0<br />Shot: Spacebar<br /><br />Your run can be started or reset by pressing the Enter key.",
	new_user_4 : "In the options, the control of the ship can be changed. The fire button for the shot and starting, however, firmly defined.",
	new_user_5 : "The competition does not sleep so kill them all!<br />Although this is optional, but gives you an extra bonus!",
	new_user_6 : "If you kill passengers, there is a point deduction.<br />In the options under 'Friendly Fire' yout can define a Soft Beam what you however gives a disadvantage at the end points.",
	new_user_7 : "Well then let's go fly boar and show us what you can!",

	// Wenn auf save_stage geklickt wird.
	save_stage_text : "Save this stage?",
	button_create_new_stage : "Create new",
	button_overwrite_stage : "Overwrite this",

	// Wenn eine Figur hinzugefügt oder gelöscht werden soll.
	create_or_delete_figure : "This figure: ",
	button_delete_figure : "Remove",
	button_create_figure : "Create new",

	new_highscore : "New Highscore!<br /><br />Time-Bonus: x {0}<br />Friendly-Fire-Bonus: x {1}<br /><br />Total: {2}",
	stage_clear : "Stage clear!<br /><br />Time-Bonus: x {0}<br />Friendly-Fire-Bonus: x {1}<br /><br />Total: {2}",
	would_be_a_new_highscore : "This would be a new Highscore!<br /><br />Time-Bonus: x {0}<br />Friendly-Fire-Bonus: x {1}<br /><br />Total: {2}",
	no_more_levels : "No more Levels.",
	time_up : "Time's up!",
	game_over : "Game Over",
	rescue_all_victims : "Game Over!<br />Collect all passengers! {0} / {1}",

	// Aus dem login-Formular
	falsche_zeichen : "Please user only following characters: {0}",

	// Aus den events
	successful_save : "Saved successful",
	delete_stage : "Do you really want to delete this stage?",
	delete_user : "Do you really want to delete this User? This cannot be undone.",
	cannot_delete_last_stage : "You can't delete your last stage.",
	successful_deleted : "Delete successful",
	picture_successful_changed : "Picture successful changed. You may need to refresh the page.",
	error_during_picture_uploading : "Error while uploading: {0}",
	cannot_change_other_user_picture : "Yout can't change the images from other users.",
	picture_upload_size_error : "Filesize is too large. Maximum {0} KB",

	// Aus game_field
	cannot_delete_last_figure : "You cannot delete your last figure of this art.",
};
