import { CSSProperties } from "react";

const Loader = ({
	classNames = 'panel-block is-justify-content-center py-5',
	style = {},
	width = 42,
	height = 42,
}: {
	classNames?: string;
	style?: CSSProperties;
	width?: number;
	height?: number;
}) => (
	<div className={classNames} style={style}>
		<svg width={width} height={height} viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#444">
			<g fill="none" fillRule="evenodd" strokeWidth="2">
				<circle cx="22" cy="22" r="1">
					<animate
						attributeName="r"
						begin="0s"
						dur="1.8s"
						values="1; 20"
						calcMode="spline"
						keyTimes="0; 1"
						keySplines="0.165, 0.84, 0.44, 1"
						repeatCount="indefinite"
					/>
					<animate
						attributeName="stroke-opacity"
						begin="0s"
						dur="1.8s"
						values="1; 0"
						calcMode="spline"
						keyTimes="0; 1"
						keySplines="0.3, 0.61, 0.355, 1"
						repeatCount="indefinite"
					/>
				</circle>
				<circle cx="22" cy="22" r="1">
					<animate
						attributeName="r"
						begin="-0.9s"
						dur="1.8s"
						values="1; 20"
						calcMode="spline"
						keyTimes="0; 1"
						keySplines="0.165, 0.84, 0.44, 1"
						repeatCount="indefinite"
					/>
					<animate
						attributeName="stroke-opacity"
						begin="-0.9s"
						dur="1.8s"
						values="1; 0"
						calcMode="spline"
						keyTimes="0; 1"
						keySplines="0.3, 0.61, 0.355, 1"
						repeatCount="indefinite"
					/>
				</circle>
			</g>
		</svg>
	</div>
);

export default Loader;
