<?php
require_once 'Vendor/autoload.php';

use Drawers\CatalogDrawer;
use Models\Data;
use Services\Fetcher;
use Base\BaseView;

/** @var Data|bool $data */
$data = Fetcher::getInfo();
?>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="Assets/main.css">
	</head>
	<body>
		<header class="header"><span class="back-icon back-icon_hidden"></span> <h3 class="header-text">Выбор тарифа</h3></header>
		<main>
			<?php if(null !== $data): ?>
				<?= (new CatalogDrawer())->draw($data->tarifs) ?>
			<?php endif; ?>
		</main>
	</body>
</html>
