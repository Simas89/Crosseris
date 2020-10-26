import express from 'express';
import path from 'path';
import cors from 'cors';
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('---Conected to DB!---');

	db.collection('comments')
		.watch()
		.on('change', (data) => ' console.log(data.documentKey)');
});
mongoose.set('useFindAndModify', true); /// WTF

const Schema = mongoose.Schema;

const LevelSchema = new Schema({
	title: String,
	revealed: String,
	stacks: {
		xStack: [[Number]],
		yStack: [[Number]],
	},
	cords: { x: Number, y: Number },
	date: { type: Date, default: Date.now },
});

const Level = mongoose.model('level', LevelSchema);

const server = express();
server.use(cors());
server.use(express.json({ extended: false }));

const getLevels = (req, res) => {
	Level.find()
		.sort({ date: 'descending' })
		.then((data) => {
			const ready = data.map((element, index) => {
				return {
					index,
					id: element._id,
					title: element.title,
					revealed: element.revealed,
					stacks: element.stacks,
					cords: element.cords,
				};
			});
			console.log(ready);
			res.json(ready);
		});
	// res.json([...lvlData]);
	res.status(200);
};

server.get('/lvl', getLevels);
server.post('/lvl', (req, res) => {
	const lvl = new Level({
		...req.body,
	});
	lvl.save();

	res.status(200);
});

if (process.env.NODE_ENV === 'production') {
	server.use(express.static('../client/build'));
	server.get('*', (req, res) =>
		res.sendFile(
			path.resolve(__dirname, '../', 'client', 'build', 'index.html'),
		),
	);
}

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`- Crosseris Server running: ${PORT} -`));
