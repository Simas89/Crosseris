import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { STORE_CUSTOM_LEVELS } from 'redux/types';
import { createGlobalStyle } from 'styled-components';
import Particles from 'react-particles-js';
import MultiSelector from './MultiSelector';
import realm from '../common/utils/realm';
const NavScreen = React.lazy(() => import('./NavScreen'));
const Sheet = React.lazy(() => import('./Sheet'));
const Menu = React.lazy(() => import('./Menu'));

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: fujimaru;
	src: url(./fonts/fujimaru.ttf);
}
*{
	-webkit-tap-highlight-color: transparent;
}

	body{
		margin: 0;
		min-height: 100vh;
		display: flex;
		justify-content:center;
		align-items:center;
		background-image: url('img/bg1.jpg');
		background-position: center;
		background-size: cover;
	}
`;

function App() {
  const mode = useSelector((state) => state.field.mode);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (mode === 'HOME') {
      realm.getData((data) =>
        dispatch({ type: STORE_CUSTOM_LEVELS, payload: data })
      );
    }
  }, [dispatch, mode]);
  return (
    <>
      <GlobalStyle />
      <React.Suspense fallback={null}>
        <Menu />
        {mode === 'HOME' ? <NavScreen /> : <Sheet />}
      </React.Suspense>
      <MultiSelector />
      {/* // Particles package should be removed and done manually instead */}
      <Particles
        params={{
          particles: {
            number: {
              value: 1,
            },
            line_linked: {
              enable: false,
            },
            move: {
              speed: 0.4,
              random: true,
              direction: 'bottom',
              out_mode: 'out',
              anim: {
                enable: true,
                speed: 4,
                speed_min: 0.2,

                sync: false,
              },
            },
            shape: {
              type: ['image'],
              image: [
                {
                  src: 'img/leaf1.png',
                },
                {
                  src: 'img/leaf2.png',
                },
              ],
            },
            opacity: {
              value: 1,
              random: false,
              anim: {
                enable: false,
              },
            },
            size: {
              value: 15,
            },
          },
          retina_detect: false,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
    </>
  );
}

export default App;
