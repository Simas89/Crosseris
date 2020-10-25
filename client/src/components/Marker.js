import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const MarkerStyled = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	opacity: 0.4;

	> div {
		position: absolute;
		width: 60%;
		height: 15%;
		background-color: black;
		border-radius: 10px;
		transform: rotateZ(45deg);
	}
`;

const MarkerStyledAnimated = animated(MarkerStyled);

const Marker = (props) => {
	const fadeAnim = useSpring({
		from: { opacity: props.isWinner ? 0.4 : 0 },
		to: { opacity: props.isWinner ? 0 : 0.4 },
	});
	return (
		<MarkerStyledAnimated style={fadeAnim}>
			<div></div>
			{props.cross && <div style={{ transform: 'rotateZ(135deg)' }}></div>}
		</MarkerStyledAnimated>
	);
};

export default Marker;
