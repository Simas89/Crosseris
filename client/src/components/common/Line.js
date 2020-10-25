import styled, { css } from 'styled-components';

export const Line = styled.div`
	position: absolute;
	/* transition: background-color 0.2s; */
	background-color: ${(p) =>
		p.canModify ? 'rgb(60, 60, 60)' : 'rgb(110, 110, 110)'};
	z-index: 1;
	${(p) =>
		p.fade &&
		css`
			animation: fadeout 0.4s;
			animation-fill-mode: forwards;
		`}

	${(p) =>
		p.align === 'horizontal'
			? css`
					height: ${p.px}px;
					width: ${p.doubleHor ? '200%' : '100%'};
			  `
			: css`
					height: ${p.doubleVer ? '200%' : '100%'};
					width: ${p.px}px;
			  `}

	${(p) =>
		p.bottom
			? css`
					bottom: 0;
			  `
			: css`
					top: 0;
			  `}

    ${(p) =>
		p.right
			? css`
					right: 0;
			  `
			: css`
					left: ${p.doubleHor ? '-75%' : 0};
					top: ${p.doubleVer && '-75%'};
			  `}

        ${(p) =>
		p.yShift &&
		css`
			top: ${p.yShift}px;
		`}

    ${(p) =>
		p.xShift &&
		css`
			left: ${p.xShift}px;
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
