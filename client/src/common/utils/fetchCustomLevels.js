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
			// console.log(err);
			callback([]);
		});
};

export const customLevelsUpload = (data) => {
	fetch('/lvl', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(data),
	});
};
