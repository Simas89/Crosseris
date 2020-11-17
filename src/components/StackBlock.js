import React from 'react';
import styled, { css } from 'styled-components';
import { BlockBase } from 'common/components';
import Marker from './Marker';
import { useSelector } from 'react-redux';

const StackBlockWrapper = styled(BlockBase)`
	position: relative;
	width: ${(p) => p.blockScale}px;
	height: ${(p) => p.blockScale}px;

	span {
		font-size: ${(p) => p.blockScale * 0.6}px;
		color: rgb(60, 60, 60);
	}

	&:hover {
		cursor: default;
	}

	${(p) =>
		p.fade &&
		css`
			animation: fadeout 0.4s;
			animation-fill-mode: forwards;
		`}

	@keyframes fadeout {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
`;

const StackBlock = React.memo((props) => {
	const isWinner = useSelector((state) => state.field.isWinner);
	const blockScale = useSelector((state) => state.field.blockScale.blockPx);
	return (
		<StackBlockWrapper
			compare={props.compare}
			blockScale={blockScale}
			fade={isWinner}>
			<span>{props.children}</span>
			{props.compare && <Marker />}
		</StackBlockWrapper>
	);
});

export default StackBlock;
