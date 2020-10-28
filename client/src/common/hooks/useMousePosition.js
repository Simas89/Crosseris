import { useState, useEffect, useCallback } from 'react';

const useMousePosition = (isTouch) => {
	const [mousePosition, setMousePosition] = useState({ x: null, y: null });

	const updateMousePosition = useCallback(
		(ev) => {
			if (isTouch) {
				setMousePosition({
					x: parseInt(ev.changedTouches[0].clientX),
					y: ev.changedTouches[0].clientY,
				});
			} else {
				setMousePosition({ x: ev.clientX, y: ev.clientY });
			}
		},
		[isTouch],
	);

	useEffect(() => {
		window.addEventListener(
			isTouch ? 'touchmove' : 'mousemove',
			updateMousePosition,
		);

		return () =>
			window.removeEventListener(
				isTouch ? 'touchmove' : 'mousemove',
				updateMousePosition,
			);
	}, [isTouch, updateMousePosition]);

	return mousePosition;
};

export default useMousePosition;
