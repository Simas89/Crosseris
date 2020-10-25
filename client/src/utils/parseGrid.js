import React from 'react';
import { getLongestSubArrLength } from './';
import { Line } from '../components/common';

export const parseGrid = (
	{ xStack, yStack, blockScale },
	isWinner,
	canModify,
) => {
	const fieldIsDense = blockScale.blockPx < 40 ? true : false;
	let gridOutsideField = [];
	let gridInsideField = [];
	const lineFat = fieldIsDense ? 2 : 4;
	const lineMid = fieldIsDense ? 2 : 4;
	const lineThin = fieldIsDense ? 1 : 2;

	for (let i = 1; i < yStack.length + getLongestSubArrLength(xStack); i++) {
		gridOutsideField.push(
			<Line
				key={'keyHorizontal' + i}
				px={lineThin}
				align={'horizontal'}
				yShift={blockScale.blockPx * i - lineThin / 2}
				fade={isWinner}
				canModify={canModify}
			/>,
		);
	}

	for (let i = 1; i < xStack.length + getLongestSubArrLength(yStack); i++) {
		gridOutsideField.push(
			<Line
				key={'keyVertical' + i}
				px={lineThin}
				align={'vertical'}
				xShift={blockScale.blockPx * i - lineThin / 2}
				fade={isWinner}
				canModify={canModify}
			/>,
		);
	}

	gridOutsideField.push(
		<Line
			key={'outer-top'}
			px={lineMid}
			align={'horizontal'}
			fade={isWinner}
			canModify={canModify}
		/>,
		<Line
			key={'outer-left'}
			px={lineMid}
			align={'vertical'}
			fade={isWinner}
			canModify={canModify}
		/>,
		<Line
			key={'outer-bottom'}
			px={lineMid}
			align={'horizontal'}
			bottom
			fade={isWinner}
			canModify={canModify}
		/>,
		<Line
			key={'outer-right'}
			px={lineMid}
			align={'vertical'}
			right
			fade={isWinner}
			canModify={canModify}
		/>,
	);

	const yStackSubLength = getLongestSubArrLength(yStack);
	for (let i = 0; i < Math.floor((yStackSubLength - 1) / 5); i++) {
		gridOutsideField.push(
			<Line
				key={'outer-fat-hor' + i}
				px={lineFat}
				align={'vertical'}
				xShift={
					(yStackSubLength - Math.floor((yStackSubLength - 1) / 5) * 5) *
						blockScale.blockPx +
					blockScale.blockPx * 5 * i -
					lineFat / 2
				}
				fade={isWinner}
				canModify={canModify}
			/>,
		);
	}

	const xStackSubLength = getLongestSubArrLength(xStack);
	for (let i = 0; i < Math.floor((xStackSubLength - 1) / 5); i++) {
		gridOutsideField.push(
			<Line
				key={'outer-fat-ver' + i}
				px={lineFat}
				align={'horizontal'}
				yShift={
					(xStackSubLength - Math.floor((xStackSubLength - 1) / 5) * 5) *
						blockScale.blockPx +
					blockScale.blockPx * 5 * i -
					lineFat / 2
				}
				fade={isWinner}
				canModify={canModify}
			/>,
		);
	}

	/// ---

	for (let i = 0; i <= Math.floor(xStack.length / 5); i++) {
		gridInsideField.push(
			<Line
				key={'inner-fat-hor' + i}
				px={lineFat}
				align={'vertical'}
				doubleVer
				xShift={
					blockScale.blockPx * 5 * i +
					getLongestSubArrLength(yStack) * blockScale.blockPx -
					lineFat / 2
				}
				fade={isWinner}
				canModify={canModify}
			/>,
		);
	}
	for (let i = 0; i <= Math.floor(yStack.length / 5); i++) {
		gridInsideField.push(
			<Line
				key={'inner-fat-ver' + i}
				px={lineFat}
				align={'horizontal'}
				doubleHor
				yShift={
					blockScale.blockPx * 5 * i +
					getLongestSubArrLength(xStack) * blockScale.blockPx -
					lineFat / 2
				}
				fade={isWinner}
				canModify={canModify}
			/>,
		);
	}

	return { gridOutsideField, gridInsideField };
};
