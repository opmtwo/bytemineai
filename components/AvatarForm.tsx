import React, { ChangeEvent, HTMLAttributes, useState } from 'react';
import { v4 } from 'uuid';

import { useAuthContext } from '../providers/auth-data-provider';
import { callApi, uploadToSignedUrl } from '../utils/helper-utils';
import FormButton from './form/FormButton';
import IconNewPlus from './icons/IconNewPlus';
import LoaderFullscreen from './LoaderFullscreen';
import FormButtonNew from './form/FormButtonNew';
import IconNewCamera from './icons/IconNewCamera';

export interface AvatarFormProps extends HTMLAttributes<HTMLLabelElement> {
	//
}

const AvatarForm: React.FC<AvatarFormProps> = () => {
	const { self, refresh } = useAuthContext();

	const [id, setId] = useState(v4());
	const [isBusy, setIsBusy] = useState(false);

	const onAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files?.length) {
			return;
		}
		setIsBusy(true);
		const file = event.target.files[0];
		try {
			const res = (await callApi(null, 'api/v1/me/avatar', {
				method: 'POST',
				body: JSON.stringify({
					size: file.size,
					mime: file.type,
				}),
			})) as { key: string; url: string; uploadUrl: string };
			const fileBuffer = await file.arrayBuffer();
			await uploadToSignedUrl(res.uploadUrl, Buffer.from(fileBuffer), file.type);
			await refresh();
		} catch (err) {
			console.log('onAvatarChange - error: ' + err);
		}
		setIsBusy(false);
	};

	const onAvatarRemove = async () => {
		setIsBusy(true);
		try {
			await callApi(null, 'api/v1/me/avatar', { method: 'DELETE' });
			await refresh();
		} catch (err) {
			console.log('onAvatarRemove - error', err);
		}
		setIsBusy(false);
	};

	// const avatarUrl = self?.avatarS3Url ?? 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
	const avatarUrl = self?.avatarS3Url ?? '/avatar.png';

	const idOne = `${id}-1`;
	const idTwo = `${id}-2`;

	return (
		<div className="is-relative is-flex is-align-items-center mb-5">
			<label className="is-relative is-clickable image is-96x96" htmlFor={idOne}>
				<img className="is-rounded" src={avatarUrl} alt="" />
				<span className="is-absolute" style={{ bottom: 0, right: 0 }}>
					<IconNewCamera width={24} />
				</span>
				<input type="file" id={idOne} accept="image/*" className="is-hidden" onChange={onAvatarChange} />
			</label>
			<div className="ml-5">
				<div className="is-flex mb-3">
					<label className="is-relative is-flex is-flex-direction-column is-clickable mr-5" htmlFor={idTwo}>
						<FormButtonNew type="button" style={{ pointerEvents: 'none' }}>
							<IconNewPlus />
							<span className="ml-3">Change Image</span>
						</FormButtonNew>
						<input type="file" id={idTwo} accept="image/*" className="is-hidden" onChange={onAvatarChange} />
					</label>
					<FormButtonNew type="button" onClick={onAvatarRemove}>
						Remove Image
					</FormButtonNew>
				</div>
				<p>Click here to change your profile pic</p>
			</div>
			{isBusy ? <LoaderFullscreen /> : <></>}
		</div>
	);
};

export default AvatarForm;
