import classNames from 'classnames';
import React, { useState } from 'react';

import { useAuthContext } from '../providers/auth-data-provider';
import Anchor from './Anchor';
import FormButtonNew from './form/FormButtonNew';
import IconNewCopy from './icons/IconNewCopy';
import IconNewEye from './icons/IconNewEye';
import IconNewEyeClosed from './icons/IconNewEyeClosed';

const ApiForm = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isCopied, setIsCopied] = useState(false);

	const { attributes, team } = useAuthContext();

	const onCopy = () => {
		navigator.clipboard.writeText(team?.id || '');
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	const onToggle = () => setIsVisible(!isVisible);

	return (
		<>
			<div className="is-relative is-fullwidth">
				<Anchor href="https://app.swaggerhub.com/apis/NYMBLR/NymblrDataAPIv1/1.0.0" target="_blank">
					<FormButtonNew type="button" variant="default" className="is-absolute" style={{ right: 0, bottom: '100%', marginBottom: '1.5rem' }}>
						<span className="has-text-link">View Docs</span>
					</FormButtonNew>
				</Anchor>
			</div>

			<div
				className="is-flex is-align-items-center is-size-5 has-border has-radius p-5"
				style={{ backgroundColor: '#eff8ff', borderColor: '#84caff !important' }}
			>
				<div className="is-flex is-align-items-center mr-auto has-text-weight-semibold">
					<span className="has-text-black">API key:</span>
					<span className="has-text-link ml-3">{isVisible ? team?.id : '**************************'}</span>
				</div>
				<div className="is-flex is-align-items-center ml-auto">
					<span
						className={classNames('icon is-large has-background-white has-radius is-clickable mr-3', isVisible ? 'has-text-link' : 'has-text-grey')}
						onClick={onToggle}
					>
						{isVisible ? <IconNewEye width={20} /> : <IconNewEyeClosed width={20} />}
					</span>
					<span
						className={classNames('icon is-large has-background-white has-radius is-clickable px-5', isCopied ? 'has-text-link' : 'has-text-grey')}
						style={{ width: 'auto', maxWidth: 'none' }}
						onClick={onCopy}
					>
						<IconNewCopy width={20} />
						<span className="has-text-weight-medium ml-2">Copy</span>
					</span>
				</div>
			</div>
		</>
	);
};

export default ApiForm;
