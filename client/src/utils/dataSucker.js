export const customLevelsGet = (callback) => {
	fetch('http://localhost:8080/lvl', {
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
