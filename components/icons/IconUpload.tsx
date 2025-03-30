const IconUpload = ({ width = 20, height, fill = '#979797' }: { width?: number; height?: number; fill?: string }) => (
	<svg id="upload" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 18">
		<path id="Shape" d="M0,18V16H20v2Zm7-4V8H2l8-8,8,8H13v6Z" fill={fill} />
	</svg>
);

export default IconUpload;
