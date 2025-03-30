import { CSSProperties, useEffect, useState } from 'react';

const EmailStatusIndicator = ({
	statusCode,
	color,
	width = 10,
	height = 10,
	marginLeft = 10,
}: {
	statusCode?: number;
	color?: 'info' | 'success' | 'warning' | 'dark' | 'danger';
	width?: number;
	height?: number;
	marginLeft?: number;
}) => {
	const [colorMode, setColorMode] = useState(color);

	useEffect(() => {
		if (color) {
			return;
		}
		if (!statusCode) {
			return;
		}
		if (statusCode === 50) {
			setColorMode('success');
			return;
		}
		if (statusCode === 5) {
			setColorMode('success');
			return;
		}
		if (statusCode === 45) {
			setColorMode('warning');
			return;
		}
		if (statusCode === 4) {
			setColorMode('warning');
			return;
		}
		setColorMode('danger');
	}, [statusCode]);

	let style: CSSProperties = {
		width,
		height,
		marginLeft,
		borderRadius: '50%',
	};

	if (colorMode === 'info') {
		style.backgroundColor = 'rgba(0, 212, 2, 0.5)';
	}

	if (colorMode === 'success') {
		style.backgroundColor = 'rgba(0, 212, 2, 0.5)';
	}

	if (colorMode === 'warning') {
		style.backgroundColor = 'rgba(247, 181, 0, 0.630846)';
	}

	if (colorMode === 'danger') {
		style.backgroundColor = '#ff767b';
	}

	if (colorMode === 'dark') {
		style.backgroundColor = 'rgba(0, 212, 2, 0.5)';
	}

	return <span className="icon mr-3 is-unselectable" style={style}></span>;
};

export default EmailStatusIndicator;
