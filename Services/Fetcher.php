<?php


namespace Services;


use Models\Data;

/**
 * Класс для работы с API.
 */
class Fetcher {
	static function getInfo(): Data {
		$INFO_URL = 'http://sknt.ru/job/frontend/data.json';
		$data = file_get_contents($INFO_URL);
		/** @var Data $data */
		$data = json_decode($data);

		if ('ok' !== $data->result || 0 === count($data->tarifs)) {
			return false;
		}

		$result = new Data();
		$result->result = $data->result;
		$result->tarifs = $data->tarifs;

		return $result;
	}
}
