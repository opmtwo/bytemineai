import { ReactNode, useEffect, useRef } from 'react';

const TableHeaderCell = ({ children }: { children: ReactNode }) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const node = ref?.current;
		const onResize = () => {
			if (!node) {
				return;
			}
			const height = node?.getBoundingClientRect()?.height || 0;
			if (height < 50 && node) {
				node.style.minHeight = 50 + 'px';
			}
		};
		const observer = new ResizeObserver(onResize);
		if (node) {
			observer.observe(node);
		}
		return () => {
			if (node) {
				observer.unobserve(node);
			}
		};
	}, []);

	return (
		<div className="is-resizeable" ref={ref}>
			{children}
		</div>
	);
};

export default TableHeaderCell;
