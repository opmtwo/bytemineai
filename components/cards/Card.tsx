import { Children, ReactNode } from 'react';
import classNames from 'classnames';

const Card = ({ children, className }: { children?: ReactNode; className?: string }) => {
	const childrenArray = Children.toArray(children) as unknown as React.ReactElement[];
	const header = childrenArray.find((child) => child?.props?.slot === 'header');
	const body = childrenArray.find((child) => child?.props?.slot === 'body');
	const footer = childrenArray.find((child) => child?.props?.slot === 'footer');

	return (
		<div className={classNames('panel has-background-white', className)}>
			{header ? <header className="panel-block is-justify-content-space-between">{header}</header> : null}
			{body}
			{footer ? <footer className="panel-block is-justify-content-flex-end">{footer}</footer> : null}
		</div>
	);
};

export default Card;
