import React from 'react';
import styled from 'styled-components';

const DifficultyTitleStyled = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 10px 0 20px 0;
	font-family: fujimaru;
	font-size: 40px;
	color: rgb(60, 60, 60);
	font-size: 1.5rem;
	user-select: none;
	grid-column: 1/3;

	span {
		margin: 0 20px;
	}
	img {
		height: 60px;
	}
	.right {
		right: 0;
	}
	.left {
		left: 0;
		transform: scaleX(-1);
	}
`;

const DifficultyTitle = (props) => {
	return (
		<DifficultyTitleStyled>
			<img src='img/cloud2.png' alt='' className='left'></img>
			<span>{props.title}</span>
			<img src='img/cloud2.png' alt='' className='right'></img>
		</DifficultyTitleStyled>
	);
};

export default DifficultyTitle;
