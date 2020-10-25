export const compareMatch = (node1, node2, isLast, props) => {
	if (node1 === node2) {
		if (isLast) {
			if (props.stack.toString() === props.compare.toString()) {
				return true;
			} else {
				return false;
			}
		}
		return true;
	} else {
		return false;
	}
};
