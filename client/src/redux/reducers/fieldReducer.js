import produce from 'immer';
import {
	SET_FIELD,
	SET_IS_FIELD_ACTIVE,
	SET_APARATAS_ACTIVE,
	SET_IS_WINNER,
	SET_BLOCK,
	SET_PLAY_STACK,
	SET_BLOCK_SIZE,
	STOP_MULTI_SELECT,
	MULTI_SELECT_TRIG,
	MULTI_SELECT_APPLY,
	UN_DO,
	ZOOM,
	SET_MODE,
	DEV_FIELD_SIZE_SET,
	DEV_SET_TITLES,
	PLAY_LEVEL_INIT,
} from '../types';
import { calcStacks, calcBlockSize, isObjEmpty } from 'common/utils';

let stacksBuild = {};
let nextState = null;

const initialState = {
	mode: 'HOME',

	blockScale: {},
	grid: {},
	minBlockScale: 40,
	windowSize: {
		width: undefined,
		height: undefined,
		windowRatioDif: undefined,
	},

	fieldArr: [],
	fieldArrTemp: [],
	isFieldActive: true,
	history: [],
	historyTemp: [],
	yStackCurrent: [],
	xStackCurrent: [],
	yStack: [],
	xStack: [],
	title: '',

	isWinner: false,
	multiSelect: {},

	levelPlay: {
		title: '',
		revealed: '',
		cords: { x: 7, y: 7 },
		aparatasInit: { type: 'dev' },
	},
	customLevels: [],

	displayDevFieldInit: true,
};

export default (state = initialState, action = {}) =>
	produce(state, (draft) => {
		switch (action.type) {
			case SET_FIELD:
				const iterations = action.payload.x * action.payload.y;

				let fieldTemp = [];
				let xCol = 0;
				let yRow = 1;
				for (let i = 0; i < iterations; i++) {
					xCol++;
					if (xCol === action.payload.x + 1) {
						xCol = 1;
						yRow++;
					}
					fieldTemp.push({ index: i, x: xCol, y: yRow, type: 'NULL' });
				}

				return {
					...state,
					fieldArr: [...fieldTemp],
					fieldArrTemp: [...fieldTemp],
					...calcStacks(state.mode, [...fieldTemp]),
					title: action.payload.title,
					history: [],
				};

			case SET_PLAY_STACK:
				return {
					...state,
					yStack: [...action.payload.yStack],
					xStack: [...action.payload.xStack],
					...calcStacks(state.mode, state.fieldArr),
				};

			case SET_BLOCK_SIZE:
				return {
					...state,
					windowSize: action.payload,
					blockScale: calcBlockSize(
						{ xStack: state.xStack, yStack: state.yStack },
						action.payload,
						state.minBlockScale,
					),
				};

			case SET_IS_FIELD_ACTIVE:
				return { ...state, isFieldActive: action.payload };

			case SET_APARATAS_ACTIVE:
				return { ...state, displayDevFieldInit: action.payload };

			case SET_IS_WINNER: {
				return {
					...state,
					isWinner: action.payload,
					history: [],
					isFieldActive: action.payload ? false : true,
				};
			}

			case SET_BLOCK:
				const fieldArrBuild = state.fieldArr.map((element, index) => {
					if (action.payload.index === index) {
						return { ...element, type: action.payload.type };
					} else {
						return element;
					}
				});

				stacksBuild = { ...calcStacks(state.mode, fieldArrBuild) };

				return {
					...state,
					fieldArr: fieldArrBuild,
					...stacksBuild,
					history: [...state.history, [state.fieldArr[action.payload.index]]],

					blockScale:
						state.mode === 'PLAY'
							? state.blockScale
							: calcBlockSize(
									{ xStack: state.xStack, yStack: stacksBuild.yStack },
									state.windowSize,
									state.minBlockScale,
							  ),
				};

			case UN_DO:
				nextState = produce(state, (draftState) => {
					if (state.history.length) {
						state.history[state.history.length - 1].forEach((element) => {
							draftState.fieldArr[element.index] = {
								...state.fieldArr[element.index],
								type: element.type,
							};
						});
					}
				});

				return {
					...state,
					fieldArr: [...nextState.fieldArr],
					history: [...state.history.slice(0, state.history.length - 1)],
					historyTemp: [],
					...calcStacks(state.mode, nextState.fieldArr),
				};

			case MULTI_SELECT_TRIG:
				return { ...state, multiSelect: action.payload };

			case STOP_MULTI_SELECT:
				return {
					...state,
					multiSelect: {},
					fieldArrTemp: [...state.fieldArr],
					history: !state.isWinner
						? !isObjEmpty(state.multiSelect)
							? [
									...state.history.slice(0, state.history.length - 1),
									[...state.historyTemp],
							  ]
							: [...state.history]
						: [],
					historyTemp: [],
				};

			case MULTI_SELECT_APPLY:
				const isPositiveDir =
					Math.sign(action.payload.selectedBlocks) === 1 ? true : false;
				const virtualFieldArr = JSON.parse(JSON.stringify(state.fieldArrTemp));
				let historyTempScoped = [];

				const calcBlockIterations = (dir) => {
					let maxBlocksIterations = 0;
					if (dir === 'row') {
						maxBlocksIterations = isPositiveDir
							? state.xStack.length - state.fieldArr[state.multiSelect.index].x
							: state.fieldArr[state.multiSelect.index].x - 1;
					} else if (dir === 'col') {
						maxBlocksIterations = isPositiveDir
							? state.yStack.length - state.fieldArr[state.multiSelect.index].y
							: state.fieldArr[state.multiSelect.index].y - 1;
					}

					let blocksIterations = Math.abs(action.payload.selectedBlocks);
					if (blocksIterations > maxBlocksIterations) {
						blocksIterations = maxBlocksIterations;
					}
					return blocksIterations;
				};

				if (action.payload.dir === 'row') {
					for (let i = 0; i <= calcBlockIterations('row'); i++) {
						let j = i;
						if (!isPositiveDir) {
							j = -Math.abs(i);
						}

						historyTempScoped.push({
							index: state.multiSelect.index + j,
							type: virtualFieldArr[state.multiSelect.index + j].type,
						});

						virtualFieldArr[state.multiSelect.index + j].type =
							state.multiSelect.mode;
					}
				}

				if (action.payload.dir === 'col') {
					for (let i = 0; i <= calcBlockIterations('col'); i++) {
						let j = i;
						if (!isPositiveDir) {
							j = -Math.abs(i);
						}

						historyTempScoped.push({
							index: state.multiSelect.index + j * state.xStack.length,
							type:
								virtualFieldArr[
									state.multiSelect.index + j * state.xStack.length
								].type,
						});

						virtualFieldArr[
							state.multiSelect.index + j * state.xStack.length
						].type = state.multiSelect.mode;
					}
				}

				return {
					...state,
					fieldArr: virtualFieldArr,
					...calcStacks(state.mode, virtualFieldArr),
					historyTemp: historyTempScoped,
				};

			case ZOOM:
				let newBlockScale = action.payload
					? state.minBlockScale + 10
					: state.minBlockScale - 10;

				return {
					...state,
					minBlockScale: newBlockScale,
					blockScale: calcBlockSize(
						{ xStack: state.xStack, yStack: state.yStack },
						state.windowSize,
						newBlockScale,
					),
				};

			case SET_MODE:
				return {
					...initialState,
					mode: action.payload,
					isFieldActive: action.payload === 'PLAY',
				};

			case DEV_FIELD_SIZE_SET:
				return {
					...produce(state, (draftState) => {
						if (action.payload.dir === 'X') {
							action.payload.inc
								? draftState.levelPlay.cords.x++
								: draftState.levelPlay.cords.x > 5 &&
								  draftState.levelPlay.cords.x--;
						} else {
							action.payload.inc
								? draftState.levelPlay.cords.y++
								: draftState.levelPlay.cords.y > 5 &&
								  draftState.levelPlay.cords.y--;
						}
						draftState.blockScale = calcBlockSize(
							{ xStack: state.xStack, yStack: state.yStack },
							state.windowSize,
							state.minBlockScale,
						);
					}),
				};

			case DEV_SET_TITLES:
				return { ...state, levelDev: { ...state.levelDev, ...action.payload } };

			case PLAY_LEVEL_INIT:
				draft.isWinner = false;
				draft.fieldArr = [];
				draft.levelPlay = action.payload;
				draft.mode = 'PLAY';
				draft.isFieldActive = true;
				break;

			default:
				return state;
		}
	});
