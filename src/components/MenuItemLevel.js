import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { PLAY_LEVEL_INIT } from '../redux/types';
import styled from 'styled-components';

const MenuItemLevelStyled = styled.div`
	position: relative;
	height: 50px;
	width: 100%;
	display: flex;
	justify-content: center;
	border-radius: 5px;
	margin: 5px 5px;
	.brush {
		z-index: -1;
		height: 100%;
		width: 100%;
		position: absolute;
		background-color: ${(p) =>
			p.completed
				? p.route === 'ORIGINAL'
					? 'rgba(203, 33, 41, 1)'
					: 'rgb(0, 107, 99)'
				: 'rgba(0, 0, 0, .3)'};
		mask-image: url('img/wtf.png');
		mask-size: 100% 100%;
		mask-position: 50% 50%;
		mask-repeat: no-repeat;
	}
	span {
		font-size: 1.3rem;
	}

	&:hover {
		cursor: pointer;
	}
	.icon-completed {
		position: absolute;
		bottom: 0;
		color: rgb(60, 60, 60);
		font-size: 1.5rem;
	}
`;

const MenuItemLevel = (props) => {
	const dispatch = useDispatch();
	const route = useSelector((state) => state.lvlData.route, shallowEqual);

	const startLevel = () => {
		dispatch({ type: PLAY_LEVEL_INIT, payload: props.data });
	};
	return (
		<MenuItemLevelStyled
			onClick={startLevel}
			route={route}
			completed={props.completed}>
			<div className='brush'></div>
			<span>{`${props.data.title} ${props.data.cords.x}x${props.data.cords.y}`}</span>
		</MenuItemLevelStyled>
	);
};

export default MenuItemLevel;
