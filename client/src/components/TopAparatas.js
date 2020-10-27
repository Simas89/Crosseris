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

const WrapperStyled = styled.div`
	top: 0;
	left: 0;
	width: 100%;
	position: fixed;
	padding: 10px;

	display: flex;
	align-items: center;
	justify-content: center;
	font-family: 'Ubuntu', sans-serif;
	background-color: rgba(0, 0, 0, 0.4);
	color: rgba(255, 255, 255, 1);

	border: 1px solid rgba(0, 0, 0, 0.5);
`;

const Wrapper = (props) => {
	return <WrapperStyled>{props.children}</WrapperStyled>;
};

const DevFieldInitStyled = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	/* border: 1px solid red; */
	color: rgba(255, 255, 255, 0.8);

	.icon {
		color: rgba(255, 255, 255, 0.8);
		font-size: 3rem;
		margin: 0 10px;
		&:hover {
			cursor: pointer;
		}
	}

	.panel {
		display: flex;
		align-items: center;
		.item {
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
		<Wrapper>
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
		</Wrapper>
	) : null;
};

const TutMessage = (props) => {
	return (
		<Wrapper>
			<span style={{ width: '350px' }}>{props.msg}</span>
		</Wrapper>
	);
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
		tut: () => <TutMessage msg={props.init.text} />,
	};

	return <>{test[props.init.type]()}</>;
});

export default TopAparatas;
