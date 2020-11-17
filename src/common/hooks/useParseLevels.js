import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { completedLevelsGet } from 'common/utils';

import DifficultyTitle from 'components/DifficultyTitle';
import MenuItemLevel from 'components/MenuItemLevel';

const useParseLevels = () => {
	const route = useSelector((state) => state.lvlData.route, shallowEqual);
	const lvlDataSource = useSelector(
		(state) => state.lvlData.lvlDataSource,
		shallowEqual,
	);
	const [completed] = React.useState(completedLevelsGet());
	const isCompleted = (id) => {
		return completed.includes(id) ? true : false;
	};

	if (route === 'ORIGINAL') {
		return lvlDataSource.map((element, index) => (
			<React.Fragment key={'key' + index}>
				{index === 0 && <DifficultyTitle title='TUTORIAL' />}
				{index === 4 && <DifficultyTitle title='SHOSHINSHA' />}
				{index === 8 && <DifficultyTitle title='RUKI' />}
				{index === 12 && <DifficultyTitle title='SAINO' />}
				<div className='box-simple '>
					<MenuItemLevel data={element} completed={isCompleted(element.id)} />
				</div>
			</React.Fragment>
		));
	}
	if (route === 'CUSTOM') {
		return lvlDataSource.map((element, index) => (
			<div className='box-simple ' key={'key' + index}>
				<MenuItemLevel data={element} completed={isCompleted(element.id)} />
			</div>
		));
	}
};

export default useParseLevels;
