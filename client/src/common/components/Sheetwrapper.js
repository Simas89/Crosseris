import styled, { css } from 'styled-components';
export const SheetWrapper = styled.div`
	position: relative;
	padding: 0 45px 30px 45px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background-image: url('img/paper2.jpg');
	background-position: center;
	background-size: cover;
	border: 1px solid rgb(200, 200, 200);

	mask-image: url('img/mask.png');
	mask-size: 117% 114%;
	mask-position: 58% 48%;

	.water-mark-img {
		position: absolute;
		width: 100%;
		height: 100%;
		${(p) => {
			switch (p.waterMark) {
				case 'bird':
					return css`
						top: 60px;
						left: 25px;
						background-size: 60%;
						background-image: url('img/bird.png');
					`;

				case 'koi':
					return css`
						top: 20px;
						left: 15px;
						background-size: 50%;
						background-image: url('img/koi.png');
					`;

				case 'dragon':
					return css`
						top: 20px;
						left: -45%;
						background-size: 55%;
						background-image: url('img/dragon.png');
						transform: scaleX(-1);
					`;
				default:
					return null;
			}
		}}

		background-repeat: no-repeat;
		opacity: 0.2;
	}

	.title {
		position: absolute;
		font-family: fujimaru;
		font-size: 1.5rem;
		top: 20px;
	}
	.spaceris {
		position: relative;
		height: 50px;
		width: calc(100% + 50px);
		display: flex;
		justify-content: flex-start;
		align-items: center;

		> span {
			font-family: fujimaru;
			font-size: 1.5rem;
			user-select: none;
			color: rgb(60, 60, 60);
			margin-bottom: 5px;
		}
		.icon {
			position: absolute;
			color: rgb(60, 60, 60);
			&:hover {
				cursor: pointer;
			}
		}
		.bin {
			right: 0px;
		}
		.exit {
			left: 0px;
		}
		.save {
			right: 30px;
			font-size: 1.1rem;
		}
		.span-size {
			position: absolute;
			right: ${(p) => (p.mode === 'DEV' ? 60 : 30)}px;
		}
		.span-title {
			overflow: hidden;
			white-space: nowrap;
			padding-left: 20px;
			width: calc(100% - 105px);
			left: 25px;
		}
	}

	.field-wrapper {
		overflow: hidden;
		position: relative;
		margin-right: -25px;
		margin-left: -25px;
		padding-bottom: 2px;
		padding-right: 2px;
		display: grid;
		grid-template-columns: minmax(${(p) => p.blockScale}px, auto) minmax(
				${(p) => p.blockScale}px,
				auto
			);

		.x-stack {
			display: grid;
			grid-auto-flow: column;
		}
		.y-stack {
			display: grid;
			grid-auto-flow: row;
		}
		.puzzle-field {
			touch-action: none;
			position: relative;
			display: grid;
			grid-template-columns: repeat(${(p) => p.x}, ${(p) => p.blockScale}px);
		}
	}
	.post-btn-container {
		position: absolute;
		bottom: 5px;
		right: 0;
		width: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		span {
			font-family: fujimaru;
			font-size: 1.5rem;
			margin-right: 20px;
			&:hover {
				cursor: pointer;
			}
		}
	}

	.inactive {
		color: rgb(110, 110, 110);
		cursor: default;
	}
`;
