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

	const cssClasses = 'is-block is-relative is-inverted is-ui-button is-size-6 has-radius has-text-centered';

	const style: CSSProperties = {
		height: 'initial',
		padding: '1.25rem 0.5rem 2rem',
		whiteSpace: 'initial',
		border: '1px solid',
		borderColor: value === checkedValue ? '#84caff' : 'currentcolor',
	};

	return (
		<label htmlFor={id} className={classNames(cssClasses, value === checkedValue ? 'is-primary has-text-info' : 'has-text-grey')} style={style}>
			<input id={id} type="radio" name={name} className="is-hidden" value={value} onChange={handleSelect} />
			{children}
		</label>
	);
};

export default ExportContactRadio;
