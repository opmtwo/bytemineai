import React, { useState } from 'react';
import classNames from 'classnames';
import { useSettingsContext } from '../providers/settings-provider';
import Card from './cards/Card';
import CardTitle from './CardTitle';
import FormInput from './form/FormInput';
import IconCopy from './icons/IconCopy';
import IconEye from './icons/IconEye';
import Slot from './Slot';
import Anchor from './Anchor';
import FormButton from './form/FormButton';

const ApiForm = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isCopied, setIsCopied] = useState(false);
	const { settings } = useSettingsContext();

	const onCopy = () => {
		navigator.clipboard.writeText(settings?.sub || '');
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	const onToggle = () => setIsVisible(!isVisible);

	return (
		<>
			<Card>
				<Slot slot="header">
					<CardTitle>API</CardTitle>
					<Anchor href="https://app.swaggerhub.com/apis/NYMBLR/NymblrDataAPIv1/1.0.0" target="_blank">
						<FormButton variant={['is-outlined', 'is-ui-button']}>View Docs</FormButton>
					</Anchor>
				</Slot>
				<Slot slot="body">
					<div className="panel-block is-block is-relative">
						<FormInput
							readonly={true}
							value={isVisible ? settings?.sub : '**************************'}
							className={classNames(isVisible ? '' : 'is-family-monospace')}
						/>
						<div className="is-absolute is-flex is-align-items-center" style={{ top: '2em', right: '2em' }}>
							<span
								className={classNames(
									'icon has-svg mx-1 is-clickable',
									isVisible ? 'has-text-primary' : 'has-text-grey'
								)}
								onClick={onToggle}
							>
								<IconEye />
							</span>
							<span
								className={classNames(
									'icon has-svg mx-1 is-clickable',
									isCopied ? 'has-text-primary' : 'has-text-grey'
								)}
								onClick={onCopy}
							>
								<IconCopy />
							</span>
						</div>
					</div>
				</Slot>
			</Card>
		</>
	);
};

export default ApiForm;
