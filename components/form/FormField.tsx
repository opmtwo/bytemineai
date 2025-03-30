import { ReactNode, CSSProperties } from 'react';
import classNames from 'classnames';

const FormField = ({ children, style, className, isLast = false }: { children: ReactNode; style?: CSSProperties; className?: string; isLast?: boolean }) => (
	<div  className={classNames('field', className, isLast ? 'mb-0' : '')} style={style}>
		{children}
	</div>
);

export default FormField;
