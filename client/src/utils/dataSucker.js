export const customLevelsGet = (callback) => {
	fetch('/lvl', {
		method: 'get',
		headers: {},
	})
		.then((res) => res.json())
		.then((data) => {
			callback(data);
		})
		.catch((err) => {
			console.log(err);
			callback([]);
		});
};
