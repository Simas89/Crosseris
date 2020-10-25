import React from 'react';
import styled from 'styled-components';
import StackBlock from './StackBlock';
import { BlockBase } from './common';
import { compareMatch } from '../utils';

const StackBlockContainerWrapper = styled(BlockBase)`
	display: grid;
	grid-auto-flow: ${(p) => (p.direction === 'column' ? 'column' : 'row')};
	justify-self: end;
	align-self: flex-end;
`;

const StackBlockContainer = (props) => {
	return (
		<StackBlockContainerWrapper direction={props.direction}>
			{props.stack &&
				props.stack.map((element, index) => (
					<StackBlock
						key={'key' + index}
						compare={
							props.compare
								? compareMatch(
										props.compare[index],
										element,
										index === props.stack.length - 1,
										props,
								  )
								: null
						}
						lastInStackArr={index === props.stack.length - 1}>
						{element !== 0 && element}
					</StackBlock>
				))}
		</StackBlockContainerWrapper>
	);
};

export default StackBlockContainer;
