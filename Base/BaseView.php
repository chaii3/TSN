<?php


namespace Base;

/**
 * Класс для рендера шаблонов, если нет необходимости в первичной обработке данных, то можно сразу обратиться к нему.
 */
class BaseView {
	public static function render(string $path, $data = null, string $label = null) {
		ob_start();
		if ($data) {
			extract(get_object_vars($data));
		}

		include '' . $path;

		return ob_get_clean();
	}
}
