import { FormEvent, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { v4 } from 'uuid';
import Card from './cards/Card';
import Storage from '@aws-amplify/storage';
import FormButton from './form/FormButton';
import ErrorNotificaition from './notifications/ErrorNotification';
import Slot from './Slot';
import CardTitle from './CardTitle';
import IconClose from './icons/IconClose';
import FormInput from './form/FormInput';
import FormImage from './form/FormImage';

import { useSettingsContext } from '../providers/settings-provider';
import { UserAttributes } from '../types';
import Loader from './Loader';

const CustomizeForm = ({
	groupName,
	settings,
	onSubmit,
	onCancel,
	title = 'Customize Look',
	submitButtonLabel = 'Complete',
}: {
	groupName: string;
	settings: UserAttributes;
	onSubmit: Function;
	onCancel?: Function;
	title?: string;
	submitButtonLabel?: string;
}) => {
	const [isBusy, setIsBusy] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error>();
	const [colorCode, setColorCode] = useState('#F72707');
	const [logo, setLogo] = useState('');
	const [logoUrl, setLogoUrl] = useState('');
	const [icon, setIcon] = useState('');
	const [iconUrl, setIconUrl] = useState('');

	const { setSettings, getGroupSettings, updateGroupSettings, getLogo, getIcon } = useSettingsContext();

	useEffect(() => {
		setColorCode(settings?.['custom:color_code'] || '#F72707');
	}, [settings?.['custom:color_code']]);

	useEffect(() => {
		if (!settings?.['custom:logo_s3_key']) {
			setIsLoading(false);
			return;
		}
		setIsLoading(true);
		(async () => {
			const url = await getLogo(settings['custom:logo_s3_key']);
			setLogoUrl(url || '');
			// show nice loader for better UX
			// setTimeout(() => setIsLoading(false), 1000)
			setIsLoading(false);
		})();
	}, [settings?.['custom:logo_s3_key']]);

	useEffect(() => {
		if (!settings?.['custom:icon_s3_key']) {
			setIsLoading(false);
			return;
		}
		setIsLoading(true);
		(async () => {
			const url = await getIcon(settings['custom:icon_s3_key']);
			setIconUrl(url || '');
			setIsLoading(false);
		})();
	}, [settings?.['custom:icon_s3_key']]);

	const saveLogo = async () => {
		const id = `uploads/${groupName}/logo-images/${v4()}`;
		try {
			const data = await fetch(logo);
			const blob = await data.blob();
			await Storage.put(id, blob, {
				acl: 'public-read',
				level: 'public',
			});
		} catch (err: any) {
			setError(new Error('Could not save logo'));
			console.log('updateImage - error uploading logo', err);
			return;
		}
		return id;
	};

	const saveIcon = async () => {
		const id = `uploads/${groupName}/icon-images/${v4()}`;
		try {
			const data = await fetch(icon);
			const blob = await data.blob();
			await Storage.put(id, blob, {
				acl: 'public-read',
				level: 'public',
			});
		} catch (err: any) {
			setError(new Error('Could not save icon'));
			console.log('updateImage - error uploading icon', err);
			return;
		}
		return id;
	};

	const handleSubmit = async (e: FormEvent) => {
		setIsBusy(true);
		const input: any = {
			'custom:color_code': colorCode,
			'custom:logo_s3_key': '',
		};
		if (logo) {
			const logoS3Key = await saveLogo();
			if (logoS3Key) {
				input['custom:logo_s3_key'] = logoS3Key;
			}
		}
		if (icon) {
			const iconS3Key = await saveIcon();
			if (iconS3Key) {
				input['custom:icon_s3_key'] = iconS3Key;
			}
		}
		await updateGroupSettings(settings.sub, input);
		if (onSubmit) {
			await onSubmit();
		}
		setIsBusy(false);
	};

	const handleCancel = () => onCancel && onCancel();

	return (
		<Card>
			<Slot slot="header">
				<CardTitle>{title}</CardTitle>
				{onCancel ? (
					<span className="is-clickable" onClick={handleCancel}>
						<IconClose />
					</span>
				) : null}
			</Slot>
			<Slot slot="body">
				<motion.div layout className="panel-block is-block">
					<FormImage name="logo" value={logo} label="Upload Logo" onChange={setLogo}>
						{isLoading ? (
							<Loader />
						) : logoUrl ? (
							<img src={logoUrl} alt="" style={{ maxHeight: '100%' }} />
						) : null}
					</FormImage>
					<FormImage name="icon" value={icon} label="Upload Favicon" onChange={setIcon}>
						{isLoading ? (
							<Loader />
						) : logoUrl ? (
							<img src={iconUrl} alt="" style={{ maxHeight: '100%' }} />
						) : null}
					</FormImage>
					<FormInput
						isColorPicker={true}
						name="color"
						value={colorCode}
						label="Select Primary Color"
						onChange={setColorCode}
						required={true}
					/>
					<ErrorNotificaition error={error} />
				</motion.div>
			</Slot>
			<Slot slot="footer">
				<FormButton
					type="submit"
					onClick={handleSubmit}
					disabled={isBusy}
					loading={isBusy}
					variant={['is-outlined', 'is-ui-button']}
				>
					{submitButtonLabel}
				</FormButton>
			</Slot>
		</Card>
	);
};

export default CustomizeForm;
