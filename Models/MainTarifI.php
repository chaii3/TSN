<?php


namespace Models;

/**
 * Описание основного тарифа.
 */
class MainTarif {
	/** @var string Наименование тарифа. */
	public string $title;

	/** @var Tarif[] Подтипы тарифа. */
	public array $tarifs;

	/** @var string Ссылка для перехода на страницу тарифа. */
	public string $link;

	/** @var int Скорость тарифа. */
	public int $speed;

	/** @var int Добавочная стоимость?  */
	public int $price_add;

	/** @var string[] Дополнительные опции. */
	public array $free_options = [];

	/** @var string Общие значения цен. */
	public string $priceValue = '';
}
