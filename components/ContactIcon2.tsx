import classNames from 'classnames';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import EmailStatusIndicator from './EmailStatusIndicator';

const ContactIcon2 = ({
	statusCode,
	color = 'info',
	initial,
	children,
	className,
	validation,
	width = 20,
	height = 20,
	width2 = 10,
	height2 = 10,
}: {
	statusCode?: number;
	color?: 'info' | 'success' | 'warning' | 'dark' | 'danger';
	initial: string;
	children: ReactNode;
	className?: string;
	validation?: string;
	width?: number;
	height?: number;
	width2?: number;
	height2?: number;
}) => {
	const [colorMode, setColorMode] = useState(color);

	useEffect(() => {
		if (color || !statusCode) {
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

	let style: CSSProperties = { width, height };
	if (colorMode === 'info') {
		style.backgroundColor = 'rgba(0, 145, 255, 0.47)';
	}
	if (colorMode === 'success') {
		style.backgroundColor = 'rgba(0, 145, 255, 0.47)';
	}
	if (colorMode === 'warning') {
		style.backgroundColor = 'rgba(0, 145, 255, 0.47)';
	}
	if (colorMode === 'danger') {
		style.backgroundColor = 'rgba(0, 145, 255, 0.47)';
	}
	if (colorMode === 'dark') {
		style.backgroundColor = 'rgba(0, 145, 255, 0.47)';
	}
	let style2: CSSProperties = {};
	if (colorMode === 'info') {
		style2.backgroundColor = 'rgba(0, 212, 2, 0.5)';
	}
	if (colorMode === 'success') {
		style2.backgroundColor = 'rgba(0, 212, 2, 0.5)';
	}
	if (colorMode === 'warning') {
		style2.backgroundColor = 'rgba(247, 181, 0, 0.630846)';
	}
	if (colorMode === 'danger') {
		style2.backgroundColor = 'rgba(0, 212, 2, 0.5)';
	}
	if (colorMode === 'dark') {
		style2.backgroundColor = 'rgba(0, 212, 2, 0.5)';
	}
	style2.borderRadius = '20px';
	style2.width = '10px';
	style2.height = '10px';
	style2.marginLeft = '10px';
	return (
		<span className={classNames('is-flex-inline is-align-items-center', className)}>
			<span className="icon has-radius mr-3 is-unselectable" style={style}>
				{initial}
			</span>
			<span className="has-text-normal" style={{ wordBreak: 'break-all' }}>
				{children}
			</span>
			{/* <span className="icon mr-3 is-unselectable" style={style2}></span> */}
			<EmailStatusIndicator statusCode={statusCode} />
		</span>
	);
};

export default ContactIcon2;
