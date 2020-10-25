import React from 'react';
import styled from 'styled-components';

const DifficultyTitleStyled = styled.div`
	position: relative;
	font-family: fujimaru;
	font-size: 40px;
	/* font-weight: bold; */
	color: rgb(60, 60, 60);
	grid-column: 1/3;
	/* border-bottom: 1px solid black; */
	font-size: 1.5rem;
	margin: 10px 0 20px 0;
	display: flex;
	align-items: center;
	justify-content: center;

	user-select: none;
	span {
		margin: 0 20px;
	}
	img {
		/* position: absolute; */
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

export const DifficultyTitle = (props) => {
	return (
		<DifficultyTitleStyled>
			<img src='img/cloud2.png' alt='' className='left'></img>
			<span>{props.title}</span>
			<img src='img/cloud2.png' alt='' className='right'></img>
		</DifficultyTitleStyled>
	);
};

// export default DifficultyTitle;
