<?php


namespace Models;

/**
 * Модель данных, которые получаем из API.
 */
class Data {
	/** @var string Результат получения. "ок" в случае удачной работы. */
	public string $result;

	/** @var MainTarif[] Клиентская информация о доступных тарифах. */
	public array $tarifs;
}
