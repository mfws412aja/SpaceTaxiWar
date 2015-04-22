<?php

$func = $_POST['func'];
if ($func == 'save_options') save_options();
elseif ($func == 'read_options') read_options();
elseif ($func == 'read_all_users') read_all_users();
elseif ($func == 'save_stage') save_stage();
elseif ($func == 'load_stage') load_stage();
elseif ($func == 'delete_stage') delete_stage();
elseif ($func == 'delete_user') delete_user();
elseif ($func == 'get_saved_stages_count') get_saved_stages_count();
elseif ($func == 'save_picture') save_picture();
elseif ($func == 'check_file_exists') check_file_exists();
elseif ($func == 'bild_upload') bild_upload();


function save_options()
{
	$user = $_POST['user'];
	$pw = $_POST['passwort'];
	$email = $_POST['email'];
	$sprache = $_POST['sprache'];
	$difficulty = $_POST['difficulty'];
	$highscore = $_POST['highscore'];
	$current_user_stage = $_POST['current_user_stage'];
	$current_default_stage = $_POST['current_default_stage'];
	$sounds_effekte = $_POST['sounds_effekte'];
	$sounds_bg = $_POST['sounds_bg'];
	$friendly_fire = $_POST['friendly_fire'];
	$key_up = $_POST['key_up'];
	$key_down = $_POST['key_down'];
	$key_left = $_POST['key_left'];
	$key_right = $_POST['key_right'];
	$key_turbo = $_POST['key_turbo'];
	$anzahl_player_sprites = $_POST['anzahl_player_sprites'];
	$anzahl_ziel_sprites = $_POST['anzahl_ziel_sprites'];
	$anzahl_victim_sprites = $_POST['anzahl_victim_sprites'];
	$anzahl_enemy_sprites = $_POST['anzahl_enemy_sprites'];

	$str = $pw.";".$sprache.";".$difficulty.";".$highscore.";".$current_user_stage.";".$sounds_effekte.";".$sounds_bg.";".$friendly_fire;
	$str .= ";".$key_up.";".$key_down.";".$key_left.";".$key_right.";".$key_turbo.";".$current_default_stage;
	$str .= ";".$anzahl_player_sprites.";".$anzahl_ziel_sprites.";".$anzahl_victim_sprites.";".$anzahl_enemy_sprites;

	file_put_contents("../user/".$user."/options.txt", $str);

	echo $str;
}


function read_options()
{
	$user = $_POST['user'];
	$pw = $_POST['passwort'];
	$email = $_POST['email'];
	$new_user = "";
	create_folder("user", $user);
	
	// Erst prüfen, ob es diese Datei gibt. 
	if (!file_exists("../user/".$user."/options.txt"))
	{
		$new_user = "X";
		$datei = file("../user/default_options.txt");
		$myfile = fopen("../user/".$user."/options.txt", "w");
		fwrite($myfile, $datei[0]);
	}
	else
	{
		$datei = file("../user/".$user."/options.txt");
	}

	// Die Optionen auslesen aber das Passwort weglassen. 
	$options = explode(";", $datei[0]);
	// Index 1 = Sprache, 2 = Difficulty, 3 = Highscore, current_user_stage = 4, sounds_effekte = 5, sounds_bg = 6, friendly_fire = 7
	// key_up = 8, key_down = 9, key_left = 10, key_right = 11, key_turbo = 12, current_default_stage = 13
	// Anzahl Player-Sprites = 14, Anzahl Ziel-Sprites = 15, Anzahl Victim-Sprites = 16, Anzahl Enemy-Sprites = 17
	$str = $options[1].";";
	$str .= $options[2].";";
	$str .= $options[3].";";
	$str .= $options[4].";";
	$str .= $options[5].";";
	$str .= $options[6].";";
	$str .= $options[7].";";
	$str .= $options[8].";";
	$str .= $options[9].";";
	$str .= $options[10].";";
	$str .= $options[11].";";
	$str .= $options[12].";";
	$str .= $options[13].";";
	$str .= $new_user.";";
	$str .= $options[14].";";
	$str .= $options[15].";";
	$str .= $options[16].";";
	$str .= $options[17];
	echo $str;
}



function read_all_users()
{
	$user = $_POST['user'];
	$pw = $_POST['passwort'];
	$email = $_POST['email'];
	$arr_user = array();
	
	$dir = "../user/";
	//get all files in specified directory
	$files = glob($dir."*");
	
	$arr_user = Array();
	$last_user = "";
	
	//print each file name
	foreach($files as $file)
	{
		//check to see if the file is a folder/directory
		if(is_dir($file))
		{
			$new_dir = str_replace($dir, "", $file);
			$new_dir = trim($new_dir);
			if ($last_user == $new_dir) continue;
			$last_user = $new_dir;
			if ($user != $new_dir) array_push($arr_user, $new_dir);
		}
	}
	
	echo implode(";", $arr_user);
}



function save_stage()
{
	$user = $_POST['user'];
	$pw = $_POST['passwort'];
	$email = $_POST['email'];
	$figures = $_POST['figures'];
	$stage = $_POST['stage'];
	$width = $_POST['width'];
	$height = $_POST['height'];
	
	$arr_figures = explode("_new_figure_", $figures);
	$str = $width.PHP_EOL;
	$str .= $height.PHP_EOL;

	for ($i = 0 ; $i < sizeof($arr_figures) - 1 ; $i++)
	{
		$str .= $arr_figures[$i].PHP_EOL;
	}
	
	file_put_contents("../user/".$user."/stage_".$stage.".txt", $str);
	echo "success";
}


function load_stage()
{
	$user = $_POST['user'];
	$pw = $_POST['passwort'];
	$email = $_POST['email'];
	$stage = $_POST['stage'];
	$default_run = $_POST['default_run'];
	$figures = "";
	
	if ($default_run == "X")
	{
		// Die Datei der aktuellen Default-Stage auslesen. 
		$datei = file("../user/default_stage_".$stage.".txt");
	}
	else
	{
		// Die Datei der aktuellen Stage von diesem User auslesen. 
		$datei = file("../user/".$user."/stage_".$stage.".txt");
	}

	// Zeile 1 ist die Breite und Zeile 2 die Höhe der Stage. Diese Werte werden ebenso mit _new_figure_ getrennt ausgelesen. 
	for ($i = 0 ; $i < count($datei) ; $i++)
	{
		$figures .= $datei[$i].'_new_figure_';
	}
	
	$figures = substr($figures, 0, strlen($figures) - strlen('_new_figure_')); // Nochmal prüfen woher die 2 _new_figure_ kommen...
	echo $figures;
}



function delete_stage()
{
 	$user = $_POST['user'];
	$pw = $_POST['passwort'];
	$email = $_POST['email'];
	$stage = $_POST['stage'];
	
	$root = "../user/";
	$datei = $root.$user."/stage_".$stage.".txt";
	
	if (!file_exists($datei)) return;

	unlink($datei);
	
	for ($i = $stage + 1 ; $i < 500 ; $i++)
	{
		$old_filename = $root.$user."/stage_".$i.".txt";
		$new_filename = $root.$user."/stage_".($i - 1).".txt";
		
		if (!file_exists($old_filename))
		{
			echo $i - 1;
			return $i - 1;
		}
		rename($old_filename, $new_filename);
	}
}



function delete_user()
{
	return;
 	$user = $_POST['user'];
	$pw = $_POST['passwort'];
	$email = $_POST['email'];
	
	$img_dir = "../img/".$user."/";
	$user_dir = "../user/".$user."/";
	
	// 2 Verzeichnisse löschen. 
	function rrmdir($dir)
	{
		if (is_dir($dir))
		{
			$objects = scandir($dir);
			foreach ($objects as $object)
			{
				if ($object != "." && $object != "..")
				{
					if (filetype($dir."/".$object) == "dir") rrmdir($dir."/".$object); else unlink($dir."/".$object);
				}
			}
		reset($objects);
		rmdir($dir);
		}
	}

	rrmdir($img_dir);
	rrmdir($user_dir);

	echo 0;
	return;
}



function get_saved_stages_count()
{
	$user = trim($_POST['user']);
	$pw = trim($_POST['passwort']);
	$email = trim($_POST['email']);

	$str = "";
	create_folder("user", $user);
	
	// Prüfen, ob es mindestens eine Stage für diesen User gibt. 
	// Wenn es keine gibt, wird die erste Default-Stage für diesen übernommen. 
	if (!file_exists("../user/".$user."/stage_1.txt"))
	{
		$datei = file("../user/default_stage_1.txt");
		file_put_contents("../user/".$user."/stage_1.txt", $datei);
		$str .= "1;";
	}
	else
	{
		for ($i = 1 ; $i < 1000 ; $i++)
		{
			if (!file_exists("../user/".$user."/stage_".$i.".txt"))
			{
				// Die Anzahl an Stages für diesen User. 
				$str .= ($i - 1).";";
				break;
			}
		}
	}
	
	for ($i = 1 ; $i < 1000 ; $i++)
	{
		if (!file_exists("../user/default_stage_".$i.".txt"))
		{
			// Die Anzahl an Default-Stages. 
			$str .= ($i - 1).";";
			break;
		}
	}
	
	// Die Anzahl der Sprites ermitteln
	$datei = file("../user/".$user."/options.txt");

	// Die Optionen auslesen aber das Passwort weglassen. 
	$options = explode(";", $datei[0]);
	// Index 1 = Sprache, 2 = Difficulty, 3 = Highscore, current_user_stage = 4, sounds_effekte = 5, sounds_bg = 6, friendly_fire = 7
	// key_up = 8, key_down = 9, key_left = 10, key_right = 11, key_turbo = 12, current_default_stage = 13
	$str .= $options[14].";";
	$str .= $options[15].";";
	$str .= $options[16].";";
	$str .= $options[17];
	echo $str;
}


function check_file_exists()
{
	$user = $_POST['user'];
	$pw = $_POST['passwort'];
	$email = $_POST['email'];
	$filename = $_POST['filename'];
	
	$filename = "../".$filename;

	if (file_exists($filename))
	{
		echo 0;
		return;
	}
	echo 1;
}


function create_folder($dir, $user)
{
	if(!is_dir("../".$dir."/".$user)) mkdir("../".$dir."/".$user);
}



function bild_upload()
{
	$bild_id = $_POST['bild_id'];
	$bild = $_POST['bild'];
	$user = $_POST['user'];
	$pw = $_POST['passwort'];
	$email = $_POST['email'];

	create_folder("img", $user);

	$root = "../";
	$new_src = "img/".$user."/".$bild.".png";
	$new_path = $root.$new_src;

	if (file_exists($new_path))
	{
	//	unlink($new_path);
	}
	
	if (move_uploaded_file($_FILES[$bild_id]["tmp_name"], $new_path))
	{
		echo $new_src;
		return;
	}
	echo 1;
}


?>

