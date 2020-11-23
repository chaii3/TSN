<?php


namespace Models;

/**
 * Описание подтипа тарифа.
 */
class Tarif {
	/** @var int Уникальный идентификатор типа тарифа. */
	public int $ID;

	/** @var string Наименование типа тарифа. */
	public string $title;

	/** @var int Цена типа тарифа. */
	public int $price;

	/** @var int Добавочная цена типа тарифа. */
	public int $price_add;

	/** @var string Дата следующего платежа  */
	public string $pay_period;

	/** @var string Дата следующего платежа. */
	public string $new_payday;

	/** @var int Скорость типа тарифа. */
	public int $speed;
}
