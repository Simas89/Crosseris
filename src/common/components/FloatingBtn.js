import styled, { css } from 'styled-components';

export const FloatingBtn = styled.div`
	position: fixed;
	overflow: hidden;
	z-index: 10;
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;

	${(p) =>
		p.floatRight
			? css`
					right: 10px;
			  `
			: css`
					left: 10px;
			  `}
	bottom: ${(p) => (p.bottom ? p.bottom : 10)}px;

	border: 2px solid
		${(p) => (p.active ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.4)')};
	border-radius: 50%;

	background-image: url('img/paper2.jpg');
	background-position: center;
	background-size: cover;

	&:hover {
		cursor: ${(p) => (p.active ? 'pointer' : 'hover')};
	}
	.icon {
		opacity: ${(p) => (p.active ? 0.7 : 0.4)};
	}
	.icon-zoom {
		font-size: 1.4rem;
	}
	.icon-redo {
		font-size: 1.3rem;
	}
`;
