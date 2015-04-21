function move_enemy(obj, delay) {
	var distance_x = 100;
	var distance_y = 30;
	var duration = 2000;
	var center_x = obj.getX();
	var center_y = obj.getY();

	var anim = new Kinetic.Animation(function (frame) {
			var x = distance_x * Math.sin(frame.time * Math.PI / duration) + center_x;
			if (x > 0 && x < options.width - obj.width())
				obj.setX(x);
			var y = distance_y * Math.sin(frame.time * 2 * Math.PI / duration) + center_y;
			if (y > 0 && y < options.height - obj.height())
				obj.setY(y);
		}, layer);

	setTimeout(function () {
		anim.start();
	}, delay);
}
