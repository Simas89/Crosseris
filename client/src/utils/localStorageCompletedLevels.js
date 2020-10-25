export const completedLevelsGet = () => {
	let data = localStorage.getItem('CROSSERIS_SAVED');
	if (data) {
		return JSON.parse(data);
	} else {
		localStorage.setItem('CROSSERIS_SAVED', JSON.stringify([]));
		return [];
	}
};

export const completedLevelsSave = (id) => {
	let data = JSON.parse(localStorage.getItem('CROSSERIS_SAVED'));

	if (!data.includes(id)) {
		data.push(id);
	}
	localStorage.setItem('CROSSERIS_SAVED', JSON.stringify(data));

	// console.log(data);
	// console.log(data);
};
