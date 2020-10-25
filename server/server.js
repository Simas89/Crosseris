import express from 'express';
import path from 'path';
import cors from 'cors';

const server = express();
server.use(cors());
server.use(express.json({ extended: false }));
const lvlData = [
	{
		index: 0,
		id: 'lol',
		title: '#_.1',
		revealed: 'Poop',
		stacks: {
			xStack: [[3], [4], [3, 1], [4], [3]],
			yStack: [[1], [3], [5], [2, 2], [5]],
		},
		cords: { x: 5, y: 5 },
	},
	{
		index: 1,
		id: 'OMG2',
		title: '#_.2',
		revealed: 'Solved!',
		stacks: {
			xStack: [[1], [1], [0], [1], [1]],
			yStack: [[2, 2]],
		},
		cords: { x: 5, y: 1 },
	},
];

const getLevels = (req, res) => {
	console.log('Im here!');
	res.json([...lvlData]);
};

server.get('/', getLevels);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	server.use(express.static('../client/build'));
	server.get('*', (req, res) =>
		res.sendFile(
			path.resolve(__dirname, '../', 'client', 'build', 'index.html'),
		),
	);
}

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`- Crosseris Server running: ${PORT} -`));
