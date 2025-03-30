const IconEnrichRecord = ({ width = 20, height, fill = '#979797' }: { width?: number; height?: number; fill?: string }) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20">
		<path
			id="Shape"
			d="M9.529,19.989A10,10,0,0,1,8.59.1V2.13a8,8,0,1,0,9.29,9.29H19.9A10,10,0,0,1,10.006,20C9.848,20,9.689,20,9.529,19.989ZM9.523,15.97A6,6,0,0,1,8.581,4.16v2.1a4,4,0,1,0,5.16,5.15h2.09a6,6,0,0,1-5.825,4.58Q9.765,15.99,9.523,15.97ZM8.59,11.41A2,2,0,0,1,10,8V0A9.971,9.971,0,0,1,20,10H12a2,2,0,0,1-3.41,1.41Zm11.308.01v0Zm-4.068-.01h.01Z"
			transform="translate(0 0)"
			fill={fill}
		/>
	</svg>
);

export default IconEnrichRecord;
