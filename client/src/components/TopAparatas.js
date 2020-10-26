import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { createSelector } from 'reselect';
import {
	DEV_FIELD_SIZE_SET,
	SET_IS_FIELD_ACTIVE,
	SET_APARATAS_ACTIVE,
} from '../redux/types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCaretLeft,
	faCaretRight,
	faCheck,
} from '@fortawesome/free-solid-svg-icons';

const TopAparatasSyled = styled.div`
	display: flex;
	/* align-items: center; */
	font-family: 'Ubuntu', sans-serif;
	justify-content: center;
	.body-wrapper {
		color: rgb(60, 60, 60);
		font-family: 'Ubuntu', sans-serif;
		z-index: 2;
		top: 10px;
		width: 350px;
		position: fixed;
		/* border: 1px solid green; */
	}
`;

const DevFieldInitStyled = styled.div`
	height: 50px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.icon {
		color: rgb(60, 60, 60);
		font-size: 2rem;
		margin: 0 10px;
		&:hover {
			cursor: pointer;
		}
	}

	.panel {
		display: flex;
		align-items: center;
		.item {
			/* border: 1px solid black; */
			display: flex;
			align-items: center;

			span {
				user-select: none;
			}
		}
		.check {
			font-size: 1.3rem;
		}
	}
`;

const DevFieldInit = (props) => {
	const displayDevFieldInit = useSelector(
		(state) => state.field.displayDevFieldInit,
	);
	const dispatch = useDispatch();

	const handleClick = (payload) => {
		dispatch({ type: DEV_FIELD_SIZE_SET, payload });
	};

	return displayDevFieldInit ? (
		<DevFieldInitStyled>
			<div>Set field size</div>
			<div className='panel'>
				<div className='item'>
					<FontAwesomeIcon
						onClick={() => handleClick({ dir: 'X', inc: false })}
						icon={faCaretLeft}
						className='icon'
					/>
					<span>{props.xStack}</span>
					<FontAwesomeIcon
						onClick={() => handleClick({ dir: 'X', inc: true })}
						icon={faCaretRight}
						className='icon'
					/>
				</div>
				<div className='item'>
					<FontAwesomeIcon
						onClick={() => handleClick({ dir: 'Y', inc: false })}
						icon={faCaretLeft}
						className='icon'
					/>
					<span>{props.yStack}</span>
					<FontAwesomeIcon
						onClick={() => handleClick({ dir: 'Y', inc: true })}
						icon={faCaretRight}
						className='icon'
					/>
				</div>
				<FontAwesomeIcon
					onClick={() => {
						dispatch({ type: SET_IS_FIELD_ACTIVE, payload: true });
						dispatch({ type: SET_APARATAS_ACTIVE, payload: false });
					}}
					icon={faCheck}
					className='icon check'
				/>
			</div>
		</DevFieldInitStyled>
	) : null;
};

const mySelector = createSelector(
	(state) => state.field,
	(field) => {
		return {
			xStack: field.xStack.length,
			yStack: field.yStack.length,
			mode: field.mode,
		};
	},
);

const TopAparatas = React.memo((props) => {
	const state = useSelector(mySelector, shallowEqual);

	const test = {
		dev: () => <DevFieldInit yStack={state.yStack} xStack={state.xStack} />,
		tut: () => props.init.text,
	};

	return (
		<TopAparatasSyled>
			<div className='body-wrapper'>{test[props.init.type]()}</div>
		</TopAparatasSyled>
	);
});

export default TopAparatas;
