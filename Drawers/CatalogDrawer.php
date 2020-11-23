<?php


namespace Drawers;

use Base\BaseView;
use DateTime;
use Models\MainTarif;
use Models\Tarif;

/** Класс для получения разметки каталога. Класс нужен для подготовки данных перед обращение к базовому классу вью.  */
class CatalogDrawer {

	/**
	 * @param MainTarif[] $data Данные о тарифах.
	 *
	 * @return string;
	 */
	public function draw(array $data): string {
		foreach ($data as $mainTarif) {
			$mainTarif->priceValue = $this->getPriceValue($mainTarif->tarifs);

			foreach ($mainTarif->tarifs as $tarif) {
				$tarif->new_payday = $this->getValidDateString($tarif->new_payday);
			}
		}

		return BaseView::render("Views/CatalogView.php", $data);
	}

	/**
	 * Получить строку с минимальным и максимальным значением цен тарифа.
	 *
	 * @param Tarif[] $tarifs
	 *
	 * @return string
	 */
	private function getPriceValue(array $tarifs): string {
		$values = [];
		foreach ($tarifs as $tarif) {
			//В апи приходит строка.
			$period = 1 * $tarif->pay_period;
			$values[] = $tarif->price / $period;
		}

		$minPrice = min($values);
		$maxPrice = max($values);

		return "{$minPrice} - {$maxPrice}";
	}

	/**
	 * Получить валидную к отображению строку даты следующего платежа.
	 *
	 * @param string $payday_string timestamp+timezone_offset.
	 *
	 * @return string;
	 */
	private function getValidDateString(string $payday_string): string {
		$one_hour = 3600;
		$arr = explode('+', $payday_string);
		$time_hours = trim($arr[1], '0');
		$date = date("d.m.Y", $arr[0] + ($time_hours * $one_hour));

		return $date;
	}
}
