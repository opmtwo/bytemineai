import { ChangeEvent, CSSProperties, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { v4 } from 'uuid';
import classNames from 'classnames';

const ExportContactRadio = ({
	children,
	name,
	value,
	checkedValue,
	onSelect,
}: {
	children: ReactNode;
	name: string;
	value: string;
	checkedValue: string;
	onSelect: Dispatch<SetStateAction<string>>;
}) => {
	const [id, setId] = useState(v4());

	const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
		onSelect(e.target.value);
	};

	const cssClasses = 'button is-block is-relative is-inverted is-ui-button is-size-6';

	const style: CSSProperties = {
		height: 'initial',
		padding: '3rem 0.5rem 1rem',
		whiteSpace: 'initial',
		border: '1px solid'
	};

	return (
		<label htmlFor={id} className={classNames(cssClasses, value === checkedValue ? 'is-primary has-text-primary' : 'has-text-grey')} style={style}>
			<input id={id} type="radio" name={name} className="is-hidden" value={value} onChange={handleSelect} />
			{children}
		</label>
	);
};

export default ExportContactRadio;
