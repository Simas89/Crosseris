import React from 'react';
import styled, { css } from 'styled-components';
import { BlockBase } from './common';
import Marker from './Marker';
import { connect } from 'react-redux';

const StackBlockWrapper = styled(BlockBase)`
	width: ${(p) => p.blockScale}px;
	height: ${(p) => p.blockScale}px;

	position: relative;
	span {
		font-size: ${(p) => p.blockScale * 0.6}px;
		/* opacity: 0.6; */
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

const StackBlock = (props) => {
	return (
		<StackBlockWrapper
			compare={props.compare}
			blockScale={props.blockScale}
			fade={props.isWinner}>
			<span>{props.children}</span>
			{props.compare && <Marker />}
		</StackBlockWrapper>
	);
};

const mapStateToProps = (state) => {
	return {
		isWinner: state.field.isWinner,
		blockScale: state.field.blockScale.blockPx,
	};
};

export default connect(mapStateToProps, null)(StackBlock);
