import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
	SET_MODE,
	PLAY_LEVEL_INIT,
	SET_ORIGINAL_OR_CUSTOM_LVL_DATA_API,
} from '../redux/types';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTimes,
	faAngleLeft,
	faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { completedLevelsGet } from '../utils';
import { DifficultyTitle } from '../components/common';
import { useSpring, animated } from 'react-spring';

const NavScreenWrapper = styled.div`
	/* border: 1px solid red; */
	/* position: absolute; */
	height: 100vh;
	width: 100vw;
	display: grid;
	grid-template-columns: minmax(0px, 50vw) minmax(auto, auto);
	font-family: fujimaru;
	user-select: none;
	/* font-family: 'Ubuntu', sans-serif; */
	/* width: 100%; */
	.spacer {
		/* border: 1px solid blue; */
	}
	.menu {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.center {
			position: relative;
			width: 400px;
			height: 100vh;
			max-width: 100vw;

			.Scrollbars {
				/* border: 2px solid red; */
				.content {
					/* margin-top: 20vh; */
					padding: 40px 0;
					position: relative;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					/* margin-bottom: 100px; */
					.main-menu {
						/* font-family: fujimaru; */
						font-size: 40px;
						color: rgb(60, 60, 60);
						margin: 10px;
						&:hover {
							cursor: pointer;
						}
					}

					.level-selector {
						position: relative;
						width: 100%;
						display: grid;
						grid-template-columns: 1fr 1fr;
						/* border: 1px solid red; */

						.box-simple {
							/* font-family: fujimaru; */
							/* border: 1px solid black; */
							/* height: 50px; */
							display: flex;
							justify-content: center;
							align-items: center;
							color: rgb(60, 60, 60);
							&:hover {
								cursor: pointer;
							}
						}
						.original-custom {
							position: relative;
							height: 300px;
							/* font-family: fujimaru; */
							font-size: 2.5rem;

							.original-custom-circle {
								z-index: -1;
								position: absolute;
								height: 300px;
								width: 300px;
								/* background-image: url('img/circle.png'); */
								background-color: rgb(203, 33, 41);
								mask-image: url('img/circle.png');
								mask-size: 90% 90%;
								mask-position: 50% 50%;
								mask-repeat: no-repeat;
								/* filter: hue-rotate(180deg); */

								background-position: center;
								background-size: 70%;
								background-repeat: no-repeat;
							}
							.original-custom-icon {
								position: absolute;
								margin: 5px 10px 0 10px;
							}
						}
						.box-c {
							/* border: 1px solid black; */
							grid-column: 1/3;
							display: grid;
							grid-template-columns: 1fr 1fr;
						}

						.grid-wide {
							grid-column: 1/3;
						}

						.icon-exit {
							position: absolute;
							top: -20px;
							left: 10px;
							color: rgb(60, 60, 60);
							&:hover {
								cursor: pointer;
							}
						}
					}
				}
			}
		}
	}
`;

const MenuItemLevelStyled = styled.div`
	position: relative;
	/* border: 1px solid red; */
	height: 50px;
	width: 100%;
	display: flex;
	/* align-items: center; */
	justify-content: center;
	/* border: 1px solid rgb(60, 60, 60); */
	border-radius: 5px;
	margin: 5px 5px;
	.brush {
		z-index: -1;
		height: 100%;
		width: 100%;
		position: absolute;
		background-color: ${(p) =>
			p.completed
				? p.api === 'ORIGINAL'
					? 'rgba(203, 33, 41, 1)'
					: 'rgb(0, 107, 99)'
				: 'rgba(0, 0, 0, .3)'};
		mask-image: url('img/wtf.png');
		mask-size: 100% 100%;
		mask-position: 50% 50%;
		mask-repeat: no-repeat;
	}
	span {
		font-size: 1.3rem;
	}

	&:hover {
		cursor: pointer;
	}
	.icon-completed {
		position: absolute;
		bottom: 0;
		color: rgb(60, 60, 60);
		font-size: 1.5rem;
		/* margin-bottom: 5px; */
	}
`;

const MenuItemLevel = (props) => {
	const dispatch = useDispatch();
	const api = useSelector((state) => state.lvlData.api, shallowEqual);

	// console.log(props);

	const startLevel = () => {
		dispatch({ type: PLAY_LEVEL_INIT, payload: props.data });
	};
	return (
		<MenuItemLevelStyled
			onClick={startLevel}
			api={api}
			completed={props.completed}>
			<div className='brush'></div>
			<span>{`${props.data.title} ${props.data.cords.x}x${props.data.cords.y}`}</span>
		</MenuItemLevelStyled>
	);
};

const NavScreen = () => {
	const dispatch = useDispatch();
	const [completed] = React.useState(completedLevelsGet());
	const api = useSelector((state) => state.lvlData.api, shallowEqual);
	const channel = useSelector((state) => state.lvlData.channel, shallowEqual);

	const [rotateAnim, rotateAnimSet] = useSpring(() => ({
		transform: 'rotate(0deg)',
	}));
	const [bgAnim, bgAnimSet] = useSpring(() => ({
		backgroundColor: `${
			api === 'ORIGINAL' ? 'rgb(203, 33, 41)' : 'rgb(0, 107, 99)'
		}`,
	}));

	let angle = React.useRef(0);

	React.useEffect(() => {
		rotateAnimSet({
			transform: `rotate(${-angle.current}deg)`,
			config: {
				mass: 30,
				tension: 2200,
				friction: 300,
				precision: 0.008,
			},
		});
		bgAnimSet({
			backgroundColor: `${
				api === 'CUSTOM' ? 'rgb(0, 107, 99)' : 'rgb(203, 33, 41)'
			}`,
		});
	}, [api, bgAnimSet, rotateAnimSet]);
	// console.log(completedLevelsGet());
	const isCompleted = (id) => {
		return completed.includes(id) ? true : false;
	};

	const [sp, setSp] = React.useState([]);

	React.useEffect(() => {
		api === 'ORIGINAL' &&
			setSp([
				<DifficultyTitle title='TUTORIAL' />,
				<div className='box-simple '>
					<MenuItemLevel
						data={channel[0]}
						completed={isCompleted(channel[0].id)}
					/>
				</div>,
				<div className='box-simple '>
					<MenuItemLevel
						data={channel[1]}
						completed={isCompleted(channel[1].id)}
					/>
				</div>,
				<div className='box-simple'>
					<MenuItemLevel
						data={channel[2]}
						completed={isCompleted(channel[2].id)}
					/>
				</div>,
				<div className='box-simple '>
					<MenuItemLevel
						data={channel[3]}
						completed={isCompleted(channel[3].id)}
					/>
				</div>,
				<DifficultyTitle title='SHOSHINSHA' />,
				<div className='box-simple  '>
					<MenuItemLevel
						data={channel[4]}
						completed={isCompleted(channel[4].id)}
					/>
				</div>,
				<div className='box-simple  '>
					<MenuItemLevel
						data={channel[5]}
						completed={isCompleted(channel[5].id)}
					/>
				</div>,
				<div className='box-simple  '>
					<MenuItemLevel
						data={channel[6]}
						completed={isCompleted(channel[6].id)}
					/>
				</div>,
				<div className='box-simple  '>
					<MenuItemLevel
						data={channel[7]}
						completed={isCompleted(channel[7].id)}
					/>
				</div>,

				<DifficultyTitle title='RUKI' />,
				<div className='box-simple'>
					<MenuItemLevel
						data={channel[8]}
						completed={isCompleted(channel[8].id)}
					/>
				</div>,
				<div className='box-simple  '>
					<MenuItemLevel
						data={channel[9]}
						completed={isCompleted(channel[9].id)}
					/>
				</div>,
				<div className='box-simple  '>
					<MenuItemLevel
						data={channel[10]}
						completed={isCompleted(channel[10].id)}
					/>
				</div>,
				<div className='box-simple  '>
					<MenuItemLevel
						data={channel[11]}
						completed={isCompleted(channel[11].id)}
					/>
				</div>,
				<DifficultyTitle title='SAINO' />,
				<div className='box-simple  '>
					<MenuItemLevel
						data={channel[12]}
						completed={isCompleted(channel[12].id)}
					/>
				</div>,
			]);
		//eslint-disable-next-line
	}, [channel, api]);

	return (
		<NavScreenWrapper>
			<div className='spacer'></div>
			<div className='menu'>
				<div className='center'>
					<Scrollbars
						className='Scrollbars'
						autoHide
						autoHideTimeout={2000}
						autoHideDuration={200}
						renderThumbVertical={() => <div />}>
						<div className='content'>
							{!api ? (
								<div>
									<div
										className='main-menu'
										onClick={() =>
											dispatch({
												type: SET_ORIGINAL_OR_CUSTOM_LVL_DATA_API,
												payload: 'ORIGINAL',
											})
										}>
										PLAY
									</div>
									<div
										className='main-menu'
										onClick={() => {
											dispatch({ type: SET_MODE, payload: 'DEV' });
										}}>
										BUILD
									</div>
								</div>
							) : (
								<div className='level-selector '>
									<FontAwesomeIcon
										onClick={() =>
											dispatch({
												type: SET_ORIGINAL_OR_CUSTOM_LVL_DATA_API,
												payload: null,
											})
										}
										icon={faTimes}
										className='icon-exit'
									/>
									<div
										className='box box-simple grid-wide original-custom'
										onClick={() => {
											angle.current += 180;
											api !== 'ORIGINAL'
												? dispatch({
														type: SET_ORIGINAL_OR_CUSTOM_LVL_DATA_API,
														payload: 'ORIGINAL',
												  })
												: dispatch({
														type: SET_ORIGINAL_OR_CUSTOM_LVL_DATA_API,
														payload: 'CUSTOM',
												  });
										}}>
										<animated.div
											style={{ ...rotateAnim, ...bgAnim }}
											className='original-custom-circle'></animated.div>
										<span>{api}</span>
										<FontAwesomeIcon
											className='original-custom-icon'
											style={{ left: 0 }}
											icon={faAngleLeft}
										/>
										<FontAwesomeIcon
											className='original-custom-icon'
											style={{ right: 0 }}
											icon={faAngleRight}
										/>
									</div>

									<div className='box box-c'>
										{api === 'ORIGINAL'
											? sp.map((element, index) => {
													return { ...element, key: 'key' + index };
											  })
											: channel.map((element, index) => {
													return (
														<div className='box-simple  ' key={'key' + index}>
															<MenuItemLevel
																data={element}
																completed={isCompleted(element.id)}
															/>
														</div>
													);
											  })}
									</div>
								</div>
							)}
						</div>
					</Scrollbars>
				</div>
			</div>
		</NavScreenWrapper>
	);
};

export default NavScreen;
