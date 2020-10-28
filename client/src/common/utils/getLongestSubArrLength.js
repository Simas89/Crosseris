export const getLongestSubArrLength = (arr) => {
	let length = 0;
	arr.forEach((element) => {
		if (element.length > length) {
			length = element.length;
		}
	});
	return length;
};
