const config = {
	rowsCount: 6,
	seatsPerRow: 8,
};

const occupiedSeats = {
	3: [3, 4, 5],
	6: [1, 6, 7],
	2: [2, 8],
};

const isSeatOccupied = (row, seat) => {
	if (!occupiedSeats[row]) return false;
	return occupiedSeats[row].includes(seat);
};

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
