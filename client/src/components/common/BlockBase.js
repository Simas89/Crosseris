import styled from 'styled-components';

export const BlockBase = styled.div`
	font-family: 'Ubuntu', sans-serif;
	font-weight: bold;
	position: relative;
	user-select: none;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2;

	&:hover {
		cursor: ${(p) => (p.isFieldActive ? 'pointer' : 'default')};
	}
`;
