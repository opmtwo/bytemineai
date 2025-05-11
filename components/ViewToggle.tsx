import classNames from 'classnames';
import { Dispatch, MouseEvent, MouseEventHandler, SetStateAction, useState } from 'react';
import ReactSwitch from 'react-switch';
import { v4 } from 'uuid';

import { useAuthContext } from '../providers/auth-data-provider';
import { decodeJson } from '../utils/helper-utils';
import IconList from './icons/IconList';
import IconStack from './icons/IconStack';

const ViewToggle = ({
	name,
	isChecked,
	className = 'ml-2 mr-6',
	onChange,
}: {
	name: string;
	isChecked: boolean;
	className?: string;
	onChange: Dispatch<SetStateAction<boolean>>;
}) => {
	const [id, setId] = useState(v4());

	const { user, updateAttributes } = useAuthContext();

	const handleChange = async (e: MouseEvent<HTMLButtonElement>, newValue: boolean) => {
		e.preventDefault();
		onChange(newValue);
		let profile = decodeJson(user?.attributes.profile || '');
		if (!profile.listModes) {
			profile.listModes = {};
		}
		profile.listModes[name] = newValue;
		updateAttributes({ profile: JSON.stringify(profile) });
	};

	const defaultClassNames = 'is-relative is-flex is-align-items-center is-clickable is-outline-free is-borderless p-2';
	const activeClassNames = 'is-selected has-text-primary has-background-transparent';
	const inactiveClassNames = 'has-background-grey-light has-text-grey';

	return (
		<div className="field has-addons ml-a mr-1">
			<p className="control">
				<button
					className={classNames(defaultClassNames, !isChecked ? activeClassNames : inactiveClassNames)}
					onClick={(e) => handleChange(e, false)}
					style={{ boxShadow: !isChecked ? 'inset 0 0 0 1px' : 'none', zIndex: !isChecked ? 1 : 0, borderRadius: '6px 0 0 6px' }}
				>
					<span className="icon">
						<IconList />
					</span>
				</button>
			</p>
			<p className="control">
				<button
					className={classNames(defaultClassNames, isChecked ? activeClassNames : inactiveClassNames)}
					onClick={(e) => handleChange(e, true)}
					style={{ boxShadow: isChecked ? 'inset 0 0 0 1px' : 'none', zIndex: isChecked ? 1 : 0, borderRadius: '0 6px 6px 0' }}
				>
					<span className="icon">
						<IconStack />
					</span>
				</button>
			</p>
		</div>
	);
};

export default ViewToggle;
