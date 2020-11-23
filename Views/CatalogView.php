<?php /** @var \Models\MainTarif[] $data */ ?>

<?php
/* Составим массив соответствий цветов плашек и тарифа. Так как тарифов может быть больше и в данных этого нету, то хардкодим.  **/
$blockClass    = 'catalog-item__speed';
$colorsClasses = [
	"Земля"    => "{$blockClass}_brown",
	"Вода"     => "{$blockClass}_blue",
	"Огонь"    => "{$blockClass}_red",
	"Вода HD"  => "{$blockClass}_blue",
	"Огонь HD" => "{$blockClass}_red",
];

?>

<article class="catalog">
	<?php foreach ($data as $mainTarif): ?>
		<section class="catalog-item">
			<div class="catalog-item__header">
				<?= "Тариф \"{$mainTarif->title}\"" ?>
			</div>
			<section class="catalog-item__content" data-title="<?= $mainTarif->title ?>">
				<section class="catalog-item__content-part">
					<div class="catalog-item__speed <?= $colorsClasses[$mainTarif->title] ? $colorsClasses[$mainTarif->title] : 'catalog-item__speed_default' ?>">
						<?= "{$mainTarif->speed} Мбит/с" ?>
					</div>
					<div class="catalog-item__price"><?= $mainTarif->priceValue ?> <span class="rub">Р</span>/мес</div>
					<div class="catalog-item__options-info">
						<?php foreach ($mainTarif->free_options as $option): ?>
							<span class="catalog-item-option"><?= $option ?></span><br>
						<?php endforeach; ?>
					</div>
				</section>
				<span class="catalog-item__icon"></span>
			</section>
			<div class="catalog-item__footer">
				<a class="catalog-item__link" href="<?= $mainTarif->link ?>">узнать подробнее на сайте www.scknt.ru</a>
			</div>
		</section>
	<?php endforeach; ?>
	<?php
		$tarifData = [];
		foreach ($data as $mainTarif) {
			$tarifData[$mainTarif->title] = $mainTarif->tarifs;
		}
	?>

	<script class="delete-script">
		window.tarifs = <?= json_encode($tarifData) ?>
	</script>
	<script src="../Assets/scripts/catalog.js"></script>
</article>
