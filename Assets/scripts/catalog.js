class Catalog {
	/** Длительность анимации скрытия каталога. */
	ANIMATE_TIME = 150;

	/** Класс контента списка типов тарифов. */
	TARIF_LIST_CSS_CLASS = 'catalog_tarif-list';

	/** Класс скрытой кнопки "назад" */
	BACK_BUTTON_HIDDEN_CLASS = 'back-icon_hidden';

	/** Класс карточки конкретного типа тарифа. */
	TARIF_TYPE_CARD_CLASS = 'catalog-item_type-card';

	/** Отрисована ли карточка конкретного типа.  */
	isTypeCardActive = false;

	/** Мапинг цен за один месяц без учета скидки за количество месяцев. */
	oneMonthMap = new Map();

	/** Мапинг контента типов тарифа, чтобы генерировать его только один раз. */
	tarifsTypesMap = new Map();

	constructor() {
		this.tarifData  = window.tarifs
		this.catalog    = document.querySelector('.catalog');
		this.backButton = document.querySelector(`.${this.BACK_BUTTON_HIDDEN_CLASS}`);

		this.init();


		window.addEventListener('click', this.backCb);
	}

	/**
	 * Иницилизировать скрипта для каталога.
	 */
	init() {
		this._removeDeleteScript();
		this._fillOneMonthPriceMap();
		this._initItemHandlers();
	}

	/**
	 * Заполнить мапинг цен за один месяц.
	 */
	_fillOneMonthPriceMap() {
		for (let key in this.tarifData) {
			const types  = this.tarifData[key];
			const target = types.find((tarif) => 1 === Number(tarif.pay_period))

			this.oneMonthMap.set(key, target.price);
		}
	}

	/**
	 * Удалить скрипты для инициализации данных.
	 */
	_removeDeleteScript() {
		setTimeout(() => {
			document.querySelector('.delete-script').remove();
		}, 0)
	}

	/**
	 * Инициализировать обработчики для открытия экрана тарифа.
	 */
	_initItemHandlers() {
		let itemsContent = document.querySelectorAll('.catalog-item__content');

		itemsContent.forEach((content) => {
			let title = content.getAttribute('data-title');

			content.addEventListener('click', this._getViewTarifTypesCb(title, 'catalog'));
		})
	}

	/**
	 * Получить коллбэк для показа списка типов тарифа.
	 *
	 * @param {string} title 		  Наименование тарифа.
	 * @param {string} hideBlockClass Класс блока, который необходимо скрыть.
	 *
	 * @return {function}
	 */
	_getViewTarifTypesCb(title, hideBlockClass) {
		return () => {
			this._hideCatalog(hideBlockClass, () => {
				this.backButton.classList.remove(this.BACK_BUTTON_HIDDEN_CLASS);
				this.isTypeCardActive = false;
				this._setBackToCatalogCb();

				document.body.append(this._getTarifList(title));
			});
		}
	}

	/**
	 * Установить коллбэк для перехода в каталог.
	 */
	_setBackToCatalogCb() {
		this._setNewBackCb(() => {
			this._hideCatalog(this.TARIF_LIST_CSS_CLASS, () => {
				document.body.append(this.catalog);
				this.backButton.classList.add(this.BACK_BUTTON_HIDDEN_CLASS);
			});
		})
	}

	/**
	 * Скрыть контент по селектору
	 *
	 * @param {string} 	 cssClass Класс элемента, который нужно скрыть.
	 * @param {function} cb 	  Коллбэк функция, которую необходимо пременить после скрытия.
	 */
	_hideCatalog(cssClass, cb) {
		const target = document.querySelector(`.${cssClass}`);
		if (!target) {
			return;
		}

		const animateClass = 'catalog_hidden-animate';
		window.requestAnimationFrame(() => {
			target.classList.add(animateClass);
			setTimeout(() => {
				target.classList.remove(animateClass);
				target.remove();
				cb();
			}, this.ANIMATE_TIME)
		});
	}

	/**
	 * Получить контент для экрана тарифа.
	 *
	 * @param {string} title Наименование тарифа.
	 *
	 * @return {HTMLElement}
	 */
	_getTarifList(title) {
		/** Если клиент уже заходил в тариф, то не генерируем разметку повторно. */
		if (this.tarifsTypesMap.get(title)) {
			return this.tarifsTypesMap.get(title);
		}

		const data    = this.tarifData[title];
		const wrapper = document.createElement('article');
		wrapper.classList.add(this.TARIF_LIST_CSS_CLASS);

		data.forEach((tarif) => {
			const item = document.createElement('section');
			item.classList.add('catalog-item');
			item.classList.add('catalog-item_tarif');
			wrapper.appendChild(item);

			const header = document.createElement('div');
			header.classList.add('catalog-item__header');
			header.textContent = tarif.title;
			item.appendChild(header);

			const content = document.createElement('section')
			content.classList.add('catalog-item__content')
			content.addEventListener('click', this._getTypeTarifViewCb(tarif, title));
			item.appendChild(content);

			const contentPart = document.createElement('section');
			contentPart.classList.add('catalog-item__content-part');
			contentPart.appendChild(this._getPriceEl(tarif, title));
			content.appendChild(contentPart);

			const icon = document.createElement('span');
			icon.classList.add('catalog-item__icon');
			content.appendChild(icon);


			item.appendChild(content);
		})

		this.tarifsTypesMap.set(title, wrapper);

		return wrapper;
	}

	/**
	 * Получить коллбэк для отрисовки карточки конкретного типа.
	 *
	 * @param {object} tarif Объект типа тарифа.
	 * @param {string} title Наименование основного тарифа.
	 *
	 * @return {function}
	 */
	_getTypeTarifViewCb(tarif, title) {
		return () => {
			if (this.isTypeCardActive) {
				return;
			}

			this.isTypeCardActive = true;
			const wrapper = document.createElement('article');
			wrapper.classList.add('catalog-item');
			wrapper.classList.add(this.TARIF_TYPE_CARD_CLASS);

			const header       = document.createElement('div');
			header.textContent = `Тариф "${title}"`
			header.classList.add('catalog-item__header');
			wrapper.appendChild(header);

			const price     = document.createElement('div');
			price.innerHTML = this._getPeriodHtml(tarif, title);
			price.classList.add('catalog-item__price');
			wrapper.appendChild(price);

			const priceInfo     = document.createElement('section');
			priceInfo.innerHTML = this._getPriceInfo(tarif);
			priceInfo.classList.add('catalog-item__price-info_card');
			price.appendChild(priceInfo);

			const dateInfo     = document.createElement('div');
			dateInfo.innerHTML = this._getDateInfo(tarif);
			dateInfo.classList.add('catalog-item__options-info');
			wrapper.appendChild(dateInfo);

			const footer             = document.createElement('article');
			const chooseButton       = document.createElement('div');
			chooseButton.textContent = 'Выбрать';
			chooseButton.classList.add('choose-button');
			footer.appendChild(chooseButton);
			footer.classList.add('catalog-item__footer');

			wrapper.appendChild(footer);

			wrapper.addEventListener('click', this.backCb);

			this._hideCatalog(this.TARIF_LIST_CSS_CLASS, () => {
				document.body.appendChild(wrapper);
				this._setBackTypeTarifListCb(title)
			});
		}
	}

	/**
	 * Получить строку с периодом тарифа.
	 *
	 * @param {object} tarif
	 *
	 * @return {string}
	 */
	_getPeriodHtml(tarif, title) {
		let period       = Number(tarif.pay_period);
		let periodString = tarif.pay_period;

		console.log(period)

		if (1 === period) {
			periodString += ' месяц';
		}
		else if (4 >= period) {
			periodString += ' месяца';
		}
		else {
			periodString += ' месяцев';
		}

		return `
			Период оплаты - ${periodString} <br> ${this.oneMonthMap.get(title)} <span class="rub">P</span>/мес
		`
	}

	/**
	 * Получить информацию о разовых платежах.
	 *
	 * @param {object} tarif
	 *
	 * @return {string}
	 */
	_getPriceInfo(tarif) {
		return `
			разовый платеж - ${tarif.price} <span class="rub">Р</span><br>
			со счета спишется - ${tarif.price} <span class="rub">Р</span>
		`
	}

	/**
	 * Получить разметку для информации о датах после оплаты тарифа.
	 *
	 * @param {object} tarif Объект тариф.
	 *
	 * @return {string}
	 */
	_getDateInfo(tarif) {
		return `
			Вступит в силу - сегодня <br> Активно до - ${tarif.new_payday}
		`
	}

	/**
	 * Установить коллбэк для кнопки назад к типам тарифа.
	 *
	 * @param {string} title Наименование тарифа.
	 */
	_setBackTypeTarifListCb(title) {
		this._setNewBackCb(this._getViewTarifTypesCb(title, this.TARIF_TYPE_CARD_CLASS));
	}

	/**
	 * Получить разметку для элемента цены.
	 *
	 * @param {object} tarif Объект типа тарифа.
	 * @param {string} title Наименование общего тарифа.
	 *
	 * @return {HTMLElement}
	 */
	_getPriceEl(tarif, title) {
		const period = Number(tarif.pay_period);
		const el     = document.createElement('div');
		el.classList.add('catalog-item__price');
		el.classList.add('catalog-item__price_tarif');

		el.innerHTML = `
			${tarif.price / period} <span class="rub">Р</span>/мес
		`

		const priceInfo = document.createElement('section');
		priceInfo.classList.add('catalog-item__price-info');

		const onePayPrice       = document.createElement('div');
		onePayPrice.textContent = `Разовый платеж - ${tarif.price}`

		priceInfo.appendChild(onePayPrice);

		const oneMonthPrice = this.oneMonthMap.get(title);
		const priceDif      = (oneMonthPrice * period) - tarif.price;
		if (0 < priceDif) {
			const sellText       = document.createElement('div');
			sellText.textContent = `Скидка - ${priceDif}`
			priceInfo.appendChild(sellText);
		}

		el.appendChild(priceInfo);

		return el;
	}

	/**
	 * Обновить коллбэк для кнопки "назад"
	 */
	_setNewBackCb(newCb) {
		this.backButton.removeEventListener('click', this.backCb);
		this.backCb = newCb;
		this.backButton.addEventListener('click', this.backCb);
	}
}

new Catalog();
