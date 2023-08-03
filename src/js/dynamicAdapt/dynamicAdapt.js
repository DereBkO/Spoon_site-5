export let arrayDataDa = document.querySelectorAll('[data-da]'); // коллекция объектов с data-da

arrayDataDa.forEach(function (e) {

	const dataItem = e.dataset.da.split(','); // массив data-da параметров
	const addressMove = document.querySelector(dataItem[0]);  // объект куда перемещать, первый breakpoint
	const addressMoveDuble = document.querySelector(dataItem[3]);  // объект куда перемещать, второй breakpoint
	const numberOrder = dataItem[1]; // порядковый номер на новом месте относительно дочерних элементов, первый breakpoint
	const numberOrderDuble = dataItem[4]; // порядковый номер на новом месте относительно дочерних элементов, второй breakpoint
	// numberOrder и numberOrderDuble можно не объявлять, а сразу подставлять dataItem[1] и dataItem[4]. Но оставил для лучшей читаемости кода.
	const addressParent = e.parentElement; // родитель где находился перемещаемый объект, до breakpoint
	const addressParentArray = addressParent.children; // коллекция дочерних элементов родителя начального положения, до breakpoint

	// присвоение атрибута с порядковым номером для контроля последовательности первоначального положения
	for (let i = 0; i < addressParentArray.length; i++) {
		if (!addressParentArray[i].dataset.n) { // проверка наличия data-n, что бы не было багов с повторным присвоением при наличии более одного перемещаемого объекта
			addressParentArray[i].setAttribute('data-n', `${i}`)
		}
	};
	const eDataNumber = e.dataset.n;  // номер data-n перемещаемого объекта


	/* ---------------- перемещение объекта -------------------------*/

	/* !!!!!!!!!!!!!!!!!!!! ПЕРВЫЙ  breakpoint !!!!!!!!!!!!!!!!!!!!!*/

	const mediaQuery = window.matchMedia(`(max-width: ${dataItem[2]}px)`); // данные медиа-запроса ( breakpoint 1)

	startСhange(); // вызов функции для инициализации перемещений при запуске  ( breakpoint 1)


	function startСhange() {
		if (mediaQuery.matches) {
			addressMove.insertBefore(e, addressMove.children[numberOrder]);
		} else if (addressParentArray.length > 0) { // проверка, остались ли дочерние элементы после перемещения объекта, иначе не будет возврата
			for (let z = 0; z < addressParentArray.length; z++)  { // проверка дочерних элементов родителя и их последовательности
			// возвращение объекта если должен быть не последним, т.е. при наличии элемента перед которым должен находится
			if (addressParentArray[z].dataset.n > eDataNumber) {
				addressParent.insertBefore(e, addressParentArray[z]);
				break;
			} else {
				addressParent.append(e);  // возвращение объекта если должен стоять последним
			}
			}
		}else {
			addressParent.append(e);  // возвращение объекта в родительский если больше нет дочерних элементов
		}
	};

	/* вызов функции при срабатывании медиа-запроса */
	mediaQuery.addEventListener('change', function (u) {
		startСhange();
	})

	/* !!!!!!!!!!!!!!!!!!!! ВТОРОЙ  breakpoint !!!!!!!!!!!!!!!!!!!!!*/
	const mediaQueryDuble = window.matchMedia(`(max-width: ${dataItem[5]}px)`); // данные медиа-запроса  ( breakpoint 2)

	/* вызов функции при срабатывании медиа-запроса */
	mediaQueryDuble.addEventListener('change', function (u) {
		startСhangeDuble();
	})

	startСhangeDuble(); // вызов функции для инициализации перемещений при запуске ( breakpoint 2)

	function startСhangeDuble() {
		if (mediaQueryDuble.matches) {
			addressMoveDuble.insertBefore(e, addressMoveDuble.children[numberOrderDuble]);
		} else {
			startСhange();
		}
	}

});