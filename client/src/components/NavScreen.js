import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
	SET_MODE,
	SET_ORIGINAL_OR_CUSTOM_LVL_DATA_SOURCE,
} from '../redux/types';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTimes,
	faAngleLeft,
	faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import useParseLevels from 'common/hooks/useParseLevels';
import { useSpring, animated } from 'react-spring';

const NavScreenWrapper = styled.div`
	height: 100vh;
	width: 100vw;
	display: grid;
	grid-template-columns: minmax(0px, 50vw) minmax(auto, auto);
	font-family: fujimaru;

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
				.content {
					margin-top: ${(p) => (p.route ? 0 : 20)}vh;
					padding: 30px 0;
					position: relative;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.main-menu {
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

						.box-simple {
							display: flex;
							justify-content: center;
							align-items: center;
							color: rgb(60, 60, 60);
							&:hover {
								cursor: pointer;
							}
						}
						.original-custom {
							user-select: none;
							position: relative;
							height: 300px;
							font-size: 2.5rem;

							.original-custom-circle {
								z-index: -1;
								position: absolute;
								height: 300px;
								width: 300px;
								background-color: rgb(203, 33, 41);
								mask-image: url('img/circle.png');
								mask-size: 90% 90%;
								mask-position: 50% 50%;
								mask-repeat: no-repeat;
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

const NavScreen = React.memo(() => {
	const dispatch = useDispatch();
	const route = useSelector((state) => state.lvlData.route, shallowEqual);
	const parsedLevels = useParseLevels();

	const [rotateAnim, rotateAnimSet] = useSpring(() => ({
		transform: 'rotate(0deg)',
	}));
	const [bgAnim, bgAnimSet] = useSpring(() => ({
		backgroundColor: `${
			route === 'ORIGINAL' ? 'rgb(203, 33, 41)' : 'rgb(0, 107, 99)'
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
				route === 'CUSTOM' ? 'rgb(0, 107, 99)' : 'rgb(203, 33, 41)'
			}`,
		});
	}, [route, bgAnimSet, rotateAnimSet]);

	return (
		<NavScreenWrapper route={route}>
			<div className='spacer'></div>
			<div className='menu'>
				<div className='center'>
					<Scrollbars
						className='Scrollbars'
						autoHide
						renderThumbVertical={() => <div />}>
						<div className='content'>
							{!route ? (
								<div>
									<div
										className='main-menu'
										onClick={() =>
											dispatch({
												type: SET_ORIGINAL_OR_CUSTOM_LVL_DATA_SOURCE,
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
												type: SET_ORIGINAL_OR_CUSTOM_LVL_DATA_SOURCE,
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
											route !== 'ORIGINAL'
												? dispatch({
														type: SET_ORIGINAL_OR_CUSTOM_LVL_DATA_SOURCE,
														payload: 'ORIGINAL',
												  })
												: dispatch({
														type: SET_ORIGINAL_OR_CUSTOM_LVL_DATA_SOURCE,
														payload: 'CUSTOM',
												  });
										}}>
										<animated.div
											style={{ ...rotateAnim, ...bgAnim }}
											className='original-custom-circle'></animated.div>
										<span>{route}</span>
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

									<div className='box box-c'>{parsedLevels}</div>
								</div>
							)}
						</div>
					</Scrollbars>
				</div>
			</div>
		</NavScreenWrapper>
	);
});

export default NavScreen;
