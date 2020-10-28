export const calc = (x, y) => [
	-(y - window.innerHeight / 2) / 300,
	(x - window.innerWidth / 2) / 300,
	1,
];
export const trans = (x, y, s) =>
	`perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
