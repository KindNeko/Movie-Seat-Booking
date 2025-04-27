const cinemaHall = document.querySelector('.cinema-hall');
const selectedCount = document.querySelector('.selected-count');
const select = document.querySelector('#movie-select');
const priceValue = document.querySelector('.selected-movie-price');
const totalPriceValue = document.querySelector('.total-price');

/**
 * Конфигурационный объект с параметрами кинозала.
 * @typedef {Object} Config
 * @property {number} rowsCount - Количество рядов в кинозале.
 * @property {number} seatsPerRow - Количество сидений в каждом ряду.
 */
const config = {
	rowsCount: 6,
	seatsPerRow: 8,
};

/**
 * Объект, хранящий информацию о занятых местах.
 * Ключи объекта - номера рядов, значения - массивы занятых мест в каждом ряду.
 * @type {Object.<number, number[]>}
 */
const occupiedSeats = {
	3: [3, 4, 5],
	6: [1, 6, 7],
	2: [2, 8],
};

/**
 * Проверяет, занято ли указанное место в кинозале.
 * @param {number} row - Номер ряда.
 * @param {number} seat - Номер места.
 * @returns {boolean} True, если место занято, иначе false.
 */
const isSeatOccupied = (row, seat) => {
	if (!occupiedSeats[row]) return false;
	return occupiedSeats[row].includes(seat);
};

/**
 * Генерирует разметку кинозала с сидениями.
 * Создает элементы рядов и сидений, применяя классы и атрибуты data.
 */
const generateCinemaSeats = () => {
	const hall = document.querySelector('.cinema-hall');

	for (let rows = 2; rows <= config.rowsCount; rows++) {
		const row = document.createElement('div');
		row.classList.add('row');
		row.dataset.rowNumber = rows;

		for (let seats = 1; seats <= config.seatsPerRow; seats++) {
			const seat = document.createElement('div');
			seat.classList.add('seat');
			seat.dataset.seatId = `${rows}-${seats}`;
			if (isSeatOccupied(rows, seats)) {
				seat.classList.add('occupied');
			}
			row.appendChild(seat);
		}
		hall.appendChild(row);
	}
};

generateCinemaSeats();

let count = 0;
let moviePrice = 0;

/**
 * Обновляет цену выбранного фильма и отображает её.
 * Извлекает цену из значения select-элемента, преобразует в число.
 */
function updateMoviePrice() {
	moviePrice = parseInt(select.value, 10);
	priceValue.textContent = moviePrice;
	updateTotalPrice();
}

/**
 * Обновляет общую стоимость выбранных билетов.
 * Вычисляет произведение количества выбранных мест и цены билета.
 */
function updateTotalPrice() {
	const total = count * moviePrice;
	totalPriceValue.textContent = total;
}

select.addEventListener('change', updateMoviePrice);

cinemaHall.addEventListener('click', (e) => {
	const seat = e.target;

	if (seat.classList.contains('occupied')) {
		return;
	}

	if (!seat.classList.contains('seat')) {
		return;
	}

	if (seat.classList.toggle('selected')) {
		count++;
	} else {
		count--;
	}

	selectedCount.textContent = count;
	updateTotalPrice();
});

updateMoviePrice();
