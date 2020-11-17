import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { createSelector } from 'reselect';
import {
  SET_MODE,
  SET_IS_FIELD_ACTIVE,
  SET_APARATAS_ACTIVE,
  SET_IS_WINNER,
  SET_FIELD,
  SET_PLAY_STACK,
  SET_BLOCK_SIZE,
  PLAY_LEVEL_INIT,
} from 'redux/types';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import useWindowSize from 'common/hooks/useWindowSize';
import {
  parseGrid,
  isTouch,
  getLongestSubArrLength,
  completedLevelsSave,
  calc,
  trans,
} from 'common/utils';
import { Birds, SheetWrapper } from 'common/components';
import StackBlockContainer from './StackBlockContainer';
import Block from './Block';
import TopAparatas from './TopAparatas';
import Modal from './Modal';
import realm from '../common/utils/realm';

const SheetWrapperAnimated = animated(SheetWrapper);

const sheetStateSelector = createSelector(
  (state) => state,
  (state) => {
    return {
      isFieldActive: state.field.isFieldActive,
      levelPlay: state.field.levelPlay,
      mode: state.field.mode,
      fieldArr: state.field.fieldArr,
      xStackCurrent: state.field.xStackCurrent,
      yStackCurrent: state.field.yStackCurrent,
      xStack: state.field.xStack,
      yStack: state.field.yStack,
      isWinner: state.field.isWinner,
      blockScale: state.field.blockScale,
      lvlDataSource: state.lvlData.lvlDataSource,
      grid: state.field.grid,
    };
  }
);

const Sheet = () => {
  const state = useSelector(sheetStateSelector, shallowEqual);
  const [grid, setGrid] = React.useState({});
  const [modal, setModal] = React.useState(false);
  const dispatch = useDispatch();
  const ref = React.useRef(null);
  const windowSize = useWindowSize();

  const [spring, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 100, tension: 300, friction: 100 },
  }));
  const [fadeInAnim, fadeInAnimSet] = useSpring(() => ({
    opacity: 0,
  }));
  const [fadeOutAnim, fadeOutAnimSet] = useSpring(() => ({
    opacity: 1,
  }));
  const [fadeOutAnimLowOpacity, fadeOutAnimLowOpacitySet] = useSpring(() => ({
    opacity: 0.2,
  }));
  const [winShiftAnim, winShiftAnimSet] = useSpring(() => ({
    top: 0,
    left: 0,
    config: { mass: 10, tension: 300, friction: 140 },
  }));

  React.useLayoutEffect(() => {
    setGrid(
      parseGrid(
        {
          xStack: state.xStack,
          yStack: state.yStack,
          blockScale: state.blockScale,
        },
        state.isWinner,
        state.isFieldActive
      )
    );
  }, [
    state.blockScale,
    state.yStack,
    state.xStack,
    state.isWinner,
    state.isFieldActive,
  ]);

  React.useEffect(() => {
    if (
      state.xStack.length &&
      state.xStack.flat() + state.yStack.flat() ===
        state.xStackCurrent.flat() + state.yStackCurrent.flat()
    ) {
      dispatch({ type: SET_IS_WINNER, payload: true });
    }
  }, [
    state.xStack,
    state.yStack,
    state.xStackCurrent,
    state.yStackCurrent,
    dispatch,
  ]);

  React.useEffect(() => {
    dispatch({
      type: SET_FIELD,
      payload: { ...state.levelPlay.cords, title: state.levelPlay.title },
    });
    state.mode === 'PLAY' &&
      dispatch({ type: SET_PLAY_STACK, payload: state.levelPlay.stacks });
  }, [
    state.levelPlay,
    dispatch,
    state.mode,
    state.levelPlay.cords,
    state.levelPlay.stacks,
    state.levelPlay.title,
  ]);

  React.useEffect(() => {
    dispatch({ type: SET_BLOCK_SIZE, payload: windowSize });
  }, [windowSize, dispatch]);

  React.useEffect(() => {
    const winnerExec = () => {
      state.mode === 'PLAY' && completedLevelsSave(state.levelPlay.id);

      const calcWinShift = (stack) => {
        return (-state.blockScale.blockPx * getLongestSubArrLength(stack)) / 2;
      };

      fadeOutAnimSet({ opacity: 0, config: { duration: undefined } });
      fadeOutAnimLowOpacitySet({ opacity: 0, config: { duration: undefined } });
      fadeInAnimSet({
        opacity: 0.7,
        delay: 1500,
        config: { duration: undefined },
      });
      winShiftAnimSet({
        top: calcWinShift(state.xStack),
        left: calcWinShift(state.yStack),
        delay: 1000,
        config: { duration: undefined, mass: 10, tension: 300, friction: 140 },
      });
    };
    state.isWinner && winnerExec();
    //eslint-disable-next-line
  }, [state.isWinner]);

  const resetAnimations = () => {
    fadeOutAnimSet({ opacity: 1, config: { duration: 1 } });
    fadeOutAnimLowOpacitySet({ opacity: 0.2, config: { duration: 1 } });
    fadeInAnimSet({ opacity: 0, config: { duration: 1 } });
    winShiftAnimSet({
      top: 0,
      left: 0,
      config: { duration: 1 },
    });
  };

  const confirmModal = (data) => {
    dispatch({ type: SET_IS_FIELD_ACTIVE, payload: false });
    dispatch({ type: SET_IS_WINNER, payload: true });
    setModal({ ...modal, ...data, open: false });
    const customLvl = {
      ...data,
      stacks: { xStack: state.xStack, yStack: state.yStack },
      cords: { x: state.xStack.length, y: state.yStack.length },
      aparatasInit: { type: null },
    };

    realm.uploadLevel(customLvl);
  };

  const canSave = () => {
    let save = false;
    if (state.mode === 'PLAY' && !state.isFieldActive) {
      save = true;
    }

    for (let i = 0; i < state.fieldArr.length; i++) {
      if (state.fieldArr[i].type === 'MARK') {
        save = true;
        break;
      }
    }
    return save;
  };

  return (
    <React.Fragment>
      <Birds />
      {state.levelPlay.aparatasInit && state.levelPlay.aparatasInit.type && (
        <TopAparatas init={state.levelPlay.aparatasInit} />
      )}
      {modal.open && (
        <Modal
          confirm={confirmModal}
          closeModal={() => setModal({ ...modal, open: false })}
        />
      )}
      <SheetWrapperAnimated
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: spring.xys.interpolate(trans) }}
        x={state.levelPlay.cords.x}
        blockScale={state.blockScale.blockPx}
        ref={ref}
        mode={state.mode}
        waterMark={state.levelPlay.waterMark}
      >
        <animated.div
          className="water-mark-img"
          style={fadeOutAnimLowOpacity}
        ></animated.div>
        <animated.div className="spaceris" style={fadeOutAnim}>
          <FontAwesomeIcon
            onClick={() => dispatch({ type: SET_MODE, payload: 'HOME' })}
            icon={faTimes}
            className="icon exit"
          />
          <span className="span-title">{state.levelPlay.title}</span>
          <span className="span-size">
            {state.levelPlay.cords.x}x{state.levelPlay.cords.y}
          </span>
          {state.mode === 'DEV' && state.isFieldActive && canSave() && (
            <FontAwesomeIcon
              onClick={() => setModal({ ...modal, open: true })}
              icon={faSave}
              className="icon save"
            />
          )}
          {state.isFieldActive && (
            <FontAwesomeIcon
              onClick={() => {
                dispatch({
                  type: SET_FIELD,
                  payload: {
                    ...state.levelPlay.cords,
                    title: state.levelPlay.title,
                  },
                });
                state.mode === 'DEV' &&
                  dispatch({ type: SET_IS_FIELD_ACTIVE, payload: false });
                dispatch({ type: SET_APARATAS_ACTIVE, payload: true });
              }}
              icon={faTrash}
              className="icon bin"
            />
          )}
        </animated.div>

        <animated.span className="title" style={fadeInAnim}>
          {state.mode === 'PLAY' ? state.levelPlay.revealed : modal.revealed}
        </animated.span>

        <animated.div className="field-wrapper" style={winShiftAnim}>
          {grid.gridInsideField}
          {grid.gridOutsideField}
          <div style={{ transition: 'transform 0.2s' }}></div>
          <div className="x-stack">
            {state.xStack.map((element, index) => (
              <StackBlockContainer
                direction={'row'}
                stack={element}
                compare={state.xStackCurrent[index]}
                key={'key' + index}
              />
            ))}
          </div>

          <div className="y-stack">
            {state.yStack.map((element, index) => (
              <StackBlockContainer
                direction={'column'}
                stack={element}
                compare={state.yStackCurrent[index]}
                key={'key' + index}
              />
            ))}
          </div>

          <div className="puzzle-field">
            {state.fieldArr.map((element) => (
              <Block
                x={element.x}
                y={element.y}
                index={element.index}
                type={element.type}
                isTouch={isTouch}
                key={'key' + element.index}
              />
            ))}
          </div>
        </animated.div>
        {state.isWinner && (
          <animated.div className="post-btn-container" style={fadeInAnim}>
            <span
              onClick={() => {
                dispatch({ type: SET_MODE, payload: 'HOME' });
              }}
            >
              EXIT
            </span>
            {state.mode === 'PLAY' &&
              state.levelPlay.index !== state.lvlDataSource.length - 1 && (
                <span
                  onClick={() => {
                    resetAnimations();
                    dispatch({
                      type: PLAY_LEVEL_INIT,
                      payload: state.lvlDataSource[state.levelPlay.index + 1],
                    });
                  }}
                >
                  NEXT
                </span>
              )}
          </animated.div>
        )}
      </SheetWrapperAnimated>
    </React.Fragment>
  );
};

export default Sheet;
